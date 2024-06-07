import React, {FC, useCallback, useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {BellIcon} from 'lucide-react';
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

import {forMatMessageTime} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TNotificationPopoverProps = IComponentBaseProps;

const NotificationPopover: FC<TNotificationPopoverProps> = ({className}) => {
  const router = useRouter();
  const {countNewNotification, notifications, getNotifications} = useNotificationState();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const markAllAsRead = useCallback(() => {
    if (countNewNotification > 0) {
      GlobalConnectSocket.emit(ENUM_SOCKET_EMIT.MARK_AS_READ);
    }
  }, [countNewNotification]);

  return (
    <div className={cn('NotificationPopover', className)} data-testid="NotificationPopover">
      <DropdownMenu onOpenChange={markAllAsRead}>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-lg border-none text-center text-sm font-medium text-white outline-none"
          >
            <BellIcon className="h-7 w-7 text-gray-600" />
            {countNewNotification > 0 && (
              <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
                {countNewNotification}
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="scrollbar max-h-[60vh] w-80 overflow-y-auto" forceMount>
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <DropdownMenuItem
                  key={notification._id}
                  className="flex cursor-pointer gap-2"
                  onClick={() => router.push(notification.url)}
                >
                  <Image
                    src={notification?.emitter?.avatar || '/images/avatar.png'}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="rounded-lg bg-black"
                  />
                  <p className="flex flex-col gap-1">
                    <span>{notification.content}</span>
                    <span className="text-xs text-gray-600">
                      {forMatMessageTime(notification.createdAt?.toString())}
                    </span>
                  </p>
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
