'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_database2.default.query('CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY NOT NULL, username TEXT NOT NULL,\n    password TEXT NOT NULL,email VARCHAR(50) NOT NULL,productSold INT NOT NULL,noOfSales INT NOT NULL,\n    worthOfSales INT NOT NULL)');
_database2.default.query('CREATE TABLE IF NOT EXISTS Products(id SERIAL PRIMARY KEY NOT NULL,\n    name TEXT NOT NULL,category TEXT NOT NULL, quantityLeft INT NOT NULL, quantitySold INT NOT NULL,\n    price NUMERIC(20,2),minQuantity INT NOT NULL)');
_database2.default.query('CREATE TABLE IF NOT EXISTS Sales(id SERIAL PRIMARY KEY NOT NULL,\n    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,seller TEXT NOT NULL, productName TEXT NOT NULL,\n    quantity INT NOT NULL,price NUMERIC(20,2), total NUMERIC(20,2))');

exports.default = _database2.default;
//# sourceMappingURL=migration.js.map