'use client';
import React, {FC, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useSession} from 'next-auth/react';

import LoadingSection from '@/core-ui/loading/loading-section';

import NotFoundModule from '@/modules/not-found/not-found';

import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {cn} from '@/components/utils';

import useScheduleState from '@/common/hooks/use-schedule-state';

import {ENUM_SCHEDULE_TAB} from '@/common/constants';

import {IComponentBaseProps} from '@/common/interfaces';

import CompletedScheduleTab from './completed-tab';
import InProgressScheduleTab from './in-progress-tab';
import UpcomingScheduleTab from './upcoming-tab';

export type TTripModuleProps = IComponentBaseProps;

const TripModule: FC<TTripModuleProps> = ({className}) => {
  const {getAll, setLoading, isFetching} = useScheduleState();
  const session = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = (searchParams.get('tab') as ENUM_SCHEDULE_TAB) || ENUM_SCHEDULE_TAB.IN_PROGRESS;

  useEffect(() => {
    if (session.data?.user && session.status === 'authenticated') {
      getAll(tab);
    }
  }, [tab, session.status]);

  function handleClick(id: string) {
    router.push(`/trip/${id}`);
  }

  const handleChangeOption = (tab: string) => {
    setLoading(true);
    router.replace(`/trip?tab=${tab}`);
  };
  if (!session.data?.user && session.status === 'unauthenticated') return <NotFoundModule />;

  return (
    <div className={cn('Trip-module', 'flex h-full w-full flex-col gap-4', className)} data-testid="TripModule">
      <Tabs defaultValue={tab} className="flex h-full flex-col rounded-lg" onValueChange={handleChangeOption}>
        <div className="flex flex-wrap justify-between">
          <TabsList className="flex justify-center gap-2 md:gap-6 lg:justify-start lg:gap-5">
            <TabsTrigger
              className="px-1 text-xs font-bold text-gray-400 data-[state=active]:rounded-none data-[state='active']:border-b-[1px] data-[state=active]:border-gray-800 data-[state=active]:font-bold md:text-base lg:px-2"
              value={ENUM_SCHEDULE_TAB.IN_PROGRESS}
            >
              Đang diễn ra
            </TabsTrigger>
            <TabsTrigger
              className="px-1 text-xs font-bold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-b-[1px] data-[state=active]:border-gray-800 data-[state=active]:font-bold md:text-base lg:px-2"
              value={ENUM_SCHEDULE_TAB.COMPLETED}
            >
              Đã hoàn thành
            </TabsTrigger>
            <TabsTrigger
              className="px-1 text-xs font-bold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-b-[1px] data-[state=active]:border-gray-800 data-[state=active]:font-bold md:text-base lg:px-2"
              value={ENUM_SCHEDULE_TAB.UPCOMING}
            >
              Sắp tới
            </TabsTrigger>
          </TabsList>
        </div>
        {!isFetching ? (
          <>
            <InProgressScheduleTab onClick={handleClick} />
            <UpcomingScheduleTab onClick={handleClick} />
            <CompletedScheduleTab onClick={handleClick} />
          </>
        ) : (
          <LoadingSection className="mt-4" />
        )}
      </Tabs>
    </div>
  );
};

TripModule.displayName = 'TripModule';

export default TripModule;
