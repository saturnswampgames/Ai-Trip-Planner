import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { RVSpecs } from '../models/types';

function NavigationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [rvSpecs, setRVSpecs] = useState<RVSpecs>({
    height: 13.5,
    weight: 16000,
    length: 35,
    type: 'Class A',
    fuelType: 'diesel'
  });

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 },
          zoom: 8
        });
      }
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">RV Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (ft)</label>
            <input
              type="number"
              value={rvSpecs.height}
              onChange={(e) => setRVSpecs({ ...rvSpecs, height: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
            <input
              type="number"
              value={rvSpecs.weight}
              onChange={(e) => setRVSpecs({ ...rvSpecs, weight: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Length (ft)</label>
            <input
              type="number"
              value={rvSpecs.length}
              onChange={(e) => setRVSpecs({ ...rvSpecs, length: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div
        ref={mapRef}
        className="w-full h-[600px] rounded-lg shadow"
      ></div>
    </div>
  );
}

export default NavigationMap;