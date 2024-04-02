import React, {FC} from 'react';
import Image from 'next/image';

import {Button, Icon} from '@/core-ui';

import {TabsContent} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import Line from '@/common/components/line';

import {ENUM_FRIEND_TAB} from '@/common/constants';

import {formatVNDate} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';
import {IFriendSent} from '@/common/interfaces/friend.interface';

import FriendEmpty from './friend-empty';

export type TTabFriendSentProps = IComponentBaseProps & {
  value: ENUM_FRIEND_TAB;
  friendSents: IFriendSent[];
};

const TabFriendSent: FC<TTabFriendSentProps> = ({className, value, friendSents = []}) => {
  return (
    <div className={cn('TabFriendSent', className)} data-testid="TabFriendSent">
      <TabsContent value={value}>
        {friendSents.length > 0 ? (
          friendSents.map((value, index) => (
            <div key={index}>
              {index !== 0 && <Line className="my-1 border-[#E5E7EB] md:my-3" />}
              <div className="flex items-center justify-between p-6">
                <div className="flex w-fit items-center gap-1">
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
                <Button className="flex gap-2 rounded-lg bg-orange-500 p-2 text-[#FCFCFC]">
                  <Icon name="ico-angle-down" />
                  <p className="font-bold">Đã gửi lời mời</p>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <FriendEmpty text="Hiện chưa gửi lời mời kết bạn nào" />
        )}
      </TabsContent>
    </div>
  );
};

TabFriendSent.displayName = 'TabFriendSent';

export default TabFriendSent;
