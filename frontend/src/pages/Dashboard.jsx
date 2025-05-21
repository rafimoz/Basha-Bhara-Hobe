import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";


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
    const res = await axios.get(`http://192.168.0.101:5000/api/ads/${ownerId}`);
    setAds(res.data);
  };

  const fetchQRCode = async () => {
    const res = await axios.get(`http://192.168.0.101:5000/api/qrcode/${ownerId}`);
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
      <div className="max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg bg-black text-white p-4 space-y-3">

        {/* Image Preview Section */}
        <div className="relative">
          {form.images[0] && (
            <img
              src={form.images[0]}
              alt="Main Preview"
              className="w-full h-52 object-cover rounded-md"
            />
          )}
          <button className="absolute top-2 right-2 bg-white text-black rounded-full p-1 shadow">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Section */}
        <div className="flex items-center gap-2">
          {form.images.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-12 h-12 object-cover rounded-md border border-gray-300"
              alt={`thumb-${index}`}
            />
          ))}
          <label className="w-12 h-12 border border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer text-white">
            <Plus className="w-5 h-5" />
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Single Room"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-black border border-white rounded-md p-2"
        />

        {/* Description */}
        <textarea
          placeholder="2nd Floor, South faced with open balcony"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-black border border-white rounded-md p-2"
        />

        {/* Move-in Date / Status */}
        <input
          type="date"
          placeholder="Available (From 1st April)"
          value={form.moveInDate}
          onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
          className="w-full bg-black border border-white rounded-md p-2"
        />

        {/* Price */}
        <input
          type="text"
          placeholder="5000৳"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full bg-black border border-white rounded-md p-2"
        />

        {/* Upload Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black font-medium py-2 rounded-md hover:bg-gray-200 transition"
        >
          Upload
        </button>
      </div>

      <h2 className="sm:text-6xl text-5xl font-bold sm:mb-10 mt-10 mb-5">Your Units</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {ads.map((ad) => (
          <div key={ad._id} className="bg-white rounded-4xl overflow-hidden shadow-xl p-0">
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
              <p className="text-gray-600 mb-4 sm:text-xl text-sm">{ad.description}</p>
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
