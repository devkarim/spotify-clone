import { ChangeEvent, useRef, useState } from 'react';

import upload, { ResourceType } from '@/services/client/cloudinary';

import Input, { InputProps } from './input';
import log from '@/lib/log';

interface FileInputProps extends InputProps {
  resourceType?: ResourceType;
  onFinishUpload?: (name: string, url: string) => void;
  onUpload?: (file: File) => void;
  onUploadError?: (err: unknown) => void;
  onDone?: () => void;
}

const FileInput: React.FC<FileInputProps> = ({
  resourceType,
  onFinishUpload,
  onUpload,
  onUploadError,
  onDone,
  disabled,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return onFinishUpload?.('', '');
    const file = e.target.files[0];
    onUpload?.(file);
    setLoading(true);
    try {
      const url = await upload(file, resourceType);
      onFinishUpload?.(file.name, url);
    } catch (err) {
      log.error(err, 'file-input');
      if (ref && ref.current) {
        ref.current.value = '';
      }
      onUploadError?.(err);
    } finally {
      setLoading(false);
      onDone?.();
    }
  };

  return (
    <Input
      ref={ref}
      type="file"
      file
      onChange={onChange}
      disabled={loading || disabled}
      {...props}
    />
  );
};

export default FileInput;
