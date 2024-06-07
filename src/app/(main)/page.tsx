import React from 'react';
import type {Metadata} from 'next';

import HomeModule from '@/modules/home/home.module';

export default async function TripPage() {
  return <HomeModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Home', description: 'Home Description'};
}
