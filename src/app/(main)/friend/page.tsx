'use client';
import React, {FC} from 'react';

import FriendModule from '@/modules/friend/friend.module';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TFriendPageProps = IComponentBaseProps;

const FriendPage: FC<TFriendPageProps> = ({className}) => {
  return (
    <div className={cn('FriendPage', className)} data-testid="FriendPage">
      <FriendModule />
    </div>
  );
};

FriendPage.displayName = 'FriendPage';

export default FriendPage;
