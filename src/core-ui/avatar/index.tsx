'use client';

import React, {FC} from 'react';
import Image from 'next/image';

import {AvatarSizeType, ICoreUIBaseProps} from '../types';

interface IAvatarProps extends ICoreUIBaseProps {
  src: string;
  alt: string;
  size?: AvatarSizeType;
}

const Avatar: FC<IAvatarProps> = ({className, visible = true, src, alt, size = 48}) => {
  if (!visible) return null;

  return (
    <Image
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
      style={{width: size, height: size}}
    />
  );
};

export default Avatar;
