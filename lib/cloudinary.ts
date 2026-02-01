import { v2 as cloudinary } from 'cloudinary';

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
    console.warn("⚠️ Cloudinary environment variables are missing. File uploads will fail.");
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

/**
 * Uploads a file to Cloudinary
 * @param file - The file object from FormData (File | Blob)
 * @param folder - Optional folder name in Cloudinary (default: 'navarmp-portfolio')
 */
export async function uploadToCloudinary(file: File, folder = 'navarmp-portfolio'): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto', // Auto-detect image/video/pdf
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                    return;
                }
                if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Upload result is undefined'));
                }
            }
        ).end(buffer);
    });
}

export default cloudinary;
