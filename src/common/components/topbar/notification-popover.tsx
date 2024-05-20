import React, {FC, useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {cn} from '@/components/utils';

import useNotificationState from '@/common/hooks/use-notification-state';

import {ENUM_SOCKET_EMIT} from '@/common/constants/socket.enum';

import {IComponentBaseProps} from '@/common/interfaces';

import bellNotificationSVG from '@/assets/icons/bell-notification.svg';

export type TNotificationPopoverProps = IComponentBaseProps;

const NotificationPopover: FC<TNotificationPopoverProps> = ({className}) => {
  const router = useRouter();
  const {countNewNotification, notifications, getNotifications} = useNotificationState();

  useEffect(() => {
    getNotifications();
  }, []);

  function markAllAsRead() {
    if (countNewNotification > 0) {
      GlobalConnectSocket.emit(ENUM_SOCKET_EMIT.MARK_AS_READ);
    }
  }

  return (
    <div className={cn('NotificationPopover', className)} data-testid="NotificationPopover">
      <DropdownMenu onOpenChange={markAllAsRead}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-lg border-none text-center text-sm font-medium text-white outline-none"
          >
            <Image src={bellNotificationSVG} alt="avatar" width={28} height={28} />
            <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
              {countNewNotification}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" forceMount>
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <DropdownMenuItem
                  key={notification._id}
                  className="flex cursor-pointer gap-2"
                  onClick={() => router.push(notification.url)}
                >
                  <Image src={notification.emitter.avatar} alt="avatar" width={28} height={28} />
                  <p>{notification.content}</p>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem className="cursor-pointer">Không có thông báo nào</DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

NotificationPopover.displayName = 'NotificationPopover';

export default NotificationPopover;
