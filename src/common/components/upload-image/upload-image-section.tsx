import React, {FC, useState} from 'react';
import classNames from 'classnames';

import {Icon} from '@/core-ui';

import {ASPECT_RATIO_LIST} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import PopupUploadImage from './upload-image-popup';

export interface IUploadImageSectionProps extends IComponentBaseProps {
  handleUpFile: (file: File | FileList | null | undefined) => void;
  canUpload?: boolean;
}

const UploadImageSection: FC<IUploadImageSectionProps> = ({className, handleUpFile}) => {
  const [isShowPopupUploadImage, setShowPopupUploadImage] = useState<boolean>(false);

  const allAspectRatios: (keyof typeof ASPECT_RATIO_LIST)[] = Object.keys(
    ASPECT_RATIO_LIST
  ) as (keyof typeof ASPECT_RATIO_LIST)[];

  const openUploadImagePopup = () => {
    setShowPopupUploadImage(true);
  };

  const closeUploadImagePopup = () => {
    setShowPopupUploadImage(false);
  };

  return (
    <div
      className={classNames(
        'flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-400  p-2',
        className
      )}
      onClick={openUploadImagePopup}
    >
      <div className="flex h-full flex-col items-center justify-center gap-x-1">
        <Icon name="ico-image-upload" size={32} />
        <p>Ảnh</p>
      </div>

      <PopupUploadImage
        open={isShowPopupUploadImage}
        onClose={closeUploadImagePopup}
        handleUpFile={handleUpFile}
        pickAspectRatios={allAspectRatios}
      />
    </div>
  );
};

export default UploadImageSection;
