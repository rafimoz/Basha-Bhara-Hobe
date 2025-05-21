import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const ownerId = "owner123"; // hardcoded for now
  const [ads, setAds] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    availability: true,
    moveInDate: "",
    images: [],
  });
  const [qrCode, setQrCode] = useState("");

  const fetchAds = async () => {
    const res = await axios.get(`http://192.168.0.105:5000/api/ads/${ownerId}`);
    setAds(res.data);
  };

  const fetchQRCode = async () => {
    const res = await axios.get(`http://192.168.0.105:5000/api/qrcode/${ownerId}`);
    setQrCode(res.data.qr);
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    console.log("File recived in the state variable ", files);

    if (files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    // const readers = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, event.target.result],
        }));
        console.log("LOGGGGGGGGGG", event.target.result);
      };
      reader.readAsDataURL(files[i]);
      console.log("LOGGGGGGGGGG - 2222", files[i]);

    }
  };

  const handleSubmit = async () => {
    console.log("Data being sent to backend:", {
      ...form,
      ownerId,
    });
    const moveInDate = new Date(form.moveInDate);
    const res = await axios.post("http://localhost:5000/api/ads", {
      ...form,
      ownerId,
      moveInDate,
    });
    console.log("Response from backend:", res);
    await setForm({ title: "", description: "", price: 0, availability: true, moveInDate: "", images: [] });
    fetchAds();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/ads/${id}`);
    fetchAds();
  };

  useEffect(() => {
    fetchAds();
    fetchQRCode();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="sm:text-6xl text-5xl font-bold sm:mb-10 mb-5">Dashboard</h1>
      <div className="flex flex-col gap-3">
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="border p-2" />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="border p-2" />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2" />
        <input type="date" value={form.moveInDate} onChange={e => setForm({ ...form, moveInDate: e.target.value })} className="border p-2" />
        <input type="file" multiple onChange={handleImageUpload} className="border p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">Add Ad</button>
      </div>

      <h2 className="sm:text-6xl text-5xl font-bold sm:mb-10 mt-10 mb-5">Your Units</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad._id} className="bg-white rounded-4xl overflow-hidden shadow-xl p-0">
            <div className="relative">
              <div className="flex overflow-x-scroll no-scrollbar sm:h-100 h-70">
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
              <div className="absolute top-3 right-3 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                ৳ {ad.price}
              </div>
            </div>

            <div className="p-4">
              <h3 className="sm:text-4xl text-3xl font-bold mb-1">{ad.title}</h3>
              <p className="text-gray-600 mb-5 sm:text-2xl text-xl">{ad.description}</p>
              <button onClick={() => handleDelete(ad._id)} className="text-red-600 border border-red-600 w-full py-2 rounded-3xl hover:bg-red-600 hover:text-white transition">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl mt-4">QR Code</h2>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default Dashboard;
