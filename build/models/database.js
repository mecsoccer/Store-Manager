'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:06384579hf@localhost:5432/postgres';
var ssl = false;

if (process.env.NODE_ENV) ssl = true;

var Pool = _pg2.default.Pool;

var pool = new Pool({ connectionString: connectionString, ssl: ssl });

exports.default = pool;
//# sourceMappingURL=database.js.map