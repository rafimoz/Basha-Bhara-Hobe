import { useState, useEffect } from 'react'
import axios from "axios";
import { Plus, X } from "lucide-react";

function Add({ toggleRefreshAds, setAddUnit }) {
    const ownerId = "owner123"; // hardcoded for now
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        availability: true,
        moveInDate: "",
        images: [],
    });

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
        await setForm({ title: "", description: "", price: 0, availability: true, moveInDate: "", images: [] });
        toggleRefreshAds();
    };

    return (
            <div className="sm:max-w-2xl h-fit w-full flex flex-col justify-center rounded-xl overflow-y-auto shadow-lg bg-black text-white space-y-4 transition-all no-scrollbar">

                {/* Image Preview Section */}
                <div className="relative">
                    {form.images.length > 0 && (
                        <img
                            src={form.images[form.images.length - 1]}
                            alt="Main Preview"
                            className="w-full sm:max-h-72 max-h-82 object-cover"
                        />
                    )}
                    <botton onClick={() => setAddUnit(false)} className="absolute z-20 top-4 right-4 bg-white text-black rounded-full p-1 hover:scale-105 transition-all">
                        <X className="w-8 h-8" />
                    </botton>
                </div>

                {/* Thumbnail Section */}
                <div className="flex items-center gap-2 px-4">
                    {form.images.slice(0, 3).map((img, index) => (
                        <div
                            key={index}
                            className="relative group w-12 h-12 rounded-md overflow-hidden border border-gray-300"
                        >
                            <img
                                src={img}
                                alt={`thumb-${index}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Delete icon */}
                            <button
                                onClick={() => {
                                    setForm((prev) => ({
                                        ...prev,
                                        images: prev.images.filter((_, i) => i !== index),
                                    }));
                                }}
                                className="absolute top-0 right-0 p-0.5 bg-black bg-opacity-60 text-white rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {/* Upload New Image Button */}
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

                <div className="p-4 space-y-3">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Single Room"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-black border border-white rounded-xl p-1.5"
                    />

                    {/* Description */}
                    <textarea
                        placeholder="2nd Floor, South faced with open balcony"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full bg-black border border-white rounded-xl p-1.5"
                    />

                    {/* Move-in Date / Status */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl">Date</h2>
                        <input
                            type="date"
                            placeholder="Available (From 1st April)"
                            value={form.moveInDate}
                            onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
                            className="w-full bg-black border border-white rounded-xl p-1.5"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl">Price</h2>
                        <input
                            type="number"
                            placeholder="5000৳"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="w-full bg-black border border-white rounded-xl p-1.5"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl">Status</h2>
                        <select
                            value={form.availability ? "available" : "unavailable"}
                            onChange={(e) =>
                                setForm({ ...form, availability: e.target.value === "available" })
                            }
                            className="w-full bg-black border border-white rounded-xl p-1.5"
                        >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-white text-black font-medium py-2 rounded-xl hover:bg-gray-200 transition"
                    >
                        Upload
                    </button>
                </div>
            </div>
    )
}

export default Add
