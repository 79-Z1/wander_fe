import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {cn} from '@/components/utils';

export default function AdminNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname();
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
      <Link
        href="/admin"
        className={cn('text-sm font-medium text-muted-foreground transition-colors hover:text-primary', {
          'text-primary': path === '/admin'
        })}
      >
        Tổng quan
      </Link>
      <Link
        href="/admin/user"
        className={cn('text-sm font-medium text-muted-foreground transition-colors hover:text-primary', {
          'text-primary': path === '/admin/user'
        })}
      >
        Người dùng
      </Link>
    </nav>
  );
}
