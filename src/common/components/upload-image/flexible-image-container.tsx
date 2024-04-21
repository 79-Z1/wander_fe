import React, {FC, useState} from 'react';
import classNames from 'classnames';

import {Button, Loading} from '@/core-ui';

import {ASPECT_RATIO_LIST, MAX_FILE_IMAGE_SIZE, QUALITY} from '@/common/constants';

import {IComponentBaseProps, ICropImage} from '@/common/interfaces';

import Line from '../line';

import AspectRatioSelector from './aspect-ratio-selector';
import CropImage from './crop-image';

export type TAspectRatioCropContainerProps = IComponentBaseProps & {
  uploadedImage: string;
  onDeleteImage: () => void;
  pickAspectRatios: (keyof typeof ASPECT_RATIO_LIST)[];
  imageName: string | null;
  imageType: string | null;
  onSaveFile: (file: File | FileList | null | undefined) => void;
  onClose: () => void;
};

const AspectRatioCropContainer: FC<TAspectRatioCropContainerProps> = ({
  className,
  pickAspectRatios,
  uploadedImage,
  onDeleteImage,
  imageName,
  onSaveFile,
  onClose
}) => {
  const defaultRatioValue = ASPECT_RATIO_LIST[pickAspectRatios[0]].ratio;

  const [ratio, setRatio] = useState<number>(defaultRatioValue);
  const [croppedArea, setCroppedArea] = useState<ICropImage>();
  const [isLoading, setIsLoading] = useState(false);
  const onChangeRatio = (rate: number) => {
    setRatio(rate);
  };

  const handleCancel = () => {
    onClose?.();
  };

  const handleCroppedAreaChange = (croppedArea: ICropImage) => {
    setCroppedArea(croppedArea);
  };

  const handleUploadImage = (compressedImageFile: File) => {
    onSaveFile(compressedImageFile);
    setIsLoading(false);
  };

  const handleSave = () => {
    setIsLoading(true);
    if (uploadedImage && croppedArea) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.src = uploadedImage;
      image.onload = () => {
        canvas.width = croppedArea.width;
        canvas.height = croppedArea.height;

        if (ctx !== null)
          ctx.drawImage(
            image,
            croppedArea.x,
            croppedArea.y,
            croppedArea.width,
            croppedArea.height,
            0,
            0,
            croppedArea.width,
            croppedArea.height
          );
        const compressAndSave = (quality: number) => {
          canvas.toBlob(blob => {
            if (blob) {
              const fileName = imageName || 'unknown.jpg';
              const fileType = 'image/jpeg';
              const fileOptions = {type: fileType, lastModified: Date.now()};
              canvas.toBlob(
                newBlob => {
                  if (newBlob) {
                    const compressedImageFile = new File([newBlob], fileName, fileOptions);
                    if (compressedImageFile.size / 1024 < MAX_FILE_IMAGE_SIZE) {
                      handleUploadImage(compressedImageFile);
                      onClose();
                    } else {
                      if (quality < QUALITY.MIN) {
                        handleUploadImage(compressedImageFile);
                      } else compressAndSave(quality - QUALITY.DECREMENT);
                    }
                  }
                },
                fileType,
                quality
              );
            }
          });
        };
        compressAndSave(QUALITY.DEFAULT);
      };
    }
  };

  return (
    <div
      className={classNames('AspectRatioCropContainer', 'flex h-full flex-col', className)}
      style={{position: 'relative'}}
    >
      <div className="relative flex h-[80%] w-full flex-1 cursor-pointer flex-col gap-1 rounded-lg bg-gray-100 p-2">
        <AspectRatioSelector
          onChangeRatio={onChangeRatio}
          pickAspectRatios={pickAspectRatios}
          defaultRatioValue={defaultRatioValue}
        />
        <CropImage
          uploadedImageForPopup={uploadedImage}
          ratio={ratio}
          onCroppedAreaChange={handleCroppedAreaChange}
          className="relative flex flex-1"
          onDeleteImage={onDeleteImage}
        />
      </div>
      <Line className="mt-2 w-full border-gray-50" />
      <div className="grid grid-cols-2 gap-2 pt-4 text-base ">
        <Button onClick={handleCancel} className="h-12 w-full bg-white font-bold text-violet-600">
          Hủy
        </Button>
        <Button onClick={handleSave} className=" h-12 w-full bg-violet-700 font-bold">
          Lưu
        </Button>
      </div>
      {isLoading && (
        <div className="absolute left-[54%] top-[40%] z-10 -translate-x-1/2 -translate-y-1/2 transform">
          <Loading />
        </div>
      )}
    </div>
  );
};

AspectRatioCropContainer.displayName = 'AspectRatioCropContainer';

export default AspectRatioCropContainer;
