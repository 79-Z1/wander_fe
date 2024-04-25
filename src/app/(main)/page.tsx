import React from 'react';
import type {Metadata} from 'next';

import Home from '@/common/components/home/home';

export default async function Voucher() {
  return <Home />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Home', description: 'Home Description'};
}
