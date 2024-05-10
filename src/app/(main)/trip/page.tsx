import React from 'react';
import type {Metadata} from 'next';

import TripModule from '@/modules/schedules/components/trip/trip-module';

export default async function TripPage() {
  return <TripModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Trip', description: 'Trip Description'};
}
