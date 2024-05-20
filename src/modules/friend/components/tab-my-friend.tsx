import React, {FC} from 'react';
import Image from 'next/image';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {TabsContent} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';

import Line from '@/common/components/line';

import {ENUM_FRIEND_TAB} from '@/common/constants';

import {formatVNDate} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';
import {IFriend} from '@/common/interfaces/friend.interface';

import FriendEmpty from './friend-empty';
import FriendPopOver from './friend-pop-over';

export type TTabMyFriendProps = IComponentBaseProps & {
  value: ENUM_FRIEND_TAB;
  myFriends: IFriend[];
  onClick: (userId: string) => void;
};

const TabMyFriend: FC<TTabMyFriendProps> = ({className, value, myFriends = [], onClick}) => {
  const friendState = useFriendState();

  function unFriend(friendId: string) {
    friendState.unFriend(friendId, GlobalConnectSocket);
  }
  return (
    <div className={cn('TabMyFriend h-full', className)} data-testid="TabMyFriend">
      <TabsContent value={value} className="h-full">
        {myFriends.length > 0 ? (
          myFriends.map((value, index) => (
            <div key={index}>
              {index !== 0 && <Line className="my-1 border-[#E5E7EB] md:my-3" />}
              <div className="flex items-center justify-between p-3 lg:p-6">
                <div className="flex w-fit items-center gap-1" onClick={() => onClick(value?.user?._id)}>
                  <div className="relative mr-2 h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]">
                    <Image
                      alt={value?.user?.name}
                      src={value?.user?.avatar}
                      fill
                      className="absolute rounded-lg object-cover object-center"
                    />
                  </div>
                  <p className="flex flex-col gap-1">
                    <span className="font-bold text-gray-800">{value?.user?.name}</span>
                    <span className="text-sm text-gray-600 lg:text-base">{`${formatVNDate(value?.updatedAt)}`}</span>
                  </p>
                </div>
                <FriendPopOver onClick={() => unFriend(value?.user?._id)} />
              </div>
            </div>
          ))
        ) : (
          <FriendEmpty text="Bạn chưa có người bạn nào" />
        )}
      </TabsContent>
    </div>
  );
};

TabMyFriend.displayName = 'TabMyFriend';

export default TabMyFriend;
