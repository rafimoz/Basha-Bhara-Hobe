import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'; // Example public page
import Register from './pages/Signup'; // Example public page
import Login from './pages/Login'; // Example public page
import ViewAds from './pages/ViewAds'; // Example public page
import UserPanel from './pages/UserPanel'; // Protected page
import Dashboard from './pages/Dashboard'; // Protected page
import Profile from './pages/Profile'; // Protected page
import Expense from './pages/Expense'; // Protected page
import RenterPublic from './pages/RenterPublic'; // Example public page
import ProtectedRoute from "./routes/ProtectedRoute";
import GoogleRedirect from "./pages/GoogleRedirect";


function App() {
  return (
    <HelmetProvider>
      <>
        <Analytics />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/renter" element={<RenterPublic />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rents/:id" element={<ViewAds />} />

          {/* Google OAuth2 callback route */}
          <Route path="/google-auth" element={<GoogleRedirect />} />

          {/* Protected Nested User Panel */}
          <Route path="/user/:id" element={<ProtectedRoute> <UserPanel /> </ProtectedRoute>}>
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