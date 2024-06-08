'use client';
import {Suspense, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import classNames from 'classnames';
import InitSocket from '@/common/layout/init-socket';

import NotFoundModule from '@/modules/not-found/not-found';

import useBackNavigationHistory from '@/common/hooks/use-back-navigation-history';
import useGlobalState from '@/common/hooks/use-global-state';

import GlobalLoading from '@/common/components/global-loading';
import MenuHamburger from '@/common/components/layout-container/menu-hamburger';
import TopBarMobile from '@/common/components/layout-container/topbar-mobile';
import {Media, MediaContextProvider} from '@/common/components/media';
import Sidebar from '@/common/components/sidebar/sidebar';
import Topbar from '@/common/components/topbar/topbar';

export default function MainLayout({children}: Readonly<{children: React.ReactNode}>) {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const backNavigationHistory = useBackNavigationHistory();
  const {isLoading} = useGlobalState();

  const [showMenu, setShowMenu] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  const handleCollapseSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const onCloseMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    backNavigationHistory.addPage(pathname);
  }, [pathname]);

  useEffect(() => {
    if (session.data?.user.role === 'admin') router.push('/admin');
  }, [session, router]);

  if (!session.data && session.status === 'unauthenticated') return <NotFoundModule />;

  return (
    <>
      <InitSocket />
      <MediaContextProvider>
        {isLoading ? (
          <GlobalLoading />
        ) : (
          <Suspense fallback={<GlobalLoading />}>
            <Media greaterThanOrEqual="md" className="relative h-full min-h-screen w-full">
              <div className="flex min-h-screen w-full" id="layout-container">
                <Sidebar isExpand={isOpenSidebar} onCollapseClick={handleCollapseSidebar} />
                <div
                  className={classNames(
                    'home-content flex h-full min-h-screen w-full flex-col transition-all duration-500',
                    isOpenSidebar ? 'w-[calc(100%-20rem)] md:ml-[236px]' : 'w-[calc(100%-6rem)] md:ml-24'
                  )}
                >
                  <div className="flex min-h-[72px] items-center justify-end gap-x-4 bg-zinc-50 pr-6">
                    <Topbar />
                  </div>
                  <div className="home-page h-full w-full grow bg-gray-100 p-6">{children}</div>
                </div>
              </div>
            </Media>
            <Media lessThan="md" className="h-full w-full">
              <TopBarMobile showMenu={showMenu} onShowMenu={() => setShowMenu(!showMenu)} onCloseMenu={onCloseMenu} />
              <MenuHamburger showMenu={showMenu} onClick={() => setShowMenu(!showMenu)} />
              <div className={classNames('min-h-screen grow bg-gray-100 p-6', showMenu && 'hidden')}>{children}</div>
            </Media>
          </Suspense>
        )}
      </MediaContextProvider>
    </>
  );
}
