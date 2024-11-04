import { useState } from 'react';
import { Technician } from '../models/types';

function TechnicianFinder() {
  const [problemDescription, setProblemDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const handleFindTechnicians = async () => {
    if (!problemDescription.trim()) {
      alert('Please describe your RV issue');
      return;
    }

    setLoading(true);
    try {
      // Simulated API call
      const mockTechnicians: Technician[] = [
        {
          id: '1',
          name: 'John Smith',
          specialties: ['Engine Repair', 'Electrical Systems'],
          rating: 4.8,
          location: { latitude: 37.7749, longitude: -122.4194 },
          availability: true
        }
      ];
      setTechnicians(mockTechnicians);
    } catch (error) {
      alert('Failed to find technicians. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTechnician = async (technician: Technician) => {
    const confirmed = window.confirm(`Would you like to book ${technician.name}?`);
    
    if (confirmed) {
      try {
        // Simulated booking API call
        alert(`Successfully booked ${technician.name}. They will contact you shortly.`);
      } catch (error) {
        alert('Failed to book technician. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Find RV Technicians</h2>
      
      <div className="mb-6">
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Describe your RV issue..."
          className="w-full p-3 border rounded-lg"
          rows={4}
        />
        <button
          onClick={handleFindTechnicians}
          className="w-full mt-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Find Technicians
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-600">Searching for technicians...</p>
      )}

      <div className="space-y-4">
        {technicians.map((technician) => (
          <div key={technician.id} className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-bold">{technician.name}</h3>
              <p className="text-gray-600">{technician.specialties.join(', ')}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">{technician.rating}</span>
                <span className="text-yellow-500 ml-1">⭐</span>
              </div>
            </div>
            <div className="ml-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                technician.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {technician.availability ? 'Available' : 'Busy'}
              </span>
              {technician.availability && (
                <button
                  onClick={() => handleBookTechnician(technician)}
                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Book
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicianFinder;