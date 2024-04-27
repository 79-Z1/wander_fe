import React from 'react';
import type {Metadata} from 'next';
import ScheduleApi from '@/common/api/schedule.api';

import CalendarModule from '@/modules/calendar/calendar.module';

export default async function Calendar() {
  const data = await ScheduleApi.readUserCalendarsSeverSide();

  return <CalendarModule calendars={data} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Calendar', description: 'Calendar Description'};
}
