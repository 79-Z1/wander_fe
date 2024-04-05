import React, {FC} from 'react';
import Image from 'next/image';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {Button, Icon} from '@/core-ui';

import {TabsContent} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';

import Line from '@/common/components/line';

import {ENUM_FRIEND_TAB} from '@/common/constants';

import {formatVNDate} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';
import {IFriendRecieved} from '@/common/interfaces/friend.interface';

import FriendEmpty from './friend-empty';

export type TTabFriendRecievedProps = IComponentBaseProps & {
  value: ENUM_FRIEND_TAB;
  friendRecieves: IFriendRecieved[];
  userId: string;
};

const TabFriendRecieved: FC<TTabFriendRecievedProps> = ({className, value, userId, friendRecieves = []}) => {
  const {acceptFriendRequest, rejectFriendRequest} = useFriendState();

  function handleAcceptFriendRequest(friendId: string) {
    acceptFriendRequest(userId, friendId, GlobalConnectSocket);
  }

  function handleRejectFriendRequest(friendId: string) {
    rejectFriendRequest(friendId, GlobalConnectSocket);
  }

  return (
    <div className={cn('TabFriendRecieved', className)} data-testid="TabFriendRecieved">
      <TabsContent value={value}>
        {friendRecieves.length > 0 ? (
          friendRecieves.map((value, index) => (
            <div key={index}>
              {index !== 0 && <Line className="my-1 border-[#E5E7EB] md:my-3" />}
              <div className="flex items-center justify-between p-6">
                <div className="flex w-fit items-center gap-1">
                  <div className="relative mr-2 h-[60px] w-[60px]">
                    <Image
                      alt={value.user.name}
                      src={value.user.avatar}
                      fill
                      className="absolute rounded-lg object-cover object-center"
                    />
                  </div>
                  <p className="flex flex-col gap-1">
                    <span className="font-bold text-gray-800">{value.user.name}</span>
                    <span className="text-gray-600">{`${formatVNDate(value?.updatedAt)}`}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex gap-2 rounded-lg bg-gray-300 p-2 text-gray-500"
                    onClick={() => handleRejectFriendRequest(value.user._id)}
                  >
                    <Icon name="ico-user-times-bottom" />
                    <p className="font-bold">Từ chối</p>
                  </Button>
                  <Button
                    className="flex gap-2 rounded-lg bg-orange-500 p-2 text-[#FCFCFC]"
                    onClick={() => handleAcceptFriendRequest(value.user._id)}
                  >
                    <Icon name="ico-user-check-bottom" />
                    <p className="font-bold">Chấp nhận</p>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <FriendEmpty text="Hiện không có lời mời kết bạn nào" />
        )}
      </TabsContent>
    </div>
  );
};

TabFriendRecieved.displayName = 'TabFriendRecieved';

export default TabFriendRecieved;
