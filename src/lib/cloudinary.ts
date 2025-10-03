// @ts-ignore
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// Utility function to generate optimized image URLs
export const getOptimizedImageUrl = (url: string, options: {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale';
} = {}): string => {
  if (!url) return url;

  // Handle Cloudinary URLs with optimization
  if (url.includes('cloudinary.com')) {
    const {
      width,
      height,
      quality = 'auto',
      format = 'auto',
      crop = 'fill'
    } = options;

    // Parse the Cloudinary URL
    const urlParts = url.split('/upload/');
    if (urlParts.length !== 2) return url;

    const baseUrl = urlParts[0] + '/upload/';
    const publicId = urlParts[1];

    // Build transformation parameters
    const transformations = [];
    
    if (width || height) {
      const sizeParam = [];
      if (width) sizeParam.push(`w_${width}`);
      if (height) sizeParam.push(`h_${height}`);
      sizeParam.push(`c_${crop}`);
      transformations.push(sizeParam.join(','));
    }
    
    if (quality !== 'auto') {
      transformations.push(`q_${quality}`);
    } else {
      transformations.push('q_auto:best');
    }
    
    if (format !== 'auto') {
      transformations.push(`f_${format}`);
    } else {
      transformations.push('f_auto');
    }

    // Add optimization flags
    transformations.push('fl_progressive'); // Progressive JPEG
    transformations.push('fl_immutable_cache'); // Cache optimization

    const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';
    
    return `${baseUrl}${transformationString}${publicId}`;
  }

  // For non-Cloudinary URLs, return as-is (Next.js will handle optimization)
  // This includes Reddit, Imgur, and other external image sources
  return url;
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with optimization parameters
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'thriftx-blog',
          // Image optimization settings
          quality: 'auto:best', // Auto quality with best compression
          fetch_format: 'auto', // Auto format (WebP, AVIF when supported)
          transformation: [
            // Generate multiple sizes for responsive images
            { width: 800, height: 600, crop: 'fill', quality: 'auto:best' },
            { width: 1200, height: 800, crop: 'fill', quality: 'auto:best' },
            { width: 1600, height: 1000, crop: 'fill', quality: 'auto:best' },
            { width: 2000, height: 1200, crop: 'fill', quality: 'auto:best' }
          ],
          // Enable responsive breakpoints
          responsive_breakpoints: [
            {
              create_derived: true,
              bytes_step: 20000,
              min_width: 200,
              max_width: 2000,
              max_images: 10
            }
          ]
        },
        (error: any, result: any) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Upload failed'));
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};
