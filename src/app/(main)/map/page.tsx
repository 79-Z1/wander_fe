import dynamic from 'next/dynamic';
import React from 'react';
import type {Metadata} from 'next';

import 'leaflet/dist/leaflet.css';

const Map = dynamic(() => import('@/common/components/map/map'), {
  ssr: false
});

export default async function Voucher() {
  return (
    <div className="h-screen w-full">
      <Map />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {title: 'Map', description: 'Map Description'};
}
