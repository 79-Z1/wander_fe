import React, {FC, ReactNode, useRef, useState} from 'react';
import classNames from 'classnames';

import {Button, Loading, Modal} from '@/core-ui';

import {ASPECT_RATIO_LIST} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import AspectRatioCropContainer from './flexible-image-container';
import UploadImage from './upload-image';

type PopupUploadImageProps = IComponentBaseProps & {
  open: boolean;
  pickAspectRatios: (keyof typeof ASPECT_RATIO_LIST)[];
  trigger?: ReactNode;
  loading?: boolean;
  onClose?: () => void;
  handleUpFile: (file: File) => void;
};

const PopupUploadImage: FC<PopupUploadImageProps> = ({
  className,
  loading,
  open,
  onClose,
  handleUpFile,
  pickAspectRatios,
  trigger
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageForPopup, setUploadedImageForPopup] = useState<string | null>(null);

  const [imageName, setImageName] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);

  const handleImageNameChange = (name: string | null) => {
    setImageName(name);
  };

  const handleImageTypeChange = (type: string | null) => {
    setImageType(type);
  };

  const handleUploadedImageChange = (imageUrl: string | null) => {
    setUploadedImageForPopup(imageUrl);
  };

  const closePopup = () => {
    setUploadedImageForPopup(null);
    onClose?.();
  };

  const handleDeleteImage = () => {
    setUploadedImageForPopup(null);
  };

  const renderTrigger = () => {
    if (typeof trigger === 'string') {
      return (
        <Button className="flex items-center" variant="outlined" onClick={() => fileInputRef.current?.click()}>
          {loading ? <Loading size={20} thickness={2} /> : trigger}
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
    <div className={classNames('popup-upload-image relative z-50', className)}>
      <Modal
        open={open}
        variant="center"
        showCloseButton={true}
        onClose={closePopup}
        className={classNames('UploadPopup', 'flex h-full items-center justify-center ', className)}
        contentClassName="w-full h-[70%] xl:w-[960px] md:h-[680px] h-full text-sm font-bold bg-zinc-50 p-2"
      >
        <Modal.Header className="pt-3 text-center text-xl font-bold ">
          <p className="quizne-hidden md:!block">Thêm ảnh</p>
        </Modal.Header>
        <div className="quizne-hidden text-center text-base font-normal md:!block">
          Sử dụng crt + V để thêm nhanh hình ảnh
        </div>
        <Modal.Body className="h-full rounded-lg bg-background py-4 text-center">
          {uploadedImageForPopup ? (
            <AspectRatioCropContainer
              pickAspectRatios={pickAspectRatios}
              onDeleteImage={handleDeleteImage}
              onSaveFile={handleUpFile}
              onClose={closePopup}
              uploadedImage={uploadedImageForPopup}
              imageName={imageName}
              imageType={imageType}
            />
          ) : (
            <UploadImage
              onImageNameChange={handleImageNameChange}
              onImageTypeChange={handleImageTypeChange}
              onChangeImage={handleUploadedImageChange}
              className="mb-4 grow"
            />
          )}
        </Modal.Body>
      </Modal>
      {renderTrigger()}
    </div>
  );
};

export default PopupUploadImage;
