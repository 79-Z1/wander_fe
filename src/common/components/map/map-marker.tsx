import {FC, useState} from 'react';
import L, {LatLngExpression} from 'leaflet';
import {Marker, Popup, useMapEvents} from 'react-leaflet';

import {IComponentBaseProps} from '@/common/interfaces';

import icon from './icon';

export type TMapMarkerProps = IComponentBaseProps & {
  flyTo?: boolean;
  onClick?: (position: [number, number]) => void;
};

const LocationMarker: FC<TMapMarkerProps> = ({onClick}) => {
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);

  const handleClick = ([lat, lng]: [number, number]) => {
    setPosition?.([lat, lng]);
    onClick?.([lat, lng]);
  };

  const map = useMapEvents({
    click(e: any) {
      const {lat, lng} = e.latlng;
      handleClick([lat, lng]);
      L.marker([lat, lng], {icon}).addTo(map);
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
