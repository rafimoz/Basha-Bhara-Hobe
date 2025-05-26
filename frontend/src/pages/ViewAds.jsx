import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ViewAds = () => {
  const { ownerId } = useParams();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [ads, setAds] = useState([]);
  const [visibleAds, setVisibleAds] = useState({});
  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    axios.get( backendURL + `/api/ads/${ownerId}`).then((res) => {
      setAds(res.data);
    });
  }, [ownerId]);

  const toggleVisibility = (adId) => {
    setVisibleAds((prev) => ({ ...prev, [adId]: !prev[adId] }));
  };

  const handleThumbnailClick = (adId, image) => {
    setSelectedImages((prev) => ({ ...prev, [adId]: image }));
  };

  return (
    <div className="p-6 space-y-3">
      <h1 className="sm:text-6xl text-5xl font-bold sm:mb-10 mt-5 mb-10">Available Units</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => {
          const isVisible = visibleAds[ad._id] || false;
          const selectedImg = selectedImages[ad._id] || "";

          return (
            ad.availability && (
              <div key={ad._id} className="bg-black text-white h-fit rounded-xl overflow-hidden shadow-xl relative transition-all duration-300">
                <div className="relative" onClick={() => toggleVisibility(ad._id)}>
                  <div className="flex overflow-x-scroll no-scrollbar sm:h-60 h-70">
                    {ad.images.map((image, index) => (
                      <img
                        key={index}
                        src={selectedImg || image}
                        alt={`Ad image ${index + 1}`}
                        className="h-full w-full object-cover flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
                      />
                    ))}
                  </div>

                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {ad.images.map((_, index) => (
                      <span
                        key={index}
                        className="w-3 h-3 bg-white rounded-full border border-gray-300"
                      />
                    ))}
                  </div>
                </div>
                {/* Thumbnails with smooth fade */}
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex items-center gap-2 px-4 pt-4"
                  >
                    {ad.images.slice(0, 3).map((img, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-xl overflow-hidden hover:border cursor-pointer"
                        onClick={() => handleThumbnailClick(ad._id, img)}
                      >
                        <img src={img} alt={`thumb-${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </motion.div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="sm:text-3xl text-2xl font-bold mb-1">{ad.title}</h2>
                    <div
                      className="text-white w-15 h-15 flex justify-center items-center rounded-full font-bold sm:text-xs text-sm"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 53 53'><path d='M26.5 0L30.6682 4.20224L36.0729 1.78949L38.4416 7.21367L44.3529 6.91626L44.6022 12.8298L50.2218 14.6879L48.3181 20.2922L52.887 24.0549L49.0872 28.593L51.9884 33.7521L46.8059 36.6111L47.6475 42.4698L41.7821 43.2637L40.4505 49.0308L34.6944 47.6522L31.3694 52.5488L26.5 49.184L21.6306 52.5488L18.3056 47.6522L12.5495 49.0308L11.2179 43.2637L5.35254 42.4698L6.19412 36.6111L1.01162 33.7521L3.91277 28.593L0.113045 24.0549L4.68195 20.2922L2.77817 14.6879L8.39778 12.8298L8.64707 6.91626L14.5584 7.21367L16.9271 1.78949L22.3318 4.20224L26.5 0Z' fill='%23F34141'/></svg>")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      <p>৳ {ad.price}</p>
                    </div>
                  </div>

                  <p className={`text-white mb-4 text-sm mt-2 ${!isVisible ? "truncate" : ""}`}>
                    {ad.description}
                  </p>

                  {isVisible && (
                    <>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        Move-in: <span className="font-semibold">{new Date(ad.moveInDate).toDateString()}</span>
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="text-green-600 bg-white w-full mt-3 py-2 rounded-3xl hover:bg-green-600 hover:text-white transition"
                      >
                        Contact
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ViewAds;