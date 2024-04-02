import React, {FC} from 'react';
import classNames from 'classnames';
import * as Popover from '@radix-ui/react-popover';

import {Icon} from '@/core-ui';

import Line from '@/common/components/line';

import {IComponentBaseProps} from '@/common/interfaces';

type FriendPopOverProps = IComponentBaseProps & {
  onClick?: () => void;
};

const FriendPopOver: FC<FriendPopOverProps> = ({className, onClick}) => {
  return (
    <div className={classNames('friend-popover', className)}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <div className="hidden cursor-pointer items-center space-x-1 md:flex" aria-label="Update dimensions">
            <Icon name="ico-more-horizontal" />
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="z-10 border-none outline-none" sideOffset={5}>
            <div className="mr-6 min-w-[192px] rounded-lg border border-gray-700 bg-gray-100 px-2 py-4">
              <div className="flex justify-center px-2" onClick={onClick}>
                Hủy kết bạn
              </div>
              <Line className="my-2" />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default FriendPopOver;
