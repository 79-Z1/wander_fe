'use client';
import React, {FC} from 'react';
import Leaflet from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {FullscreenControl} from 'react-leaflet-fullscreen';

import {cn} from '@/components/utils';

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
  return (
    <div className={cn('map h-full w-full', className)} data-testid="Map">
      <MapContainer className="h-full w-full rounded-lg" center={[51.505, -0.09]} zoom={13} zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine />
        <MapSearch />
        {/* <LocationMarker /> */}
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
        <FullscreenControl forceSeparateButton={true} position="topright" />
      </MapContainer>
    </div>
  );
};

Map.displayName = 'Map';

export default Map;
