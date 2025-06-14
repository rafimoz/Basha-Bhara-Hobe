import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Plus, X } from "lucide-react";

import "./LoadingIndicator.css";

const LoadingIndicator = () => (
    <div className="loading-overlay">
        <div className="loading-spinner"></div>
    </div>
);

// ✅ Compress image utility
const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error("File is not an image."));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const maxWidth = 800;
                const quality = 0.7;

                let newWidth = img.width;
                let newHeight = img.height;

                if (newWidth > maxWidth) {
                    newHeight = Math.floor(newHeight * (maxWidth / newWidth));
                    newWidth = maxWidth;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            };

            img.onerror = () => reject(new Error("Failed to load image for compression."));
        };

        reader.onerror = () => reject(new Error("Failed to read file for compression."));
        reader.readAsDataURL(file);
    });
};

function Add({ toggleRefreshAds, setAddUnit, ad }) {
    const { id: ownerId } = useParams();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState(ad ? {
        title: ad.title,
        description: ad.description,
        price: ad.price,
        availability: ad.availability,
        moveInDate: ad.moveInDate,
        images: ad.images,
    } : {
        title: "",
        description: "",
        price: 0,
        availability: true,
        moveInDate: "",
        images: [],
    });

    useEffect(() => {
        if (ad) {
            setForm({
                title: ad.title,
                description: ad.description,
                price: ad.price,
                availability: ad.availability,
                moveInDate: ad.moveInDate,
                images: ad.images,
            });
        }
    }, [ad]);

    // ✅ UPDATED: Compress and directly set base64
    const handleImageUpload = async (e) => {
        const files = e.target.files;

        if (files.length > 5) {
            alert("You can only upload a maximum of 5 images.");
            return;
        }

        const compressedImages = [];
        setIsLoading(true)
        for (let i = 0; i < files.length; i++) {
            try {
                const compressedDataUrl = await compressImage(files[i]);
                compressedImages.push(compressedDataUrl);
            } catch (error) {
                console.error("Error compressing image:", files[i].name, error);
            }
        }

        setForm((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...compressedImages],
        }));
        setIsLoading(false)
    };

    const handleSubmit = async () => {
        console.log("Data being sent to backend:", {
            ...form,
            ownerId,
        });

        const moveInDate = new Date(form.moveInDate);
        const data = {
            ...form,
            ownerId,
            moveInDate,
        };

        setIsLoading(true);
        try {
            const res = ad
                ? await axios.put(backendURL + `/api/ads/${ad._id}`, data)
                : await axios.post(backendURL + "/api/ads", data);

            console.log("Response from backend:", res);
            setForm({
                title: "",
                description: "",
                price: 0,
                availability: true,
                moveInDate: "",
                images: [],
            });
            toggleRefreshAds();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sm:max-w-2xl h-fit w-full flex flex-col justify-center rounded-3xl overflow-y-auto shadow-lg dark:shadow-subtitle-dark/20 shadow-subtitle-light/20 dark:bg-card-dark dark:text-title-dark bg-card-light text-title-light space-y-4 transition-all no-scrollbar">
            {isLoading && <LoadingIndicator />}

            {/* Preview Main Image */}
            <div className="relative">
                {form.images.length > 0 && (
                    <img
                        src={form.images[form.images.length - 1]}
                        alt="Main Preview"
                        className="w-full sm:h-65 h-60 object-cover"
                    />
                )}
                <button onClick={() => setAddUnit(false)} className="absolute z-20 top-4 right-4 dark:bg-subtitle-dark bg-subtitle-light dark:text-bg-dark text-bg-light rounded-full p-1 hover:scale-105 transition-all">
                    <X className="w-8 h-8" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 px-4">
                {form.images.map((img, index) => (
                    <div key={index} className="relative group w-12 h-12 rounded-xl overflow-hidden border dark:border-subtitle-dark border-subtitle-light">
                        <img src={img} alt={`thumb-${index}`} className="w-full h-full object-cover" />
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

                {/* Upload Button */}
                <label className="w-12 h-12 border border-dashed dark:border-subtitle-dark border-subtitle-light rounded-xl flex items-center justify-center cursor-pointer dark:text-subtitle-dark text-subtitle-light">
                    <Plus className="w-5 h-5" />
                    <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                    />
                </label>
            </div>

            {/* Form Fields */}
            <div className="px-4 pb-4 space-y-2 sm:text-lg text-sm">
                <input
                    type="text"
                    placeholder="Single Room"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light rounded-2xl sm:p-2 p-1 px-2"
                />
                <textarea
                    placeholder="2nd Floor, South faced with open balcony"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full h-fit border dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light rounded-2xl sm:p-2 p-1 px-2"
                />
                <div className='flex sm:flex-row flex-col justify-between gap-2 mt-0 w-full'>
                    <div className="flex items-center gap-2">
                        <h2>Date</h2>
                        <input
                            type="date"
                            value={form.moveInDate}
                            onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
                            className="w-full border dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light rounded-2xl sm:p-2 p-1 px-2"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <h2>Price</h2>
                        <input
                            type="number"
                            placeholder="5000৳"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="w-full border dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light rounded-2xl sm:p-2 p-1 px-2"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <h2>Status</h2>
                    <select
                        value={form.availability ? "available" : "unavailable"}
                        onChange={(e) =>
                            setForm({ ...form, availability: e.target.value === "available" })
                        }
                        className="w-full border dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light rounded-2xl sm:p-2 p-1 px-2"
                    >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full dark:bg-subtitle-dark bg-subtitle-light dark:text-card-dark text-card-light font-medium mt-1 py-2 rounded-3xl dark:hover:bg-description-dark hover:bg-title-light transition"
                >
                    {ad ? "Update" : "Upload"}
                </button>
            </div>
        </div>
    );
}

export default Add;