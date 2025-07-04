import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from "react-feather";

const ViewAds = () => {
  const { id: ownerId } = useParams();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [ads, setAds] = useState([]);
  const [user, setUser] = useState({});
  const [visibleAds, setVisibleAds] = useState({});
  const [currentIndices, setCurrentIndices] = useState({});
  const navigate = useNavigate();
  const bannerRefs = useRef({});
  const scrollTimeouts = useRef({});
  const currentIndicesRef = useRef({});

  const handleCall = () => {
    // Check if the phoneNumber is available
    if (user.phone) {
      window.location.href = `tel:${user.phone}`;
    } else {
      console.warn("Phone number not provided.");
      // Optionally, show a user-friendly message
      alert("Phone number is not available to call.");
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

  useEffect(() => {
    axios.get(backendURL + `/api/ads/${ownerId}`).then((res) => {
      setAds(res.data);
      // Initialize current indices to 0 for each ad
      const initialIndices = {};
      res.data.forEach(ad => {
        initialIndices[ad._id] = 0;
      });
      setCurrentIndices(initialIndices);
      currentIndicesRef.current = initialIndices;
    });
    fetchUser();
  }, [ownerId]);

  // Keep ref in sync with state
  useEffect(() => {
    currentIndicesRef.current = currentIndices;
  }, [currentIndices]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(scrollTimeouts.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  const toggleVisibility = (adId) => {
    setVisibleAds((prev) => ({ ...prev, [adId]: !prev[adId] }));
  };

  // Scroll to image in banner section
  const scrollToImage = (adId, index) => {
    const element = document.getElementById(`banner-${adId}-${index}`);
    if (element) {
      // Get the parent container
      const container = bannerRefs.current[adId];
      if (container) {
        // Calculate the scrollLeft position
        const scrollLeft = index * container.clientWidth;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
    // Update current index immediately
    setCurrentIndices(prev => ({ ...prev, [adId]: index }));
  };

  // Handle scroll events with debounce
  const handleScroll = (adId) => {
    // Clear any existing timeout for this ad
    if (scrollTimeouts.current[adId]) {
      clearTimeout(scrollTimeouts.current[adId]);
    }

    // Set a new timeout to update index after scrolling stops
    scrollTimeouts.current[adId] = setTimeout(() => {
      const container = bannerRefs.current[adId];
      if (container) {
        const scrollPosition = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const currentIndex = Math.round(scrollPosition / containerWidth);

        // Only update if index changed
        if (currentIndicesRef.current[adId] !== currentIndex) {
          setCurrentIndices(prev => ({ ...prev, [adId]: currentIndex }));
        }
      }
    }, 150); // 150ms delay after scrolling stops
  };

  // Fixed prev and next functions
  const goToPrevImage = (adId, totalImages) => {
    setCurrentIndices(prev => {
      const newIndex = (prev[adId] === 0) ? totalImages - 1 : prev[adId] - 1;
      scrollToImage(adId, newIndex); // Scroll to the new image
      return { ...prev, [adId]: newIndex };
    });
  };

  const goToNextImage = (adId, totalImages) => {
    setCurrentIndices(prev => {
      const newIndex = (prev[adId] === totalImages - 1) ? 0 : prev[adId] + 1;
      scrollToImage(adId, newIndex); // Scroll to the new image
      return { ...prev, [adId]: newIndex };
    });
  };

  return (
    <div className="min-h-screen dark:bg-bg-dark bg-bg-light relative">
      {/* Nav Section */}
      <nav className="fixed top-0 w-full bg-nav-light dark:bg-nav-dark backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div onClick={() => { navigate("/") }} className="flex items-center gap-2 cursor-pointer">
              {/*SVG*/}
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
              <span className="sm:text-2xl text-xl font-neueplak-black line-clamp-1 text-subtitle-light dark:text-subtitle-dark">Basha Bhara Hobe</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg-py-8 sm:px-6 lg:px-8 space-y-3">
        <h1 className="text-4xl sm:text-5xl font-neueplak-black dark:text-title-dark text-title-light mt-18 mb-8">Available Units <span className="font-neueplak-regular capitalize"> / {user.name}</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ads.map((ad) => {
            const isVisible = visibleAds[ad._id] || false;
            const currentIndex = currentIndices[ad._id] || 0;
            return (
              ad.availability && (
                <div key={ad._id} className="dark:bg-card-dark bg-card-light h-fit rounded-3xl overflow-hidden shadow-xl relative transition-all duration-300">
                  {/* Banner Section */}
                  <div className="relative">
                    <div
                      ref={el => bannerRefs.current[ad._id] = el}
                      onScroll={() => handleScroll(ad._id)}
                      className="flex overflow-x-scroll no-scrollbar sm:h-55 h-70 snap-x snap-mandatory" // Changed overflow-x-hidden to overflow-x-scroll and added snap properties
                    >
                      {ad.images.map((image, index) => (
                        <img
                          key={index}
                          id={`banner-${ad._id}-${index}`}
                          src={image}
                          alt={`Ad image ${index + 1}`}
                          className="h-full w-full object-cover flex-shrink-0 snap-center" // Added snap-center
                        />
                      ))}
                    </div>

                    {/* Dots with active tracking and transition */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                      {ad.images.map((_, index) => (
                        <span
                          key={index}
                          className={`
                            w-3 h-3 rounded-full
                            transition-all bg-white
                            ${currentIndex === index ? "p-2" : "bg-white/50"}
                            `}
                        />
                      ))}
                    </div>

                    {/* Next and Previous button */}
                    <div className=" absolute inset-0 flex items-center justify-between p-4">
                      <button onClick={() => goToPrevImage(ad._id, ad.images.length)} className="p-1 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white">
                        <ChevronLeft size={30} />
                      </button>
                      <button onClick={() => goToNextImage(ad._id, ad.images.length)} className="p-1 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white">
                        <ChevronRight size={30} />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex items-center gap-2 px-3 pt-3"
                    >
                      {ad.images.slice(0, ad.images.length).map((img, index) => (
                        <motion.div
                          key={index}
                          className={`w-12 h-12 rounded-xl overflow-hidden cursor-pointer ${index === currentIndex ? 'border-2 dark:border-white border-black' : 'border border-transparent'
                            }`}
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToImage(ad._id, index);
                          }}
                        >
                          <img src={img} alt={`thumb-${index}`} className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Ad Details */}
                  <div className="p-4 pb-0 transition-all duration-300 ease-in">
                    <div className="w-full grid grid-cols-[3fr_1fr] items-center justify-items-stretch">
                      <h2 className={`sm:text-2xl text-xl text-start font-bold dark:text-subtitle-dark text-subtitle-light ${!isVisible ? "truncate" : ""}`}>{ad.title}</h2>
                      <div className="flex justify-end">
                        <div
                          className="text-white w-15 h-15 flex justify-center items-center rounded-full font-bold sm:text-xs text-sm"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 53 53'><path d='M26.5 0L30.6682 4.20224L36.0729 1.78949L38.4416 7.21367L44.3529 6.91626L44.6022 12.8298L50.2218 14.6879L48.3181 20.2922L52.887 24.0549L49.0872 28.593L51.9884 33.7521L46.8059 36.6111L47.6475 42.4698L41.7821 43.2637L40.4505 49.0308L34.6944 47.6522L31.3694 52.5488L26.5 49.184L21.6306 52.5488L18.3056 47.6522L12.5495 49.0308L11.2179 43.2637L5.35254 42.4698L6.19412 36.6111L1.01162 33.7521L3.91277 28.593L0.113045 24.0549L4.68195 20.2922L2.77817 14.6879L8.39778 12.8298L8.64707 6.91626L14.5584 7.21367L16.9271 1.78949L22.3318 4.20224L26.5 0Z' fill='%23F34141'/></svg>")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        >
                          <p className='flex justify-center'>
                            &#x09F3;{ad.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className={`dark:text-subtitle-dark mb-1 text-sm mt-1 ${!isVisible ? "truncate" : ""}`}>
                      {ad.description}
                    </p>

                    {isVisible && (
                      <>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.25 }}
                          className="dark:text-subtitle-dark text-subtitle-light"
                        >
                          Move-in: <span className="font-semibold underline">{new Date(ad.moveInDate).toDateString()}</span>
                        </motion.p>
                        <motion.button
                          onClick={handleCall}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.25 }}
                          className="dark:text-black text-white font-semibold dark:bg-subtitle-dark bg-subtitle-light w-full mt-3 py-2 rounded-3xl dark:hover:bg-subtitle-dark/80 hover:bg-subtitle-light/80  transition"
                        >
                          Contact
                        </motion.button>
                      </>
                    )}
                    <div className="w-full text-center my-1">
                      <button onClick={() => toggleVisibility(ad._id)} className={`${isVisible ? "rotate-x-180" : ""} transition-transform duration-300 ease-in w-full flex justify-center items-center py-2 rounded-full cursor-pointer`}>
                        <svg className="dark:block hidden" width="21" height="11" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.8335 7.3999L18 1" stroke="#B0B0B0" stroke-width="1.5" stroke-linecap="round" />
                          <path d="M9.8335 7.3999L1.66701 1" stroke="#B0B0B0" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <svg className="dark:hidden block" width="21" height="11" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.8335 7.3999L18 1" stroke="#424242" stroke-width="1.5" stroke-linecap="round" />
                          <path d="M9.8335 7.3999L1.66701 1" stroke="#424242" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewAds;