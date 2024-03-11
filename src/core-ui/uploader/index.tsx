'use client';

import React, {ChangeEvent, ReactNode, useRef} from 'react';
import classNames from 'classnames';

import {Button, Loading} from '@/core-ui';

import {ICoreUIBaseProps} from '../types';

interface IUploaderProps extends ICoreUIBaseProps {
  trigger?: ReactNode;
  loading?: boolean;
  multiple?: boolean;
  accept?: string;
  onChange: (file?: FileList | File | null) => void;
}

const Uploader: React.FC<IUploaderProps> = ({
  className,
  accept,
  loading = true,
  multiple = false,
  trigger = 'Upload',
  onChange,
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = multiple ? e.target.files : e.target.files?.[0];
    onChange(file);
  };

  const renderTrigger = () => {
    if (typeof trigger === 'string') {
      return (
        <Button className="flex items-center" variant="outlined" onClick={() => fileInputRef.current?.click()}>
          {loading && <Loading size={20} thickness={2} />}
          {trigger}
        </Button>
      );
    } else {
      return (
        <div
          className="relative flex h-full w-full items-center justify-center"
          onClick={() => fileInputRef.current?.click()}
        >
          {loading ? <Loading size={20} thickness={2} /> : trigger}
        </div>
      );
    }
  };

  return (
    <div className={classNames('abc-uploader', className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        style={{display: 'none'}}
        multiple={multiple}
        accept={accept}
        {...rest}
      />
      {renderTrigger()}
    </div>
  );
};

Uploader.displayName = 'ABCUploader';

export default Uploader;
