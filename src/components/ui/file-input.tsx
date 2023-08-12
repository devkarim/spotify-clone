import { ChangeEvent, useState } from 'react';

import upload from '@/services/client/cloudinary';

import Input, { InputProps } from './input';

interface FileInputProps extends InputProps {
  onFinishUpload?: (name: string, url: string) => void;
  onUpload?: (file: File) => void;
  onUploadError?: (err: unknown) => void;
  onDone?: () => void;
}

const FileInput: React.FC<FileInputProps> = ({
  onFinishUpload,
  onUpload,
  onUploadError,
  onDone,
  disabled,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return onFinishUpload?.('', '');
    const file = e.target.files[0];
    onUpload?.(file);
    setLoading(true);
    try {
      const url = await upload(file);
      onFinishUpload?.(file.name, url);
    } catch (err) {
      onUploadError?.(err);
    } finally {
      setLoading(false);
      onDone?.();
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
