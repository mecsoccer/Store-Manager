"use strict";

var _express = _interopRequireDefault(require("express"));

var _saleController = _interopRequireDefault(require("../controllers/saleController"));

var _verify = _interopRequireDefault(require("../middlewares/auth/verify"));

var _validateSales = _interopRequireDefault(require("../middlewares/validation/validateSales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllSales = _saleController.default.getAllSales,
    getSpecificSale = _saleController.default.getSpecificSale,
    addSale = _saleController.default.addSale;
var authVerify = _verify.default.authVerify,
    verifyAdmin = _verify.default.verifyAdmin,
    verifyAttendant = _verify.default.verifyAttendant,
    verifyAdminOrSeller = _verify.default.verifyAdminOrSeller;
var validateAddSale = _validateSales.default.validateAddSale,
    validateSaleId = _validateSales.default.validateSaleId;

var router = _express.default.Router();

router.get('', authVerify, verifyAdmin, getAllSales);
router.get('/:saleId', authVerify, validateSaleId, verifyAdminOrSeller, getSpecificSale);
router.post('', authVerify, verifyAttendant, validateAddSale, addSale);
module.exports = router;
//# sourceMappingURL=saleRoutes.js.map