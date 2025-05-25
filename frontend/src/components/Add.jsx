import { useState, useEffect } from 'react'
import axios from "axios";
import { Plus, X } from "lucide-react";

function Add() {
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
    };

    return (
        <div>
            <div className="sm:max-w-2xl w-full mx-auto rounded-xl overflow-hidden shadow-lg bg-black text-white space-y-4 transition-all">

                {/* Image Preview Section */}
                <div className="relative">
                    {form.images[0] && (
                        <img
                            src={form.images[0]}
                            alt="Main Preview"
                            className="w-full sm:h-82 h-72 object-cover"
                        />
                    )}
                </div>

                {/* Thumbnail Section */}
                <div className="flex items-center gap-2 px-4">
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
        </div>
    )
}

export default Add