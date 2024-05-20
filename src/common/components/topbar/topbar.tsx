'use client';
import React, {FC} from 'react';
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {debounce} from 'lodash-es';

import {cn} from '@/components/utils';

import useUserState from '@/common/hooks/use-user-state';

import {IComponentBaseProps} from '@/common/interfaces';

import SearchBarSuggestion from '../search-bar-suggestion';

import NotificationPopover from './notification-popover';
import UserPopOver from './user-popover';

export type TTopbarProps = IComponentBaseProps;

const Topbar: FC<TTopbarProps> = ({className}) => {
  const session = useSession();
  const router = useRouter();
  // const pathname = usePathname();
  const {users, isFetching, searchByName, setUsers} = useUserState();

  function handleSearchChange(text: string) {
    if (text)
      debounce(() => {
        searchByName(text);
      }, 500)();
    else setUsers([]);
  }

  function handleSelectSearchResult(userId: string) {
    router.push(`/profile/${userId}`);
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
        onEnter={handleSelectSearchResult}
        onValueChange={handleSearchChange}
        onSelectOption={handleSelectSearchResult}
      />
      <NotificationPopover />
      <p className="text-sm font-bold">{session.data?.user?.name || ''}</p>
      <UserPopOver avatar={session.data?.user?.avatar} />
    </div>
  );
};

Topbar.displayName = 'Topbar';

export default Topbar;
