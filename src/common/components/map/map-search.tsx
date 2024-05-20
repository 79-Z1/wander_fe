import {FC, useEffect} from 'react';
import L, {LeafletEvent} from 'leaflet';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import {useMapEvents} from 'react-leaflet';

import {IComponentBaseProps} from '@/common/interfaces';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import 'leaflet-routing-machine';

export type TMapSearchProps = IComponentBaseProps & {
  onSearch?: (searchResult: LeafletEvent) => void;
};

const MapSearch: FC<TMapSearchProps> = ({onSearch}) => {
  const map = useMapEvents({});

  function searchEventHandler(searchResult: LeafletEvent) {
    if (!map) return;
    onSearch?.(searchResult);
  }

  map.on('geosearch/showlocation', searchEventHandler);

  useEffect(() => {
    if (!map) return;

    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
      provider,
      draggable: false,
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
        })
      },
      popupFormat: ({result}: any) => result.label,
      resultFormat: ({result}: any) => result.label,
      searchLabel: 'Nhập địa chỉ...'
    });

    map.addControl(searchControl);

    return () => {
      map?.removeControl(searchControl);
    };
  }, [map]);
  return null;
};

export default MapSearch;
