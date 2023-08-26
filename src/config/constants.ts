export const APP_NAME = 'Spotify Clone';
export const APP_VERSION = '1.0.0';

export const AUTHOR_NAME = 'devkarim';
export const AUTHOR_EMAIL = 'devkarim@hotmail.com';

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const CLOUDINARY_CLOUD_NAME = 'dw7gfycle';
export const CLOUDINARY_PRESET_NAME = 'q9yax5dt';

export const APP_URL = isDevelopment
  ? 'http://localhost:3000'
  : 'https://spotify-clone.karimwael.com';
