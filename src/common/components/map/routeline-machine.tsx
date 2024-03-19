import {FC, useEffect, useState} from 'react';
import L from 'leaflet';
import {useMap} from 'react-leaflet';

import {IComponentBaseProps} from '@/common/interfaces';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import 'leaflet-routing-machine';

export type TRoutingMachineProps = IComponentBaseProps;

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
});

const RoutingMachine: FC<TRoutingMachineProps> = () => {
  const map = useMap();
  const [waypoints, setWaypoints] = useState([]); // Initially null

  useEffect(() => {
    if (!map) return;

    let routingControl: any;

    const updateRoutingControl = () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }

      if (waypoints && waypoints.length >= 2) {
        routingControl = L.Routing.control({
          waypoints: waypoints,
          routeWhileDragging: true,
          showAlternatives: false,
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
    };

    // Update routing control when waypoints change
    updateRoutingControl();

    // Click handler for adding waypoints
    map.on('click', e => {
      if (waypoints.length >= 2) {
        setWaypoints([waypoints[1], L.latLng(e.latlng)] as any); // Keep only the last two
      } else {
        setWaypoints(prevWaypoints => [...prevWaypoints, L.latLng(e.latlng)] as any);
      }
    });

    return () => {
      if (routingControl) map.removeControl(routingControl);
    };
  }, [map, waypoints]);

  return null;
};

export default RoutingMachine;
