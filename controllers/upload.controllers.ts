import { Request, Response } from "express";
import uploadService from "../services/upload.services";
import catchError from "../utils/catch-error";
class UploadController {
	async uploadSingle(req: Request, res: Response) {
		try {
			if (!req.file) {
				res.status(400).json({
					message: "No file upload",
				});
				return;
			}
			const url = await uploadService.uploadSingle(req.file.path!);
			res.status(200).json({
				message: "Upload single successful!",
				data: url,
			});
		} catch (error) {
			catchError(res, error);
		}
	}
    async uploadMultiple(req: Request, res: Response) {
        try {
            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                res.status(400).json({ message: "No files uploaded" });
            return;
            }
            const url = await uploadService.uploadMultiple((req.files as Express.Multer.File[]).map((file) => file.path))
            res.status(200).json({
                message: 'Upload multiple successful!',
                data: url
            })
        } catch (error) {
            catchError(res,error);
        }
    }
}

const uploadController = new UploadController();
export default uploadController;
