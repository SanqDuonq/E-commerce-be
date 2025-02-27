import { v2 as cloudinary } from "cloudinary";
import { IUpload } from "../interfaces/upload.interface";

class UploadServices implements IUpload {
	async uploadSingle(image: string) {
		const result = await cloudinary.uploader.upload(image, {
			folder: "products",
		});
		return result.secure_url;
	}
	async uploadMultiple(image: string[]): Promise<string[]> {
		const result = await Promise.all(
			image.map((img) =>
				cloudinary.uploader.upload(img, { folder: "products" })
			)
		);
		return result.map((rs) => rs.secure_url);
	}
}

const uploadService = new UploadServices();
export default uploadService;
