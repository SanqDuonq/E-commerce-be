import { v2 as cloudinary } from 'cloudinary';

class ImageServices {
    async uploadImage(filePath: string) {
        const result = await cloudinary.uploader.upload(filePath,{
            folder: 'products'
        })
        return result.secure_url;
    }
}

const imageServices = new ImageServices();
export default imageServices;