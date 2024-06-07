import React, {FC, memo} from 'react';
import Image from 'next/image';
import {PlusIcon} from 'lucide-react';
import {IUser} from '@/common/entities';

import {Button} from '@/components/ui/button';
import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TFriendSuggestionProps = IComponentBaseProps & {
  user: IUser & {distance?: number};
};

const FriendSuggestion: FC<TFriendSuggestionProps> = ({className, user}) => {
  return (
    <div className={cn('compname', className)} data-testid="FriendSuggestion">
      <div className="flex items-center justify-between p-1 lg:p-4">
        <div className="flex w-fit items-center gap-1">
          <div className="relative mr-2 h-[20px] w-[20px] lg:h-[40px] lg:w-[40px]">
            <Image
              alt={user?.name || ''}
              src={user?.avatar || '/images/avatar.png'}
              fill
              className="absolute rounded-lg bg-black object-cover object-center"
            />
          </div>
          <p className="flex flex-col gap-1">
            <span className="font-bold text-gray-800">{user?.name}</span>
            <span className="text-sm text-gray-600 lg:text-base">{`${user?.email}`}</span>
            {user?.distance && <span className="text-xs">{`Cách bạn khoảng ${user?.distance} Km`}</span>}
          </p>
        </div>
        <Button className="gap-1 hover:bg-orange-600">
          <PlusIcon className="h-4 w-4" /> Thêm bạn bè
        </Button>
      </div>
    </div>
  );
};

FriendSuggestion.displayName = 'FriendSuggestion';

export default memo(FriendSuggestion);
