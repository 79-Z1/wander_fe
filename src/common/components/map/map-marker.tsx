import {useState} from 'react';
import L from 'leaflet';
import {Marker, Popup, useMapEvents} from 'react-leaflet';

import icon from './icon';

function LocationMarker() {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e: any) {
      setPosition(e?.latlng); // Store latlng from 'locationfound'
      //   const {lat, lng} = e.latlng;
      //   L.marker([lat, lng], {icon}).addTo(map);
      //   map.locate();
    },
    locationfound(e: any) {
      setPosition(e?.latlng); // Store latlng from 'locationfound'
      //   map.flyTo(e.latlng, map.getZoom());
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
