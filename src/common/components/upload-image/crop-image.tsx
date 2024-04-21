import React, {FC, useState} from 'react';
import classNames from 'classnames';
import Cropper from 'react-easy-crop';

import {IComponentBaseProps, ICropImage} from '@/common/interfaces';

import IconDelete from './icon-delete';

type CropImageProps = IComponentBaseProps & {
  uploadedImageForPopup: string;
  showGrid?: boolean;
  ratio: number;
  onDeleteImage: () => void;
  onCroppedAreaChange: (croppedArea: ICropImage) => void;
};
const CropImage: FC<CropImageProps> = ({
  className,
  uploadedImageForPopup,
  showGrid = false,
  ratio,
  onDeleteImage,
  onCroppedAreaChange
}) => {
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea: ICropImage, croppedAreaPixels: ICropImage) => {
    croppedArea;
    onCroppedAreaChange(croppedAreaPixels);
  };

  return (
    <div className={classNames('crop-image', className)}>
      <Cropper
        image={uploadedImageForPopup}
        crop={crop}
        zoom={zoom}
        aspect={ratio}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        showGrid={showGrid}
        onCropComplete={onCropComplete}
        style={{
          containerStyle: {
            borderRadius: '8px',
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#F3F4F6'
          }
        }}
      />
      <div className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded bg-primary-500 bg-opacity-80">
        <IconDelete onClick={onDeleteImage} />
      </div>
    </div>
  );
};

export default CropImage;
