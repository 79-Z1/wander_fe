import React from 'react';
import type {Metadata} from 'next';
import ScheduleApi from '@/common/api/schedule.api';

import CalendarModule from '@/modules/calendar/calendar.module';

export default async function Calendar() {
  const calendars = await ScheduleApi.readUserCalendarsSeverSide();
  return <CalendarModule calendars={calendars} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Calendar', description: 'Calendar Description'};
}
