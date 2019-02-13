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
  var query = {
    text: 'SELECT * FROM users',
    values: []
  };

  _migration.default.query(query).then(function (users) {
    var allUsers = users.rows;
    res.status(200).json({
      allUsers: allUsers
    });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function getUser(req, res) {
  var userId = req.params.userId;
  var query = {
    text: 'SELECT * FROM users WHERE id = $1;',
    values: [userId]
  };

  _migration.default.query(query).then(function (requestedUser) {
    var user = requestedUser.rows[0];
    return res.status(200).json({
      user: user
    });
  }).catch(function (err) {
    res.status(500).json(err);
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
    text: 'INSERT INTO users(username, password, email, productSold, noOfSales, worthOfSales, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [username, hash, email, 0, 0, 0, role]
  };

  _migration.default.query(query).then(function (user) {
    var newAttendant = user.rows[0];
    return res.status(201).json({
      newAttendant: newAttendant
    });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function login(req, res) {
  var _req$body2 = req.body,
      usernameInput = _req$body2.usernameInput,
      passwordInput = _req$body2.passwordInput;
  var query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [usernameInput]
  };

  _migration.default.query(query).then(function (user) {
    var foundUser = user.rows[0];

    if (!_bcryptjs.default.compareSync(passwordInput, foundUser.password)) {
      return res.status(401).json({
        error: true,
        message: 'username or password incorrect'
      });
    }

    return foundUser;
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

    return res.status(200).json({
      username: username,
      role: role,
      token: token
    });
  }).catch(function () {
    var error = true,
        message = 'user does not exist';
    return res.status(401).json({
      error: error,
      message: message
    });
  });
}

function updateUser(req, res) {
  var _req$body3 = req.body,
      username = _req$body3.username,
      productSold = _req$body3.productSold,
      noOfSales = _req$body3.noOfSales,
      worthOfSales = _req$body3.worthOfSales;
  var userId = req.params.userId;
  var query = {
    text: 'UPDATE users SET productSold = $1,noOfSales =$2,worthOfSales = $3 WHERE username = $4 AND id = $5;',
    values: [productSold, noOfSales, worthOfSales, username, userId]
  };

  _migration.default.query(query).then(function (user) {
    var updatedUser = user;
    return res.status(200).json({
      updatedUser: updatedUser
    });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

function deleteUser(req, res) {
  var userId = req.params.userId;
  var username = req.body.username;
  var query = {
    text: 'DELETE FROM users WHERE id = $1 AND username = $2;',
    values: [userId, username]
  };

  _migration.default.query(query).then(function (user) {
    var deletedUser = user;
    return res.status(200).json({
      deletedUser: deletedUser
    });
  }).catch(function (err) {
    res.status(200).json(err);
  });
}

function giveAdminRight(req, res) {
  var userId = req.params.userId;
  var _req$body4 = req.body,
      username = _req$body4.username,
      role = _req$body4.role;
  var query = {
    text: 'UPDATE users SET role=$1 WHERE id=$2 and username=$3;',
    values: [role, userId, username]
  };

  _migration.default.query(query).then(function (user) {
    var adminUser = user;
    return res.status(200).json({
      adminUser: adminUser
    });
  }).catch(function (err) {
    res.status(500).json(err);
  });
}

var _default = {
  addUser: addUser,
  login: login,
  getAllUsers: getAllUsers,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  giveAdminRight: giveAdminRight
};
exports.default = _default;
//# sourceMappingURL=userController.js.map