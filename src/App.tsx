import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TripPlanner from './components/TripPlanner';
import TechnicianFinder from './components/TechnicianFinder';
import NavigationMap from './components/NavigationMap';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TripPlanner />} />
            <Route path="/navigation" element={<NavigationMap />} />
            <Route path="/find-help" element={<TechnicianFinder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;