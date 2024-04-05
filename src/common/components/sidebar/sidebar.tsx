'use client';

import {FC} from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import {Icon} from '@/core-ui';

import {IComponentBaseProps} from '@/common/interfaces';

import logo from '@/assets/images/logo.png';

import Line from '../line';

import SideBarNavigation from './sidebar-navigation';

type SidebarProps = IComponentBaseProps & {
  isExpand: boolean;
  onCollapseClick?: () => void;
};

const Sidebar: FC<SidebarProps> = ({className, isExpand = true, onCollapseClick, ...rest}) => {
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
        <div className="scrollbar flex grow flex-col pr-2">
          <div className="relative flex h-10 min-h-[2.5rem] w-full items-center gap-x-2 pl-2">
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
            <div className={`${isExpand ? 'right-0' : ' right-1/3'} absolute top-4 rounded bg-zinc-50 p-1`}>
              <Icon
                name={isExpand ? 'ico-chevron-left' : 'ico-chevron-right'}
                className="wander-hidden text-gray-400 md:!block"
                size={16}
                onClick={() => onCollapseClick?.()}
              />
            </div>
          </div>
          <Line className={`${!isExpand && ''} mb-4 mt-6 w-full border-gray-100 pt-0.5`} />
          <div className="flex grow flex-col">
            <SideBarNavigation isExpand={isExpand} className="grow" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
