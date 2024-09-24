import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { Place } from '../api/Place';
import type { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

interface MapProps {
  place: Place | null;
}

export default function Map({ place }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (place && mapRef.current) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);

  return (
    <MapContainer
      ref={mapRef}
      center={[40.7, -74]}
      zoom={12}
      scrollWheelZoom
      className='h-full'
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
  );
}
