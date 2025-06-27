'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { listings, type Listing } from '../data/listings';

// Lazy load the Map component (important for mapbox-gl)
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function HomePage() {
  const [maxPrice, setMaxPrice] = useState('');

  const filteredListings = listings.filter(
    (listing: Listing) => !maxPrice || listing.price <= parseInt(maxPrice)
  );

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <section className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Neighborly Demo</h1>
        <p className="text-gray-600 mt-1">Find your next rental with confidence.</p>
      </section>

      {/* Price Filter */}
      <section className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Max Rent ($):</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="e.g. 1500"
          className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
          />

      </section>

      {/* Listings */}
      <section className="mb-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
            >
              <img
                src={`https://unsplash.it/400/200?random=${listing.id}`}
                alt="Listing"
                className="mb-3 w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold text-gray-800">{listing.title}</h2>
              <p className="text-gray-600">${listing.price}/mo</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="bg-white rounded-xl shadow p-4">
        <Map listings={filteredListings} />
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-8">
        Built by Advait Joshi · June 2025
      </footer>
    </main>
  );
}
