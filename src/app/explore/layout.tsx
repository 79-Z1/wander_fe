import TopbarUnauth from '@/common/components/topbar/topbar-unauth';

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col" id="layout-container">
      <div className="flex min-h-[72px] items-center justify-end gap-x-4 bg-gray-100">
        <TopbarUnauth />
      </div>
      <div className="h-full w-full grow bg-gray-100 px-6 py-2 lg:px-[80px] lg:py-6">{children}</div>
    </div>
  );
}
