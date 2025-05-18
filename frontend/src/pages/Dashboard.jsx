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
    const res = await axios.get(`http://localhost:5000/api/ads/${ownerId}`);
    setAds(res.data);
  };

  const fetchQRCode = async () => {
    const res = await axios.get(`http://localhost:5000/api/qrcode/${ownerId}`);
    setQrCode(res.data.qr);
  };

 const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    const readers = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, event.target.result],
        }));
      };
      reader.readAsDataURL(files[i]);
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
    setForm({ title: "", description: "", price: 0, availability: true, moveInDate: "", images: [] });
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
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>
      <div className="flex flex-col gap-3">
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-2" />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border p-2" />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="border p-2" />
        <input type="date" value={form.moveInDate} onChange={e => setForm({...form, moveInDate: e.target.value})} className="border p-2" />
        <input type="file" multiple onChange={handleImageUpload} className="border p-2" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">Add Ad</button>
      </div>
      
      <h2 className="text-xl font-semibold">Your Ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad._id} className="p-4 shadow rounded border">
            <h3 className="font-bold">{ad.title}</h3>
            <img src={ad.images[0]} className="h-32 object-cover w-full" />
            <p>{ad.description}</p>
            <p>৳{ad.price}</p>
            <button onClick={() => handleDelete(ad._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>

      <h2 className="text-xl mt-4">QR Code</h2>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default Dashboard;
