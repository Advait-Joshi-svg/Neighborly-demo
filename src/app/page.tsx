'use client';
import { useState, useMemo, ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import { listings, type Listing } from '../data/listings';
import Image from 'next/image';

// Lazy-loaded components with proper typing
const Map = dynamic(() => import('../components/Map').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />
});

const PriceFilter = dynamic(() => import('../components/PriceFilter').then(mod => mod.default), {
  loading: () => (
    <div className="mb-8 bg-white p-4 rounded-xl shadow-sm">
      <div className="h-[72px] bg-gray-100 rounded animate-pulse" />
    </div>
  )
});

export default function HomePage() {
  const [maxPrice, setMaxPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredListings = useMemo(() => {
    return listings.filter(
      (listing: Listing) => !maxPrice || listing.price <= parseInt(maxPrice)
    );
  }, [maxPrice]);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setMaxPrice(e.target.value);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900">Neighborly Demo</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Find your next rental with confidence.{' '}
            <span className="block sm:inline">
              Browse verified listings with transparent pricing.
            </span>
          </p>
        </div>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm w-full sm:w-auto">
            Get Started
          </button>
        </div>
      </section>

      {/* Price Filter */}
      <section className="mb-8 bg-white p-4 rounded-xl shadow-sm">
        <PriceFilter 
          value={maxPrice}
          onChange={handlePriceChange}
          isLoading={isLoading}
        />
        {maxPrice && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {filteredListings.length} listing{filteredListings.length !== 1 && 's'} under ${maxPrice}
          </p>
        )}
      </section>

      {/* Listings */}
      <section className="mb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(isLoading ? Array(3).fill(null) : filteredListings).map((listing, i) => (
            <div
              key={listing?.id ?? i}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden rounded-md">
                {listing ? (
                  <Image
                    src={`https://source.unsplash.com/random/400x200/?apartment,${listing.id}`}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={listing.id < 3}
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 animate-pulse" />
                )}
              </div>
              <div className="pt-4">
                {listing ? (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">{listing.title}</h2>
                    <p className="text-blue-600 font-medium">${listing.price.toLocaleString()}/mo</p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span className="mr-3">📍 {listing.location ?? 'Unknown'}</span>
                      <span>🛏️ {listing.bedrooms ?? '?'}</span>
                    </div>
                    <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </button>
                  </>
                ) : (
                  <>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Explore Listings on Map</h2>
        </div>
        <div className="h-96 relative">
          <Map listings={filteredListings} />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-12 border-t border-gray-100 pt-6">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>
        <p>Built by Advait Joshi · June 2025</p>
        <p className="mt-1 text-xs">© {new Date().getFullYear()} Neighborly Demo. All rights reserved.</p>
      </footer>
    </main>
  );
}