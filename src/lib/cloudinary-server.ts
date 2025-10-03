import 'server-only';

// Defer requiring cloudinary (Node-only) to avoid bundling in client
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          folder: 'thriftx-blog',
          quality: 'auto:best',
          fetch_format: 'auto',
          transformation: [
            { width: 800, height: 600, crop: 'fill', quality: 'auto:best' },
            { width: 1200, height: 800, crop: 'fill', quality: 'auto:best' },
            { width: 1600, height: 1000, crop: 'fill', quality: 'auto:best' },
            { width: 2000, height: 1200, crop: 'fill', quality: 'auto:best' },
          ],
          responsive_breakpoints: [
            {
              create_derived: true,
              bytes_step: 20000,
              min_width: 200,
              max_width: 2000,
              max_images: 10,
            },
          ],
        },
        (error: any, result: any) => {
          if (error) return reject(error);
          if (!result?.secure_url) return reject(new Error('Upload failed'));
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}


