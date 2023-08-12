import axios from 'axios';

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_PRESET_NAME,
} from '@/config/constants';

const client = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000,
});

const upload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('upload_preset', CLOUDINARY_PRESET_NAME);
  formData.append('file', file);
  return client
    .post('/image/upload', formData)
    .then((res) => res.data.secure_url);
};

export default upload;
