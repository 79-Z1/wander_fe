import React from 'react';
import type {Metadata} from 'next';

import ExploreModule from '@/modules/explore/explore.module';

export default async function Explore() {
  return <ExploreModule />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Explore', description: 'Explore Description'};
}
