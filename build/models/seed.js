"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

function migrateUser(username, password, email, role) {
  var hash = _bcryptjs.default.hashSync(password, 10);

  var query = {
    text: 'INSERT INTO users(username, password, email, role) VALUES($1, $2, $3, $4);',
    values: [username, hash, email, role]
  };

  _database.default.query(query);
}

function migrateProduct(productName, productCategory, quantityLeft, quantitySold, price, minQuantity) {
  var query = {
    text: 'INSERT INTO products(productName, productCategory, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [productName, productCategory, quantityLeft, quantitySold, price, minQuantity]
  };

  _database.default.query(query);
}

function migrateSale(seller, productName, quantitySold, price, total) {
  var query = {
    text: 'INSERT INTO sales(seller, productName, quantity, price, total) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [seller, productName, quantitySold, price, total]
  };

  _database.default.query(query);
}

var migrateUserPromise = new Promise(function (resolve) {
  migrateUser('admin', 'admin123ABC#', 'ad@jmail.com', 'admin');
  resolve(true);
});
migrateUserPromise.then(function (res) {
  migrateUser('attendant', 'attendantA1#', 'atten@jmail.com', 'attendant');
  return res;
}).then(function () {
  migrateUser('anonimous', 'anonimousABC123#', 'anonimous@jmail.com', 'attendant');
});
migrateProduct('charger', 'electronics', 50, 1, '10.00', 1);
migrateProduct('chair', 'furniture', 50, 1, '10.00', 1);
migrateProduct('sugar', 'provisions', 0, 50, '10.00', 1);
migrateSale('anonimous', 'charger', 3, '10.00', '30.00');
migrateSale('anonimous', 'chair', 3, '10.00', '30.00');
migrateSale('anonimous', 'chair', 3, '10.00', '30.00');
//# sourceMappingURL=seed.js.map