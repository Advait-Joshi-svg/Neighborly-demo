export type Listing = {
  id: number;
  title: string;
  price: number;
  lat: number;
  lng: number;
};

export const listings: Listing[] = [
  {
    id: 1,
    title: "Sunny Studio in Austin",
    price: 1200,
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    id: 2,
    title: "2BHK Downtown Chicago",
    price: 1800,
    lat: 41.8781,
    lng: -87.6298,
  },
  {
    id: 3,
    title: "Basement Unit in Seattle",
    price: 950,
    lat: 47.6062,
    lng: -122.3321,
  },
  {
    id: 4,
    title: "1BR San Francisco Loft",
    price: 2200,
    lat: 37.7749,
    lng: -122.4194,
  },
];
