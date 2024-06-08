'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {useSession} from 'next-auth/react';

import NotFoundModule from '@/modules/not-found/not-found';

import useBackNavigationHistory from '@/common/hooks/use-back-navigation-history';

import UserNav from '../../modules/admin/components/user-nav';

import AdminNav from './admin-nav';

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const session = useSession();
  const backNavigationHistory = useBackNavigationHistory();

  useEffect(() => {
    backNavigationHistory.addPage(pathname);
  }, [pathname]);

  if ((!session.data && session.status === 'unauthenticated') || session.data?.user.role !== 'admin')
    return <NotFoundModule />;

  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <AdminNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav avatar={session.data?.user.avatar} />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
}
