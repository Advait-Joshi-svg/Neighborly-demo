// src/data/listings.ts
export type Listing = {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  featured?: boolean;
  lat: number;
  lng: number;
  image?: string;
};

export const listings: Listing[] = [
  {
    id: 1,
    title: "Sunny Studio in Downtown Austin",
    price: 1200,
    location: "Austin, TX",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 550,
    featured: true,
    lat: 30.2672,
    lng: -97.7431,
    image: "/listings/listing1.jpg"
  },
  {
    id: 2,
    title: "Modern 2BHK Near Tech District",
    price: 1800,
    location: "Chicago, IL",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    lat: 41.8781,
    lng: -87.6298,
    image: "/listings/listing2.jpg"
  },
  {
    id: 3,
    title: "Luxury Loft with City Views",
    price: 2200,
    location: "San Francisco, CA",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    featured: true,
    lat: 37.7749,
    lng: -122.4194,
    image: "/listings/listing3.jpg"
  },
  {
    id: 4,
    title: "Cozy Basement Unit - Quiet Neighborhood",
    price: 960,
    location: "Seattle, WA",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    lat: 47.6062,
    lng: -122.3321,
    image: "/listings/listing4.jpg"
  },
  {
    id: 5,
    title: "Spacious 3BR Family Home",
    price: 2400,
    location: "Denver, CO",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    lat: 39.7392,
    lng: -104.9903,
    image: "/listings/listing5.jpg"
  },
  {
    id: 6,
    title: "Penthouse with Rooftop Access",
    price: 3200,
    location: "New York, NY",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    featured: true,
    lat: 40.7128,
    lng: -74.0060,
    image: "/listings/listing6.jpg"
  },
  {
    id: 7,
    title: "Renovated Craftsman Bungalow",
    price: 1750,
    location: "Portland, OR",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    lat: 45.5152,
    lng: -122.6784,
    image: "/listings/listing7.jpg"
  },
  {
    id: 8,
    title: "Waterfront Studio - Great Light",
    price: 1950,
    location: "Miami, FL",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    lat: 25.7617,
    lng: -80.1918,
    image: "/listings/listing8.jpg"
  }
];

// Utility functions
export const getFeaturedListings = (): Listing[] => {
  return listings.filter(listing => listing.featured);
};

export const getListingById = (id: number): Listing | undefined => {
  return listings.find(listing => listing.id === id);
};
