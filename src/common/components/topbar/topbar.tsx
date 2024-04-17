'use client';
import React, {FC} from 'react';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {debounce} from 'lodash-es';
import {GlobalConnectSocket} from '@/common/sockets/global-connect.socket';

import {cn} from '@/components/utils';

import useFriendState from '@/common/hooks/use-friend-state';
import useUserState from '@/common/hooks/use-user-state';

import {IComponentBaseProps} from '@/common/interfaces';

import bellNotificationSVG from '@/assets/icons/bell-notification.svg';

import SearchBarSuggestion from '../search-bar-suggestion';

export type TTopbarProps = IComponentBaseProps;

const Topbar: FC<TTopbarProps> = ({className}) => {
  const session = useSession();
  // const router = useRouter();
  // const pathname = usePathname();
  const {users, isFetching, searchByName, setUsers} = useUserState();
  const friendState = useFriendState();

  // function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === 'Enter') {
  //     // friendState.sendFriendRequest(session.data?.user.id || '', text, GlobalConnectSocket);
  //     router.replace(`${pathname}/?name=${text}`);
  //     searchByName(text);
  //   }
  // }

  function handleSearchChange(text: string) {
    if (text)
      debounce(() => {
        searchByName(text);
      }, 500)();
    else setUsers([]);
  }

  function handleSelectSearchResult(friendId: string) {
    friendState.sendFriendRequest(session.data?.user.id || '', friendId, GlobalConnectSocket);
  }

  return (
    <div
      className={cn('topbar flex w-full items-center justify-end gap-4 bg-zinc-50 p-6', className)}
      data-testid="Topbar"
    >
      <SearchBarSuggestion
        isLoading={isFetching}
        emptyMessage="Không có kết quả"
        users={users}
        onValueChange={handleSearchChange}
        onSelectOption={handleSelectSearchResult}
      />
      <Image src={bellNotificationSVG} alt="avatar" width={28} height={28} />
      <p className="text-sm font-bold">My name</p>
      <div className="relative h-[40px] w-[40px]">
        <Image
          src={session.data?.user?.image || ''}
          fill
          alt="avatar"
          className="absolute rounded-lg object-cover object-center"
        />
      </div>
    </div>
  );
};

Topbar.displayName = 'Topbar';

export default Topbar;
