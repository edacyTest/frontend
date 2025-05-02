import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Navbar from './components/Navbar';
import AddUser from './pages/AddUser';
import Contact from './pages/Contact';
import Settings from './pages/Settings';



function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

