import React, {FC} from 'react';
import {Player} from '@lottiefiles/react-lottie-player';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import ModelPlaneLoading from '@/assets/plane-loading.json';

export type TGlobalLoadingProps = IComponentBaseProps;

const GlobalLoading: FC<TGlobalLoadingProps> = ({className}) => {
  return (
    <div
      className={cn(
        'GlobalLoading',
        'absolute z-50 flex h-full w-full items-center justify-center bg-primary-500',
        className
      )}
      data-testid="GlobalLoading"
    >
      <Player
        autoplay
        loop
        src={ModelPlaneLoading}
        className="flex md:h-[90%] md:w-[90%] md:items-center md:justify-center xl:left-0 xl:top-16 xl:flex xl:h-[73%] xl:w-[73%] xl:items-center xl:justify-center"
      />
    </div>
  );
};

GlobalLoading.displayName = 'GlobalLoading';

export default GlobalLoading;
