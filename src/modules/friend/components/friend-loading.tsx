import React, {FC} from 'react';

import {Loading} from '@/core-ui';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TFriendLoadingProps = IComponentBaseProps;

const FriendLoading: FC<TFriendLoadingProps> = ({className}) => {
  return (
    <div
      className={cn('friend-loading', 'flex h-full w-full items-center justify-center', className)}
      data-testid="FriendLoading"
    >
      <Loading />
    </div>
  );
};

FriendLoading.displayName = 'FriendLoading';

export default FriendLoading;
