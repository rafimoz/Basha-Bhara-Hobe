import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import {
    QrCode,
    Home,
    Users,
    Smartphone,
    Building,
    Clock,
    DollarSign,
    Shield,
    ChevronLeft,
    ChevronRight,
    Play,
    Mail,
    Phone,
    MapPin,
    ArrowRight
} from 'lucide-react';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [showVideo, setShowVideo] = useState(false); // New state to control video display

    const demoImages = [
        {
            title: "Property Dashboard",
            description: "Manage all your rental listings in one place"
        },
        {
            title: "QR Code Generation",
            description: "Generate unique QR codes for each property"
        },
        {
            title: "Mobile Scanning",
            description: "Renters scan to view available units instantly"
        }
    ];

    const videoUrl = "https://www.youtube.com/embed/F0SEDmbAt-0?si=YEX6GjYu3xCe6sEz";

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % demoImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[id]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % demoImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length);
    const handleWatchDemoClick = () => { setShowVideo(true); };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className='w-7 h-fit'>
                                <svg viewBox="0 0 271 322" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M267.997 60.793L265.006 319H169.662V6.34766L267.997 60.793Z" fill="url(#paint0_linear_58_6)" stroke="url(#paint1_linear_58_6)" />
                                    <path d="M70 60.869V151.869V321.869H267V60.869L168.5 4L70 60.869Z" stroke="url(#paint2_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M168.5 4.36902V320.869" stroke="url(#paint3_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M135 22.869L135 320.869" stroke="url(#paint4_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                    <path d="M105 39.869L105 320.869" stroke="url(#paint5_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                    <rect x="210.5" y="59.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint6_linear_58_6)" />
                                    <rect x="210.5" y="113.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint7_linear_58_6)" />
                                    <rect x="210.5" y="167.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint8_linear_58_6)" />
                                    <rect x="210.5" y="221.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint9_linear_58_6)" />
                                    <rect x="210.5" y="275.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint10_linear_58_6)" />
                                    <rect x="3.5" y="175.5" width="147" height="147" rx="16.5" fill="white" stroke="url(#paint11_linear_58_6)" stroke-width="7" />
                                    <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.597 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.722 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.847 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="url(#paint12_linear_58_6)" />
                                    <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="url(#paint13_linear_58_6)" />
                                    <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="url(#paint14_linear_58_6)" />
                                    <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="url(#paint15_linear_58_6)" />
                                    <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="url(#paint16_linear_58_6)" />
                                    <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="url(#paint17_linear_58_6)" />
                                    <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.312C46.103 292.312 41.3936 292.312 36.5415 292.312C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="url(#paint18_linear_58_6)" />
                                    <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.812C114.603 223.812 109.894 223.812 105.042 223.812C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="url(#paint19_linear_58_6)" />
                                    <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.812C46.103 223.812 41.3936 223.812 36.5415 223.812C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="url(#paint20_linear_58_6)" />
                                    <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="url(#paint21_linear_58_6)" />
                                    <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="url(#paint22_linear_58_6)" />
                                    <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="url(#paint23_linear_58_6)" />
                                    <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="url(#paint24_linear_58_6)" />
                                    <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="url(#paint25_linear_58_6)" />
                                    <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="url(#paint26_linear_58_6)" />
                                    <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="url(#paint27_linear_58_6)" />
                                    <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="url(#paint28_linear_58_6)" />
                                    <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="url(#paint29_linear_58_6)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_58_6" x1="218.831" y1="5.5" x2="218.831" y2="319.5" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_58_6" x1="218.831" y1="5.5" x2="218.831" y2="319.5" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_58_6" x1="168.5" y1="4" x2="168.5" y2="321.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_58_6" x1="169" y1="4.36902" x2="169" y2="320.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint4_linear_58_6" x1="135.5" y1="22.869" x2="135.5" y2="320.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint5_linear_58_6" x1="105.5" y1="39.869" x2="105.5" y2="320.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint6_linear_58_6" x1="218.5" y1="58.869" x2="218.5" y2="85.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint7_linear_58_6" x1="218.5" y1="112.869" x2="218.5" y2="139.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint8_linear_58_6" x1="218.5" y1="166.869" x2="218.5" y2="193.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint9_linear_58_6" x1="218.5" y1="220.869" x2="218.5" y2="247.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint10_linear_58_6" x1="218.5" y1="274.869" x2="218.5" y2="301.869" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint11_linear_58_6" x1="77" y1="172" x2="77" y2="326" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint12_linear_58_6" x1="95.0522" y1="238.083" x2="95.0522" y2="306.583" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint13_linear_58_6" x1="43.6772" y1="263.771" x2="43.6772" y2="306.583" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint14_linear_58_6" x1="112.177" y1="195.271" x2="112.177" y2="238.083" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint15_linear_58_6" x1="43.6772" y1="195.271" x2="43.6772" y2="238.083" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint16_linear_58_6" x1="120.74" y1="246.646" x2="120.74" y2="263.771" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint17_linear_58_6" x1="35.1147" y1="246.646" x2="35.1147" y2="255.208" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint18_linear_58_6" x1="43.6769" y1="278.042" x2="43.6769" y2="292.312" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint19_linear_58_6" x1="112.177" y1="209.542" x2="112.177" y2="223.812" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint20_linear_58_6" x1="43.6769" y1="209.542" x2="43.6769" y2="223.812" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint21_linear_58_6" x1="77.9272" y1="212.396" x2="77.9272" y2="229.521" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint22_linear_58_6" x1="129.302" y1="298.021" x2="129.302" y2="306.583" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint23_linear_58_6" x1="77.9272" y1="298.021" x2="77.9272" y2="306.583" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint24_linear_58_6" x1="120.74" y1="289.458" x2="120.74" y2="298.021" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint25_linear_58_6" x1="129.302" y1="280.896" x2="129.302" y2="289.458" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint26_linear_58_6" x1="112.177" y1="280.896" x2="112.177" y2="289.458" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint27_linear_58_6" x1="129.302" y1="263.771" x2="129.302" y2="272.333" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint28_linear_58_6" x1="60.8022" y1="246.646" x2="60.8022" y2="255.208" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                        <linearGradient id="paint29_linear_58_6" x1="77.9272" y1="195.271" x2="77.9272" y2="203.833" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#8D8D8D" />
                                            <stop offset="1" stop-color="#590013" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Basha Bhara Hobe</span>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#how-it-works" className="text-gray-600 hover:text-teal-600 transition-colors">How It Works</a>
                            <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
                            <a href="#about" className="text-gray-600 hover:text-teal-600 transition-colors">About</a>
                            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Burger Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
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
                    className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="#how-it-works"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)} // Close menu on link click
                        >
                            How It Works
                        </a>
                        <a
                            href="#features"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </a>
                        <button className="w-full text-left bg-teal-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-teal-700 transition-colors mt-2">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-teal-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Rent Smarter.
                                    <span className="text-teal-600"> Just Scan.</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Basha Bhara Hobe lets you find or list apartments instantly through a simple QR code.
                                    No agents, no hassle, just smart rental solutions.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => { navigate("/register") }} className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                                    Post Your Property
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                                {/* <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors">
                  Find a Rental
                </button> */}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                                    <div className="flex items-center justify-center h-64">
                                        <div className="text-center space-y-4">
                                            <div className="mx-auto w-24 h-24 bg-teal-100 rounded-2xl flex items-center justify-center">
                                                <QrCode className="h-12 w-12 text-teal-600" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
                                                <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                                            </div>
                                            <div className="w-20 h-8 bg-teal-600 rounded mx-auto"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Four simple steps to revolutionize your rental experience</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                icon: Users,
                                title: "Register as Owner",
                                description: "Create your account and verify your property ownership details"
                            },
                            {
                                step: "02",
                                icon: Building,
                                title: "List Your Property",
                                description: "Add photos, pricing, and details about your rental units"
                            },
                            {
                                step: "03",
                                icon: QrCode,
                                title: "Generate QR Code",
                                description: "Get a unique QR code and place it outside your building"
                            },
                            {
                                step: "04",
                                icon: Smartphone,
                                title: "Renters Scan & View",
                                description: "Interested renters scan to instantly view available units"
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                id={`step-${index}`}
                                className={`bg-white rounded-2xl p-8 text-center transform transition-all duration-700 hover:scale-105 ${isVisible[`step-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="text-teal-200 text-6xl font-bold mb-4">{item.step}</div>
                                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="h-8 w-8 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Basha Bhara Hobe?</h2>
                        <p className="text-xl text-gray-600">Modern solutions for traditional rental problems</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: QrCode,
                                title: "QR Code Access",
                                description: "Instant access to rental listings through QR scanning technology"
                            },
                            {
                                icon: DollarSign,
                                title: "No Agent Fees",
                                description: "Save time and money by connecting directly with property owners"
                            },
                            {
                                icon: Home,
                                title: "Personal Dashboard",
                                description: "Manage all your rental posts from one centralized dashboard"
                            },
                            {
                                icon: Clock,
                                title: "Real-time Updates",
                                description: "View availability, pricing, and move-in dates instantly"
                            },
                            {
                                icon: Shield,
                                title: "Secure Platform",
                                description: "Built with modern security standards to protect your data"
                            },
                            {
                                icon: Smartphone,
                                title: "Mobile Optimized",
                                description: "Fully responsive design that works perfectly on all devices"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="h-7 w-7 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Preview */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">See It In Action</h2>
                        <p className="text-xl text-gray-600">Experience the platform through our interactive demo</p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-118">
                            {showVideo ? (
                                // Video Element
                                <div className="relative h-full">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={videoUrl}
                                        title="Demo Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                // Demo Preview Section (Image Carousel)
                                <div className="relative h-96 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                                    <div className="text-center text-white space-y-4">
                                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                                            <Play className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-2xl font-semibold">{demoImages[currentSlide].title}</h3>
                                        <p className="text-teal-100">{demoImages[currentSlide].description}</p>
                                    </div>
                                </div>
                            )}

                            {!showVideo && ( // Only show controls if video is not playing
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <button onClick={prevSlide} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <div className="flex space-x-2">
                                            {demoImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-teal-600' : 'bg-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <button onClick={nextSlide} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Watch Demo Video Button */}
                        <button
                            onClick={handleWatchDemoClick}
                            className="mt-8 mx-auto block bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                        >
                            Watch Demo Video
                        </button>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">About Basha Bhara Hobe</h2>
                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                        <p>
                            In Bangladesh and other urban cities, finding apartment rentals is time-consuming and often involves
                            multiple intermediaries. Basha Bhara Hobe modernizes this process with smart QR-based listings that
                            connect renters directly with property owners.
                        </p>
                        <p>
                            Built using the MERN stack (MongoDB, Express.js, React, and Node.js), our platform emphasizes
                            ease of use and accessibility. We're committed to making rental discovery as simple as scanning
                            a code, eliminating the traditional barriers that make finding a home unnecessarily complicated.
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-teal-600">MERN</div>
                            <div className="text-gray-600">Stack Technology</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-teal-600">QR</div>
                            <div className="text-gray-600">Code Innovation</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-teal-600">0</div>
                            <div className="text-gray-600">Agent Fees</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-teal-600">24/7</div>
                            <div className="text-gray-600">Availability</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-teal-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Start Listing Your Apartment Today</h2>
                    <p className="text-xl text-teal-100 mb-8">
                        Join thousands of property owners who have already modernized their rental process
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                            Create Account
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
                            Explore Listings
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black/90 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className='w-7 h-fit'>
                                    <svg viewBox="0 0 271 322" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M267.997 60.793L265.006 319H169.662V6.34766L267.997 60.793Z" fill="url(#paint0_linear_58_6)" stroke="url(#paint1_linear_58_6)" />
                                        <path d="M70 60.869V151.869V321.869H267V60.869L168.5 4L70 60.869Z" stroke="url(#paint2_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                        <path d="M168.5 4.36902V320.869" stroke="url(#paint3_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                        <path d="M135 22.869L135 320.869" stroke="url(#paint4_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                        <path d="M105 39.869L105 320.869" stroke="url(#paint5_linear_58_6)" stroke-width="8" stroke-linejoin="round" />
                                        <rect x="210.5" y="59.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint6_linear_58_6)" />
                                        <rect x="210.5" y="113.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint7_linear_58_6)" />
                                        <rect x="210.5" y="167.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint8_linear_58_6)" />
                                        <rect x="210.5" y="221.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint9_linear_58_6)" />
                                        <rect x="210.5" y="275.369" width="16" height="26" rx="2.5" fill="white" stroke="url(#paint10_linear_58_6)" />
                                        <rect x="3.5" y="175.5" width="147" height="147" rx="16.5" fill="white" stroke="url(#paint11_linear_58_6)" stroke-width="7" />
                                        <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.597 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.722 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.847 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="url(#paint12_linear_58_6)" />
                                        <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="url(#paint13_linear_58_6)" />
                                        <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="url(#paint14_linear_58_6)" />
                                        <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="url(#paint15_linear_58_6)" />
                                        <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="url(#paint16_linear_58_6)" />
                                        <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="url(#paint17_linear_58_6)" />
                                        <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.312C46.103 292.312 41.3936 292.312 36.5415 292.312C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="url(#paint18_linear_58_6)" />
                                        <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.812C114.603 223.812 109.894 223.812 105.042 223.812C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="url(#paint19_linear_58_6)" />
                                        <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.812C46.103 223.812 41.3936 223.812 36.5415 223.812C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="url(#paint20_linear_58_6)" />
                                        <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="url(#paint21_linear_58_6)" />
                                        <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="url(#paint22_linear_58_6)" />
                                        <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="url(#paint23_linear_58_6)" />
                                        <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="url(#paint24_linear_58_6)" />
                                        <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="url(#paint25_linear_58_6)" />
                                        <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="url(#paint26_linear_58_6)" />
                                        <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="url(#paint27_linear_58_6)" />
                                        <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="url(#paint28_linear_58_6)" />
                                        <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="url(#paint29_linear_58_6)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_58_6" x1="218.831" y1="5.5" x2="218.831" y2="319.5" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_58_6" x1="218.831" y1="5.5" x2="218.831" y2="319.5" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_58_6" x1="168.5" y1="4" x2="168.5" y2="321.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint3_linear_58_6" x1="169" y1="4.36902" x2="169" y2="320.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint4_linear_58_6" x1="135.5" y1="22.869" x2="135.5" y2="320.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint5_linear_58_6" x1="105.5" y1="39.869" x2="105.5" y2="320.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint6_linear_58_6" x1="218.5" y1="58.869" x2="218.5" y2="85.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint7_linear_58_6" x1="218.5" y1="112.869" x2="218.5" y2="139.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint8_linear_58_6" x1="218.5" y1="166.869" x2="218.5" y2="193.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint9_linear_58_6" x1="218.5" y1="220.869" x2="218.5" y2="247.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint10_linear_58_6" x1="218.5" y1="274.869" x2="218.5" y2="301.869" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint11_linear_58_6" x1="77" y1="172" x2="77" y2="326" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint12_linear_58_6" x1="95.0522" y1="238.083" x2="95.0522" y2="306.583" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint13_linear_58_6" x1="43.6772" y1="263.771" x2="43.6772" y2="306.583" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint14_linear_58_6" x1="112.177" y1="195.271" x2="112.177" y2="238.083" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint15_linear_58_6" x1="43.6772" y1="195.271" x2="43.6772" y2="238.083" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint16_linear_58_6" x1="120.74" y1="246.646" x2="120.74" y2="263.771" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint17_linear_58_6" x1="35.1147" y1="246.646" x2="35.1147" y2="255.208" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint18_linear_58_6" x1="43.6769" y1="278.042" x2="43.6769" y2="292.312" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint19_linear_58_6" x1="112.177" y1="209.542" x2="112.177" y2="223.812" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint20_linear_58_6" x1="43.6769" y1="209.542" x2="43.6769" y2="223.812" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint21_linear_58_6" x1="77.9272" y1="212.396" x2="77.9272" y2="229.521" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint22_linear_58_6" x1="129.302" y1="298.021" x2="129.302" y2="306.583" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint23_linear_58_6" x1="77.9272" y1="298.021" x2="77.9272" y2="306.583" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint24_linear_58_6" x1="120.74" y1="289.458" x2="120.74" y2="298.021" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint25_linear_58_6" x1="129.302" y1="280.896" x2="129.302" y2="289.458" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint26_linear_58_6" x1="112.177" y1="280.896" x2="112.177" y2="289.458" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint27_linear_58_6" x1="129.302" y1="263.771" x2="129.302" y2="272.333" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint28_linear_58_6" x1="60.8022" y1="246.646" x2="60.8022" y2="255.208" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                            <linearGradient id="paint29_linear_58_6" x1="77.9272" y1="195.271" x2="77.9272" y2="203.833" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#8D8D8D" />
                                                <stop offset="1" stop-color="#590013" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>                                <span className="text-xl font-bold">Basha Bhara Hobe</span>
                            </div>
                            <p className="text-gray-400">
                                Revolutionizing rental discovery through QR code technology.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-teal-400" />
                                    <span className="text-gray-400">mozumder.rafi1@gmail.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-teal-400" />
                                    <span className="text-gray-400">+8801882681449</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-teal-400" />
                                    <span className="text-gray-400">Uttara, Dhaka, Bangladesh</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                                    >
                                        <span className="text-sm">{social[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Basha Bhara Hobe. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;