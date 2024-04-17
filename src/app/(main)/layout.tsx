'use client';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import classNames from 'classnames';
import InitSocket from '@/common/layout/init-socket';

import useBackNavigationHistory from '@/common/hooks/use-back-navigation-history';

import {Media, MediaContextProvider} from '@/common/components/media';
import Sidebar from '@/common/components/sidebar/sidebar';
import Topbar from '@/common/components/topbar/topbar';

// export const metadata: Metadata = {
//   title: 'Wander',
//   description: 'Building the future of travel'
// };

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // const session = useSession();
  const backNavigationHistory = useBackNavigationHistory();

  const [showMenu, setShowMenu] = useState(false);

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleCollapseSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const onCloseMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    backNavigationHistory.addPage(pathname);
  }, [pathname]);
  return (
    <>
      <InitSocket />
      <MediaContextProvider>
        <Media greaterThanOrEqual="md" className="h-screen w-full">
          <div className="flex h-full w-full" id="layout-container">
            <Sidebar isExpand={isOpenSidebar} onCollapseClick={handleCollapseSidebar} />
            <div
              className={classNames(
                'home-content flex h-full grow flex-col transition-all duration-500',
                isOpenSidebar ? 'w-[calc(100%-20rem)] md:ml-[236px]' : 'w-[calc(100%-6rem)] md:ml-24'
              )}
            >
              <div className="flex min-h-[72px] items-center justify-end gap-x-4 bg-zinc-50 pr-6">
                <Topbar />
              </div>
              <div className="grow bg-gray-100 p-6">{children}</div>
            </div>
          </div>
        </Media>
        <Media lessThan="md">
          {/* <TopBarMobile showMenu={showMenu} onShowMenu={() => setShowMenu(!showMenu)} onCloseMenu={onCloseMenu} /> */}
          {/* <MenuHamburger  showMenu={showMenu} onClick={() => setShowMenu(!showMenu)} /> */}
          <div className={classNames('h-full grow bg-zinc-50 p-6', showMenu && 'hidden')}>{children}</div>
        </Media>
      </MediaContextProvider>
    </>
  );
}
