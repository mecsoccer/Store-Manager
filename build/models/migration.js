"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_database.default.query("CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY NOT NULL, username TEXT NOT NULL UNIQUE,\n    password TEXT NOT NULL,email VARCHAR(50) NOT NULL,productSold INT NOT NULL,noOfSales INT NOT NULL,\n    worthOfSales INT NOT NULL,role ENUM('admin', 'attendant'))");

_database.default.query("CREATE TABLE IF NOT EXISTS Products(id SERIAL PRIMARY KEY NOT NULL,\n    name TEXT NOT NULL,category TEXT NOT NULL, quantityLeft INT NOT NULL, quantitySold INT NOT NULL,\n    price NUMERIC(20,2),minQuantity INT NOT NULL)");

_database.default.query("CREATE TABLE IF NOT EXISTS Sales(id SERIAL PRIMARY KEY NOT NULL,\n    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,seller TEXT NOT NULL, productName TEXT NOT NULL,\n    quantity INT NOT NULL,price NUMERIC(20,2), total NUMERIC(20,2))");

var _default = _database.default;
exports.default = _default;
//# sourceMappingURL=migration.js.map