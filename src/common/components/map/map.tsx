'use client';
import React, {FC, useState} from 'react';
import Leaflet from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {FullscreenControl} from 'react-leaflet-fullscreen';

import {Loading} from '@/core-ui';

import {cn} from '@/components/utils';

import useGeolocation from '@/common/hooks/use-geo-location';

import {IComponentBaseProps} from '@/common/interfaces';

import MarkerIcon from '../../../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../../../../node_modules/leaflet/dist/images/marker-shadow.png';

import LocationMarker from './map-marker';
import MapSearch from './map-search';
import RoutingMachine from './routeline-machine';

// import RoutingMachine from './routeline-machine';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-fullscreen/styles.css';
import 'leaflet-geosearch/dist/geosearch.css';

export type TMapProps = IComponentBaseProps;

const Map: FC<TMapProps> = ({className}) => {
  const {data, isLoading} = useGeolocation();
  if (isLoading) return <Loading />;

  function handleLocationMarkerClick(location: [number, number]) {
    console.log(location);
  }

  return (
    <div className={cn('map h-full w-full', className)} data-testid="Map">
      <MapContainer
        className="h-full w-full rounded-lg"
        center={[data?.latitude || 0, data.longitude || 0]}
        zoom={13}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapSearch />
        <RoutingMachine currentUserLatLng={Leaflet.latLng(data?.latitude || 0, data?.longitude || 0)} />
        {/* <LocationMarker onClick={handleLocationMarkerClick} /> */}
        <Marker
          position={[data?.latitude || 0, data.longitude || 0]}
          icon={
            new Leaflet.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              shadowUrl: MarkerShadow.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowSize: [41, 41]
            })
          }
        >
          <Popup>Vị trí của bạn</Popup>
        </Marker>
        <FullscreenControl forceSeparateButton={true} position="topright" />
      </MapContainer>
    </div>
  );
};

Map.displayName = 'Map';

export default Map;
