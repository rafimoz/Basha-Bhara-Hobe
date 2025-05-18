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
    <div className="p-4">
      <h1 className="text-2xl font-bold">Available Units</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {ads.map((ad) => (
          <div key={ad._id} className="border p-4 shadow rounded">
            <h2 className="font-bold">{ad.title}</h2>
            <img src={ad.images[0]} className="h-40 object-cover w-full" />
   <p>{ad.description}</p>
            <p className="font-semibold">৳{Number(ad.price).toLocaleString()}</p>
            <p>Move-in: {new Date(ad.moveInDate).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAds;
