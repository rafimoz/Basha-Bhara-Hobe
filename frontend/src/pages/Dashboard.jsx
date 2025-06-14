import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Add from "../components/Add";
import QrCode from "../components/QrCode";

const Dashboard = () => {
  const { id: ownerId } = useParams();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState({});
  const [addUnit, setAddUnit] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [seeQrCode, setSeeQrCode] = useState(false);
  const [refreshAds, setRefreshAds] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/login");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (userId !== ownerId) {
      navigate("/login");
      return;
    }

    fetchAds();
    fetchQRCode();
    fetchUser();
  }, [refreshAds, ownerId, navigate]);

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

  return (
    // Applied a light background and a modern sans-serif font
    <div className="min-h-screen dark:bg-bg-dark bg-bg-light font-sans">
      {/* Add Unit Component Overlay (Subtle blur and opacity) */}
      <AnimatePresence>
        {addUnit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            // Adjusted backdrop for a softer look
            className="fixed inset-0 z-20 dark:bg-black/10 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
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

      <AnimatePresence>
        {seeQrCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            // Adjusted backdrop for a softer look
            className="fixed inset-0 z-20 dark:bg-black/10 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            {/*Qr Code Pop Up*/}
            <QrCode qrImage={qrCode} seeQrCode={setSeeQrCode} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Section */}
      <nav className="sticky top-0 w-full bg-nav-light dark:bg-nav-dark backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/*Logo*/}
            <div className="flex items-center gap-2 cursor-default">
              <div className='w-7 h-fit'>
                <svg className='dark:block hidden' viewBox="0 0 271 326" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M267.997 60.793L265.006 319H169.662V6.34766L267.997 60.793Z" fill="#B0B0B0" stroke="#B0B0B0" />
                  <path d="M70 60.869V151.869V321.869H267V60.869L168.5 4L70 60.869Z" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                  <path d="M168.5 4.36902V320.869" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                  <path d="M135 22.869L135 320.869" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                  <path d="M105 39.869L105 320.869" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                  <rect x="210" y="58.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                  <rect x="210" y="112.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                  <rect x="210" y="166.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                  <rect x="210" y="220.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                  <rect x="210" y="274.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                  <rect y="172" width="154" height="154" rx="20" fill="#B0B0B0" />
                  <rect x="8" y="181" width="137" height="137" rx="11" fill="#2C2C2C" />
                  <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.596 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.721 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.846 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="#B0B0B0" />
                  <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="#B0B0B0" />
                  <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="#B0B0B0" />
                  <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="#B0B0B0" />
                  <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="#B0B0B0" />
                  <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="#B0B0B0" />
                  <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.312C46.103 292.312 41.3936 292.312 36.5415 292.312C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="#B0B0B0" />
                  <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.812C114.603 223.812 109.894 223.812 105.042 223.812C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="#B0B0B0" />
                  <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.812C46.103 223.812 41.3936 223.812 36.5415 223.812C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="#B0B0B0" />
                  <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="#B0B0B0" />
                  <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="#B0B0B0" />
                  <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="#B0B0B0" />
                  <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="#B0B0B0" />
                  <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="#B0B0B0" />
                  <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="#B0B0B0" />
                  <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="#B0B0B0" />
                  <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="#B0B0B0" />
                  <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="#B0B0B0" />
                </svg>
                <svg className='dark:hidden block' viewBox="0 0 271 326" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M267.997 60.793L265.006 319H169.662V6.34766L267.997 60.793Z" fill="#424242" stroke="#424242" />
                  <path d="M70 60.869V151.869V321.869H267V60.869L168.5 4L70 60.869Z" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                  <path d="M168.5 4.36902V320.869" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                  <path d="M135 22.869L135 320.869" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                  <path d="M105 39.869L105 320.869" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                  <rect x="210" y="58.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                  <rect x="210" y="112.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                  <rect x="210" y="166.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                  <rect x="210" y="220.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                  <rect x="210" y="274.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                  <rect y="172" width="154" height="154" rx="20" fill="#424242" />
                  <rect x="8" y="181" width="137" height="137" rx="11" fill="#F5F7FA" />
                  <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.596 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.721 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.846 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="#424242" />
                  <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="#424242" />
                  <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="#424242" />
                  <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="#424242" />
                  <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="#424242" />
                  <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="#424242" />
                  <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.312C46.103 292.312 41.3936 292.312 36.5415 292.312C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="#424242" />
                  <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.812C114.603 223.812 109.894 223.812 105.042 223.812C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="#424242" />
                  <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.812C46.103 223.812 41.3936 223.812 36.5415 223.812C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="#424242" />
                  <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="#424242" />
                  <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="#424242" />
                  <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="#424242" />
                  <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="#424242" />
                  <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="#424242" />
                  <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="#424242" />
                  <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="#424242" />
                  <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="#424242" />
                  <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="#424242" />
                </svg>
              </div>
              <span className="sm:text-xl text-sm font-bold text-subtitle-light dark:text-subtitle-dark uppercase">Welcome, <span>{user.name}☺️</span></span>
            </div>

            {/*PFP and Logout Button*/}
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("userId");
                navigate("/login");
              }} className="border dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light dark:hover:bg-subtitle-dark hover:bg-subtitle-light dark:hover:text-title-light hover:text-title-dark p-1.5 rounded-full px-3 cursor-pointer">
                Logout</button>
              <div onClick={() => navigate(`/profile/${ownerId}`)} className="w-10 h-10 rounded-full bg-subtitle-dark dark:bg-subtitle-light overflow-hidden cursor-pointer hover:border-2 dark:border-subtitle-dark border-subtitle-light">
                <img className="object-cover" src={user.image} alt="" srcset="" />
              </div>
            </div>

            {/* Mobile Burger Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="dark:text-subtitle-dark dark:hover:text-subtitle-dark/50 text-subtitle-light hover:text-subtitle-light/50 focus:outline-none focus:text-subtitle-dark"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href={`/profile/${ownerId}`}
              className="block px-3 py-2 rounded-md text-base font-medium dark:text-subtitle-dark dark:hover:text-subtitle-light dark:hover:bg-subtitle-dark text-subtitle-light hover:bg-subtitle-light/20"
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              Profile
            </a>
            <button onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("userId");
              navigate("/login");
            }} className="w-full text-left dark:bg-subtitle-dark dark:text-white dark:hover:bg-subtitle-dark/60 bg-subtitle-light/70 text-white hover:bg-subtitle-light px-3 py-2 rounded-md text-base font-medium transition-colors mt-2">
              Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg-py-8 sm:px-6 lg:px-8"> {/* Increased overall padding */}
        {/* "All Units" Title - Slightly larger and more defined */}
        <h2 className="text-4xl font-bold mb-8 dark:text-title-dark text-title-light">All Units</h2>
        <div className="flex justify-between mb-5"> {/* Spaced out buttons */}
          {/* QR Code Button - PRESERVED ORIGINAL STYLING */}
          <button onClick={() => setSeeQrCode(true)} className="border dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light dark:hover:bg-subtitle-dark hover:bg-subtitle-light dark:hover:text-title-light hover:text-title-dark p-1.5 rounded-full px-3 cursor-pointer">QR Code</button>
          {/* Add New Unit Button - PRESERVED ORIGINAL STYLING */}
          <button onClick={() => setAddUnit(true)} className="border dark:border-subtitle-dark border-subtitle-light dark:bg-subtitle-dark bg-subtitle-light dark:text-title-light text-title-dark p-1.5 rounded-full px-3 cursor-pointer">Add New</button>
        </div>

        {/* Conditional rendering for no units */}
        {ads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 dark:bg-card-dark bg-card-light rounded-xl shadow-sm dark:text-subtitle-dark text-subtitle-light">
            <p className="text-lg mb-4">No units added yet.</p>
            <button
              onClick={() => setAddUnit(true)}
              className="px-6 py-3 dark:bg-subtitle-dark bg-subtitle-light dark:text-title-light text-title-dark rounded-full shadow-md hover:opacity-80 transition-opacity" // Reusing your Add New button style or similar
            >
              Add Your First Unit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"> {/* Increased gap */}
            {ads.map((ad) => (
              <motion.div
                key={ad._id}
                initial={{ opacity: 0, y: 20 }} // Animation for card entry
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                // Card Styling - softer shadow, more rounded
                className="dark:bg-card-dark bg-card-light rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  {/* Image display - kept as is for scroll functionality */}
                  <div className="flex overflow-x-scroll no-scrollbar sm:h-55 h-70">
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
                      <div className="w-full h-full dark:bg-description-dark/50 bg-description-light/50 flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>
                  {/* Price badge - PRESERVED ORIGINAL STYLING */}
                  <div
                    className="absolute top-4 right-4 text-white w-15 h-15 flex justify-center items-center rounded-full font-bold sm:text-xs text-sm"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 53 53'><path d='M26.5 0L30.6682 4.20224L36.0729 1.78949L38.4416 7.21367L44.3529 6.91626L44.6022 12.8298L50.2218 14.6879L48.3181 20.2922L52.887 24.0549L49.0872 28.593L51.9884 33.7521L46.8059 36.6111L47.6475 42.4698L41.7821 43.2637L40.4505 49.0308L34.6944 47.6522L31.3694 52.5488L26.5 49.184L21.6306 52.5488L18.3056 47.6522L12.5495 49.0308L11.2179 43.2637L5.35254 42.4698L6.19412 36.6111L1.01162 33.7521L3.91277 28.593L0.113045 24.0549L4.68195 20.2922L2.77817 14.6879L8.39778 12.8298L8.64707 6.91626L14.5584 7.21367L16.9271 1.78949L22.3318 4.20224L26.5 0Z' fill='%23F34141'/></svg>")`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <p>৳ {ad.price}</p>
                  </div>
                  {/* Dots with active tracking and transition */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                    {ad.images.map((_, index) => (
                      <span
                        key={index}
                        className={`
                            w-3 h-3 rounded-full
                            transition-all bg-white`}
                      />
                    ))}
                  </div>
                </div>
                {/* Details and CTA */}
                <div className="p-4">
                  <div>
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 dark:text-subtitle-dark text-subtitle-light">{ad.title}</h3>
                    {/* Description - Added line-clamp for consistency if plugin is used */}
                    <p className="dark:text-description-dark text-description-light text-base mb-1 line-clamp-3">{ad.description}</p>
                    {/* Move-in Date */}
                    <p className="dark:text-description-dark text-description-light text-sm mb-1 flex items-center gap-1">
                      {/* <div className="w-2 h-2 bg-green-400 rounded-full"></div> */}
                      Move-in: <span className="font-semibold underline">{new Date(ad.moveInDate).toLocaleDateString()}</span>
                    </p>
                    {/* Availability Badge - Modernized subtle style */}
                    <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full text-white ${ad.availability ? 'bg-green-500' : 'bg-red-500'}`}>
                      {ad.availability ? "Available" : "Unavailable"}
                    </div>
                  </div>

                  <div className="flex flex-row justify-center mt-4 gap-2"> {/* Increased gap for buttons */}
                    {/* Edit Button - PRESERVED ORIGINAL STYLING */}
                    <button
                      onClick={() => {
                        setSelectedAd(ad);
                        setAddUnit(true);
                      }}
                      className="bg-green-500 w-full h-10 p-3 rounded-xl hover:bg-green-600 hover:text-white transition"
                    >
                      <svg width="full" height="full" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6432 0.106781L3.03644 13.7136L0.118958 22.881L9.28644 19.9636L22.8932 6.35678C22.8932 6.35678 22.789 4.16824 20.8099 2.19012C18.8307 0.210948 16.6432 0.106781 16.6432 0.106781ZM17.0338 1.79949C18.1505 2.01199 19.0395 2.48502 19.7255 3.18905C20.4114 3.89308 20.8943 4.82814 21.2005 5.96616L19.3125 7.85418L15.1458 3.68751L16.6432 2.19012L17.0338 1.79949ZM4.18594 14.7573C4.19825 14.7604 5.43848 15.0739 6.68227 16.3177C8.03644 17.5677 8.24477 18.7144 8.24477 18.7144L8.28953 18.7673L4.59283 19.9575L3.03441 18.399L4.18594 14.7573Z" fill="white" />
                      </svg>
                    </button>
                    {/* Delete Button - PRESERVED ORIGINAL STYLING */}
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 text-white w-full h-10 p-3 rounded-xl hover:bg-red-600 hover:text-white transition"
                    >
                      <svg width="full" height="full" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.48594 0.237689C8.98957 0.245447 8.5932 0.653615 8.6 1.14999V1.59999H3.65C3.40919 1.59672 3.17712 1.6901 3.00567 1.85924C2.83422 2.02837 2.7377 2.25916 2.7377 2.49999H1.40001C1.07543 2.4954 0.773533 2.66593 0.609904 2.94627C0.446275 3.22662 0.446275 3.57336 0.609904 3.8537C0.773533 4.13405 1.07543 4.30457 1.40001 4.29998H17.6C17.9246 4.30457 18.2265 4.13404 18.3901 3.8537C18.5537 3.57335 18.5537 3.22662 18.3901 2.94627C18.2265 2.66592 17.9246 2.4954 17.6 2.49999H16.2623C16.2623 2.25916 16.1658 2.02836 15.9943 1.85924C15.8229 1.6901 15.5908 1.59672 15.35 1.59999H10.4V1.14999C10.4033 0.906722 10.308 0.672461 10.1358 0.500597C9.96365 0.328724 9.72921 0.233891 9.48594 0.237689ZM1.4 6.09999L3.01367 19.8109C3.11987 20.7172 3.887 21.4 4.79961 21.4H14.2004C15.113 21.4 15.8792 20.7172 15.9863 19.8109L17.6 6.10001L1.4 6.09999Z" fill="white" />
                      </svg>
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
