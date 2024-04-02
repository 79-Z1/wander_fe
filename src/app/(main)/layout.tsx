import type {Metadata} from 'next';
import InitSocket from '@/common/layout/init-socket';

import Sidebar from '@/common/components/sidebar/sidebar';
import Topbar from '@/common/components/topbar/topbar';

export const metadata: Metadata = {
  title: 'Wander',
  description: 'Building the future of travel'
};

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InitSocket />
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="flex h-full w-full flex-col">
          <Topbar />
          <main className="h-ful w-full grow bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
