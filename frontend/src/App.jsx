import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ViewAds from "./pages/ViewAds";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SideBar from "./components/SideBar";

function App() {
  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/rents/:ownerId" element={<ViewAds />} />
      </Routes>
  );
}

export default App;