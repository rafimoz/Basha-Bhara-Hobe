import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home';
import Register from './pages/Signup';
import Login from './pages/Login';
import ViewAds from './pages/ViewAds';
import UserPanel from './pages/UserPanel';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Expense from './pages/Expense';
import Getstarted from './pages/Getstarted';
import RenterPublic from './pages/RenterPublic';

function App() {
  return (
    <HelmetProvider>
    <>
      <Analytics />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/getstarted" element={<Getstarted />} />
        <Route path="/renter" element={<RenterPublic />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rents/:id" element={<ViewAds />} />

        {/* Protected Nested User Panel */}
        <Route path="/user/:id" element={<UserPanel />}>
          <Route path="allunits" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="expense" element={<Expense />} />
        </Route>

        {/* Fallback (Optional) */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
    </HelmetProvider>
  );
}

export default App;