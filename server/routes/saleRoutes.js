import express from 'express';
import saleController from '../controllers/saleController';
import verify from '../middlewares/auth/verify';
import validate from '../middlewares/validation/validateSales';

const { getAllSales, getSpecificSale, addSale } = saleController;

const {
  authVerify, verifyAdmin, verifyAttendant, verifyAdminOrSeller,
} = verify;

const { validateAddSale, validateSaleId } = validate;

const router = express.Router();

router.get('', authVerify, verifyAdmin, getAllSales);
router.get('/:saleId', authVerify, validateSaleId, verifyAdminOrSeller, getSpecificSale);
router.post('', authVerify, verifyAttendant, validateAddSale, addSale);

module.exports = router;
