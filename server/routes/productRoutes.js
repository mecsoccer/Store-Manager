import express from 'express';
import verify from '../middlewares/auth/verify';
import productController from '../controllers/productController';
import validateProduct from '../middlewares/validation/validateProduct';


const {
  getAllProducts,
  getAvailableProducts,
  getFinishedProducts,
  getSpecificProduct,
  addProduct,
  updateProductDetails,
  updateQuantitySold,
  deleteProduct,
} = productController;

const {
  authVerify, verifyAdmin, verifyAttendant,
} = verify;

const router = express.Router();

const {
  validateAddProduct, validateUpdateDetails, validateProductSold, validateProductId,
} = validateProduct;

router.get('', authVerify, getAllProducts);
router.get('/available', authVerify, getAvailableProducts);
router.get('/finished', authVerify, getFinishedProducts);
router.get('/:productId', authVerify, validateProductId, getSpecificProduct);
router.post('', authVerify, verifyAdmin, validateAddProduct, addProduct);
router.put('/details/:productId', authVerify, verifyAdmin, validateUpdateDetails, updateProductDetails);
router.put('/quantity-sold/:productId', authVerify, verifyAttendant, validateProductSold, updateQuantitySold);
router.delete('/:productId', authVerify, verifyAdmin, validateProductId, deleteProduct);


module.exports = router;
