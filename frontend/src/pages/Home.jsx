import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import CountUp from 'react-countup'

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

    const videoUrl = "https://www.youtube.com/embed/55kaSvec_Yc?si=-2qUTh1kbevQM3je";

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
        <div className="min-h-screen dark:bg-bg-dark bg-bg-light">
            <Helmet>
                <title>Basha Bhara Hobe</title>
                <meta name='description' content="Landing page for - Basha Bhara Hobe." />
            </Helmet>

            {/* Nav Section */}
            <nav className="sticky top-0 w-full bg-nav-light/60 dark:bg-nav-dark/60 backdrop-blur-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a href="#">
                            <div className="flex dark:text-subtitle-dark text-subtitle-light items-center gap-2">
                                <div className='w-7 h-fit'>
                                    <svg viewBox="0 0 271 326" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M135 15L135 174" stroke="currentColor" stroke-width="8" stroke-linejoin="round" />
                                        <path d="M105 27L105 172.5" stroke="currentColor" stroke-width="8" stroke-linejoin="round" />
                                        <path d="M69 41.5L69 172.5" stroke="currentColor" stroke-width="8" stroke-linejoin="round" />
                                        <path d="M168.5 4.36902V320.869" stroke="currentColor" stroke-width="8" stroke-linejoin="round" />
                                        <path d="M69 42L168.5 4L267 60.869V321.869H19" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M268.5 60.4999L265.5 319.5H169.161V5.49988L268.5 60.4999ZM210 274.869V301.869H227V274.869H210ZM210 247.869H227V220.869H210V247.869ZM210 193.869H227V166.869H210V193.869ZM210 139.869H227V112.869H210V139.869ZM210 85.869H227V58.869H210V85.869Z" fill="currentColor" />
                                        <rect x="3.5" y="175.5" width="147" height="147" rx="16.5" stroke="currentColor" stroke-width="7" />
                                        <path d="M73.646 238.083C76.4716 238.083 79.2972 238.083 82.2085 238.083C82.2085 240.909 82.2085 243.735 82.2085 246.646C85.0341 246.646 87.8597 246.646 90.771 246.646C90.771 252.297 90.771 257.948 90.771 263.771C93.5966 263.771 96.4222 263.771 99.3335 263.771C99.3335 260.945 99.3335 258.12 99.3335 255.208C102.159 255.208 104.985 255.208 107.896 255.208C107.896 258.034 107.896 260.86 107.896 263.771C110.722 263.771 113.547 263.771 116.458 263.771C116.458 266.596 116.458 269.422 116.458 272.333C110.807 272.333 105.156 272.333 99.3335 272.333C99.3335 275.159 99.3335 277.985 99.3335 280.896C96.5079 280.896 93.6822 280.896 90.771 280.896C90.771 283.721 90.771 286.547 90.771 289.458C93.5966 289.458 96.4222 289.458 99.3335 289.458C99.3335 292.284 99.3335 295.11 99.3335 298.021C104.985 298.021 110.636 298.021 116.458 298.021C116.458 300.846 116.458 303.672 116.458 306.583C107.982 306.583 99.5047 306.583 90.771 306.583C90.771 303.758 90.771 300.932 90.771 298.021C87.9454 298.021 85.1197 298.021 82.2085 298.021C82.2085 295.195 82.2085 292.37 82.2085 289.458C79.3829 289.458 76.5572 289.458 73.646 289.458C73.646 283.807 73.646 278.156 73.646 272.333C76.4716 272.333 79.2972 272.333 82.2085 272.333C82.2085 266.682 82.2085 261.031 82.2085 255.208C79.3829 255.208 76.5572 255.208 73.646 255.208C73.646 249.557 73.646 243.906 73.646 238.083Z" fill="currentColor" />
                                        <path d="M22.271 263.771C36.3991 263.771 50.5272 263.771 65.0835 263.771C65.0835 277.899 65.0835 292.027 65.0835 306.583C50.9554 306.583 36.8272 306.583 22.271 306.583C22.271 292.455 22.271 278.327 22.271 263.771ZM30.8335 272.333C30.8335 280.81 30.8335 289.287 30.8335 298.021C39.3104 298.021 47.7872 298.021 56.521 298.021C56.521 289.544 56.521 281.067 56.521 272.333C48.0441 272.333 39.5672 272.333 30.8335 272.333Z" fill="currentColor" />
                                        <path d="M90.771 195.271C104.899 195.271 119.027 195.271 133.583 195.271C133.583 209.399 133.583 223.527 133.583 238.083C119.455 238.083 105.327 238.083 90.771 238.083C90.771 223.955 90.771 209.827 90.771 195.271ZM99.3335 203.833C99.3335 212.31 99.3335 220.787 99.3335 229.521C107.81 229.521 116.287 229.521 125.021 229.521C125.021 221.044 125.021 212.567 125.021 203.833C116.544 203.833 108.067 203.833 99.3335 203.833Z" fill="currentColor" />
                                        <path d="M22.271 195.271C36.3991 195.271 50.5272 195.271 65.0835 195.271C65.0835 209.399 65.0835 223.527 65.0835 238.083C50.9554 238.083 36.8272 238.083 22.271 238.083C22.271 223.955 22.271 209.827 22.271 195.271ZM30.8335 203.833C30.8335 212.31 30.8335 220.787 30.8335 229.521C39.3104 229.521 47.7872 229.521 56.521 229.521C56.521 221.044 56.521 212.567 56.521 203.833C48.0441 203.833 39.5672 203.833 30.8335 203.833Z" fill="currentColor" />
                                        <path d="M107.896 246.646C116.373 246.646 124.85 246.646 133.583 246.646C133.583 249.471 133.583 252.297 133.583 255.208C130.758 255.208 127.932 255.208 125.021 255.208C125.021 258.034 125.021 260.86 125.021 263.771C122.195 263.771 119.37 263.771 116.458 263.771C116.458 260.945 116.458 258.12 116.458 255.208C113.633 255.208 110.807 255.208 107.896 255.208C107.896 252.383 107.896 249.557 107.896 246.646Z" fill="currentColor" />
                                        <path d="M22.271 246.646C30.7479 246.646 39.2247 246.646 47.9585 246.646C47.9585 249.471 47.9585 252.297 47.9585 255.208C39.4816 255.208 31.0047 255.208 22.271 255.208C22.271 252.383 22.271 249.557 22.271 246.646Z" fill="currentColor" />
                                        <path d="M36.5415 278.042C41.2509 278.042 45.9603 278.042 50.8123 278.042C50.8123 282.751 50.8123 287.46 50.8123 292.313C46.103 292.313 41.3936 292.313 36.5415 292.313C36.5415 287.603 36.5415 282.894 36.5415 278.042Z" fill="currentColor" />
                                        <path d="M105.042 209.542C109.751 209.542 114.46 209.542 119.312 209.542C119.312 214.251 119.312 218.96 119.312 223.813C114.603 223.813 109.894 223.813 105.042 223.813C105.042 219.103 105.042 214.394 105.042 209.542Z" fill="currentColor" />
                                        <path d="M36.5415 209.542C41.2509 209.542 45.9603 209.542 50.8123 209.542C50.8123 214.251 50.8123 218.96 50.8123 223.813C46.103 223.813 41.3936 223.813 36.5415 223.813C36.5415 219.103 36.5415 214.394 36.5415 209.542Z" fill="currentColor" />
                                        <path d="M73.646 212.396C76.4716 212.396 79.2972 212.396 82.2085 212.396C82.2085 218.047 82.2085 223.698 82.2085 229.521C79.3829 229.521 76.5572 229.521 73.646 229.521C73.646 223.87 73.646 218.218 73.646 212.396Z" fill="currentColor" />
                                        <path d="M125.021 298.021C127.847 298.021 130.672 298.021 133.583 298.021C133.583 300.846 133.583 303.672 133.583 306.583C130.758 306.583 127.932 306.583 125.021 306.583C125.021 303.758 125.021 300.932 125.021 298.021Z" fill="currentColor" />
                                        <path d="M73.646 298.021C76.4716 298.021 79.2972 298.021 82.2085 298.021C82.2085 300.846 82.2085 303.672 82.2085 306.583C79.3829 306.583 76.5572 306.583 73.646 306.583C73.646 303.758 73.646 300.932 73.646 298.021Z" fill="currentColor" />
                                        <path d="M116.458 289.458C119.284 289.458 122.11 289.458 125.021 289.458C125.021 292.284 125.021 295.11 125.021 298.021C122.195 298.021 119.37 298.021 116.458 298.021C116.458 295.195 116.458 292.37 116.458 289.458Z" fill="currentColor" />
                                        <path d="M125.021 280.896C127.847 280.896 130.672 280.896 133.583 280.896C133.583 283.721 133.583 286.547 133.583 289.458C130.758 289.458 127.932 289.458 125.021 289.458C125.021 286.633 125.021 283.807 125.021 280.896Z" fill="currentColor" />
                                        <path d="M107.896 280.896C110.722 280.896 113.547 280.896 116.458 280.896C116.458 283.721 116.458 286.547 116.458 289.458C113.633 289.458 110.807 289.458 107.896 289.458C107.896 286.633 107.896 283.807 107.896 280.896Z" fill="currentColor" />
                                        <path d="M125.021 263.771C127.847 263.771 130.672 263.771 133.583 263.771C133.583 266.596 133.583 269.422 133.583 272.333C130.758 272.333 127.932 272.333 125.021 272.333C125.021 269.508 125.021 266.682 125.021 263.771Z" fill="currentColor" />
                                        <path d="M56.521 246.646C59.3466 246.646 62.1722 246.646 65.0835 246.646C65.0835 249.471 65.0835 252.297 65.0835 255.208C62.2579 255.208 59.4322 255.208 56.521 255.208C56.521 252.383 56.521 249.557 56.521 246.646Z" fill="currentColor" />
                                        <path d="M73.646 195.271C76.4716 195.271 79.2972 195.271 82.2085 195.271C82.2085 198.096 82.2085 200.922 82.2085 203.833C79.3829 203.833 76.5572 203.833 73.646 203.833C73.646 201.008 73.646 198.182 73.646 195.271Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <span className="sm:text-2xl text-xl font-neueplak-black line-clamp-1 text-subtitle-light dark:text-subtitle-dark">Basha Bhara Hobe</span>
                            </div>
                        </a>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#how-it-works" className="dark:text-subtitle-dark text-subtitle-light hover:dark:text-subtitle-dark/60 hover:text-subtitle-light/60 transition-colors">How It Works</a>
                            <a href="#features" className="dark:text-subtitle-dark text-subtitle-light hover:dark:text-subtitle-dark/60 hover:text-subtitle-light/60 transition-colors">Features</a>
                            <a href="#about" className="dark:text-subtitle-dark text-subtitle-light hover:dark:text-subtitle-dark/60 hover:text-subtitle-light/60 transition-colors">About</a>
                            <button onClick={() => navigate("/login")} className="dark:bg-subtitle-dark bg-subtitle-light text-white px-6 py-2 rounded-lg hover:dark:bg-subtitle-dark/60 hover:bg-subtitle-light/60 transition-colors">
                                Get Started
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
                    className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="#how-it-works"
                            className="block px-3 py-2 text-base font-medium dark:text-subtitle-dark dark:hover:text-subtitle-light dark:hover:bg-subtitle-dark text-subtitle-light hover:bg-subtitle-light/20"
                            onClick={() => setIsOpen(false)} // Close menu on link click
                        >
                            How It Works
                        </a>
                        <a
                            href="#features"
                            className="block px-3 py-2 text-base font-medium dark:text-subtitle-dark dark:hover:text-subtitle-light dark:hover:bg-subtitle-dark text-subtitle-light hover:bg-subtitle-light/20"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="block px-3 py-2 text-base font-medium dark:text-subtitle-dark dark:hover:text-subtitle-light dark:hover:bg-subtitle-dark text-subtitle-light hover:bg-subtitle-light/20"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </a>
                        <button onClick={() => navigate("/login")} className="w-full text-left rounded-lg dark:bg-subtitle-dark dark:text-white dark:hover:bg-subtitle-dark/60 bg-subtitle-light/70 text-white hover:bg-subtitle-light px-3 py-2 text-base font-medium transition-colors mt-2">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative w-full flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dhlh7av5k/image/upload/c_pad,w_1280,h_960/v1753550072/hero-bashabharahobe_bd6ehg.jpg')`,
                    }}
                >
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>

                {/* Content Container */}
                <div className="relative max-w-7xl py-40 sm:py-25 mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white w-full">
                    <div className="space-y-4 sm:space-y-6 sm:text-start text-center">
                        {/* Main Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
                            Rent Smarter <br />
                            <span className="font-light text-blue-200">Just Scan</span>
                        </h1>

                        {/* Sub-headline / Description */}
                        <p className="text-md sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl drop-shadow-md animate-fade-in-up delay-200">
                            Basha Bhara Hobe lets you find or list apartments instantly through a simple QR code.
                            No agents, no hassle, just smart rental solutions.
                        </p>
                    </div>

                    {/* Call-to-Action Buttons */}
                    <div className="mt-5 flex flex-col sm:flex-row sm:justify-start justify-center gap-4 animate-fade-in-up delay-400">
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 uppercase py-3 rounded-full sm:text-lg text-md font-semibold shadow-lg
                                   transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                        >
                            Post Your Property
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <section className='w-full flex justify-between dark:text-subtitle-dark text-description-light'>
                <div className='sm:text-5xl dark:bg-nav-dark bg-nav-light text-2xl font-neueplak-black flex flex-col items-center w-full justify-center gap-2 py-10'>
                    <p>
                        <CountUp start={0} end={12} duration={4} delay={0} />+

                    </p>
                    <p className='sm:text-2xl text-sm font-neueplak-regular'>Total Clients</p>
                </div>

                <div className='sm:text-5xl dark:bg-subtitle-light bg-subtitle-dark/10 text-2xl font-neueplak-black flex flex-col items-center w-full justify-center gap-2 py-10'>
                    <p>
                        <CountUp start={0} end={110} duration={4} delay={0} />+

                    </p>
                    <p className='sm:text-2xl text-sm font-neueplak-regular'>Active Units</p>
                </div>

                <div className='sm:text-5xl dark:bg-nav-dark bg-nav-light text-2xl font-neueplak-black flex flex-col items-center w-full justify-center gap-2 py-10'>
                    <p>
                        <CountUp start={0} end={800} duration={4} delay={0} />+

                    </p>
                    <p className='sm:text-2xl text-sm font-neueplak-regular'>QR Scanned</p>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-neueplak-black dark:text-title-dark text-title-light mb-4">How It Works</h2>
                        <p className="text-xl dark:text-subtitle-dark font-neueplak-regular text-subtitle-light">Four simple steps to revolutionize your rental experience</p>
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
                                className={`dark:bg-card-dark bg-card-light shadow-lg shadow-black/30 rounded-2xl p-8 text-center transform transition-all duration-700 hover:scale-105 ${isVisible[`step-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="dark:text-title-dark text-title-light/70 text-6xl font-neueplak-black mb-4">{item.step}</div>
                                <div className="w-16 h-16 dark:bg-title-dark bg-title-light/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="h-8 w-8 dark:text-bg-dark text-bg-light" />
                                </div>
                                <h3 className="text-xl font-semibold dark:text-subtitle-dark text-subtitle-light mb-3">{item.title}</h3>
                                <p className="dark:text-description-dark text-description-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-neueplak-black dark:text-title-dark text-title-light mb-4">Why Choose Basha Bhara Hobe?</h2>
                        <p className="text-xl dark:text-subtitle-dark text-subtitle-light font-neueplak-regular">Modern solutions for traditional rental problems</p>
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
                                className="dark:bg-card-dark bg-card-light p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border dark:border-title-dark/30 border-title-light/20"
                            >
                                <div className="w-14 h-14 dark:bg-title-dark bg-title-light/70 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="h-7 w-7 dark:text-bg-dark text-bg-light" />
                                </div>
                                <h3 className="text-xl font-semibold dark:text-title-dark text-title-light mb-3">{feature.title}</h3>
                                <p className="dark:text-subtitle-dark text-subtitle-light">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Preview */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-neueplak-black dark:text-title-dark text-title-light mb-4">See It In Action</h2>
                        <p className="text-xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Experience the platform through our interactive demo</p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="dark:bg-card-dark bg-card-light rounded-3xl shadow-2xl overflow-hidden h-118">
                            {showVideo ? (
                                // Video Element
                                <div className="relative h-full">
                                    <iframe className='w-full h-full' src="https://app.supademo.com/embed/cmbqy1wxn02f3y60i0dvw97gb?embed_v=2" loading="lazy" title="New Demo" allow="clipboard-write" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen ></iframe>
                                </div>
                            ) : (
                                // Demo Preview Section (Image Carousel)
                                <div className="relative h-96 bg-gradient-to-br dark:from-card-dark dark:to-title-dark/50 from-card-dark/70 to-title-dark/30 flex items-center justify-center">
                                    <div className="text-center text-white space-y-4">
                                        <div className="w-20 h-20 dark:bg-title-dark/90 bg-bg-dark dark:text-bg-dark/80 text-bg-light rounded-2xl flex items-center justify-center mx-auto">
                                            <Play className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-2xl font-semibold dark:text-title-dark text-title-light">{demoImages[currentSlide].title}</h3>
                                        <p className="dark:text-subtitle-dark text-subtitle-light">{demoImages[currentSlide].description}</p>
                                    </div>
                                </div>
                            )}

                            {!showVideo && ( // Only show controls if video is not playing

                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <button onClick={prevSlide} className={`p-2 rounded-full dark:bg-subtitle-dark bg-subtitle-light/60 dark:hover:bg-subtitle-dark/60 hover:bg-subtitle-light dark:text-black text-white transition-colors`}>
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <div className="flex space-x-2">
                                            {demoImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'dark:bg-description-dark bg-description-light' : 'dark:bg-title-dark bg-title-light/30'}`}
                                                />
                                            ))}
                                        </div>
                                        <button onClick={nextSlide} className={`p-2 rounded-full dark:bg-subtitle-dark bg-subtitle-light/60 dark:hover:bg-subtitle-dark/60 hover:bg-subtitle-light dark:text-black text-white transition-colors`}>
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Watch Demo Video Button */}
                        <button
                            onClick={handleWatchDemoClick}
                            className="mt-8 mx-auto block dark:bg-subtitle-dark bg-subtitle-light text-white px-8 py-4 rounded-lg font-semibold hover:dark:bg-subtitle-dark/60 hover:bg-subtitle-light/60 cursor-pointer transition-colors"
                        >
                            Watch Demo Video
                        </button>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-neueplak-black dark:text-title-dark text-title-light mb-8">About Basha Bhara Hobe</h2>
                    <div className="space-y-6 text-lg dark:text-subtitle-dark text-subtitle-light font-neueplak-regular leading-relaxed">
                        <p>
                            For House Owners: Take control of your listings! Easily post available apartment units, upload photos of each room, set prices, and manage availability from your personal dashboard. We'll automatically generate a unique QR code for your listing, which you can display outside your building for instant access.
                        </p>
                        <p>
                            For Renters: Say goodbye to frustrating searches and agent fees! Simply scan the Basha Bhara Hobe QR code on any building to instantly view a list of all available units within that building. Explore detailed descriptions, clear pricing, and high-quality images of every room before you even step inside. No login required – just scan and discover!
                            Our mission is to make renting seamless, transparent, and efficient for everyone.
                        </p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">MERN</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Stack Technology</div>
                        </div>
                        <div>
                            <div className="text-3xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">QR</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Code Innovation</div>
                        </div>
                        <div>
                            <div className="text-3xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">0</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Agent Fees</div>
                        </div>
                        <div>
                            <div className="text-3xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">24/7</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Availability</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 dark:bg-nav-dark bg-nav-light">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-neueplak-black dark:text-title-dark text-title-light mb-6">Start Listing Your Apartment Today</h2>
                    <p className="text-xl font-neueplak-regular dark:text-subtitle-dark text-subtitle-light mb-8">
                        Join thousands of property owners who have already modernized their rental process
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => navigate("/register")} className="dark:bg-cta-dark bg-subtitle-light text-white px-8 py-4 rounded-lg text-lg font-semibold dark:hover:bg-cta-dark/50 hover:bg-subtitle-light/80 transition-colors">
                            Create Account
                        </button>
                        {/* <button className="border-2 dark:border-cta-dark hover:bg-subtitle-light/5 border-subtitle-light dark:text-cta-dark text-subtitle-light/80 px-8 py-4 rounded-lg text-lg font-semibold dark:hover:text-white hover:text-subtitle-light transition-colors">
                            Explore Listings
                        </button> */}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="dark:bg-bg-dark bg-bg-light dark:text-title-dark text-title-light py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
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
                                </div><span className="sm:text-2xl text-xl font-neueplak-black">Basha Bhara Hobe</span>
                            </div>
                            <p className="dark:text-subtitle-dark text-subtitle-light">
                                Revolutionizing rental discovery through QR code technology.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <a href="#about" className="block dark:text-subtitle-dark text-subtitle-light dark:hover:text-white hover:text-black/50 transition-colors">About</a>
                                <a href="#" className="block dark:text-subtitle-dark text-subtitle-light dark:hover:text-white hover:text-black/50 transition-colors">Privacy Policy</a>
                                <a href="#" className="block dark:text-subtitle-dark text-subtitle-light dark:hover:text-white hover:text-black/50 transition-colors">Terms of Service</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 dark:text-subtitle-dark text-subtitle-light" />
                                    <span className="dark:text-subtitle-dark text-subtitle-light">bashabharahobe@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 dark:bg-gray-800 bg-gray-300 rounded-lg flex items-center justify-center dark:hover:bg-teal-600 hover:bg-teal-300 transition-colors"
                                    >
                                        <span className="text-sm">{social[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div> */}
                    </div>
                    <div className="border-t dark:border-description-dark border-description-light mt-10 pt-8 text-center dark:text-description-dark text-description-light">
                        <p>&copy; 2025 Basha Bhara Hobe. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;