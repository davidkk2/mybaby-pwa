import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DoctorNotes from './pages/DoctorNotes';
import WeekDetail from './pages/WeekDetail';

// A wrapper to handle framer-motion exit animations based on routes
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor" element={<DoctorNotes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/week/:week" element={<WeekDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

// Background blobs component
function Background() {
  return (
    <div className="bg-blobs">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
    </div>
  );
}

function App() {

  return (
    <BrowserRouter>
      <Background />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
