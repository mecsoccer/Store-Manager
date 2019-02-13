"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:06384579hf@localhost:5432/postgres';
var ssl = false;
if (process.env.NODE_ENV === 'production') ssl = true;
var Pool = _pg.default.Pool;
var pool = new Pool({
  connectionString: connectionString,
  ssl: ssl
});
var _default = pool;
exports.default = _default;
//# sourceMappingURL=database.js.map