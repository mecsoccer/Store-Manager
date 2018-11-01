'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _salesController = require('../controllers/salesController');

var _salesController2 = _interopRequireDefault(_salesController);

var _verify = require('../middlewares/verify/verify');

var _verify2 = _interopRequireDefault(_verify);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import validateSignup from '../middlewares/validate/validateSignup';
// import validateProduct from '../middlewares/validate/validateProduct';
// import validateSales from '../middlewares/validate/validateProduct';

var getAllProducts = _productController2.default.getAllProducts,
    getSpecificProduct = _productController2.default.getSpecificProduct,
    addProduct = _productController2.default.addProduct,
    updateProduct = _productController2.default.updateProduct,
    deleteProduct = _productController2.default.deleteProduct;
var getAllSales = _salesController2.default.getAllSales,
    getSpecificSale = _salesController2.default.getSpecificSale,
    addSale = _salesController2.default.addSale;
var verifyAdmin = _verify2.default.verifyAdmin,
    verifyAttendant = _verify2.default.verifyAttendant,
    authVerify = _verify2.default.authVerify;
var addUser = _userController2.default.addUser,
    login = _userController2.default.login,
    getAllUsers = _userController2.default.getAllUsers,
    getUser = _userController2.default.getUser,
    updateUser = _userController2.default.updateUser,
    deleteUser = _userController2.default.deleteUser;


var router = _express2.default.Router();

router.post('/auth/signup', /* authVerify, verifyAdmin, */addUser);
router.post('/auth/login', login);
router.get('/users', authVerify, verifyAdmin, getAllUsers);
router.get('/users/:userId', authVerify, verifyAdmin, getUser);
router.put('/users/:userId', authVerify, updateUser);
router.delete('/users/:userId', authVerify, deleteUser);

router.get('/products', authVerify, getAllProducts);
router.get('/products/:productId', authVerify, getSpecificProduct);
router.post('/products', authVerify, verifyAdmin, addProduct);
router.put('/products/:productId', authVerify, verifyAdmin, updateProduct);
router.delete('/products/:productId', authVerify, verifyAdmin, deleteProduct);

router.get('/sales', authVerify, verifyAdmin, getAllSales);
router.get('/sales/:saleId', authVerify, getSpecificSale);
router.post('/sales', authVerify, verifyAttendant, addSale);

module.exports = router;
//# sourceMappingURL=index.js.map