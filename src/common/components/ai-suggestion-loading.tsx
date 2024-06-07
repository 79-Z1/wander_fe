import React, {FC} from 'react';
import {Player} from '@lottiefiles/react-lottie-player';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import AISuggestionLoadingLotie from '@/assets/ai-suggestion-loading.json';

export type TAISuggestionLoadingProps = IComponentBaseProps;

const AISuggestionLoading: FC<TAISuggestionLoadingProps> = ({className}) => {
  return (
    <div
      className={cn('AISuggestionLoading', 'flex h-full w-full items-center justify-center', className)}
      data-testid="AISuggestionLoading"
    >
      <Player
        autoplay
        loop
        src={AISuggestionLoadingLotie}
        className="flex h-full w-full md:items-center md:justify-center xl:left-0 xl:top-16 xl:flex xl:items-center xl:justify-center"
      />
    </div>
  );
};

AISuggestionLoading.displayName = 'AISuggestionLoading';

export default AISuggestionLoading;
