import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Add from "../components/Add";

const Dashboard = () => {
  const { id: ownerId } = useParams();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState({}); // Initialize as object for safety
  const [addUnit, setAddUnit] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [refreshAds, setRefreshAds] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const fetchAds = async () => {
    try {
      const res = await axios.get(backendURL + `/api/ads/${ownerId}`);
      setAds(res.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(backendURL + `/api/user/${ownerId}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchQRCode = async () => {
    try {
      const res = await axios.get(backendURL + `/api/qrcode/${ownerId}`);
      setQrCode(res.data.qr);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this unit?")) { // Good practice for confirmation
      try {
        await axios.delete(backendURL + `/api/ads/${id}`);
        fetchAds();
      } catch (error) {
        console.error("Error deleting ad:", error);
      }
    }
  };

  const toggleRefreshAds = () => {
    setRefreshAds((prev) => !prev);
  };

  useEffect(() => {
    fetchAds();
    fetchQRCode();
    fetchUser();
  }, [refreshAds, ownerId]); // Added ownerId to dependencies

  return (
    // Applied a light background and a modern sans-serif font
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Add Unit Component Overlay (Subtle blur and opacity) */}
      <AnimatePresence>
        {addUnit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            // Adjusted backdrop for a softer look
            className="fixed inset-0 z-20 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 sm:p-6"
          >
            <Add
              toggleRefreshAds={toggleRefreshAds}
              setAddUnit={(value) => {
                setAddUnit(value);
                if (!value) {
                  setSelectedAd(null);
                }
              }}
              ad={selectedAd}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      {/* Added more structured header with padding and shadow */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        {/* Welcome Text - slightly refined font size and weight */}
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome! <span className="font-bold">{user.name}</span> {/* Fallback for user.name */}
        </h1>
        <div className="w-10 h-10 rounded-full bg-amber-300 overflow-hidden">
          <img className="object-cover" src={user.image} alt="" srcset="" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6"> {/* Increased overall padding */}
        {/* "All Units" Title - Slightly larger and more defined */}
        <h2 className="text-4xl font-bold mb-8 text-gray-900">All Units</h2>
        <div className="flex justify-between mb-5"> {/* Spaced out buttons */}
          {/* QR Code Button - PRESERVED ORIGINAL STYLING */}
          <a href={qrCode} download="qr-code.png">
            <button className="border border-black p-1.5 rounded-full px-3 cursor-pointer">QR Code</button>
          </a>
          {/* Add New Unit Button - PRESERVED ORIGINAL STYLING */}
          <button onClick={() => setAddUnit(true)} className="border border-black bg-black text-white p-1.5 rounded-full px-3 cursor-pointer">Add New</button>
        </div>

        {/* Conditional rendering for no units */}
        {ads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-sm text-gray-500">
            <p className="text-lg mb-4">No units added yet.</p>
            <button
              onClick={() => setAddUnit(true)}
              className="px-6 py-3 bg-black text-white rounded-full shadow-md hover:opacity-80 transition-opacity" // Reusing your Add New button style or similar
            >
              Add Your First Unit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap */}
            {ads.map((ad) => (
              <motion.div
                key={ad._id}
                initial={{ opacity: 0, y: 20 }} // Animation for card entry
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                // Card Styling - softer shadow, more rounded
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  {/* Image display - kept as is for scroll functionality */}
                  <div className="flex overflow-x-scroll no-scrollbar sm:h-60 h-70">
                    {ad.images.length > 0 ? (
                      ad.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Ad image ${index + 1}`}
                          className="h-full w-full object-cover flex-shrink-0"
                        />
                      ))
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>
                  {/* Price badge - PRESERVED ORIGINAL STYLING */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-full font-bold sm:text-sm text-lg">
                    ৳ {ad.price}
                  </div>
                  {/* Image slider dots - PRESERVED ORIGINAL STYLING */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {ad.images.map((_, index) => (
                      <span
                        key={index}
                        className="w-3 h-3 bg-white rounded-full border border-gray-300"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-5"> {/* Increased internal padding for text */}
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{ad.title}</h3>
                  {/* Description - Added line-clamp for consistency if plugin is used */}
                  <p className="text-gray-600 text-base mb-3 line-clamp-3">{ad.description}</p>
                  {/* Move-in Date */}
                  <p className="text-gray-700 text-sm mb-4">
                    Move-in: <span className="font-semibold">{new Date(ad.moveInDate).toLocaleDateString()}</span>
                  </p>
                  {/* Availability Badge - Modernized subtle style */}
                  <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${ad.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {ad.availability ? "Available" : "Unavailable"}
                  </div>

                  <div className="flex flex-col mt-6 gap-3"> {/* Increased gap for buttons */}
                    {/* Edit Button - PRESERVED ORIGINAL STYLING */}
                    <button
                      onClick={() => {
                        setSelectedAd(ad);
                        setAddUnit(true);
                      }}
                      className="border-2 border-green-500 text-green-500 w-full py-2 rounded-3xl hover:bg-green-500 hover:text-white transition"
                    >
                      Edit
                    </button>
                    {/* Delete Button - PRESERVED ORIGINAL STYLING */}
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 text-white w-full py-2 rounded-3xl hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;