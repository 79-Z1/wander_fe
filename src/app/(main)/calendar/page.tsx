import React from 'react';
import type {Metadata} from 'next';

import CalendarModule from '@/modules/calendar/calendar.module';

export default async function Voucher() {
  return <CalendarModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Calendar', description: 'Calendar Description'};
}
