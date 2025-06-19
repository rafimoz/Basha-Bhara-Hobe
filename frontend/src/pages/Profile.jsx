import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

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

const Profile = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const { id: ownerId } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false) // Add loading state

    const [form, setForm] = useState({
        name: '',
        image: '',
        phone: '',
    });

    const updateProfile = async () => {
        setIsLoading(true) // Start loading animation
        try {
            const res = await axios.put(`${backendURL}/api/user/update/${ownerId}`, {
                name: form.name,
                image: form.image,
                phone: form.phone,
            });

            if (res.data.success) {
                await fetchUser();
                setIsEdit(false);
                setIsLoading(false) // Stop loading animation
                toast.success("Profile Updated Successfully")
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        let compressedImage;
        if (file) {
            try {
                const compressedDataUrl = await compressImage(file);
                compressedImage = compressedDataUrl;
            } catch (error) {
                console.error("Error compressing image:", file.name, error);
            }
            setForm((prev) => ({ ...prev, image: compressedImage }));
        }
    };

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                image: user.image || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            navigate("/login");
            return;
        }
        const userId = localStorage.getItem("userId");
        if (userId !== ownerId) {
            navigate("/login");
            return;
        }
        fetchUser();
    }, [ownerId, navigate]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(backendURL + `/api/user/${ownerId}`);
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    return (
        <div className="min-h-screen dark:bg-bg-dark bg-bg-light font-sans">
            <ToastContainer />
            {/* Nav Section */}
            <nav className="sticky top-0 w-full bg-nav-light dark:bg-nav-dark backdrop-blur-sm z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/*Logo*/}
                        <div className="flex items-center gap-2 cursor-default">
                            <div className='w-7 h-fit'>
                                <svg className='dark:block hidden' viewBox="0 0 271 326" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M267.997 60.793L265.006 319H169.662V6.34766L267.997 60.793Z" fill="#B0B0B0" stroke="#B0B0B0" />
                                    <path d="M70 60.869V151.869V321.869H267V60.869L168.5 4L70 60.869Z" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M168.5 4.36902V320.869" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M135 22.869L135 320.869" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M105 39.869L105 320.869" stroke="#B0B0B0" stroke-width="8" stroke-linejoin="round" />
                                    <rect x="210" y="58.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                                    <rect x="210" y="112.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                                    <rect x="210" y="166.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                                    <rect x="210" y="220.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                                    <rect x="210" y="274.869" width="17" height="27" rx="3" fill="#2C2C2C" />
                                    <rect y="172" width="154" height="154" rx="20" fill="#B0B0B0" />
                                    <rect x="8" y="181" width="137" height="137" rx="11" fill="#2C2C2C" />
                                    <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.596 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.721 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.846 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="#B0B0B0" />
                                    <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="#B0B0B0" />
                                    <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="#B0B0B0" />
                                    <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="#B0B0B0" />
                                    <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="#B0B0B0" />
                                    <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="#B0B0B0" />
                                    <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.312C46.103 292.312 41.3936 292.312 36.5415 292.312C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="#B0B0B0" />
                                    <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.812C114.603 223.812 109.894 223.812 105.042 223.812C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="#B0B0B0" />
                                    <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.812C46.103 223.812 41.3936 223.812 36.5415 223.812C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="#B0B0B0" />
                                    <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="#B0B0B0" />
                                    <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="#B0B0B0" />
                                    <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="#B0B0B0" />
                                    <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="#B0B0B0" />
                                    <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="#B0B0B0" />
                                    <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="#B0B0B0" />
                                    <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="#B0B0B0" />
                                    <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="#B0B0B0" />
                                    <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="#B0B0B0" />
                                </svg>
                                <svg className='dark:hidden block' viewBox="0 0 271 326" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M267.997 60.793L265.006 319H169.662V6.34766L267.997 60.793Z" fill="#424242" stroke="#424242" />
                                    <path d="M70 60.869V151.869V321.869H267V60.869L168.5 4L70 60.869Z" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M168.5 4.36902V320.869" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M135 22.869L135 320.869" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M105 39.869L105 320.869" stroke="#424242" stroke-width="8" stroke-linejoin="round" />
                                    <rect x="210" y="58.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                                    <rect x="210" y="112.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                                    <rect x="210" y="166.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                                    <rect x="210" y="220.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                                    <rect x="210" y="274.869" width="17" height="27" rx="3" fill="#F5F7FA" />
                                    <rect y="172" width="154" height="154" rx="20" fill="#424242" />
                                    <rect x="8" y="181" width="137" height="137" rx="11" fill="#F5F7FA" />
                                    <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.596 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.721 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.846 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="#424242" />
                                    <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="#424242" />
                                    <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="#424242" />
                                    <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="#424242" />
                                    <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="#424242" />
                                    <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="#424242" />
                                    <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.312C46.103 292.312 41.3936 292.312 36.5415 292.312C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="#424242" />
                                    <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.812C114.603 223.812 109.894 223.812 105.042 223.812C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="#424242" />
                                    <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.812C46.103 223.812 41.3936 223.812 36.5415 223.812C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="#424242" />
                                    <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="#424242" />
                                    <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="#424242" />
                                    <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="#424242" />
                                    <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="#424242" />
                                    <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="#424242" />
                                    <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="#424242" />
                                    <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="#424242" />
                                    <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="#424242" />
                                    <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="#424242" />
                                </svg>
                            </div>
                            <span className="sm:text-xl text-sm font-bold text-subtitle-light dark:text-subtitle-dark uppercase">Welcome, <span>{user.name}☺️</span></span>
                        </div>

                        {/*PFP and Logout Button*/}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={() => navigate(`/dashboard/${ownerId}`)}
                                className="border-2 dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light dark:hover:bg-subtitle-dark hover:bg-subtitle-light dark:hover:text-title-light hover:text-title-dark p-1.5 rounded-full px-3 cursor-pointer">
                                Dashboard
                            </button>
                            <button onClick={() => {
                                localStorage.removeItem("authToken");
                                localStorage.removeItem("userId");
                                navigate("/login");
                            }} className="border-2 dark:border-subtitle-dark border-subtitle-light dark:text-subtitle-dark text-subtitle-light dark:hover:bg-subtitle-dark hover:bg-subtitle-light dark:hover:text-title-light hover:text-title-dark p-1.5 rounded-full px-3 cursor-pointer">
                                Logout
                            </button>
                        </div>

                        {/* Mobile Burger Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="dark:text-subtitle-dark dark:hover:text-subtitle-dark/50 text-subtitle-light hover:text-subtitle-light/50 focus:outline-none focus:text-subtitle-dark"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    {isOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t-1 dark:border-subtitle-dark/30 border-subtitle-light/30`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href={`/dashboard/${ownerId}`}
                            className="block px-3 py-2 rounded-md text-base font-medium dark:text-subtitle-dark dark:hover:text-subtitle-light dark:hover:bg-subtitle-dark text-subtitle-light hover:bg-subtitle-light/20"
                            onClick={() => setIsOpen(false)} // Close menu on link click
                        >
                            Dashboard
                        </a>
                        <button onClick={() => {
                            localStorage.removeItem("authToken");
                            localStorage.removeItem("userId");
                            navigate("/login");
                        }} className="w-full text-left dark:bg-description-dark dark:text-white dark:hover:bg-subtitle-dark/60 bg-subtitle-light/70 text-white hover:bg-subtitle-light px-3 py-2 rounded-md text-base font-medium transition-colors mt-2">
                            Logout</button>
                    </div>
                </div>
            </nav>

            {/*Main section*/}
            <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg-py-8 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold sm:mb-5 mt-5 mb-8 dark:text-title-dark text-title-light">Profile</h2>
                <div className='relative grid sm:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-4 p-4 dark:bg-card-dark/20 bg-card-light/20 rounded-4xl shadow-xl overflow-hidden'>
                    <div className='w-full flex justify-center'>
                        {isEdit ? (
                            <label htmlFor='image' className='rounded-full'>
                                <div className='cursor-pointer relative sm:w-70 sm:h-70 w-40 h-40 rounded-full overflow-hidden'>
                                    <img
                                        className='object-cover opacity-50'
                                        src={form.image}
                                        alt="edit"
                                    />
                                    <svg width="30" height="30" className='absolute  top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]' viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6432 0.106781L3.03644 13.7136L0.118958 22.881L9.28644 19.9636L22.8932 6.35678C22.8932 6.35678 22.789 4.16824 20.8099 2.19012C18.8307 0.210948 16.6432 0.106781 16.6432 0.106781ZM17.0338 1.79949C18.1505 2.01199 19.0395 2.48502 19.7255 3.18905C20.4114 3.89308 20.8943 4.82814 21.2005 5.96616L19.3125 7.85418L15.1458 3.68751L16.6432 2.19012L17.0338 1.79949ZM4.18594 14.7573C4.19825 14.7604 5.43848 15.0739 6.68227 16.3177C8.03644 17.5677 8.24477 18.7144 8.24477 18.7144L8.28953 18.7673L4.59283 19.9575L3.03441 18.399L4.18594 14.7573Z" fill="#FFFF" />
                                    </svg>
                                </div>
                                <input onChange={handleImageChange} type="file" id='image' hidden />
                            </label>
                        ) : (
                            <div className='sm:w-70 sm:h-70 w-40 h-40 rounded-full overflow-hidden'>
                                <img
                                    className='object-cover'
                                    src={user.image}
                                    alt="profile"
                                />
                            </div>
                        )}

                    </div>
                    <div className='dark:bg-card-dark bg-card-light dark:text-subtitle-dark text-subtitle-light border-1 dark:border-title-dark/10 border-title-light/10 rounded-3xl p-4 flex flex-col gap-2 w-full h-full'>
                        <div className='flex items-center gap-2'>
                            <p className='font-bold'>Name:</p>
                            <label htmlFor="name">
                                {
                                    isEdit
                                        ? <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className='uppercase bg-subtitle-dark/10 p-2 rounded-2xl w-full' />
                                        : <p className='uppercase p-2 rounded-2xl'>{user.name}</p>
                                }
                            </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='font-bold'>Phone:</p>
                            <label htmlFor="name">
                                {
                                    isEdit
                                        ? <input type="text" value={form.phone} onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))} className='uppercase bg-subtitle-dark/10 p-2 rounded-2xl w-full' />
                                        : <p className='uppercase p-2 rounded-2xl'>{user.phone}</p>
                                }
                            </label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p className='font-bold'>Email:</p>
                            <p className='p-2 rounded-2xl'>{user.email}</p>
                        </div>
                        <div className='flex justify-between items-end h-full mt-2 gap-2'>
                            {
                                isEdit
                                    ? <button onClick={updateProfile} className={`cursor-pointer p-2 w-full dark:text-title-light text-title-dark dark:hover:bg-subtitle-dark dark:bg-subtitle-dark bg-subtitle-light rounded-full px-3`}>
                                        Update
                                    </button>
                                    : <button onClick={() => setIsEdit(true)} className='p-2 w-full dark:text-title-light text-title-dark dark:hover:bg-subtitle-dark dark:bg-subtitle-dark bg-subtitle-light rounded-full px-3 cursor-pointer'>Edit</button>
                            }
                            <button onClick={() => setIsEdit(false)} className={`${isEdit ? "block" : "hidden"} p-2 w-full bg-red-400 hover:bg-red-500 text-white rounded-full px-3 cursor-pointer`}>Cancel</button>
                        </div>
                    </div>
                    {isLoading && (
                        <div className='w-full h-full absolute flex justify-center items-center z-10 bg-white/10 backdrop-blur-xs'>
                            <svg className="animate-spin h-10 w-10 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="#FFFF" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Profile