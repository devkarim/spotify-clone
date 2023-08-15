'use client';

import { toast } from 'react-toastify';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import Response from '@/types/server';

import FileInput from './file-input';

interface ControlledFileInputProps<T extends FieldValues>
  extends React.ComponentProps<typeof FileInput> {
  controlProps: UseControllerProps<T>;
}
export const ControlledFileInput = <T extends FieldValues>({
  controlProps,
  ...props
}: ControlledFileInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>(controlProps);

  return (
    <FileInput
      onUploadError={(err) => toast.error(Response.parseError(err))}
      onFinishUpload={(_, url) => field.onChange(url)}
      error={error?.message}
      {...props}
    />
  );
};

export default ControlledFileInput;
