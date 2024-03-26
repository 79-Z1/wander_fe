import {FC, useEffect} from 'react';
import L from 'leaflet';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import {useMap} from 'react-leaflet';

import {IComponentBaseProps} from '@/common/interfaces';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import 'leaflet-routing-machine';

export type TMapSearchProps = IComponentBaseProps;

const MapSearch: FC<TMapSearchProps> = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    function searchEventHandler(result: any) {
      // console.log(result.location);
    }

    map.on('geosearch/showlocation', searchEventHandler);

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
      searchLabel: 'Enter address'
    });

    map.addControl(searchControl);

    return () => {
      map?.removeControl(searchControl);
    };
  }, [map]);
  return null;
};

export default MapSearch;
