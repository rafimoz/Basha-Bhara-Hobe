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
        <div className="flex h-full items-center gap-4"> 
          <div className="w-7">
            <svg viewBox="0 0 271 326" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M267.997 60.793L265.006 319H169.662V6.34766L267.997 60.793Z" fill="url(#paint0_linear_48_107)" stroke="url(#paint1_linear_48_107)" />
              <path d="M70 60.869V151.869V321.869H267V60.869L168.5 4L70 60.869Z" stroke="url(#paint2_linear_48_107)" stroke-width="8" stroke-linejoin="round" />
              <path d="M168.5 4.36902V320.869" stroke="url(#paint3_linear_48_107)" stroke-width="8" stroke-linejoin="round" />
              <path d="M135 22.869L135 320.869" stroke="url(#paint4_linear_48_107)" stroke-width="8" stroke-linejoin="round" />
              <path d="M105 39.869L105 320.869" stroke="url(#paint5_linear_48_107)" stroke-width="8" stroke-linejoin="round" />
              <rect x="210.5" y="59.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint6_linear_48_107)" />
              <rect x="210.5" y="113.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint7_linear_48_107)" />
              <rect x="210.5" y="167.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint8_linear_48_107)" />
              <rect x="210.5" y="221.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint9_linear_48_107)" />
              <rect x="210.5" y="275.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint10_linear_48_107)" />
              <rect x="3.5" y="175.5" width="147" height="147" rx="16.5" fill="white" stroke="url(#paint11_linear_48_107)" stroke-width="7" />
              <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.597 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.722 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.847 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="url(#paint12_linear_48_107)" />
              <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="url(#paint13_linear_48_107)" />
              <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="url(#paint14_linear_48_107)" />
              <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="url(#paint15_linear_48_107)" />
              <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="url(#paint16_linear_48_107)" />
              <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="url(#paint17_linear_48_107)" />
              <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.313C46.103 292.313 41.3936 292.313 36.5415 292.313C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="url(#paint18_linear_48_107)" />
              <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.812C114.603 223.812 109.894 223.812 105.042 223.812C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="url(#paint19_linear_48_107)" />
              <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.812C46.103 223.812 41.3936 223.812 36.5415 223.812C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="url(#paint20_linear_48_107)" />
              <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="url(#paint21_linear_48_107)" />
              <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="url(#paint22_linear_48_107)" />
              <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="url(#paint23_linear_48_107)" />
              <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="url(#paint24_linear_48_107)" />
              <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="url(#paint25_linear_48_107)" />
              <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="url(#paint26_linear_48_107)" />
              <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="url(#paint27_linear_48_107)" />
              <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="url(#paint28_linear_48_107)" />
              <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="url(#paint29_linear_48_107)" />
              <defs>
                <linearGradient id="paint0_linear_48_107" x1="218.831" y1="5.5" x2="218.831" y2="319.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint1_linear_48_107" x1="218.831" y1="5.5" x2="218.831" y2="319.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint2_linear_48_107" x1="168.5" y1="4" x2="168.5" y2="321.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint3_linear_48_107" x1="169" y1="4.36902" x2="169" y2="320.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint4_linear_48_107" x1="135.5" y1="22.869" x2="135.5" y2="320.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint5_linear_48_107" x1="105.5" y1="39.869" x2="105.5" y2="320.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint6_linear_48_107" x1="218.5" y1="58.869" x2="218.5" y2="85.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint7_linear_48_107" x1="218.5" y1="112.869" x2="218.5" y2="139.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint8_linear_48_107" x1="218.5" y1="166.869" x2="218.5" y2="193.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint9_linear_48_107" x1="218.5" y1="220.869" x2="218.5" y2="247.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint10_linear_48_107" x1="218.5" y1="274.869" x2="218.5" y2="301.869" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint11_linear_48_107" x1="77" y1="172" x2="77" y2="326" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint12_linear_48_107" x1="95.0522" y1="238.083" x2="95.0522" y2="306.583" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint13_linear_48_107" x1="43.6772" y1="263.771" x2="43.6772" y2="306.583" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint14_linear_48_107" x1="112.177" y1="195.271" x2="112.177" y2="238.083" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint15_linear_48_107" x1="43.6772" y1="195.271" x2="43.6772" y2="238.083" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint16_linear_48_107" x1="120.74" y1="246.646" x2="120.74" y2="263.771" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint17_linear_48_107" x1="35.1147" y1="246.646" x2="35.1147" y2="255.208" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint18_linear_48_107" x1="43.6769" y1="278.042" x2="43.6769" y2="292.313" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint19_linear_48_107" x1="112.177" y1="209.542" x2="112.177" y2="223.812" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint20_linear_48_107" x1="43.6769" y1="209.542" x2="43.6769" y2="223.812" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint21_linear_48_107" x1="77.9272" y1="212.396" x2="77.9272" y2="229.521" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint22_linear_48_107" x1="129.302" y1="298.021" x2="129.302" y2="306.583" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint23_linear_48_107" x1="77.9272" y1="298.021" x2="77.9272" y2="306.583" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint24_linear_48_107" x1="120.74" y1="289.458" x2="120.74" y2="298.021" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint25_linear_48_107" x1="129.302" y1="280.896" x2="129.302" y2="289.458" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint26_linear_48_107" x1="112.177" y1="280.896" x2="112.177" y2="289.458" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint27_linear_48_107" x1="129.302" y1="263.771" x2="129.302" y2="272.333" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint28_linear_48_107" x1="60.8022" y1="246.646" x2="60.8022" y2="255.208" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
                <linearGradient id="paint29_linear_48_107" x1="77.9272" y1="195.271" x2="77.9272" y2="203.833" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8D8D8D" />
                  <stop offset="1" stop-color="#590013" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="sm:text-3xl text-2xl font-semibold text-gray-900">
          Welcome, <span className="font-bold uppercase">{user.name}☺️</span> {/* Fallback for user.name */}
        </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-amber-300 overflow-hidden">
          <img className="object-cover" src={user.image} alt="" srcset="" />
          <div className="w-50 h-40 bg-yellow-500">
          </div>
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