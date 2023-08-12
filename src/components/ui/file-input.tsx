import { ChangeEvent, useState } from 'react';

import upload from '@/services/client/cloudinary';

import Input, { InputProps } from './input';

interface FileInputProps extends InputProps {
  onURLChange?: (url: string) => void;
  onUpload?: (file: File) => void;
  onUploadError?: (err: unknown) => void;
  onFinishUpload?: () => void;
}

const FileInput: React.FC<FileInputProps> = ({
  onURLChange,
  onUpload,
  onUploadError,
  onFinishUpload,
  disabled,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return onURLChange?.('');
    const file = e.target.files[0];
    onUpload?.(file);
    setLoading(true);
    try {
      const url = await upload(file);
      onURLChange?.(url);
    } catch (err) {
      onUploadError?.(err);
    } finally {
      setLoading(false);
      onFinishUpload?.();
    }
  };

  return (
    <Input
      type="file"
      file
      onChange={onChange}
      disabled={loading || disabled}
      {...props}
    />
  );
};

export default FileInput;
