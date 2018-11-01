'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pool = _pg2.default.Pool;


var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '06384579hf',
  port: 5432
});

exports.default = pool;
//# sourceMappingURL=database.js.map