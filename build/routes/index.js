'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _salesController = require('../controllers/salesController');

var _salesController2 = _interopRequireDefault(_salesController);

var _verify = require('../middlewares/verify');

var _verify2 = _interopRequireDefault(_verify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/products', _productController2.default.getAll);
router.get('/products/:productId', _productController2.default.getProduct);
router.post('/products', _verify2.default.admin, _productController2.default.addProduct);

router.get('/sales', _verify2.default.admin, _salesController2.default.getAll);
router.get('/sales/:saleId', _verify2.default.adminOrAttendant, _salesController2.default.getSale);
router.post('/sales', _verify2.default.attendant, _salesController2.default.addSale);

module.exports = router;
//# sourceMappingURL=index.js.map