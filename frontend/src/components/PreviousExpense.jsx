import React, { useRef } from 'react';
import { X } from "lucide-react";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

const PreviousExpense = ({ title, records = [], setSlip, language, setLanguage }) => {
    const slipRef = useRef();

    const handleDownloadImage = async () => {
        if (!slipRef.current) {
            toast.error("Slip not ready.");
            return;
        }

        try {
            await document.fonts.ready; // Wait for fonts
            await new Promise((res) => setTimeout(res, 200)); // Ensure rendering is complete

            const canvas = await html2canvas(slipRef.current, {
                useCORS: true,
                scale: 2,
                backgroundColor: "#ffffff",
                logging: true,
                windowWidth: slipRef.current.scrollWidth,
                windowHeight: slipRef.current.scrollHeight
            });

            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, `${title}-previous-expenses.png`);
                } else {
                    toast.error("Failed to generate image.");
                }
            });
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative">
            {/* Close button */}
            <button
                onClick={() => setSlip(false)}
                className="absolute right-0 top-0 bg-gray-200 text-black rounded-full p-1 hover:scale-105 transition-all z-20"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Language switch */}
            <div className="py-2 w-fit">
                <h1
                    onClick={() => setLanguage(prev => prev === 'en' ? 'bn' : 'en')}
                    className="mt-8 text-lg dark:text-title-dark text-title-light cursor-pointer"
                >
                    {language === 'en' ? 'En' : 'Bn'}/{language === 'en' ? 'Bn' : 'En'}
                </h1>
            </div>


            {/* Downloadable slip */}
            <div
                ref={slipRef}
                className="w-full max-w-md mx-auto p-4 rounded shadow relative"
                style={{ 
                    backgroundColor: "#ffffff",
                    color: "#000000", 
                }}
            >
                {/* Watermark */}
                <div
                    className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10"
                    style={{
                        fontSize: "3rem",
                        transform: "rotate(-30deg)",
                        whiteSpace: "nowrap",
                        zIndex: 0
                    }}
                >
                    Previous payment slip
                </div>

                <h3 className="text-lg font-bold mb-2 relative z-10">{title}</h3>
                <hr className="mb-2" />

                {records.length > 0 ? (
                    records.map((record, index) => {
                        const {
                            month, waterBill, gasBill, trashBill, garageBill,
                            electricityBill, totalBill
                        } = record;

                        const rent = totalBill - (waterBill + gasBill + trashBill + garageBill + electricityBill);

                        return (
                            <div key={record._id || index} className="mb-2 text-xs relative z-10">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold">{month}</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                                    <div className="flex justify-between">
                                        <span>{language === 'en' ? 'Rent' : 'ভাড়া'}</span><span>{rent} TK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{language === 'en' ? 'Water' : 'পানি'}</span><span>{waterBill} TK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{language === 'en' ? 'Gas' : 'গ্যাস'}</span><span>{gasBill} TK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{language === 'en' ? 'Trash' : 'ময়লা'}</span><span>{trashBill} TK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{language === 'en' ? 'Garage' : 'গ্যারেজ'}</span><span>{garageBill} TK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{language === 'en' ? 'Electricity' : 'বিদ্যুৎ'}</span><span>{electricityBill} TK</span>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-1 font-semibold text-[12px] pt-1">
                                    <span>{language === 'en' ? 'Total' : 'মোট'}</span>
                                    <span>{totalBill} TK</span>
                                </div>
                                {index !== records.length - 1 && (
                                    <hr style={{ margin: '20px 0px 20px 0px' }} className="border-dashed" />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 relative z-10 text-sm">
                        {language === 'en' ? 'No previous records found.' : 'কোনো পূর্ববর্তী রেকর্ড পাওয়া যায়নি।'}
                    </p>
                )}
            </div>

            {/* Download button */}
            <div className="py-4 flex justify-center">
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

export default PreviousExpense;
