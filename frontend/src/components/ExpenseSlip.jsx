import React, { useRef, useState } from 'react';
import { X } from "lucide-react";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify'; // Ensure you have this import if you're using toast

const ExpenseSlip = ({ title, month, items, total, setSlip, language, setLanguage }) => {
    const slipRef = useRef();

    const handleDownloadImage = async () => {
        if (!slipRef.current) {
            toast.error("Slip not ready.");
            return;
        }

        try {
            await document.fonts.ready;
            await new Promise(res => setTimeout(res, 100)); // small wait to ensure rendering

            const canvas = await html2canvas(slipRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#ffffff',
            });

            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, `${title}-(${month}).png`);
                } else {
                    toast.error("Failed to generate image.");
                }
            }, 'image/png');
        } catch (err) {
            console.error("Error in html2canvas:", err);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className='w-full max-w-md mx-auto relative'>
            <button onClick={() => setSlip(false)} className="absolute right-0 top-0 dark:bg-subtitle-dark bg-subtitle-light dark:text-bg-dark text-bg-light rounded-full p-1 hover:scale-105 transition-all">
                <X className="w-8 h-8" />
            </button>

            <div className="py-2 w-fit">
                <h1
                    onClick={() => setLanguage(prev => prev === 'en' ? 'bn' : 'en')}
                    className="mt-8 text-lg dark:text-title-dark text-title-light cursor-pointer"
                >
                    {language === 'en' ? 'En' : 'Bn'}/{language === 'en' ? 'Bn' : 'En'}
                </h1>
            </div>

            <div
                ref={slipRef}
                style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                }}
                className="w-full max-w-md mx-auto p-4 relative overflow-hidden rounded"
            >
                <div
                    className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10 select-none"
                    style={{
                        fontSize: "3rem",
                        transform: "rotate(-30deg)",
                        whiteSpace: "nowrap",
                        zIndex: 0,
                    }}
                >
                    payment slip
                </div>

                <h3 className="text-md font-bold mb-2">{title} ({month})</h3>
                <hr className="mb-2" />

                <div className="flex flex-col gap-2 text-sm relative z-10">
                    {items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>{item.unit} {item.price} TK</span>
                        </div>
                    ))}
                </div>

                <hr className="my-2 relative z-10" />
                <div className="flex justify-between font-semibold text-md relative z-10">
                    <span>{language === 'en' ? 'Total Bill Amount' : 'মোট বিলের পরিমাণ'}</span>
                    <span>{total} TK</span>
                </div>
            </div>

            <div className='py-4 flex justify-center'>
                <button
                    onClick={handleDownloadImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90"
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default ExpenseSlip;
