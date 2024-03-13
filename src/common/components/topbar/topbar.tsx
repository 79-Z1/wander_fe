import React, {FC} from 'react';
import Image from 'next/image';

import {Avatar} from '@/core-ui';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import bellNotificationSVG from '@/assets/icons/bell-notification.svg';

import Search from './search';

export type TTopbarProps = IComponentBaseProps;

const Topbar: FC<TTopbarProps> = ({className}) => {
  return (
    <div
      className={cn('topbar flex w-full items-center justify-end gap-4 bg-zinc-50 p-6', className)}
      data-testid="Topbar"
    >
      <Search />
      <Image src={bellNotificationSVG} alt="avatar" width={28} height={28} />
      <p className="text-sm font-bold">My name</p>
      <Avatar src="" size={44} alt="avatar" className="rounded-lg" />
    </div>
  );
};

Topbar.displayName = 'Topbar';

export default Topbar;
