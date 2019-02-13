"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _migration = _interopRequireDefault(require("../models/migration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProductController =
/*#__PURE__*/
function () {
  function ProductController() {
    _classCallCheck(this, ProductController);
  }

  _createClass(ProductController, null, [{
    key: "getAllProducts",
    value: function getAllProducts(req, res) {
      var query = {
        text: 'SELECT * FROM products',
        values: []
      };

      _migration.default.query(query).then(function (all) {
        var allProducts = all.rows;
        res.status(200).json({
          allProducts: allProducts
        });
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }
  }, {
    key: "getAvailableProducts",
    value: function getAvailableProducts(req, res) {
      var query = {
        text: 'SELECT * FROM products where quantityLeft > 0'
      };

      _migration.default.query(query).then(function (available) {
        var availableProducts = available.rows;
        res.status(200).json({
          availableProducts: availableProducts
        });
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }
  }, {
    key: "getFinishedProducts",
    value: function getFinishedProducts(req, res) {
      var query = {
        text: 'SELECT * FROM products where quantityLeft < 1'
      };

      _migration.default.query(query).then(function (finished) {
        var finishedProducts = finished.rows;
        res.status(200).json({
          finishedProducts: finishedProducts
        });
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }
  }, {
    key: "getSpecificProduct",
    value: function getSpecificProduct(req, res) {
      var productId = req.params.productId;
      var query = {
        text: 'SELECT * FROM products WHERE id = $1;',
        values: [productId]
      };

      _migration.default.query(query).then(function (requestedProduct) {
        var product = requestedProduct.rows[0];
        return product;
      }).then(function (product) {
        var id = product.id;

        if (typeof id === 'number') {
          return res.status(200).json({
            product: product
          });
        }
      }).catch(function () {
        res.status(404).json({
          message: 'sorry, product does not exist'
        });
      });
    }
  }, {
    key: "addProduct",
    value: function addProduct(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          category = _req$body.category,
          quantityLeft = _req$body.quantityLeft,
          quantitySold = _req$body.quantitySold,
          price = _req$body.price,
          minQuantity = _req$body.minQuantity;
      var query = {
        text: 'INSERT INTO products(name, category, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [name, category, quantityLeft, quantitySold, price, minQuantity]
      };

      _migration.default.query(query).then(function (product) {
        var newProduct = product.rows[0];
        return res.status(201).json({
          newProduct: newProduct
        });
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }
  }, {
    key: "updateProduct",
    value: function updateProduct(req, res) {
      var _req$body2 = req.body,
          name = _req$body2.name,
          category = _req$body2.category,
          quantityLeft = _req$body2.quantityLeft,
          price = _req$body2.price,
          minQuantity = _req$body2.minQuantity;
      var productId = req.params.productId;
      var query = {
        text: 'UPDATE products SET name = $1, category =$2, quantityLeft = $3, price = $4, minQuantity = $5 WHERE id = $6;',
        values: [name, category, quantityLeft, price, minQuantity, productId]
      };

      _migration.default.query(query).then(function (product) {
        var updatedProduct = product;
        return res.status(200).json({
          updatedProduct: updatedProduct
        });
      }).catch(function (err) {
        res.status(500).json(err);
      });
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(req, res) {
      var productId = req.params.productId;
      var name = req.body.name;
      var query = {
        text: 'DELETE FROM products WHERE id = $1 AND name = $2;',
        values: [productId, name]
      };

      _migration.default.query(query).then(function (product) {
        var deletedProduct = product;
        return res.status(200).json({
          deletedProduct: deletedProduct
        });
      }).catch(function (err) {
        res.status(200).json(err);
      });
    }
  }]);

  return ProductController;
}();

var _default = ProductController;
exports.default = _default;
//# sourceMappingURL=productController.js.map