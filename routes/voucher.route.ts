import express from 'express';
import controller from '../controllers/voucher.controllers';

const router = express.Router();

router.post('/create', controller.createVoucher);
router.get('/getAll', controller.getAllVouchers);
router.get('/:code', controller.getVoucherByCode);
router.put('/:id', controller.updateVoucher);
router.delete('/:id', controller.deleteVoucher);
router.post('/:code/validate', controller.validateVoucher);

export default router; 