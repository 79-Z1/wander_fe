import React, {FC} from 'react';
import Image from 'next/image';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import loginDecor from '@/assets/images/login.png';

export type TDecorImageProps = IComponentBaseProps;

const DecorImage: FC<TDecorImageProps> = ({className}) => {
  return (
    <div className={cn('min-h-dvh', className)} data-testid="DecorImage">
      <Image
        src={loginDecor}
        alt="A bow in the sea"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

DecorImage.displayName = 'DecorImage';

export default DecorImage;
