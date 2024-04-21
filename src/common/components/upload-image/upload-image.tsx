import React, {FC} from 'react';
import classNames from 'classnames';

import {Icon, Uploader} from '@/core-ui';

import {IComponentBaseProps} from '@/common/interfaces';

type UploadImageProps = IComponentBaseProps & {
  onImageNameChange: (imageName: string | null) => void;
  onImageTypeChange: (imageType: string | null) => void;
  onChangeImage: (uploadedImageForPopup: string | null) => void;
};

const UploadImage: FC<UploadImageProps> = ({className, onImageNameChange, onImageTypeChange, onChangeImage}) => {
  const handleUploaderChange = (file: File | FileList | null | undefined) => {
    if (file instanceof FileList && file.length > 0) {
      const imageUrl = URL.createObjectURL(file[0]);
      onChangeImage(imageUrl);
    } else if (file instanceof File) {
      const imageUrl = URL.createObjectURL(file);
      onChangeImage(imageUrl);
      onImageNameChange(file.name);
      onImageTypeChange(file.type);
    } else {
      onChangeImage(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleUploaderChange(droppedFile);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData?.items;
    const imageItem = Array.from(items || []).find(item => item.type.includes('image'));

    if (imageItem) {
      const blob = imageItem.getAsFile();
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        onChangeImage(imageUrl);
      }
    }
  };

  return (
    <div className={classNames('comp-name h-full', className)}>
      <div
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          e.preventDefault();
          handleDrop(e);
        }}
        onPaste={handlePaste}
        className="flex h-64 w-full flex-1 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-400 bg-gray-100 p-2 md:h-[95%]"
      >
        <div className="flex h-full w-full flex-col items-center gap-x-1 text-base md:h-36">
          <p className="quizne-hidden font-bold md:!block">Kéo thả ảnh</p>
          <p className="quizne-hidden pb-4 pt-4 font-normal md:!block">Kéo ảnh vào đây, hoặc</p>
          <Uploader
            className={classNames(' w-full flex-1 cursor-pointer rounded-lg bg-primary p-2 md:w-64', className)}
            loading={false}
            onChange={handleUploaderChange}
            accept="image/*"
            trigger={
              <div className="flex flex-col items-center gap-x-1 ">
                <div className="flex items-center">
                  <Icon name="ico-upload" className="quizne-hidden pr-2 font-normal text-white md:!block" size={20} />
                  <Icon name="ico-image-upload" className="block pr-2 font-normal md:hidden" size={24} />
                  <p className="quizne-hidden font-bold text-white md:!block">Tải ảnh lên</p>
                </div>
                <p className="block pt-3 text-xs font-normal md:hidden">chịu 2</p>
              </div>
            }
          />
          <p className="font-noring-emerald-50 quizne-hidden pt-2 text-sm md:!block">heheeheh</p>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
