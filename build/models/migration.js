"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_database.default.query("CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY NOT NULL, username TEXT NOT NULL UNIQUE,\n    password TEXT NOT NULL,email VARCHAR(50) NOT NULL UNIQUE,role TEXT NOT NULL)");

_database.default.query("CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY NOT NULL,\n    productName TEXT NOT NULL UNIQUE,productCategory TEXT NOT NULL, quantityLeft INT NOT NULL, quantitySold INT NOT NULL,\n    price NUMERIC(20,2),minQuantity INT NOT NULL)");

_database.default.query("CREATE TABLE IF NOT EXISTS sales(id SERIAL PRIMARY KEY NOT NULL,\n    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,seller TEXT NOT NULL, productName TEXT NOT NULL,\n    quantity INT NOT NULL,price NUMERIC(20,2), total NUMERIC(20,2))");

var _default = _database.default;
exports.default = _default;
//# sourceMappingURL=migration.js.map