"use strict";

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_database.default.query('DROP TABLE IF EXISTS users;');

_database.default.query('DROP TABLE IF EXISTS products;');

_database.default.query('DROP TABLE IF EXISTS sales;');
//# sourceMappingURL=unmigrate.js.map