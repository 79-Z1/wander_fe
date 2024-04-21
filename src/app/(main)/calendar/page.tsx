'use client';
import React, {FC} from 'react';
import {useSession} from 'next-auth/react';

import CalendarModule from '@/modules/calendar/calendar.module';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

export type TCalendarPageProps = IComponentBaseProps;

const CalendarPage: FC<TCalendarPageProps> = ({className}) => {
  const session = useSession();
  if (session.status === 'loading') {
    return null;
  }

  return (
    <div className={cn('CalendarPage', className)} data-testid="CalendarPage">
      <CalendarModule />
    </div>
  );
};

CalendarPage.displayName = 'CalendarPage';

export default CalendarPage;
