"use strict";

var _express = _interopRequireDefault(require("express"));

var _verify = _interopRequireDefault(require("../middlewares/auth/verify"));

var _productController = _interopRequireDefault(require("../controllers/productController"));

var _validateProduct = _interopRequireDefault(require("../middlewares/validation/validateProduct"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllProducts = _productController.default.getAllProducts,
    getAvailableProducts = _productController.default.getAvailableProducts,
    getFinishedProducts = _productController.default.getFinishedProducts,
    getSpecificProduct = _productController.default.getSpecificProduct,
    addProduct = _productController.default.addProduct,
    updateProductDetails = _productController.default.updateProductDetails,
    updateQuantitySold = _productController.default.updateQuantitySold,
    deleteProduct = _productController.default.deleteProduct;
var authVerify = _verify.default.authVerify,
    verifyAdmin = _verify.default.verifyAdmin,
    verifyAttendant = _verify.default.verifyAttendant;

var router = _express.default.Router();

var validateAddProduct = _validateProduct.default.validateAddProduct,
    validateUpdateDetails = _validateProduct.default.validateUpdateDetails,
    validateProductSold = _validateProduct.default.validateProductSold,
    validateProductId = _validateProduct.default.validateProductId;
router.get('', authVerify, getAllProducts);
router.get('/available', authVerify, getAvailableProducts);
router.get('/finished', authVerify, getFinishedProducts);
router.get('/:productId', authVerify, validateProductId, getSpecificProduct);
router.post('', authVerify, verifyAdmin, validateAddProduct, addProduct);
router.put('/details/:productId', authVerify, verifyAdmin, validateUpdateDetails, updateProductDetails);
router.put('/quantity-sold/:productId', authVerify, verifyAttendant, validateProductSold, updateQuantitySold);
router.delete('/:productId', authVerify, verifyAdmin, validateProductId, deleteProduct);
module.exports = router;
//# sourceMappingURL=productRoutes.js.map