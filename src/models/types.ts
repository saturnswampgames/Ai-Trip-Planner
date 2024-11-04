export interface TripLocation {
  latitude: number;
  longitude: number;
  name: string;
  type: 'campground' | 'gas_station' | 'service_point';
  amenities?: string[];
  pricing?: number;
  discounts?: string[];
}

export interface RVSpecs {
  height: number;
  weight: number;
  length: number;
  type: string;
  fuelType: 'diesel' | 'gas';
}

export interface Technician {
  id: string;
  name: string;
  specialties: string[];
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  availability: boolean;
}