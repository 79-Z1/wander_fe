import React, {FC, memo, useState} from 'react';
import Image from 'next/image';
import {PlusIcon, XIcon} from 'lucide-react';
import {IUser} from '@/common/entities';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {Button} from '@/components/ui/button';
import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';

import Line from '@/common/components/line';

import {IMAGE_URL} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

export type TFriendsSuggestionProps = IComponentBaseProps & {
  userId?: string;
  users: (IUser & {distance?: number})[];
};

const FriendsSuggestion: FC<TFriendsSuggestionProps> = ({className, users, userId}) => {
  const friendState = useFriendState();
  const [friendSentIds, setFriendSentIds] = useState<string[]>([]);

  function addFriend(friendId?: string) {
    setFriendSentIds([...friendSentIds, friendId || '']);
    friendState.sendFriendRequest(userId || '', friendId || '', GlobalConnectSocket);
  }

  function cancelFriendRequest(friendId?: string) {
    setFriendSentIds(friendSentIds.filter(value => value !== friendId));
    friendState.cancelFriendRequest(userId || '', friendId || '', GlobalConnectSocket);
  }

  return (
    <div className={cn('FriendsSuggestion', className)} data-testid="FriendsSuggestion">
      {users.map((value, index) => (
        <div key={index}>
          {index !== 0 && <Line className="my-1 !border-[#E5E7EB] md:my-3" />}
          <div className="flex items-center justify-between gap-1 p-1 lg:p-4">
            <div className="flex items-center gap-1">
              <div className="relative mr-2 h-[20px] w-[20px] lg:h-[40px] lg:w-[40px]">
                <Image
                  alt={value?.name || ''}
                  src={value?.avatar || IMAGE_URL.USER}
                  fill
                  className="absolute rounded-lg bg-black object-cover object-center"
                />
              </div>
              <p className="flex flex-col gap-1">
                <span className="text-ellipsis font-bold text-gray-800">{value?.name}</span>
                <span className="text-ellipsis text-sm text-gray-600 lg:text-base">{`${value?.email}`}</span>
                {value?.distance && <span className="text-xs">{`Cách bạn khoảng ${value?.distance} Km`}</span>}
              </p>
            </div>
            {!friendSentIds.includes(value._id!.toString()) ? (
              <Button className="gap-1 hover:bg-orange-600" onClick={() => addFriend(value?._id)}>
                <PlusIcon className="h-4 w-4" /> Thêm bạn bè
              </Button>
            ) : (
              <Button className="gap-1 hover:bg-orange-600" onClick={() => cancelFriendRequest(value?._id)}>
                <XIcon className="h-4 w-4" /> Hủy lời mời
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

FriendsSuggestion.displayName = 'FriendsSuggestion';

export default memo(FriendsSuggestion);
