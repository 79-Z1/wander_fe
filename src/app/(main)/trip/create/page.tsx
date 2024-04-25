import React from 'react';
import type {Metadata} from 'next';

import CreateTripModule from '@/modules/schedules/components/create-trip/create-trip-module';

export default async function Voucher() {
  return <CreateTripModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Create Trip', description: 'Create Trip Description'};
}
