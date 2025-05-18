import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ViewAds from "./pages/ViewAds";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rents/:ownerId" element={<ViewAds />} />
    </Routes>
  );
}

export default App;