import React, { useRef } from 'react';
import { X } from "lucide-react";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const ExpenseSlip = (({ title, month, items, total, setSlip }) => {

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
        <div className='w-full max-w-md mx-auto'>
            <button onClick={() => setSlip(false)} className="absolute top-4 right-4 dark:bg-subtitle-dark bg-subtitle-light dark:text-bg-dark text-bg-light rounded-full p-1 hover:scale-105 transition-all">
                <X className="w-8 h-8" />
            </button>
            <div
                ref={slipRef}
                style={{
                    backgroundColor: "#ffffff", // Force plain white background
                    color: "#000000",           // Force black text
                }}
                className="w-full max-w-md mx-auto p-4 relative overflow-hidden"
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

                <h3 className="text-lg font-bold mb-2">{title} ({month})</h3>
                <hr className="mb-2" />

                <div className="flex flex-col gap-2 text-base">
                    {items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>{item.unit} {item.price} TK</span>
                        </div>
                    ))}
                </div>

                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                    <span>মোট বিলের পরিমাণ</span>
                    <span>{total} TK</span>
                </div>
            </div>
            <div className='py-4 flex justify-center'>
                <button onClick={handleDownloadImage} className='p-2 dark:bg-blue-700 bg-blue-500 dark:text-white text-white rounded-lg font-semibold sm:text-lg text-sm hover:opacity-80 cursor-pointer'>Download</button>
            </div>
        </div>

    );
});

export default ExpenseSlip;
