import React, {FC, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {signOut, useSession} from 'next-auth/react';
import classNames from 'classnames';

import {Icon} from '@/core-ui';

import {Button} from '@/components/ui/button';

import {sidebarMenuItems} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import Line from '../line';
import UserPopOver from '../topbar/user-popover';

interface IMenuHamburgerProps extends IComponentBaseProps {
  showMenu: boolean;
  onClick?: () => void;
}

const MenuHamburger: FC<IMenuHamburgerProps> = ({showMenu, ...rest}) => {
  const session = useSession();
  const path = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    setActivePath(path);
  }, [path]);

  if (!session) return null;

  return (
    <>
      {showMenu && (
        <div
          className="comp-menu-hamburger flex min-h-screen w-full flex-col overflow-hidden bg-zinc-50 py-3 transition-all duration-200 lg:hidden"
          data-testid="menu-hamburger"
          {...rest}
        >
          <div className="flex flex-col gap-4 px-6 text-sm font-normal text-gray-50">
            <Line className="bg-stone-600" />
            {session?.data?.user && (
              <>
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex">
                    <UserPopOver avatar={session.data.user.avatar} />
                    <div className="px-2">
                      <p className="text-base font-bold text-black">{session.data?.user?.name}</p>
                      <p className="break-words text-xs text-gray-500">{session.data?.user?.email}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {sidebarMenuItems.map((item, idx) => {
              const activeMenuBackground =
                activePath === item.path ? 'bg-orange-500 hover:bg-orange-700 !text-[#fcfcfc]' : 'bg-transparent';
              return (
                <div
                  key={idx}
                  className={`flex w-full flex-col items-center justify-center gap-4
              transition-all duration-500`}
                >
                  {/* ${item.isLogin && !session?.data?.user.email && 'hidden'} */}
                  <Button
                    className={classNames(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg p-2 font-medium text-gray-400',
                      activeMenuBackground
                    )}
                    variant="default"
                    onClick={() => {
                      if (item.path) {
                        router.push(item.path);
                        setActivePath(item.path);
                        setIsOpen(false);
                      }
                      if (item.path) {
                        setIsOpen(!isOpen);
                        router.push(item.path);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Icon name={`ico-${item.icon}`} />
                      <span className={classNames('whitespace-nowrap transition-all duration-200')}>{item.name}</span>
                    </div>
                  </Button>
                </div>
              );
            })}

            {session?.data?.user && (
              <Button
                className="flex items-center gap-x-2 rounded-lg border border-white px-4 py-3 text-gray-50"
                onClick={() => signOut({redirect: true, callbackUrl: '/explore'})}
              >
                <Icon name="ico-custom-log-out" size={24} />
                Đăng xuất
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

MenuHamburger.displayName = 'MenuHamburger';

export default MenuHamburger;
