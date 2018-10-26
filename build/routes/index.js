'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _salesController = require('../controllers/salesController');

var _salesController2 = _interopRequireDefault(_salesController);

var _verify = require('../middlewares/verify/verify');

var _verify2 = _interopRequireDefault(_verify);

var _validateProduct = require('../middlewares/validate/validateProduct');

var _validateProduct2 = _interopRequireDefault(_validateProduct);

var _validateSales = require('../middlewares/validate/validateSales');

var _validateSales2 = _interopRequireDefault(_validateSales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllProducts = _productController2.default.getAllProducts,
    getSpecificProduct = _productController2.default.getSpecificProduct,
    addProduct = _productController2.default.addProduct;
var getAllSales = _salesController2.default.getAllSales,
    getSpecificSale = _salesController2.default.getSpecificSale,
    addSale = _salesController2.default.addSale;
var verifyAdmin = _verify2.default.verifyAdmin,
    verifyAttendant = _verify2.default.verifyAttendant,
    verifyAdminOrAttendant = _verify2.default.verifyAdminOrAttendant;


var router = _express2.default.Router();

router.get('/products', getAllProducts);
router.get('/products/:productId', getSpecificProduct);
router.post('/products', verifyAdmin, _validateProduct2.default, addProduct);

router.get('/sales', verifyAdmin, getAllSales);
router.get('/sales/:saleId', verifyAdminOrAttendant, getSpecificSale);
router.post('/sales', verifyAttendant, _validateSales2.default, addSale);

module.exports = router;
//# sourceMappingURL=index.js.map