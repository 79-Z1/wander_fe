import {FC, useEffect, useState} from 'react';
import L, {LatLng} from 'leaflet';
import {useMap} from 'react-leaflet';

import {IComponentBaseProps} from '@/common/interfaces';

import icon from './icon';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import 'leaflet-routing-machine';

export type TRoutingMachineProps = IComponentBaseProps & {
  currentUserLatLng?: LatLng;
  onWaypointsChange?: (waypoints: LatLng[]) => void;
};

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
});

const RoutingMachine: FC<TRoutingMachineProps> = ({currentUserLatLng}) => {
  const map = useMap();
  const [waypoints, setWaypoints] = useState([]);
  const [waypointLabel, setWaypointLabel] = useState('');

  useEffect(() => {
    if (!map) return;
    let routingControl: any;
    if (waypoints.length >= 2) {
      routingControl = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: false,
        showAlternatives: false,
        plan: L.Routing.plan(waypoints, {
          createMarker: function (i, wp) {
            if (i === 0) {
              return false;
            }
            return L.marker(wp.latLng, {
              draggable: false,
              icon: icon,
              title: waypointLabel
            });
          },
          routeWhileDragging: false,
          draggableWaypoints: false
        }),
        lineOptions: {
          styles: [{color: '#F97316', weight: 4}],
          extendToWaypoints: true,
          missingRouteTolerance: 0.5
        },
        router: L.Routing.mapbox(
          'pk.eyJ1IjoibXhwbG4iLCJhIjoiY2w1enJncTh0MTFmbjNvb2Fvdzl6amM2dyJ9.Usq623OFkH6E8RMsIKZLgA',
          {}
        )
      }).addTo(map);
    }
    // // Click handler for adding waypoints
    // map.on('click', e => {
    //   if (waypoints.length >= 2) {
    //     setWaypoints([waypoints[1], L.latLng(e.latlng)] as any);
    //   } else {
    //     setWaypoints(prevWaypoints => [...prevWaypoints, L.latLng(e.latlng)] as any);
    //   }
    // });

    function searchEventHandler(searchResult: any) {
      if (routingControl != null) map?.removeControl(routingControl);
      setWaypointLabel(searchResult.location.label);
      setWaypoints([currentUserLatLng, L.latLng(searchResult.marker._latlng)] as any);
    }

    map.on('geosearch/showlocation', searchEventHandler);

    return () => {
      if (routingControl) map?.removeControl(routingControl);
    };
  }, [map, waypoints]);

  return null;
};

export default RoutingMachine;
