"use strict";

var _express = _interopRequireDefault(require("express"));

var _productController = _interopRequireDefault(require("../controllers/productController"));

var _salesController = _interopRequireDefault(require("../controllers/salesController"));

var _verify = _interopRequireDefault(require("../middlewares/verify/verify"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _validateSales = _interopRequireDefault(require("../middlewares/validate/validateSales"));

var _validateLogin = _interopRequireDefault(require("../middlewares/validate/validateLogin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import validateSignup from '../middlewares/validate/validateSignup';
// import validateProduct from '../middlewares/validate/validateProduct';
var getAllProducts = _productController.default.getAllProducts,
    getAvailableProducts = _productController.default.getAvailableProducts,
    getFinishedProducts = _productController.default.getFinishedProducts,
    getSpecificProduct = _productController.default.getSpecificProduct,
    addProduct = _productController.default.addProduct,
    updateProduct = _productController.default.updateProduct,
    deleteProduct = _productController.default.deleteProduct;
var getAllSales = _salesController.default.getAllSales,
    getSpecificSale = _salesController.default.getSpecificSale,
    addSale = _salesController.default.addSale;
var addUser = _userController.default.addUser,
    login = _userController.default.login,
    getAllUsers = _userController.default.getAllUsers,
    getUser = _userController.default.getUser,
    updateUser = _userController.default.updateUser,
    deleteUser = _userController.default.deleteUser,
    giveAdminRight = _userController.default.giveAdminRight;
var verifyAdmin = _verify.default.verifyAdmin,
    verifyAttendant = _verify.default.verifyAttendant,
    authVerify = _verify.default.authVerify;

var router = _express.default.Router();

router.post('/auth/signup', authVerify, verifyAdmin, addUser);
router.post('/auth/login', _validateLogin.default, login);
router.get('/users', authVerify, verifyAdmin, getAllUsers);
router.get('/users/:userId', authVerify, verifyAdmin, getUser);
router.put('/users/:userId', authVerify, updateUser);
router.put('/users/authorization/:userId', authVerify, verifyAdmin, giveAdminRight);
router.delete('/users/:userId', authVerify, deleteUser);
router.get('/products', authVerify, getAllProducts);
router.get('/products/available', authVerify, getAvailableProducts);
router.get('/products/finished', authVerify, getFinishedProducts);
router.get('/products/:productId', authVerify, getSpecificProduct);
router.post('/products', authVerify, verifyAdmin, addProduct);
router.put('/products/:productId', authVerify, updateProduct);
router.delete('/products/:productId', authVerify, verifyAdmin, deleteProduct);
router.get('/sales', authVerify, verifyAdmin, getAllSales);
router.get('/sales/:saleId', authVerify, getSpecificSale);
router.post('/sales', authVerify, verifyAttendant, _validateSales.default, addSale);
module.exports = router;
//# sourceMappingURL=index.js.map