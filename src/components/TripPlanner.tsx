import { useState } from 'react';
import { TripLocation } from '../models/types';

function TripPlanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<TripLocation[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated API call
    setSuggestions([
      {
        name: 'Sample Campground',
        type: 'campground',
        latitude: 37.7749,
        longitude: -122.4194,
        pricing: 45,
        amenities: ['Full Hookups', 'WiFi', 'Pool'],
        discounts: ['Good Sam 10%']
      }
    ]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where would you like to go?"
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {suggestions.map((location, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">{location.name}</h3>
            <p className="text-gray-600">
              {location.amenities?.join(', ')}
            </p>
            <p className="text-green-600">${location.pricing}/night</p>
            {location.discounts && (
              <p className="text-blue-500 text-sm">
                Available discounts: {location.discounts.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripPlanner;