import { Request, Response } from 'express';
import { voucherService } from '../services/voucher/voucher.service';
import { success, error } from '../utils/response';
import { catchAsync } from '../utils/catchAsync';

class VoucherController {
    createVoucher = catchAsync(async (req: Request, res: Response) => {
        const voucher = await voucherService.createVoucher(req.body);
        return success(res, 201, 'Create voucher successful', voucher);
    });

    getAllVouchers = catchAsync(async (req: Request, res: Response) => {
        const vouchers = await voucherService.getAllVouchers();
        return success(res, 200, 'Get all vouchers successful', vouchers);
    });

    getVoucherByCode = catchAsync(async (req: Request, res: Response) => {
        const { code } = req.params;
        const voucher = await voucherService.getVoucherByCode(code);
        if (!voucher) {
            return error(res, 404, 'Voucher not found');
        }
        return success(res, 200, 'Get voucher successful', voucher);
    });

    updateVoucher = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const voucher = await voucherService.updateVoucher(id, req.body);
        if (!voucher) {
            return error(res, 404, 'Voucher not found');
        }
        return success(res, 200, 'Update voucher successful', voucher);
    });

    deleteVoucher = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await voucherService.deleteVoucher(id);
        if (!result) {
            return error(res, 404, 'Voucher not found');
        }
        return success(res, 200, 'Delete voucher successful');
    });

    validateVoucher = catchAsync(async (req: Request, res: Response) => {
        const { code } = req.params;
        const { orderValue, productIds } = req.body;

        const result = await voucherService.validateAndCalculateDiscount(
            code,
            orderValue,
            productIds
        );

        return success(res, result.isValid ? 200 : 400, result.message, {
            discount: result.discount
        });
    });
}

const voucherController = new VoucherController();
export default voucherController; 