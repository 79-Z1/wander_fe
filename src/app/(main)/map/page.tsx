'use client';
import React, {FC} from 'react';
import dynamic from 'next/dynamic';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import 'leaflet/dist/leaflet.css';

const Map = dynamic(() => import('@/common/components/map/map'), {
  ssr: false
});

export type TMapPageProps = IComponentBaseProps;

const MapPage: FC<TMapPageProps> = ({className}) => {
  return (
    <div className={cn('map-page h-screen w-full', className)} data-testid="Map">
      <Map />
    </div>
  );
};

MapPage.displayName = 'MapPage';

export default MapPage;
