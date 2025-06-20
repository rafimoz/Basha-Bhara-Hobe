import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Signup';
import Login from './pages/Login';
import ViewAds from './pages/ViewAds';
import UserPanel from './pages/UserPanel';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rents/:id" element={<ViewAds />} />

      {/* Protected Nested User Panel */}
      <Route path="/user/:id" element={<UserPanel />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Fallback (Optional) */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;