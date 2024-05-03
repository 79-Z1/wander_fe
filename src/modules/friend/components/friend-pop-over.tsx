import React, {FC, useState} from 'react';
import classNames from 'classnames';
import * as Popover from '@radix-ui/react-popover';

import {Icon} from '@/core-ui';

import {IComponentBaseProps} from '@/common/interfaces';

type FriendPopOverProps = IComponentBaseProps & {
  onClick?: () => void;
};

const FriendPopOver: FC<FriendPopOverProps> = ({className, onClick}) => {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(prev => !prev);
    onClick?.();
  }

  return (
    <div className={classNames('friend-popover', className)}>
      <Popover.Root open={open}>
        <Popover.Trigger asChild>
          <div
            className="hidden cursor-pointer items-center space-x-1 md:flex"
            aria-label="Update dimensions"
            onClick={() => setOpen(prev => !prev)}
          >
            <Icon name="ico-more-horizontal" />
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="z-10 border-none outline-none" sideOffset={5}>
            <div className="mr-6 min-w-[150px] rounded-lg border border-gray-700 bg-gray-100 px-2 py-4">
              <span className="flex justify-center px-2 hover:cursor-pointer" onClick={handleClick}>
                Hủy kết bạn
              </span>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default FriendPopOver;
