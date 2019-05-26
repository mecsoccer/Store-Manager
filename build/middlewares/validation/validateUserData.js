"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validationLibrary = _interopRequireDefault(require("./library/validationLibrary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validateTextField = _validationLibrary.default.validateTextField;

var ValidateUserData =
/*#__PURE__*/
function () {
  function ValidateUserData() {
    _classCallCheck(this, ValidateUserData);
  }

  _createClass(ValidateUserData, null, [{
    key: "validateLogin",
    value: function validateLogin(req, res, next) {
      var _req$body = req.body,
          usernameInput = _req$body.usernameInput,
          passwordInput = _req$body.passwordInput;
      var usernameValid = validateTextField('usernameInput', usernameInput, 2, 15, /^\w+$/, 'john23, doe, 3233_john');
      var passwordValid = validateTextField('passwordInput', passwordInput, 6, 12, /[a-z]?[A-Z]?[0-9]?[$#@]?/, 'asAS997$, asAS997#, asAS997@');

      if (usernameValid !== true) {
        res.status(422).json({
          error: usernameValid
        });
      } else if (passwordValid !== true) {
        res.status(422).json({
          error: passwordValid
        });
      } else {
        next();
      }
    }
  }, {
    key: "validateSignup",
    value: function validateSignup(req, res, next) {
      var _req$body2 = req.body,
          username = _req$body2.username,
          password = _req$body2.password,
          email = _req$body2.email,
          role = _req$body2.role;
      var usernameValid = validateTextField('username', username, 2, 15, /^\w+$/, 'john23, doe, 3233');
      var passwordValid = validateTextField('password', password, 6, 12, /[a-z]+[A-Z]+[0-9]+[$#@]+/, 'asAS997$, asAS997#, asAS997@');
      var emailValid = validateTextField('email', email, 3, 50, /\w+[-.]*\w+@\w+[.][a-z]+/, 'john234.doe@gmail.com, johndoe@gmail.com');
      var roleValid = validateTextField('role', role, 5, 9, /^[a-z]+$/, 'attendant, admin');

      if (usernameValid !== true) {
        res.status(422).json({
          error: usernameValid
        });
      } else if (passwordValid !== true) {
        res.status(422).json({
          error: passwordValid
        });
      } else if (emailValid !== true) {
        res.status(422).json({
          error: emailValid
        });
      } else if (roleValid !== true) {
        res.status(422).json({
          error: roleValid
        });
      } else {
        next();
      }
    }
  }]);

  return ValidateUserData;
}();

var _default = ValidateUserData;
exports.default = _default;
//# sourceMappingURL=validateUserData.js.map