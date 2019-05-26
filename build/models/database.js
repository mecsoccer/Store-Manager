"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var connectionString;
var ssl = false;
connectionString = process.env.DATABASE_URI;
/* istanbul ignore if */

if (process.env.NODE_ENV === 'test') connectionString = 'postgres://jaachimma:password@localhost:5432/store_manager';
/* istanbul ignore if */

if (process.env.NODE_ENV === 'production') ssl = true;
var Pool = _pg.default.Pool;
var pool = new Pool({
  connectionString: connectionString,
  ssl: ssl
});
var _default = pool;
exports.default = _default;
//# sourceMappingURL=database.js.map