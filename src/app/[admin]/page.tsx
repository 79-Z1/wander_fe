import {Metadata} from 'next';

import AdminOverviewModule from '@/modules/admin/overview.module';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard'
};

export default function DashboardPage() {
  return <AdminOverviewModule />;
}
