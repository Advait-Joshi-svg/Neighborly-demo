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
    featured: true
  },
  {
    id: 2,
    title: "Modern 2BHK Near Tech District",
    price: 1800,
    location: "Chicago, IL",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850
  },
  {
    id: 3,
    title: "Luxury Loft with City Views",
    price: 2200,
    location: "San Francisco, CA",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    featured: true
  },
  {
    id: 4,
    title: "Cozy Basement Unit - Quiet Neighborhood",
    price: 960,
    location: "Seattle, WA",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600
  },
  {
    id: 5,
    title: "Spacious 3BR Family Home",
    price: 2400,
    location: "Denver, CO",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200
  },
  {
    id: 6,
    title: "Penthouse with Rooftop Access",
    price: 3200,
    location: "New York, NY",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    featured: true
  },
  {
    id: 7,
    title: "Renovated Craftsman Bungalow",
    price: 1750,
    location: "Portland, OR",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950
  },
  {
    id: 8,
    title: "Waterfront Studio - Great Light",
    price: 1950,
    location: "Miami, FL",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650
  }
];

// Utility functions
export const getFeaturedListings = (): Listing[] => {
  return listings.filter(listing => listing.featured);
};

export const getListingById = (id: number): Listing | undefined => {
  return listings.find(listing => listing.id === id);
};