"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _migration = _interopRequireDefault(require("../models/migration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var secret = process.env.SECRET_KEY;

function getAllUsers(req, res) {
  _migration.default.query('SELECT * FROM users').then(function (users) {
    var allUsers = users.rows;
    res.status(200).json({
      allUsers: allUsers
    });
  }).catch(
  /* istanbul ignore next */
  function (err) {
    return res.status(500).json(err);
  });
}

function getUser(req, res) {
  var userId = req.params.userId;

  _migration.default.query('SELECT * FROM users WHERE id = $1;', [userId]).then(function (requestedUser) {
    var user = requestedUser.rows[0];
    /* istanbul ignore next */

    return !user ? Promise.reject() : user;
  }).then(function (user) {
    res.status(200).json({
      user: user
    });
  }).catch(function () {
    res.status(404).json({
      error: "user id, ".concat(userId, " does not exist")
    });
  });
}

function addUser(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password,
      email = _req$body.email,
      role = _req$body.role;

  var salt = _bcryptjs.default.genSaltSync(10);

  var hash = _bcryptjs.default.hashSync(password, salt);

  var query = {
    text: 'INSERT INTO users(username, password, email, role) VALUES($1, $2, $3, $4) RETURNING *',
    values: [username, hash, email, role]
  };

  _migration.default.query(query).then(function (user) {
    var newAttendant = user.rows[0];
    res.status(201).json({
      newAttendant: newAttendant
    });
  }).catch(function () {
    res.status(422).json({
      error: 'data with same username already exists'
    });
  });
}

function login(req, res) {
  var _req$body2 = req.body,
      usernameInput = _req$body2.usernameInput,
      passwordInput = _req$body2.passwordInput;

  _migration.default.query('SELECT * FROM users WHERE username = $1', [usernameInput]).then(function (user) {
    var foundUser = user.rows[0];

    var authenticated = _bcryptjs.default.compareSync(passwordInput, foundUser.password);
    /* istanbul ignore next */


    return !authenticated ? Promise.reject() : foundUser;
  }).then(function (foundUser) {
    var username = foundUser.username,
        password = foundUser.password,
        role = foundUser.role;

    var token = _jsonwebtoken.default.sign({
      username: username,
      password: password,
      role: role
    }, secret, {
      expiresIn: '1hr'
    });

    res.status(200).json({
      username: username,
      role: role,
      token: token
    });
  }).catch(function () {
    res.status(401).json({
      error: 'incorrect username or password'
    });
  });
}

function updateUserData(req, res) {
  var userId = req.params.userId;
  var _req$body3 = req.body,
      username = _req$body3.username,
      password = _req$body3.password,
      email = _req$body3.email,
      role = _req$body3.role;

  var hashPassword = _bcryptjs.default.hashSync(password, 10);

  var text = 'UPDATE users SET username=$1, password=$2, email=$3, role=$4 WHERE id=$5 RETURNING *;';
  var values = [username, hashPassword, email, role, userId];

  _migration.default.query(text, values).then(function (userArray) {
    var user = userArray.rows[0];
    /* istanbul ignore next */

    return !user ? Promise.reject() : user;
  }).then(function (updatedUser) {
    res.status(200).json({
      updatedUser: updatedUser
    });
  }).catch(function () {
    res.status(422).json({
      error: 'unnable to complete request. choose another username or new id'
    });
  });
}

function deleteUser(req, res) {
  var userId = req.params.userId;
  var text = 'DELETE FROM users WHERE id = $1 returning *;';
  var values = [userId];

  _migration.default.query(text, values).then(function (user) {
    var deletedUser = user.rows[0];
    /* istanbul ignore next */

    return !deletedUser ? Promise.reject(userId) : deletedUser;
  }).then(function (deletedUser) {
    res.status(200).json({
      deletedUser: deletedUser
    });
  }).catch(function (id) {
    res.status(404).json({
      error: "user id, ".concat(id, " does not exist")
    });
  });
}

function giveAdminRight(req, res) {
  var userId = req.params.userId;
  var admin = req.body.admin;
  /* istanbul ignore next */

  var role = admin === true ? 'admin' : 'attendant';
  var text = 'UPDATE users SET role=$1 WHERE id=$2 returning *;';
  var values = [role, userId];

  _migration.default.query(text, values).then(function (user) {
    var adminUser = user.rows[0];
    /* istanbul ignore next */

    return !adminUser ? Promise.reject(userId) : adminUser;
  }).then(function (newAdmin) {
    res.status(200).json({
      newAdmin: newAdmin
    });
  }).catch(function (errorId) {
    res.status(404).json({
      error: "user id, ".concat(errorId, " does not exist")
    });
  });
}

var _default = {
  addUser: addUser,
  login: login,
  getAllUsers: getAllUsers,
  getUser: getUser,
  updateUserData: updateUserData,
  deleteUser: deleteUser,
  giveAdminRight: giveAdminRight
};
exports.default = _default;
//# sourceMappingURL=userController.js.map