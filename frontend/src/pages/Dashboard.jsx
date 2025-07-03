import { useOutletContext } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, mix, motion } from 'framer-motion';
import Add from '../components/Add';
import QrCode from '../components/QrCode';

const Dashboard = () => {
  const {
    ads,
    qrCode,
    backendURL,
    toggleRefreshAds,
    toast,
  } = useOutletContext();

  const [addUnit, setAddUnit] = useState(false);
  const [seeQrCode, setSeeQrCode] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentIndices, setCurrentIndices] = useState({});
  const bannerRefs = useRef({});
  const scrollTimeouts = useRef({});
  const currentIndicesRef = useRef({});

  useEffect(() => {
    const initialIndices = {};
    ads.forEach(ad => {
      initialIndices[ad._id] = 0;
    });
    setCurrentIndices(initialIndices);
    currentIndicesRef.current = initialIndices;
  }, [ads]);

  useEffect(() => {
    if (seeQrCode || addUnit) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [seeQrCode, addUnit]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Unit?")) {
      try {
        await fetch(`${backendURL}/api/ads/${id}`, { method: 'DELETE' });
        toggleRefreshAds();
        toast.success("Unit Deleted Successfully");
      } catch (error) {
        toast.error("Unit Deleted Unsuccessfully");
      }
    }
  };

  const scrollToImage = (adId, index) => {
    const container = bannerRefs.current[adId];
    if (container) {
      const scrollLeft = index * container.clientWidth;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
    setCurrentIndices(prev => ({ ...prev, [adId]: index }));
  };

  const handleScroll = (adId) => {
    if (scrollTimeouts.current[adId]) clearTimeout(scrollTimeouts.current[adId]);

    scrollTimeouts.current[adId] = setTimeout(() => {
      const container = bannerRefs.current[adId];
      if (container) {
        const scrollPosition = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const currentIndex = Math.round(scrollPosition / containerWidth);
        if (currentIndicesRef.current[adId] !== currentIndex) {
          setCurrentIndices(prev => ({ ...prev, [adId]: currentIndex }));
        }
      }
    }, 100);
  };

  return ads && (
    <div className={`${(seeQrCode || addUnit) ? "overflow-y-hidden" : ""} min-h-screen dark:bg-bg-dark bg-bg-light`}>
      <AnimatePresence>
        {addUnit && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-20 dark:bg-black/10 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4">
            <Add toggleRefreshAds={toggleRefreshAds} setAddUnit={(value) => { setAddUnit(value); if (!value) setSelectedAd(null); }} ad={selectedAd} toast={toast} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {seeQrCode && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-20 dark:bg-black/10 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4">
            <QrCode qrImage={qrCode} seeQrCode={setSeeQrCode} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg-py-8 sm:px-6 lg:px-8"> {/* Increased overall padding */}
        {/* "All Units" Title - Slightly larger and more defined */}
        <h2 className="text-4xl sm:text-5xl font-neueplak-black sm:mb-5 mt-18 mb-8 dark:text-title-dark text-title-light">All Units</h2>
        <div className="flex justify-between mb-5"> {/* Spaced out buttons */}
          {/* QR Code Button - PRESERVED ORIGINAL STYLING */}
          <button onClick={() => setSeeQrCode(true)} className="border-2 dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light dark:hover:bg-subtitle-dark hover:bg-subtitle-light dark:hover:text-title-light hover:text-title-dark p-1.5 rounded-full px-3 cursor-pointer">QR Code</button>
          {/* Add New Unit Button - PRESERVED ORIGINAL STYLING */}
          <button onClick={() => setAddUnit(true)} className="border-2 dark:border-subtitle-dark border-subtitle-light dark:bg-subtitle-dark bg-subtitle-light dark:text-title-light text-title-dark p-1.5 rounded-full px-3 cursor-pointer">Add New</button>
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
            {ads.map((ad) => {
              const currentIndex = currentIndices[ad._id] || 0;
              return (
                <div
                  className="dark:bg-card-dark bg-card-light rounded-3xl overflow-hidden shadow-xl"
                >
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

                    {/* Price */}
                    <div
                      className="absolute top-4 right-4 text-white opacity-90 w-17 h-17 flex justify-center items-center rounded-full sm:text-xs text-sm"
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

                  {/* Thumbnails */}
                  <div className="flex items-center gap-2 px-4 pt-3">
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
                  </div>

                  {/* Details and CTA */}
                  <div className="p-4 pt-2">
                    <div>
                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-1 dark:text-subtitle-dark text-subtitle-light">{ad.title}</h3>
                      {/* Description - Added line-clamp for consistency if plugin is used */}
                      <p className="dark:text-description-dark text-description-light text-base mb-1 line-clamp-3">{ad.description}</p>
                      {/* Move-in Date */}
                      <p className="dark:text-description-dark text-description-light text-sm mb-1 flex items-center gap-1">
                        {/* <div className="w-2 h-2 bg-green-400 rounded-full"></div> */}
                        Move-in: <span className="font-semibold underline">{new Date(ad.moveInDate).toLocaleDateString()}</span>
                      </p>
                      {/* Availability Badge - Modernized subtle style */}
                      <div className={`inline-block px-2 py-1 mt-1 cursor-default text-xs font-medium rounded-full text-white ${ad.availability ? 'bg-green-500' : 'bg-red-500'}`}>
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
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
