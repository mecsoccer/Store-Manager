"use strict";

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _validateUserData = _interopRequireDefault(require("../middlewares/validation/validateUserData"));

var _verify = _interopRequireDefault(require("../middlewares/auth/verify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addUser = _userController.default.addUser,
    login = _userController.default.login,
    getAllUsers = _userController.default.getAllUsers,
    getUser = _userController.default.getUser,
    updateUserData = _userController.default.updateUserData,
    deleteUser = _userController.default.deleteUser,
    giveAdminRight = _userController.default.giveAdminRight;
var authVerify = _verify.default.authVerify,
    verifyAdmin = _verify.default.verifyAdmin;
var validateLogin = _validateUserData.default.validateLogin,
    validateSignup = _validateUserData.default.validateSignup;

var router = _express.default.Router();

router.post('/signup', authVerify, verifyAdmin, validateSignup, addUser);
router.post('/login', validateLogin, login);
router.get('', authVerify, verifyAdmin, getAllUsers);
router.get('/:userId', authVerify, verifyAdmin, getUser);
router.put('/:userId', authVerify, verifyAdmin, validateSignup, updateUserData);
router.put('/authorization/:userId', authVerify, verifyAdmin, giveAdminRight);
router.delete('/:userId', authVerify, deleteUser);
module.exports = router;
//# sourceMappingURL=userRoutes.js.map