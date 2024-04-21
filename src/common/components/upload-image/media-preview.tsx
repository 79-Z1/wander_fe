import React, {FC} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {IMediaAttribute} from '@/common/entities/media.entity';

import {IComponentBaseProps} from '@/common/interfaces';

export interface IMediaPreviewProps extends IComponentBaseProps {
  media?: IMediaAttribute | null;
  width?: number;
  height?: number;
}

const MediaPreview: FC<IMediaPreviewProps> = ({className, media, width, height}) => {
  if (!media) return null;

  const {url, alt, mime} = media;

  const mediaType = mime?.substring(0, mime.indexOf('/'));
  if (!mediaType) return null;

  const hasNotDimension = !width && !height;

  return (
    <div
      className={classNames(
        'media-preview',
        'relative flex aspect-[2/1] h-full w-full items-center justify-center ',
        className
      )}
      data-testid="media-preview"
    >
      {mediaType === 'image' && (
        <Image
          className="absolute h-full w-full bg-black object-fill shadow-sm"
          src={url}
          alt={alt}
          width={width}
          height={height}
          fill={hasNotDimension ? true : false}
        />
      )}
    </div>
  );
};

export default MediaPreview;
