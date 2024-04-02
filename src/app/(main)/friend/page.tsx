'use client';
import React, {FC} from 'react';
import {useSession} from 'next-auth/react';

import FriendModule from '@/modules/friend/friend.module';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TFriendPageProps = IComponentBaseProps;

const FriendPage: FC<TFriendPageProps> = ({className}) => {
  const session = useSession();
  if (session.status === 'loading') {
    return null;
  }

  return (
    <div className={cn('FriendPage', className)} data-testid="FriendPage">
      <FriendModule />
    </div>
  );
};

FriendPage.displayName = 'FriendPage';

export default FriendPage;
