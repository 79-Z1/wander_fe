'use client';

import Image from 'next/image';

import {Icon} from '@/core-ui';

import {IComponentBaseProps} from '@/common/interfaces';

import logo from '@/assets/images/logo.png';

interface ITopBarMobileProps extends IComponentBaseProps {
  showMenu: boolean;
  onShowMenu: () => void;
  onCloseMenu: () => void;
  bgColorClassname?: string;
}

const TopBarMobile = ({showMenu, onShowMenu, onCloseMenu, bgColorClassname = '', ...rest}: ITopBarMobileProps) => {
  return (
    <div
      className={`bg-zinc-50 px-6 pt-4 text-black transition-all ${bgColorClassname} duration-300 md:py-6 md:pb-6
      `}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4" onClick={onCloseMenu}>
          <Image src={logo} alt="Wander" width={48} height={48} />
        </div>
        <div className="flex items-center gap-x-4">
          <Icon
            name={showMenu ? 'ico-times-circle' : 'ico-menu'}
            size={24}
            className="text-black lg:hidden"
            onClick={onShowMenu}
          />
        </div>
      </div>
    </div>
  );
};
export default TopBarMobile;
