'use client';

import {FC} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import classNames from 'classnames';

import {Icon} from '@/core-ui';

import CreateTrip from '@/components/create-trip-button';

import {IComponentBaseProps} from '@/common/interfaces';

import logo from '@/assets/images/logo.png';

import SideBarNavigation from './sidebar-navigation';

type SidebarProps = IComponentBaseProps & {
  isExpand: boolean;
  onCollapseClick?: () => void;
};

const Sidebar: FC<SidebarProps> = ({className, isExpand = true, onCollapseClick, ...rest}) => {
  const router = useRouter();
  return (
    <>
      <div
        className={classNames(
          'abc-sidebar fixed z-2 flex h-full flex-col overflow-hidden bg-zinc-50 p-4 transition-all duration-500',
          className,
          isExpand ? 'w-[236px]' : 'w-24'
        )}
        data-testid="sidebar"
        {...rest}
      >
        <div className="flex h-full grow flex-col pr-2">
          <div className="relative flex h-[80px] min-h-[2.5rem] w-full items-center gap-x-2 pl-2">
            <div
              className={`absolute left-0 top-3 transition-opacity ${
                !isExpand ? 'opacity-0 duration-200' : 'opacity-100 duration-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <Image src={logo} alt="Wander" width={48} height={48} />
                <p className="text-xl font-bold text-[#EF7A6F]">Wander</p>
              </div>
            </div>
            <div className={`${isExpand ? 'right-0' : ' right-1/3'} absolute top-4 rounded bg-gray-100 p-1`}>
              <Icon
                name={isExpand ? 'ico-chevron-left' : 'ico-chevron-right'}
                className="wander-hidden text-gray-400 md:!block"
                size={16}
                onClick={() => onCollapseClick?.()}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <CreateTrip
              isExpand={isExpand}
              className="mx-auto transition-all duration-500"
              onClick={() => {
                router.push('/trip/create');
                onCollapseClick?.();
              }}
            />
            <SideBarNavigation isExpand={isExpand} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
