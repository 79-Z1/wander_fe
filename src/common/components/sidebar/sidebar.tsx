'use client';
import React, {FC} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Icon} from '@/core-ui';

import {cn} from '@/components/utils';

import {sidebarMenuItems} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import logo from '@/assets/images/logo.png';

export type TSidebarProps = IComponentBaseProps;

const Sidebar: FC<TSidebarProps> = ({className}) => {
  const pathName = usePathname();
  return (
    <div className={cn('sidebar flex h-full w-[236px] flex-col gap-4 bg-zinc-50 p-6', className)} data-testid="Sidebar">
      <div className="flex h-24 items-start">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="Wander" width={48} height={48} />
          <p className="text-xl font-bold">Wander</p>
        </div>
      </div>
      <div className="flex grow flex-col gap-4">
        {sidebarMenuItems.map(item => (
          <Link
            key={item.name}
            href={item.path}
            className={cn('flex items-center gap-2 rounded-lg p-2 text-gray-400 no-underline active:no-underline', {
              'bg-primary text-[#fcfcfc]': pathName === item.path
            })}
          >
            <Icon name={`ico-${item.icon}`} />
            <p className="font-bold">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;

// <Collapsible defaultValue={'aaaaaaaaaaaaa'} open={open} onOpenChange={setOpen}>
//   <CollapsibleTrigger>{open ? 'mở' : 'đóng'}</CollapsibleTrigger>
//   <h1>ádasdasdasdasd</h1>
//   <CollapsibleContent>
//     <h1>aaaaa</h1> đâsdasdasdasdasda
//   </CollapsibleContent>
// </Collapsible>
