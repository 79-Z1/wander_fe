import React, {FC} from 'react';
import Image from 'next/image';

import {Icon} from '@/core-ui';

import {TabsContent} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import {ENUM_FRIEND_TAB} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

export type TTabMyFriendProps = IComponentBaseProps & {
  value: ENUM_FRIEND_TAB;
};

const TabMyFriend: FC<TTabMyFriendProps> = ({className, value}) => {
  return (
    <div className={cn('TabMyFriend', className)} data-testid="TabMyFriend">
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
          <Icon name="ico-more-horizontal" />
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
          <Icon name="ico-more-horizontal" />
        </div>
      </TabsContent>
    </div>
  );
};

TabMyFriend.displayName = 'TabMyFriend';

export default TabMyFriend;
