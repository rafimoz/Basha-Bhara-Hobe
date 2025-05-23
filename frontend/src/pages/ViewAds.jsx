import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewAds = () => {
  const { ownerId } = useParams();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/ads/${ownerId}`).then((res) => {
      setAds(res.data);
      console.log(res.data);
    });
  }, [ownerId]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Available Units</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {ads.map((ad) => (
          <div key={ad._id} className="bg-white rounded-xl overflow-hidden shadow-xl p-0">
            <div className="relative">
              <div className="flex overflow-x-scroll no-scrollbar sm:h-60 h-70">
                {ad.images.map((image, index) => (
                  <img src={image} key={index} alt={`Ad image ${index + 1}`} className="h-full w-full object-cover flex-shrink-0" />
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
              <h2 className="sm:text-3xl text-2xl font-bold mb-1">{ad.title}</h2>
              <p className="text-gray-600 mb-4 sm:text-xl text-sm">{ad.description}</p>
              <p className="mb-4">Move-in: {new Date(ad.moveInDate).toDateString()}</p>
              <button className="text-green-600 border border-green-600 w-full py-2 rounded-3xl hover:bg-green-600 hover:text-white transition">Contact</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAds;
