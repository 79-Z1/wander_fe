import React, {FC} from 'react';
import Image from 'next/image';

import {Button, Icon} from '@/core-ui';

import {TabsContent} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import {ENUM_FRIEND_TAB} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

export type TTabFriendRequestProps = IComponentBaseProps & {
  value: ENUM_FRIEND_TAB;
};

const TabFriendRequest: FC<TTabFriendRequestProps> = ({className, value}) => {
  return (
    <div className={cn('TabFriendRequest', className)} data-testid="TabFriendRequest">
      <TabsContent value={value}>
        <div className="flex items-center justify-between p-6">
          <div className="flex w-fit items-center gap-1">
            <div className="relative mr-2 h-[60px] w-[60px]">
              <Image alt="" src={''} fill className="absolute rounded-lg object-cover object-center" />
            </div>
            <p className="flex flex-col gap-1">
              <span className="font-bold text-gray-800">Heheheh</span>
              <span className="text-gray-600">Heheheh</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex gap-2 rounded-lg bg-gray-300 p-2 text-gray-500">
              <Icon name="ico-user-times-bottom" />
              <p className="font-bold">Từ chối</p>
            </Button>
            <Button className="flex gap-2 rounded-lg bg-orange-500 p-2 text-[#FCFCFC]">
              <Icon name="ico-user-check-bottom" />
              <p className="font-bold">Chấp nhận</p>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between p-6">
          <div className="flex w-fit items-center gap-1">
            <div className="relative mr-2 h-[60px] w-[60px]">
              <Image alt="" src={''} fill className="absolute rounded-lg object-cover object-center" />
            </div>
            <p className="flex flex-col gap-1">
              <span className="font-bold text-gray-800">Heheheh</span>
              <span className="text-gray-600">Heheheh</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex gap-2 rounded-lg bg-gray-300 p-2 text-gray-500">
              <Icon name="ico-user-times-bottom" />
              <p className="font-bold">Từ chối</p>
            </Button>
            <Button className="flex gap-2 rounded-lg bg-orange-500 p-2 text-[#FCFCFC]">
              <Icon name="ico-user-check-bottom" />
              <p className="font-bold">Chấp nhận</p>
            </Button>
          </div>
        </div>
      </TabsContent>
    </div>
  );
};

TabFriendRequest.displayName = 'TabFriendRequest';

export default TabFriendRequest;
