'use client';
import {useState} from 'react';
import {useSession} from 'next-auth/react';
import classNames from 'classnames';

import NotFoundModule from '@/modules/not-found/not-found';

import MenuHamburger from '@/common/components/layout-container/menu-hamburger';
import TopBarMobile from '@/common/components/layout-container/topbar-mobile';
import {Media, MediaContextProvider} from '@/common/components/media';
import TopbarUnauth from '@/common/components/topbar/topbar-unauth';

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  const [showMenu, setShowMenu] = useState(false);

  const onCloseMenu = () => {
    setShowMenu(false);
  };
  if (session.data?.user) return <NotFoundModule />;

  return (
    <>
      <MediaContextProvider>
        <>
          <Media greaterThanOrEqual="md" className="relative h-full min-h-screen w-full ">
            <div className="flex min-h-screen w-full flex-col" id="layout-container">
              <div className="flex min-h-[72px] items-center justify-end gap-x-4 bg-gray-100">
                <TopbarUnauth />
              </div>
              <div className="h-full w-full grow bg-gray-100 px-[80px] py-6">{children}</div>
            </div>
          </Media>
          <Media lessThan="md" className="h-full w-full">
            <TopBarMobile showMenu={showMenu} onShowMenu={() => setShowMenu(!showMenu)} onCloseMenu={onCloseMenu} />
            <MenuHamburger showMenu={showMenu} onClick={() => setShowMenu(!showMenu)} />
            <div className={classNames('min-h-screen grow bg-gray-100 p-6 px-[80px]', showMenu && 'hidden')}>
              {children}
            </div>
          </Media>
        </>
      </MediaContextProvider>
    </>
  );
}
