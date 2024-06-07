'use client';
import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import ScheduleApi from '@/common/api/schedule.api';
import UserApi from '@/common/api/user.api';
import {IUser} from '@/common/entities';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import {cn} from '@/components/utils';

import useGeolocation from '@/common/hooks/use-geo-location';

import Line from '@/common/components/line';

import {formatToAMPM} from '@/common/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import FriendSuggestion from '../friend/components/friend-suggestion';

import AISuggestion from './components/ai-suggestion';

export type TCalendarModuleProps = IComponentBaseProps & {
  calendars?: any;
};

const CalendarModule: FC<TCalendarModuleProps> = ({className}) => {
  const router = useRouter();
  const {data, isLoading} = useGeolocation();
  const [friendSuggestions, setFriendSuggestions] = useState<(IUser & {distance?: number})[]>([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [calendars, setCalendars] = useState<any[]>([]);

  useEffect(() => {
    async function getCalendars() {
      const res = await ScheduleApi.readUserCalendars();
      if (res) {
        setCalendars(res.metadata);
      }
    }
    getCalendars();
  }, []);

  useEffect(() => {
    async function updateUserLocationAndGetFriendSuggestions() {
      if (!isLoading) {
        if (data.latitude && data.longitude) {
          await UserApi.updateUserLocation({lat: data.latitude, lng: data.longitude});
          const resFriend = await UserApi.getFriendSuggestions();
          setFriendSuggestions(resFriend.metadata);
        }
      } else {
        const res = await UserApi.getFriendSuggestions();
        setFriendSuggestions(res.metadata);
      }
    }
    updateUserLocationAndGetFriendSuggestions();
  }, [isLoading]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsLargeScreen(event.matches);
    };

    // Set initial state
    setIsLargeScreen(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  const formatDayHeader = (info: any) => {
    if (info.view.type === 'timeGridWeek') {
      return info.date.getDate().toString();
    } else {
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      return days[info.date.getDay()];
    }
  };

  const renderEventContent = useCallback((eventInfo: any) => {
    return (
      <p className="flex w-full cursor-pointer gap-1 truncate text-ellipsis rounded-full px-1">
        <b>{formatToAMPM(eventInfo.timeText)}:</b> <span>{eventInfo.event.title}</span>
      </p>
    );
  }, []);

  const handleEventClick = useCallback(
    (eventInfo: any) => {
      const eventId = eventInfo.event.id;
      router.push(`/trip/${eventId}`);
    },
    [router]
  );

  return (
    <div className={cn('CalendarModule grid w-full gap-3', className)} data-testid="CalendarModule">
      <div>
        <FullCalendar
          contentHeight={isLargeScreen ? '80vh' : 'auto'}
          plugins={useMemo(() => [dayGridPlugin, timeGridPlugin, interactionPlugin], [isLargeScreen])}
          initialView={isLargeScreen ? 'dayGridMonth' : 'timeGridWeek'}
          eventColor="orange"
          headerToolbar={{
            left: isLargeScreen ? 'prev,next today' : 'prev,next',
            center: isLargeScreen ? 'title' : '',
            right: isLargeScreen ? 'dayGridMonth,timeGridWeek,timeGridDay' : 'timeGridDay,timeGridWeek'
          }}
          dayHeaderContent={formatDayHeader}
          firstDay={1}
          locale={'vi'}
          buttonText={{
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            list: 'Danh sách'
          }}
          weekends={true}
          eventClick={handleEventClick}
          events={calendars || []}
          eventContent={renderEventContent}
          // editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          allDaySlot={false}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-10">
        <div className="flex flex-col items-center rounded-lg border bg-zinc-50 p-3 md:col-span-6">
          {data.latitude && data.longitude && <AISuggestion location={{lat: data.latitude, lng: data.longitude}} />}
        </div>
        <div className="overflow-y-auto rounded-lg border bg-zinc-50 md:col-span-4">
          <p className="p-3 text-center text-lg font-bold">Gợi ý cho bạn</p>
          {friendSuggestions.map((value, index) => (
            <div key={index}>
              {index !== 0 && <Line className="my-1 !border-[#E5E7EB] md:my-3" />}
              <FriendSuggestion user={value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarModule;
