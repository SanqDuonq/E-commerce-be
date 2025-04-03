import { Request, Response } from 'express';
import { shippingService, ShippingMethod } from '../services/shipping/shipping.service';
import { success, error } from '../utils/response';
import { catchAsync } from '../utils/catchAsync';

class ShippingController {
    getAllShippingMethods = catchAsync(async (req: Request, res: Response) => {
        const methods = shippingService.getAllShippingMethods();
        success(res, 200, 'Get all shipping methods successful', methods);
    });

    calculateShippingFee = catchAsync(async (req: Request, res: Response) => {
        const { method, weight, distance } = req.body;

        if (!method || !weight || !distance) {
            return error(res, 400, 'Missing required parameters');
        }

        shippingService.setShippingMethod(method as ShippingMethod);
        const fee = shippingService.calculateShippingFee(weight, distance);
        const methodName = shippingService.getShippingMethodName();
        const estimatedDays = shippingService.getEstimatedDays();

        return success(res, 200, 'Calculate shipping fee successful', {
            method: methodName,
            fee,
            estimatedDays
        });
    });
}

const shippingController = new ShippingController();
export default shippingController;