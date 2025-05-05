import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [ads, setAds] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    available: true,
    moveInDate: '',
    images: [],
  });

  const token = localStorage.getItem('token');

  // Fetch admin's own ads
  useEffect(() => {
    fetch('http://localhost:5000/api/admin/me', {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(admin => {
        fetch(`http://localhost:5000/api/ads/${admin._id}`)
          .then(res => res.json())
          .then(setAds);
      });
  }, []);

  const handleImageChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === 'images') {
        for (let img of val) data.append('images', img);
      } else {
        data.append(key, val);
      }
    });

    const res = await fetch('http://localhost:5000/api/ads', {
      method: 'POST',
      headers: { Authorization: token },
      body: data,
    });

    const newAd = await res.json();
    setAds([...ads, newAd]);
    setForm({ title: '', description: '', price: '', available: true, moveInDate: '', images: [] });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/ads/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });
    setAds(ads.filter(ad => ad._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form to create ad */}
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded mb-8 bg-gray-50">
        <h2 className="text-lg font-semibold">Create New Rental Ad</h2>
        <input type="text" placeholder="Title" required value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded" />
        <textarea placeholder="Description" required value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded" />
        <input type="number" placeholder="Price" required value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 border rounded" />
        <input type="date" required value={form.moveInDate}
          onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
          className="w-full p-2 border rounded" />
        <input type="file" multiple accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post Ad</button>
      </form>

      {/* Display ads */}
      <h2 className="text-xl font-semibold mb-2">Your Ads</h2>
      <div className="grid gap-6">
        {ads.map(ad => (
          <div key={ad._id} className="border rounded p-4 bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold">{ad.title}</h3>
              <button onClick={() => handleDelete(ad._id)} className="text-red-500">Delete</button>
            </div>
            <p>{ad.description}</p>
            <p className="font-semibold mt-1">৳ {ad.price}</p>
            <p>Move in: {new Date(ad.moveInDate).toLocaleDateString()}</p>
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {ad.images.map((url, idx) => (
                <img key={idx} src={url} className="h-24 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}