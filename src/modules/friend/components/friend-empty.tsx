import React, {FC} from 'react';
import Image from 'next/image';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import FriendEmptyImage from '@/assets/images/friend-empty.png';

export type TFriendEmptyProps = IComponentBaseProps & {
  text?: string;
};

const FriendEmpty: FC<TFriendEmptyProps> = ({className, text}) => {
  return (
    <div
      className={cn('voucher-list-empty', 'flex h-full w-full flex-col items-center justify-center', className)}
      data-testid="FriendEmpty"
    >
      <Image src={FriendEmptyImage} alt={'friend empty'} />
      <p>{text}</p>
    </div>
  );
};

FriendEmpty.displayName = 'FriendEmpty';

export default FriendEmpty;
