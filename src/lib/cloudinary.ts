// Utility function to generate optimized image URLs (client-safe)
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
