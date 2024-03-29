'use client';
import React, {FC, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useSession} from 'next-auth/react';

import {Button, Icon} from '@/core-ui';

import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import {ENUM_FRIEND_TAB} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import NotFoundModule from '../not-found/not-found';

import TabFriendRequest from './components/tab-friend-request';
import TabFriendRequestSent from './components/tab-friend-request-send';
import TabMyFriend from './components/tab-my-friend';

export type TFriendModuleProps = IComponentBaseProps;

const FriendModule: FC<TFriendModuleProps> = ({className}) => {
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = (searchParams.get('tab') as ENUM_FRIEND_TAB) || ENUM_FRIEND_TAB.MY_FRIEND;

  useEffect(() => {
    // if (session.status === 'authenticated' && session.data.user.email) ;
  }, [tab, session.status]);

  const handleChangeOption = (tab: string) => {
    router.replace(`/friend?tab=${tab}`);
  };

  if (!session.data && session.status === 'unauthenticated') return <NotFoundModule />;
  return (
    <div className={cn('FriendModule', 'flex h-full flex-col gap-5 p-6', className)} data-testid="FriendModule">
      <Tabs
        defaultValue={ENUM_FRIEND_TAB.MY_FRIEND}
        className="flex h-full flex-col"
        onValueChange={handleChangeOption}
      >
        <div className="flex flex-col rounded-lg bg-zinc-50 p-6">
          <div className="flex flex-wrap justify-between">
            <TabsList className="flex justify-center gap-5 bg-zinc-50 md:gap-6 lg:justify-start">
              <TabsTrigger
                className="bg-zinc-50 text-xs font-bold text-gray-400 data-[state=active]:rounded-none data-[state='active']:border-b-[1px] data-[state=active]:border-gray-800 data-[state=active]:bg-zinc-50 data-[state=active]:font-bold md:text-base"
                value={ENUM_FRIEND_TAB.MY_FRIEND}
              >
                Bạn bè của tôi
              </TabsTrigger>
              <TabsTrigger
                className="bg-zinc-50 text-xs font-bold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-b-[1px] data-[state=active]:border-gray-800 data-[state=active]:bg-zinc-50 data-[state=active]:font-bold md:text-base"
                value={ENUM_FRIEND_TAB.FRIEND_REQUEST}
              >
                Lời mời kết bạn
              </TabsTrigger>
              <TabsTrigger
                className="bg-zinc-50 text-xs font-bold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-b-[1px] data-[state=active]:border-gray-800 data-[state=active]:bg-zinc-50 data-[state=active]:font-bold md:text-base"
                value={ENUM_FRIEND_TAB.FRIEND_REQUEST_SENT}
              >
                Lời mời đã gửi
              </TabsTrigger>
            </TabsList>
            <Button className="rounded-lg border border-orange-500 p-2 text-orange-500">
              <Icon name="ico-plus" />
              <p>Thêm bạn bè</p>
            </Button>
          </div>
          <TabMyFriend value={ENUM_FRIEND_TAB.MY_FRIEND} />
          <TabFriendRequest value={ENUM_FRIEND_TAB.FRIEND_REQUEST} />
          <TabFriendRequestSent value={ENUM_FRIEND_TAB.FRIEND_REQUEST_SENT} />
        </div>
      </Tabs>
    </div>
  );
};

FriendModule.displayName = 'FriendModule';

export default FriendModule;
