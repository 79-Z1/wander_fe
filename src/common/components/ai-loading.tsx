import React, {FC} from 'react';
import {Player} from '@lottiefiles/react-lottie-player';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import AILoadingLotie from '@/assets/ai-loading.json';

export type TAILoadingProps = IComponentBaseProps;

const AILoading: FC<TAILoadingProps> = ({className}) => {
  return (
    <div
      className={cn('AILoading', 'mt-5 flex h-10 w-20 items-center justify-center', className)}
      data-testid="AILoading"
    >
      <Player
        autoplay
        loop
        src={AILoadingLotie}
        className="flex h-full w-full md:items-center md:justify-center xl:left-0 xl:top-16 xl:flex xl:items-center xl:justify-center"
      />
    </div>
  );
};

AILoading.displayName = 'AILoading';

export default AILoading;
