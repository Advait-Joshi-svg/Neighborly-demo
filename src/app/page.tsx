'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { listings, type Listing } from '../data/listings';
import Image from 'next/image';

// Lazy load components with loading states
const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />
});

const PriceFilter = dynamic(() => import('../components/PriceFilter'), {
  loading: () => (
    <div className="mb-8 bg-white p-4 rounded-xl shadow-sm">
      <div className="h-[72px] bg-gray-100 rounded animate-pulse" />
    </div>
  )
});
export default function HomePage() {
  const [maxPrice, setMaxPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Memoized filtered listings for performance
  const filteredListings = useMemo(() => {
    return listings.filter(
      (listing: Listing) => !maxPrice || listing.price <= parseInt(maxPrice)
    );
  }, [maxPrice]);

  // Handle price filter with debounce
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setMaxPrice(e.target.value);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header with CTA */}
      <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Neighborly Demo</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Find your next rental with confidence. <span className="block sm:inline">Browse verified listings with transparent pricing.</span>
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
          Get Started
        </button>
      </section>

      {/* Price Filter with improved UX */}
      <section className="mb-8 bg-white p-4 rounded-xl shadow-sm">
        <PriceFilter 
          value={maxPrice}
          onChange={handlePriceChange}
          isLoading={isLoading}
        />
        {maxPrice && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {filteredListings.length} listings under ${maxPrice}
          </p>
        )}
      </section>

      {/* Listings with skeleton loading */}
      <section className="mb-10">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4">
                <div className="bg-gray-200 h-48 rounded-md animate-pulse mb-3" />
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`https://source.unsplash.com/random/400x200/?apartment,${listing.id}`}
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={listing.id < 3}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">{listing.title}</h2>
                  <p className="text-blue-600 font-medium">${listing.price.toLocaleString()}/mo</p>
                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <span className="mr-3">📍 {listing.location}</span>
                    <span>🛏️ {listing.bedrooms}</span>
                  </div>
                  <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Map Section with improved layout */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Explore Listings on Map</h2>
        </div>
        <div className="h-96 relative">
          <Map listings={filteredListings} />
        </div>
      </section>

      {/* Enhanced Footer */}
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