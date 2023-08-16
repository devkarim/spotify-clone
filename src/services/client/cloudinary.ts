import axios from 'axios';

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_PRESET_NAME,
} from '@/config/constants';
import Errors from '@/config/errors';
import { validateFile } from '@/lib/utils';

export type ResourceType = 'image' | 'raw' | 'video' | 'auto';

const client = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  // timeout: 10000,
});

const upload = async (
  file: File,
  resource_type: ResourceType = 'auto'
): Promise<string> => {
  if (!validateFile(file, resource_type)) throw Errors.invalidFile;
  const formData = new FormData();
  formData.append('upload_preset', CLOUDINARY_PRESET_NAME);
  formData.append('resource_type', resource_type);
  formData.append('file', file);
  if (resource_type === 'video') return uploadVideo(formData);
  return uploadImage(formData);
};

const uploadImage = (formData: FormData) =>
  client.post('/image/upload', formData).then((res) => res.data.secure_url);

const uploadVideo = (formData: FormData) =>
  client.post(`/video/upload`, formData).then((res) => res.data.secure_url);

export default upload;
