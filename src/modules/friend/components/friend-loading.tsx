import React, {FC} from 'react';

import LoadingSection from '@/core-ui/loading/loading-section';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TFriendLoadingProps = IComponentBaseProps;

const FriendLoading: FC<TFriendLoadingProps> = ({className}) => {
  return (
    <div
      className={cn('friend-loading', 'flex h-full w-full items-center justify-center', className)}
      data-testid="FriendLoading"
    >
      <LoadingSection />
    </div>
  );
};

FriendLoading.displayName = 'FriendLoading';

export default FriendLoading;
