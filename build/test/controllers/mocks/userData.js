'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var userData = {
  admin: {
    username: 'jaachimma onyenze',
    password: process.env.ApiKey
  },
  attendant: {
    username: process.env.AttendantUsername,
    password: process.env.AttendantKey
  },
  newAttendant: {
    username: 'Onyenze',
    password: 'attendant0001',
    email: 'addattendant@gmail.com',
    productSold: '0',
    noOfSales: 0,
    worthOfSales: 0
  },
  emptyFields: {
    username: '',
    password: ''
  },
  unknownUser: {
    username: 'winterbutter',
    password: 'adasd8ada'
  },
  attendantLogin: {}
};

exports.default = userData;
//# sourceMappingURL=userData.js.map