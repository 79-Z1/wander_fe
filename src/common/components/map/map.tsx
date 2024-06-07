'use client';
import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import Leaflet, {LeafletEvent} from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {FullscreenControl} from 'react-leaflet-fullscreen';
import {ILocationSearch} from '@/common/entities';

import LoadingSection from '@/core-ui/loading/loading-section';

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
  const [location, setLocation] = useState<ILocationSearch | undefined>(defaultLocation);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const lat = Number(searchParams?.get('lat'));
    const lng = Number(searchParams?.get('lng'));
    const address = searchParams?.get('address') || '';
    if (lat && lng) {
      setLocation({lat, lng, address});
    } else if (defaultLocation) {
      setLocation(defaultLocation);
    }
  }, [defaultLocation, searchParams]);

  const handleSearch = (e: LeafletEvent) => {
    if (e) setIsSearched(true);
    onSearch?.(e);
  };

  if (isLoading) return <LoadingSection />;

  return (
    <div className={cn('map h-full w-full', className)} data-testid="Map">
      <MapContainer
        className="!z-1 h-full w-full rounded-lg"
        center={
          location && location?.lat && location?.lng
            ? [location?.lat as number, location?.lng as number]
            : data?.latitude && data?.longitude
              ? [data?.latitude as number, data?.longitude as number]
              : [15.9266657, 107.9650855]
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
        {!isSearched && location && (
          <Marker
            position={[location?.lat as number, location?.lng as number]}
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
            <Popup>{location.address}</Popup>
          </Marker>
        )}
        {data.latitude && data.longitude && (
          <Marker
            position={[data.latitude, data.longitude]}
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
        )}
        <FullscreenControl forceSeparateButton={true} position="topright" />
      </MapContainer>
    </div>
  );
};

Map.displayName = 'Map';

export default Map;
