"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var userData = {
  admin: {
    usernameInput: 'jaachimma onyenze',
    passwordInput: process.env.ApiKey
  },
  attendant: {
    usernameInput: process.env.AttendantUsername,
    passwordInput: process.env.AttendantKey
  },
  newAttendant: {
    username: 'onyenze',
    password: 'attendant0001',
    email: 'addattendant@gmail.com',
    role: 'attendant'
  },
  emptyFields: {
    usernameInput: '',
    passwordInput: ''
  },
  unknownUser: {
    usernameInput: 'winterbutter',
    passwordInput: 'adasd8ada'
  },
  attendantLogin: {}
};
var _default = userData;
exports.default = _default;
//# sourceMappingURL=userData.js.map