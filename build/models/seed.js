"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

function migrateUser(username, password, email, role) {
  var hash = _bcryptjs.default.hashSync(password, 10);

  var query = {
    text: 'INSERT INTO Users(username,password,email,role) VALUES($1, $2, $3, $4) RETURNING username,email,role',
    values: [username, hash, email, role]
  };

  _database.default.query(query);
}

function migrateProduct(name, category, quantityLeft, quantitySold, price, minQuantity) {
  var query = {
    text: 'INSERT INTO Products(name, category, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $5, $6) RETURNING *',
    values: [name, category, quantityLeft, quantitySold, price, minQuantity]
  };

  _database.default.query(query);
}

migrateUser('admin', 'admin', 'theadmin@jmail.com', 'admin');
migrateUser('attendant', 'attendant', 'theattendant@jmail.com', 'attendant');
migrateProduct('charger', 'electronics', 50, 1, '10.00', 1);
//# sourceMappingURL=seed.js.map