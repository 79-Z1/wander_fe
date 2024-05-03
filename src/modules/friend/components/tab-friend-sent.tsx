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
import {IFriendSent} from '@/common/interfaces/friend.interface';

import FriendEmpty from './friend-empty';

export type TTabFriendSentProps = IComponentBaseProps & {
  value: ENUM_FRIEND_TAB;
  friendSents: IFriendSent[];
  userId: string;
  onClick: (userId: string) => void;
};

const TabFriendSent: FC<TTabFriendSentProps> = ({className, userId, value, friendSents = [], onClick}) => {
  const {cancelFriendRequest} = useFriendState();

  function handleCancelFriendRequest(friendId: string) {
    cancelFriendRequest(userId, friendId, GlobalConnectSocket);
  }
  return (
    <div className={cn('TabFriendSent', className)} data-testid="TabFriendSent">
      <TabsContent value={value}>
        {friendSents.length > 0 ? (
          friendSents.map((value, index) => (
            <div key={index}>
              {index !== 0 && <Line className="my-1 border-[#E5E7EB] md:my-3" />}
              <div className="flex items-center justify-between p-6">
                <div className="flex w-fit items-center gap-1" onClick={() => onClick(value?.user?._id)}>
                  <div className="relative mr-2 h-[60px] w-[60px]">
                    <Image
                      alt=""
                      src={value?.user?.avatar}
                      fill
                      className="absolute rounded-lg object-cover object-center"
                    />
                  </div>
                  <p className="flex flex-col gap-1">
                    <span className="font-bold text-gray-800">{value?.user?.name}</span>
                    <span className="text-gray-600">{`${formatVNDate(value?.updatedAt)}`}</span>
                  </p>
                </div>
                <Button
                  className="flex gap-2 rounded-lg bg-orange-500 p-2 text-[#FCFCFC]"
                  onClick={() => handleCancelFriendRequest(value?.user?._id)}
                >
                  <Icon name="ico-x" />
                  <p className="font-bold">Hủy yêu cầu</p>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <FriendEmpty text="Hiện chưa gửi yêu cầu kết bạn nào" />
        )}
      </TabsContent>
    </div>
  );
};

TabFriendSent.displayName = 'TabFriendSent';

export default TabFriendSent;
