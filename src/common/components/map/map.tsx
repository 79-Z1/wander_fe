'use client';
import React, {FC} from 'react';
import Leaflet from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';

import {cn} from '@/components/utils';

import {IComponentBaseProps} from '@/common/interfaces';

import MarkerIcon from '../../../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../../../../node_modules/leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

export type TMapProps = IComponentBaseProps;

const Map: FC<TMapProps> = ({className}) => {
  return (
    <div className={cn('map', className)} data-testid="Map">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{width: '100vh', height: '100vh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[51.505, -0.09]}
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
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

Map.displayName = 'Map';

export default Map;
