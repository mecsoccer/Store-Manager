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
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
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
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
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
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
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

      _migration.default.query(query).then(function (productArray) {
        var product = productArray.rows[0];

        if (product) {
          res.status(200).json({
            product: product
          });
        } else {
          res.status(404).json({
            error: "product with id of '".concat(productId, "' does not exist")
          });
        }
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: "addProduct",
    value: function addProduct(req, res) {
      var _req$body = req.body,
          productName = _req$body.productName,
          productCategory = _req$body.productCategory,
          quantityLeft = _req$body.quantityLeft,
          quantitySold = _req$body.quantitySold,
          price = _req$body.price,
          minQuantity = _req$body.minQuantity;
      var query = {
        text: 'INSERT INTO products(productName, productCategory, quantityLeft, quantitySold, price, minQuantity) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        values: [productName, productCategory, quantityLeft, quantitySold, price, minQuantity]
      }; // check if product name already exists. product name should be unique

      _migration.default.query('SELECT * FROM products WHERE productName=$1;', [productName]).then(function (data) {
        if (!data.rows[0]) {
          _migration.default.query(query).then(function (productArray) {
            var newProduct = productArray.rows[0];
            res.status(201).json({
              newProduct: newProduct
            });
          }).catch(function (err) {
            /* istanbul ignore next */
            res.status(500).json(err);
          });
        } else {
          res.status(409).json({
            error: 'product name alread exists. choose another name'
          });
        }
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: "updateProductDetails",
    value: function updateProductDetails(req, res) {
      var _req$body2 = req.body,
          productName = _req$body2.productName,
          productCategory = _req$body2.productCategory,
          quantityLeft = _req$body2.quantityLeft,
          price = _req$body2.price,
          minQuantity = _req$body2.minQuantity;
      var productId = req.params.productId;
      var query = {
        text: 'UPDATE products SET productName = $1, productCategory =$2, quantityLeft = $3, price = $4, minQuantity = $5 WHERE id = $6 RETURNING *;',
        values: [productName, productCategory, quantityLeft, price, minQuantity, productId]
      }; // check if product name already exists. product name should be unique

      _migration.default.query('SELECT * FROM products WHERE productName=$1;', [productName]).then(function (data) {
        if (!data.rows[0]) {
          _migration.default.query(query).then(function (productArray) {
            var updatedProduct = productArray.rows[0];

            if (updatedProduct) {
              res.status(200).json({
                updatedProduct: updatedProduct
              });
            } else {
              res.status(404).json({
                error: 'product with supplied id does not exist'
              });
            }
          }).catch(
          /* istanbul ignore next */
          function (err) {
            return res.status(500).json(err);
          });
        } else {
          res.status(409).json({
            error: 'product name alread exists. choose another name'
          });
        }
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: "updateQuantitySold",
    value: function updateQuantitySold(req, res) {
      var quantitySold = req.body.quantitySold;
      var productId = req.params.productId;

      _migration.default.query('SELECT quantityLeft, quantitySold FROM products WHERE id = $1;', [productId]).then(function (data) {
        if (data.rowCount) {
          var _data$rows$ = data.rows[0],
              quantityleft = _data$rows$.quantityleft,
              dbQuantitySold = _data$rows$.quantitysold;
          var newQuantityLeft = Number(quantityleft) - Number(quantitySold);

          if (newQuantityLeft >= 0) {
            var newQuantitySold = Number(quantitySold) + Number(dbQuantitySold);
            var queryText = 'UPDATE products SET quantityLeft=$1, quantitySold=$2 WHERE id=$3 RETURNING *;';
            var queryValues = [newQuantityLeft, newQuantitySold, productId];

            _migration.default.query(queryText, queryValues).then(function (productArray) {
              var updatedProduct = productArray.rows[0];

              if (updatedProduct) {
                res.status(200).json({
                  updatedProduct: updatedProduct
                });
              } else {
                res.status(404).json({
                  error: 'product id supplied does not exist'
                });
              }
            }).catch(
            /* istanbul ignore next */
            function (err) {
              return res.status(500).json(err);
            });
          } else {
            res.status(422).json({
              error: 'quantity sold surpasses available quantity'
            });
          }
        } else {
          res.status(404).json({
            error: 'product id supplied does not exist'
          });
        }
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
      });
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(req, res) {
      var productId = req.params.productId;

      _migration.default.query('DELETE FROM products WHERE id = $1 RETURNING *;', [productId]).then(function (productArray) {
        var deletedProduct = productArray.rows[0];

        if (deletedProduct) {
          res.status(200).json({
            deletedProduct: deletedProduct
          });
        } else {
          res.status(404).json({
            error: 'product with supplied id does not exist'
          });
        }
      }).catch(
      /* istanbul ignore next */
      function (err) {
        return res.status(500).json(err);
      });
    }
  }]);

  return ProductController;
}();

var _default = ProductController;
exports.default = _default;
//# sourceMappingURL=productController.js.map