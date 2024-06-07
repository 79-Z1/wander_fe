import React, {FC} from 'react';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import Loading from '.';

export type TLoadingSectionProps = IComponentBaseProps;

const LoadingSection: FC<TLoadingSectionProps> = ({className}) => {
  return (
    <div
      className={cn('LoadingSection flex h-full w-full items-center justify-center p-2', className)}
      data-testid="LoadingSection"
    >
      <Loading />
    </div>
  );
};

LoadingSection.displayName = 'LoadingSection';

export default LoadingSection;
