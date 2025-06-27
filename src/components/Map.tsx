'use client';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import type { Listing } from '../data/listings'; // adjust path if needed

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function Map({ listings }: { listings: Listing[] }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-95.7129, 37.0902],
      zoom: 3,
    });

    listings.forEach((listing) => {
      new mapboxgl.Marker()
        .setLngLat([listing.lng, listing.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3>${listing.title}</h3><p>$${listing.price}/mo</p>`
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [listings]);

  return <div ref={mapContainer} className="h-[500px] w-full my-4 rounded-xl" />;
}
