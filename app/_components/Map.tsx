'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Offer = {
  id: number;
  link: string;
  imageUrl: string;
  lat: number;
  lon: number;
};

const markerIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const highlightedMarkerIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map({
  offers,
  hoveredId,
}: {
  offers: Offer[];
  hoveredId: number | null;
}) {
  const [mounted, setMounted] = useState(false);

  const validOffers = useMemo(
    () => offers.filter((offer) => offer.lat && offer.lon),
    [offers],
  );

  const { avgLat, avgLon } = useMemo(() => {
    if (validOffers.length === 0) return { avgLat: 0, avgLon: 0 };
    return {
      avgLat:
        validOffers.reduce((sum, offer) => sum + offer.lat, 0) /
        validOffers.length,
      avgLon:
        validOffers.reduce((sum, offer) => sum + offer.lon, 0) /
        validOffers.length,
    };
  }, [validOffers]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='w-full h-[400px] md:h-[600px] lg:h-[800px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center'>
        <p className='text-gray-600 dark:text-gray-400'>Loading map...</p>
      </div>
    );
  }

  if (validOffers.length === 0) {
    return (
      <div className='w-full h-[400px] md:h-[600px] lg:h-[800px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center'>
        <p className='text-gray-600 dark:text-gray-400'>
          No houses with location data found.
        </p>
      </div>
    );
  }

  return (
    <div className='w-full px-0 [@media(orientation:landscape)]:px-4 md:[@media(orientation:landscape)]:px-0'>
      <MapContainer
        center={[avgLat, avgLon]}
        zoom={13}
        className='h-[400px] md:h-[600px] lg:h-[800px] rounded-lg shadow-lg z-0'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {validOffers.map((offer) => (
          <Marker
            key={offer.id}
            position={[offer.lat, offer.lon]}
            icon={offer.id === hoveredId ? highlightedMarkerIcon : markerIcon}
          >
            <Popup minWidth={260} maxWidth={325}>
              <div className='text-center'>
                <a
                  href={offer.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm mb-2 block'
                >
                  View Offer
                </a>
                <img
                  src={offer.imageUrl}
                  alt={`House ${offer.id}`}
                  className='h-auto rounded'
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
