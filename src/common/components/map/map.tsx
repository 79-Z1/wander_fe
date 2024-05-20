'use client';
import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Leaflet, {LeafletEvent} from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {FullscreenControl} from 'react-leaflet-fullscreen';
import {ILocationSearch} from '@/common/entities';

import {Loading} from '@/core-ui';

import {cn} from '@/components/utils';

import useGeolocation from '@/common/hooks/use-geo-location';

import {IComponentBaseProps} from '@/common/interfaces';

import MarkerIcon from '../../../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../../../../node_modules/leaflet/dist/images/marker-shadow.png';

import MapSearch from './map-search';
import RoutingMachine from './routeline-machine';

// import RoutingMachine from './routeline-machine';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-fullscreen/styles.css';
import 'leaflet-geosearch/dist/geosearch.css';

export type TMapProps = IComponentBaseProps & {
  defaultLocation?: ILocationSearch;
  isWayPoints?: boolean;
  onSearch?: (searchResult: LeafletEvent) => void;
};

const Map: FC<TMapProps> = ({className, defaultLocation, isWayPoints = false, onSearch}) => {
  const searchParams = useSearchParams();
  const {data, isLoading} = useGeolocation();
  const [defaultValue, setDefaultValue] = useState<ILocationSearch | undefined>();
  const [isSearched, setIsSearched] = React.useState(false);

  useEffect(() => {
    const lat = Number(searchParams?.get('lat'));
    const lng = Number(searchParams?.get('lng'));
    const address = searchParams?.get('address') || '';
    if (lat && lng) setDefaultValue({lat, lng, address});
    else if (defaultLocation) setDefaultValue(defaultLocation);
  }, []);

  if (isLoading) return <Loading />;

  function handleSearch(e: any) {
    if (e) setIsSearched(true);
    onSearch?.(e);
  }

  return (
    <div className={cn('map h-full w-full', className)} data-testid="Map">
      <MapContainer
        className="!z-1 h-full w-full rounded-lg"
        center={
          defaultValue?.lat !== undefined && defaultValue?.lng !== undefined
            ? [defaultValue.lat as number, defaultValue.lng as number]
            : [data?.latitude as number, data.longitude as number]
        }
        zoom={13}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapSearch onSearch={handleSearch} />
        {isWayPoints && (
          <RoutingMachine currentUserLatLng={Leaflet.latLng(data?.latitude || 0, data?.longitude || 0)} />
        )}
        {/* <LocationMarker onClick={handleLocationMarkerClick} /> */}
        {!isSearched && defaultValue && (
          <Marker
            position={[defaultValue.lat as number, defaultValue.lng as number]}
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
            <Popup>{defaultValue.address}</Popup>
          </Marker>
        )}
        <Marker
          position={[data?.latitude as number, data.longitude as number]}
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
