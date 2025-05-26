import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Add from "../components/Add";

const Dashboard = () => {
  const ownerId = "owner123"; // hardcoded for now
  const [ads, setAds] = useState([]);
  const [addUnit, setAddUnit] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [refreshAds, setRefreshAds] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const fetchAds = async () => {
    const res = await axios.get(`http://localhost:5000/api/ads/${ownerId}`);
    setAds(res.data);
  };

  const fetchQRCode = async () => {
    const res = await axios.get(`http://localhost:5000/api/qrcode/${ownerId}`);
    setQrCode(res.data.qr);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/ads/${id}`);
    fetchAds();
  };

  const toggleRefreshAds = () => {
    setRefreshAds((prev) => !prev);
  };

  useEffect(() => {
    fetchAds();
    fetchQRCode();
  }, [refreshAds]);

  return (
    <div>
      {/*Add Unit Component*/}
      <AnimatePresence>
        {addUnit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-20 backdrop-blur-xs bg-black/10 flex items-center justify-center p-5 "
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

      <div className="p-6 space-y-4">
        <h1 className="text-5xl font-bold sm:mb-10 mt-5 mb-10">All Units</h1>
        <div className="flex w-full justify-between">
          <a href={qrCode} download="qr-code.png">
            <button className="border border-black p-1 rounded-full px-3 cursor-pointer">QR Code</button>
          </a>
          {/* Button clicked then the Add unit component will be visible */}
          <button onClick={() => setAddUnit(true)} className="border border-black bg-black text-white p-1 rounded-full px-3 cursor-pointer">Add New <span>+</span></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ads.map((ad) => (
            <div key={ad._id} className="bg-white rounded-xl overflow-hidden shadow-xl border-2 border-black/20 p-0">
              <div className="relative">
                <div className="flex overflow-x-scroll no-scrollbar sm:h-60 h-70">
                  {ad.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Ad image ${index + 1}`}
                      className="h-full w-full object-cover flex-shrink-0"
                    />
                  ))}
                </div>
                {/* Image slider dots */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {ad.images.map((_, index) => (
                    <span
                      key={index}
                      className="w-3 h-3 bg-white rounded-full border border-gray-300"
                    />
                  ))}
                </div>
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-full font-bold sm:text-sm text-lg">
                  ৳ {ad.price}
                </div>
              </div>

              <div className="p-4">
                <h3 className="sm:text-3xl text-2xl font-bold mb-1">{ad.title}</h3>
                <p className="text-gray-600 sm:text-xl text-sm">{ad.description}</p>
                <p className="mb-1">
                  Move-in: <span className="font-semibold">{new Date(ad.moveInDate).toDateString()}</span>
                </p>
                <div className={`border w-fit px-3 py-1 text-sm font-medium text-white rounded-full ${ad.availability ? 'bg-green-500' : 'bg-red-500'}`}>
                  {ad.availability ? <p>Available</p> : <p>Unvailable</p>}
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <button
                    onClick={() => {
                      setSelectedAd(ad);
                      setAddUnit(true);
                    }}
                    className="border-2 border-green-500 text-green-500 w-full py-2 rounded-3xl hover:bg-green-500 hover:text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="bg-red-500 text-white w-full py-2 rounded-3xl hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
