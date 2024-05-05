import {Metadata} from 'next';

import AdminUserModule from '@/modules/admin/user.module';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin user'
};

export default function DashboardPage() {
  return <AdminUserModule />;
}
