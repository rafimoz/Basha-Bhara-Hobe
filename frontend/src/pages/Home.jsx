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
            <nav className={`sticky top-0 w-full ${isOpen ? "dark:bg-nav-dark bg-nav-light" : "bg-nav-light/60 dark:bg-nav-dark/60"} backdrop-blur-sm z-50`}>
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
                            <a href="#getstarted" className="dark:bg-subtitle-dark bg-subtitle-light text-white px-6 py-2 rounded-lg hover:dark:bg-subtitle-dark/60 hover:bg-subtitle-light/60 transition-colors">
                                Get Started
                            </a>
                        </div>

                        {/* Mobile Burger Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="dark:text-subtitle-dark dark:hover:text-subtitle-dark/50 text-subtitle-light hover:text-subtitle-light/50 focus:outline-none"
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
                    <div className="px-2 pt-2 pb-2 space-y-2 sm:px-3">
                        <a
                            href="#how-it-works"
                            className="block py-2 text-base font-medium
                 dark:text-gray-300 dark:hover:text-white
                 text-gray-700 hover:text-blue-600
                 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
                 hover:after:w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            How It Works
                        </a>
                        <a
                            href="#features"
                            className="block py-2 text-base font-medium
                 dark:text-gray-300 dark:hover:text-white
                 text-gray-700 hover:text-blue-600
                 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
                 hover:after:w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="block py-2 text-base font-medium
                 dark:text-gray-300 dark:hover:text-white
                 text-gray-700 hover:text-blue-600
                 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300
                 hover:after:w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </a>
                        <a
                            href='#getstarted'
                            className="block w-full py-2 px-4 rounded-md
                 bg-gradient-to-r from-blue-500 to-purple-600
                 text-white text-lg font-semibold text-center
                 shadow-lg hover:from-blue-600 hover:to-purple-700
                 transform transition-all duration-300 ease-in-out"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </a>
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
                <div className="relative max-w-7xl py-30 sm:py-25 mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white w-full">
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
                        <h2 className="md:text-4xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-4">How It Works</h2>
                        <p className="md:text-xl text-md dark:text-subtitle-dark font-neueplak-regular text-subtitle-light">Four simple steps to revolutionize your rental experience</p>
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
                                <div className="dark:text-title-dark text-title-light/70 md:text-6xl text-4xl font-neueplak-black mb-4">{item.step}</div>
                                <div className="w-16 h-16 dark:bg-title-dark bg-title-light/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="h-8 w-8 dark:text-bg-dark text-bg-light" />
                                </div>
                                <h3 className="text-xl font-semibold dark:text-subtitle-dark text-subtitle-light mb-2">{item.title}</h3>
                                <p className="dark:text-description-dark text-description-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Preview */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="md:text-4xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-4">See It In Action</h2>
                        <p className="md:text-xl text-md font-neueplak-regular dark:text-subtitle-dark text-subtitle-light">Experience the platform through our interactive demo</p>
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

            {/* Features */}
            <section id="features" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="md:text-4xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-4">Why Choose Basha Bhara Hobe?</h2>
                        <p className="md:text-xl text-md dark:text-subtitle-dark text-subtitle-light font-neueplak-regular">Modern solutions for traditional rental problems</p>
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

            {/* About */}
            <section id="about" className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="md:text-4xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-8">About Basha Bhara Hobe</h2>
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
                            <div className="md:text-3xl text-2xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">MERN</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Stack Technology</div>
                        </div>
                        <div>
                            <div className="md:text-3xl text-2xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">QR</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Code Innovation</div>
                        </div>
                        <div>
                            <div className="md:text-3xl text-2xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">0</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Agent Fees</div>
                        </div>
                        <div>
                            <div className="md:text-3xl text-2xl font-neueplak-black dark:text-subtitle-dark text-subtitle-light">24/7</div>
                            <div className="dark:text-description-dark text-description-light font-neueplak-regular">Availability</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Options Section */}
            <section id='getstarted' className='py-20 dark:bg-nav-dark bg-nav-light flex items-center justify-center'>
                <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
                    <h2 className="md:text-4xl text-2xl text-center font-neueplak-black dark:text-title-dark text-title-light mb-5">Start Listing Your Apartment Today</h2>
                    <p className="md:text-xl text-lg text-center font-neueplak-regular dark:text-subtitle-dark text-subtitle-light  mb-16">
                        Join thousands of property owners who have already modernized their rental process
                    </p>
                    {/* Main container for the cards and divider */}
                    <section className='flex flex-col md:flex-row items-center justify-center sm:gap-20 gap-4'>
                        <a href='/register' className='relative w-full h-60 md:w-1/3 border-2 dark:border-title-dark border-title-light dark:text-title-dark text-title-light dark:hover:bg-bg-dark hover:bg-bg-light transition-all duration-300 group rounded-3xl px-6 overflow-hidden flex items-end justify-end cursor-pointer'>
                            <h2 className='absolute top-4 left-6 text-2xl md:text-3xl'>Home owner</h2>
                            <svg className='md:h-[90%] h-[80%] group-hover:scale-110 transition-all duration-300 fill-current' viewBox="0 0 217 242" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M114.644 0.522949C110.138 1.46341 104.387 3.00238 100.267 4.37035C93.143 6.76428 89.9672 8.94449 89.1517 12.0652C88.8513 13.0484 87.8213 14.8438 86.7484 16.0836C84.5168 18.6913 83.4438 20.7432 82.4568 24.4196C81.3839 28.2243 81.7272 37.8855 83.0147 41.4765L83.9588 44.0414L82.9288 44.8964C81.0405 46.5208 80.5255 48.1453 80.5255 52.8904C80.5255 57.6356 81.0405 59.5593 83.2293 63.1502C85.1176 66.2709 87.3492 67.8098 90.3534 68.0663C92.2846 68.2373 92.9284 68.4938 93.1001 69.0495C93.1859 69.477 93.143 72.2985 92.9284 75.2909C92.7138 78.3261 92.3705 83.5414 92.1559 86.8759C91.6409 94.2287 91.2117 95.3402 88.5938 95.7677C87.5638 95.9386 85.5897 96.6226 84.1734 97.2639C82.7572 97.9478 80.4397 99.0166 79.0234 99.6151C77.6072 100.256 75.5901 101.154 74.5172 101.624C72.2426 102.693 70.0968 103.633 68.2943 104.36C66.1485 105.258 61.0414 107.566 60.3548 107.951C60.0114 108.165 58.8527 108.763 57.7798 109.319C51.6427 112.354 45.6344 117.356 42.9736 121.631C41.3857 124.11 38.0382 130.822 38.0382 131.463C38.0382 131.762 37.7807 132.575 37.4803 133.301C37.1369 134.071 36.5361 135.823 36.1069 137.234C34.9053 141.338 34.0899 143.946 33.5319 145.784C32.5449 148.819 31.6007 152.111 30.7853 155.402C30.3561 157.155 29.8411 158.566 29.6695 158.566C29.4978 158.523 28.6395 157.882 27.6953 157.155L26.0216 155.787L26.7511 154.419C27.2232 153.522 27.4807 151.983 27.4807 150.059C27.5236 147.109 27.5665 147.024 29.4549 145.1C30.8282 143.689 31.6007 142.407 32.2015 140.526C33.0169 137.918 32.974 137.02 31.9869 134.541C31.5149 133.429 31.5149 133.002 31.944 132.318C32.9311 130.736 32.3303 125.948 30.914 124.153C30.1415 123.17 29.8411 121.246 30.3132 120.348C30.5707 119.878 31.429 119.408 32.3732 119.237C37.4373 118.382 41.6861 114.235 43.789 108.122C44.5615 105.899 44.7332 99.8716 44.0894 98.6318C43.8319 98.2471 43.2311 97.0074 42.7161 95.8959C41.3427 92.989 38.3386 90.3385 35.2915 89.3981C34.519 89.1416 34.4761 88.5431 34.6907 74.0939C34.9053 58.6188 34.8194 57.0371 33.2315 54.9851C30.1845 51.0095 24.4336 51.8217 21.9874 56.6096C21.0862 58.3195 21.1291 59.3883 22.1591 62.1242C23.0603 64.4326 22.8457 65.7151 21.5582 66.5701C20.7428 67.0831 21.0003 72.2557 21.8587 73.1962C22.7599 74.2222 22.8028 75.4191 21.9016 76.6589C21.4724 77.3001 21.2149 78.5398 21.2578 80.378C21.2578 82.259 21.0862 83.2422 20.657 83.5842C20.2278 83.9689 20.0132 84.9949 20.0132 86.9614V89.7828L17.4812 92.476C15.3783 94.6989 14.6916 95.8104 13.5758 98.8883C12.417 102.009 12.2454 102.992 12.4599 105.001L12.6745 107.353L9.92786 108.977C8.42579 109.832 6.40871 111.328 5.46455 112.269C0.614981 117.142 -0.629597 121.332 0.271649 129.753C0.529148 132.446 0.958313 135.139 1.12998 135.738C1.34456 136.336 1.64498 137.747 1.77373 138.944C1.90248 140.098 2.24581 141.937 2.46039 143.005C2.67497 144.074 3.06122 146.254 3.2758 147.921C3.49039 149.546 3.96247 152.538 4.26288 154.505C4.94955 158.48 4.8208 159.549 3.66205 159.891C3.23289 160.019 2.37456 160.746 1.77373 161.473C0.829564 162.584 0.657898 163.097 0.87248 164.551C1.00123 165.534 1.38748 168.526 1.73081 171.22C3.83372 187.721 5.46455 198.451 6.58038 202.426C8.94078 211.062 11.0866 215.721 14.3053 219.312C16.0649 221.279 19.627 223.715 22.1162 224.613C24.4336 225.425 25.4636 225.554 29.1545 225.425C33.0169 225.297 33.8753 225.126 36.3644 223.886C38.8107 222.689 42.3727 220.082 43.8319 218.372C44.0894 218.115 45.1194 216.918 46.1923 215.679C47.2652 214.482 48.5098 212.772 48.9819 211.917C49.4969 211.062 50.441 209.48 51.0848 208.411C54.046 203.837 59.9685 190.328 61.2131 185.412C61.6423 183.66 62.0285 183.232 62.4577 184.002C62.8439 184.6 62.7581 186.951 61.9856 195.373C61.771 198.194 61.4706 203.666 61.3848 207.556C61.2989 211.446 60.9985 219.227 60.741 224.87C60.1402 238.079 59.6252 256.76 59.8398 257.444C59.9685 257.872 71.2126 258 114.172 258C143.913 258 168.547 257.829 168.848 257.615C169.277 257.359 169.363 255.136 169.234 247.056C169.148 241.456 168.891 236.198 168.719 235.386C168.333 233.761 168.848 233.206 170.822 233.206C171.509 233.206 173.054 232.949 174.255 232.607C175.457 232.265 177.431 231.795 178.59 231.538C180.907 231.025 186.229 229.486 187.602 228.888C188.074 228.717 189.705 228.033 191.25 227.392C202.28 222.946 210.434 216.32 214.382 208.582C215.884 205.547 217 201.144 217 198.023C217 190.97 213.18 180.795 204.769 165.448C201.293 159.122 199.833 156.3 195.37 147.622C186.787 130.993 185.671 128.941 182.838 124.794C179.062 119.28 178.547 118.681 173.054 113.85C171.294 112.269 157.818 104.959 156.702 104.959C156.531 104.959 155.801 104.702 155.071 104.36C151.982 103.035 147.175 101.154 146.188 100.855C145.587 100.727 144.171 100.128 142.969 99.6151C138.763 97.7341 137.562 97.2639 137.004 97.2639C136.188 97.2639 134.772 95.5539 134.214 93.8867C133.356 91.3218 133.57 90.595 135.587 89.4408C140.351 86.5766 144.943 80.207 147.046 73.5382C147.347 72.5977 147.819 71.0587 148.119 70.1183C149.278 66.5273 150.007 61.2692 150.479 53.7454C150.737 49.4705 150.866 45.6231 150.737 45.1956C150.479 44.4689 151.08 40.707 152.582 33.5679C154.084 26.5143 153.612 22.2394 150.78 16.3828C148.849 12.4499 146.66 9.50023 143.87 7.14903C141.167 4.88333 134.686 1.6344 131.081 0.779419C127.262 -0.118286 118.421 -0.289307 114.644 0.522949ZM129.15 3.68636C130.738 3.9001 132.369 4.2421 132.798 4.45584C133.184 4.66959 134.514 5.26807 135.673 5.78107C141.982 8.68799 146.617 13.3904 148.806 19.1187C150.608 23.7784 151.037 26.5571 150.522 30.0197C150.265 31.7724 149.922 33.3969 149.793 33.6106C149.407 34.2946 148.763 33.5679 148.763 32.4137C148.763 30.7037 147.132 25.8731 145.587 23.1371C143.398 19.1615 142.926 18.905 136.66 18.9477C133.742 18.9477 130.523 19.1615 129.45 19.4607C128.42 19.7172 125.631 20.1447 123.227 20.3157C120.867 20.5294 117.477 20.9142 115.674 21.2134C110.481 22.0257 102.027 20.7432 100.482 18.9477C99.323 17.6225 98.1642 17.195 97.4346 17.7935C96.5763 18.4775 96.705 19.6317 97.6921 20.5294C98.808 21.5127 98.765 21.6837 97.3059 25.2318C95.5034 29.7205 94.688 33.9099 94.3876 40.2795C94.2588 43.4002 93.9584 45.9651 93.7867 45.9651C93.6151 45.9651 92.628 45.4094 91.598 44.7254C90.568 44.0841 89.023 43.4002 88.0788 43.2719C87.1776 43.1437 86.3192 42.8872 86.1905 42.8017C85.8901 42.4597 85.2892 39.1253 84.7313 34.3374C84.3022 30.7037 84.3451 29.6777 84.9888 26.6426C85.8901 22.5387 87.7355 18.8622 89.7097 17.2378C90.7826 16.3828 91.2976 15.4423 91.6838 13.9461C92.0701 12.2789 92.4992 11.5949 93.7438 10.7827C95.8467 9.32922 100.01 7.49101 101.083 7.49101C101.555 7.49101 102.027 7.32002 102.198 7.10628C102.327 6.89253 103.057 6.59329 103.829 6.4223C104.559 6.2513 105.975 5.9093 106.919 5.56732C114.258 3.21613 121.425 2.57489 129.15 3.68636ZM140.437 22.2822C141.767 22.9234 144.9 26.899 144.9 27.9678C144.9 28.2243 145.158 29.0365 145.501 29.806C147.475 34.6366 147.604 35.4489 147.518 47.2476C147.475 58.6615 147.089 62.6372 145.458 68.6221C142.797 78.3688 137.39 85.9781 131.081 88.7996C128.163 90.082 122.283 90.6805 118.249 90.0393C111.125 88.9706 104.173 84.4819 100.224 78.4543C98.2071 75.3764 96.1471 70.9305 95.8467 68.964C95.718 68.1091 95.2888 66.9121 94.9025 66.3136C94.2588 65.3304 93.8726 65.2021 91.7267 65.2021C89.538 65.2021 89.0659 65.0311 87.478 63.6632C86.4909 62.8509 85.6755 61.9105 85.6755 61.6112C85.6755 61.312 85.4609 60.8845 85.1605 60.5853C83.8301 59.26 82.7143 53.1042 83.2722 50.1117C83.7013 47.8888 85.6755 45.9651 87.478 45.9651C88.7655 45.9651 89.3663 46.3498 91.4263 48.53C93.8296 51.0522 95.16 51.6507 95.8467 50.5392C96.2759 49.8553 96.748 46.2643 97.0913 41.2627C97.5634 33.3541 100.31 22.8806 101.855 22.8806C102.155 22.8806 102.971 23.2226 103.572 23.6074C105.803 25.0609 119.923 24.3769 132.025 22.2822C136.489 21.4699 138.72 21.4699 140.437 22.2822ZM30.1415 56.1821C31.1715 56.8233 31.5578 57.3791 31.6865 58.6615C31.8153 59.5593 31.8153 66.9548 31.6865 75.1199C31.4719 91.4073 31.5149 91.7065 33.9611 92.305C35.8494 92.7752 38.2098 94.4852 39.4115 96.2379C44.304 103.291 40.184 114.192 31.7294 116.715C29.7553 117.313 29.6265 117.313 27.6095 116.159C26.4507 115.518 25.4636 114.791 25.4636 114.577C25.4207 114.321 26.3649 113.765 27.5236 113.295C30.2703 112.183 31.2145 111.457 32.1586 109.747C33.5749 107.011 33.1457 105.044 30.5707 102.907C29.7553 102.265 26.0645 102.223 24.4336 102.864C23.7899 103.12 22.6741 103.505 21.9445 103.719C21.2578 103.89 19.4982 104.446 18.1249 104.916C16.7087 105.429 15.507 105.814 15.4212 105.814C15.0778 105.814 15.3783 102.864 15.8933 101.111C17.0091 97.5204 17.8245 96.1951 20.1849 93.8867C22.6741 91.4928 22.8028 91.2363 22.6311 87.3889C22.5453 86.0636 22.717 85.2941 23.1891 84.9094C23.7041 84.4819 23.8757 83.5414 23.8757 81.4895C23.8757 79.2665 24.1332 78.1978 24.9916 76.6161L26.0645 74.5642L24.9916 72.6832C23.5324 70.2465 23.5753 68.8785 25.1632 66.9121C26.6653 65.0311 26.7082 64.7319 25.7641 62.9364C24.3907 60.3715 24.3049 60.0723 24.3049 59.1318C24.3478 57.8493 25.292 56.6096 26.7941 55.9684C28.382 55.2416 28.6395 55.2416 30.1415 56.1821ZM98.3359 80.6345C100.997 84.6529 103.7 87.2606 107.348 89.3981C108.507 90.082 109.88 90.8515 110.352 91.1508C113.915 93.2455 117.82 94.3569 122.584 94.5707C125.588 94.7417 126.704 94.6134 128.506 93.8867C131.424 92.7325 131.467 92.7325 131.811 94.3569C132.283 96.7509 132.927 98.0333 133.999 98.7601C134.557 99.1021 135.029 99.6151 135.029 99.8716C135.029 100.128 134.042 101.325 132.841 102.607C130.566 105.001 127.133 106.968 123.056 108.122C120.567 108.849 113.657 109.02 110.782 108.421C109.837 108.208 108.035 107.823 106.748 107.566C103.443 106.882 97.9067 104.061 94.9025 101.496C91.598 98.6746 91.3834 98.2898 92.4563 97.1356C94.5163 94.8699 94.7738 93.7157 94.9884 85.0377C95.16 80.4635 95.3746 76.7444 95.5034 76.7444C95.6321 76.7444 96.9196 78.4971 98.3359 80.6345ZM89.7526 99.8288C91.6409 103.462 96.3617 106.968 102.628 109.319C107.477 111.157 109.365 111.457 116.361 111.457C123.142 111.457 123.27 111.457 126.661 110.089C130.952 108.336 134.386 105.771 136.231 103.035C136.961 101.838 137.819 100.855 138.034 100.769C138.634 100.556 142.325 102.479 142.325 102.949C142.325 103.548 139.536 106.925 137.39 109.02C134.214 112.141 130.824 114.021 125.373 115.817C122.326 116.8 109.752 116.8 106.318 115.817C102.327 114.663 98.6363 113.166 96.19 111.67C94.6451 110.73 89.7955 106.968 88.6797 105.814C86.2334 103.334 84.388 101.069 84.388 100.556C84.388 100.171 87.0917 98.9311 88.7655 98.5891C88.9372 98.5891 89.3663 99.1021 89.7526 99.8288ZM83.4868 104.146C85.418 107.182 90.4392 111.756 94.4734 114.235C96.3617 115.389 101.64 117.783 102.241 117.783C102.585 117.783 103.271 117.997 103.743 118.254C104.945 118.852 112.327 119.921 115.46 119.921C118.936 119.878 126.532 118.852 127.648 118.254C128.12 117.997 128.807 117.783 129.193 117.783C130.223 117.783 137.047 113.551 139.021 111.628C141.51 109.276 143.484 106.669 143.827 105.258C144.214 103.847 145.372 103.462 146.917 104.232C147.604 104.531 148.763 105.13 149.535 105.514C150.351 105.899 151.252 106.241 151.638 106.241C151.982 106.241 152.797 106.498 153.398 106.84C154.042 107.139 155.844 107.994 157.475 108.721C167.217 113.209 169.577 114.705 174.341 119.365C178.633 123.554 181.766 127.701 183.611 131.677C183.826 132.147 184.641 133.686 185.456 135.097C186.272 136.507 187.13 138.046 187.345 138.517C188.375 140.782 190.521 145.1 191.293 146.382C194.769 152.196 209.79 181.565 211.12 185.113C212.708 189.302 213.996 195.458 213.996 198.707C213.996 200.46 213.138 203.965 212.065 206.487C210.777 209.523 206.786 214.311 203.138 217.175C199.662 219.911 191.722 224.271 187.602 225.682C179.577 228.375 179.062 228.503 178.676 228.118C178.332 227.776 178.418 227.178 178.933 226.152C179.963 224.015 179.92 216.277 178.89 213.327C177.56 209.565 175.714 206.359 173.611 203.965C172.453 202.683 171.509 201.358 171.509 200.973C171.509 200.588 172.367 199.947 173.569 199.477C174.684 198.964 175.886 198.408 176.229 198.194C176.573 197.98 178.504 196.954 180.521 195.886C186.014 193.064 190.091 190.841 190.821 190.286C191.508 189.773 193.868 188.618 195.327 188.105C195.799 187.892 197.344 187.55 198.76 187.293C201.078 186.823 201.335 186.652 201.464 185.626C201.593 184.728 201.378 184.429 200.52 184.215C199.061 183.873 195.499 184.386 194.683 185.113C193.696 185.925 191.808 186.267 191.593 185.626C191.465 185.369 191.551 183.189 191.765 180.838C191.98 178.487 192.066 173.998 191.937 170.835L191.679 165.106L193.997 165.363C196.701 165.619 197.945 165.406 198.288 164.551C198.718 163.397 192.323 153.906 186.1 146.596C185.671 146.083 184.298 144.373 183.053 142.749C181.766 141.124 180.65 139.714 180.521 139.585C180.392 139.457 179.448 138.303 178.375 137.02C177.345 135.738 176.015 134.242 175.414 133.686C174.727 133.002 174.341 132.062 174.169 130.694C173.826 127.316 173.569 127.188 166.573 127.188C159.578 127.188 159.234 127.359 158.977 130.608C158.848 132.275 158.719 132.489 157.99 132.361C157.518 132.275 149.707 132.147 140.652 132.062C128.592 131.976 123.871 132.104 123.185 132.446C122.283 132.917 114.558 143.005 108.636 151.384C107.22 153.393 104.859 156.685 103.4 158.737C99.6663 163.824 99.795 164.593 104.344 164.593H106.919L106.833 166.517C106.748 168.227 106.233 197.168 106.275 198.493C106.275 198.878 105.803 198.964 104.688 198.75C103.314 198.536 102.885 198.664 101.984 199.648C101.168 200.503 100.911 201.229 100.911 203.025C100.868 204.778 100.61 205.59 99.7092 206.787C98.3359 208.539 98.3359 208.753 99.28 210.848C100.525 213.584 103.658 217.431 107.305 220.68C110.825 223.758 114.644 226.793 115.03 226.793C115.159 226.793 116.06 227.349 117.09 228.033C119.322 229.529 123.528 231.667 125.588 232.351C130.995 234.189 140.137 234.916 146.617 234.018C153.784 232.992 155.114 232.778 157.947 232.137L160.908 231.453L162.067 232.65C162.711 233.291 163.912 234.018 164.685 234.274L166.144 234.787L166.359 244.577C166.487 249.963 166.53 254.495 166.444 254.666C166.359 254.879 142.969 255.008 114.43 255.008H62.5435L62.7581 250.305C62.8439 247.697 63.0156 243.423 63.1443 240.772C63.2731 238.164 63.5735 229.529 63.7881 221.663C64.0027 213.798 64.2602 206.188 64.3889 204.778C64.4747 203.367 64.6893 197.211 64.8181 191.098C64.9897 184.985 65.3331 178.615 65.5906 176.991C65.8481 175.323 66.1485 169.168 66.2343 163.311C66.406 152.41 65.9339 146.425 64.3889 139.756C64.0456 138.346 63.7881 136.807 63.7881 136.379C63.7881 134.584 61.8998 129.069 59.7539 124.623C58.3377 121.674 58.0373 121.203 56.7069 119.878C54.6898 117.826 52.9302 120.263 54.8614 122.443C56.7498 124.495 59.4964 130.822 60.5264 135.524C62.801 145.784 63.5735 152.667 63.5306 162.029C63.5306 169.039 63.0585 172.63 61.6423 176.777C59.6681 182.463 57.6939 187.806 56.8785 189.602C56.4064 190.67 55.7627 192.081 55.4623 192.808C55.1619 193.492 54.3894 195.202 53.7456 196.527C53.1448 197.852 52.4152 199.391 52.2006 199.947C51.7715 200.93 51.5569 201.358 50.5698 203.068C50.2694 203.538 49.8402 204.393 49.6256 204.949C48.4669 207.556 44.0036 213.627 41.0852 216.576C37.609 219.996 36.3215 220.808 32.2444 222.134C28.4249 223.373 23.4895 222.561 19.7987 220.039C17.6958 218.585 14.2624 214.396 13.0608 211.831C12.5887 210.762 11.9879 209.565 11.7733 209.138C10.3141 206.274 7.13829 192.167 7.13829 188.49C7.13829 187.421 6.92371 186.182 6.66621 185.669C6.40871 185.199 6.10829 183.36 5.97954 181.608L5.72205 178.359L6.96662 178.701C8.9837 179.256 18.8116 179.427 19.7987 178.957C20.2707 178.701 21.4295 178.316 22.3736 178.059C24.8628 177.418 28.2961 175.494 30.3132 173.656C31.9869 172.075 32.8882 171.904 32.8882 173.143C32.8882 173.485 33.1886 174.469 33.5749 175.366C33.9611 176.264 34.5619 177.546 34.8624 178.273C35.1628 178.957 35.8923 180.624 36.4503 181.907C39.4115 188.533 39.7548 189.516 40.1411 193.449C40.3986 196.228 40.3986 196.228 41.8148 196.356C42.9736 196.484 43.1882 196.356 43.274 195.501C43.5744 191.226 42.5015 187.592 38.1669 178.487C33.489 168.526 31.7724 163.739 32.1586 161.345C32.2444 160.532 32.6736 158.822 33.0599 157.54C33.4461 156.257 33.9611 154.291 34.2186 153.18C34.4761 152.068 34.8624 151.042 35.0769 150.871C35.2915 150.743 35.4632 150.23 35.4632 149.717C35.4632 149.161 36.0211 146.938 36.7507 144.715C37.4373 142.492 38.4244 139.286 38.9394 137.662C39.4544 135.994 40.0553 134.498 40.2269 134.242C40.4415 134.028 40.6132 133.6 40.6132 133.301C40.6132 132.446 43.5744 126.29 44.7332 124.751C45.2911 124.025 45.7631 123.212 45.7631 122.956C45.7631 122.229 51.3852 116.843 54.1748 114.919C57.0073 112.953 59.0243 111.884 64.861 109.234C67.0068 108.293 69.3672 107.182 70.0968 106.84C70.8693 106.498 72.1997 105.942 73.0151 105.6C73.8305 105.258 75.1609 104.702 75.9334 104.36C76.663 104.018 77.6072 103.633 77.9505 103.505C78.2939 103.377 79.1951 102.907 79.8818 102.436C81.4268 101.539 82.0276 101.795 83.4868 104.146ZM30.2703 105.6C30.7424 106.07 30.3132 108.122 29.6265 108.849C28.6824 109.789 23.1891 112.653 22.3736 112.653C22.0732 112.653 21.2578 112.91 20.5712 113.252C19.9274 113.594 18.5112 114.192 17.4383 114.577C14.2624 115.774 12.6316 116.629 9.84203 118.638C7.65329 120.177 7.13829 120.776 7.13829 121.716C7.13829 122.742 7.30996 122.913 8.42579 122.913C9.15537 122.913 9.71328 122.742 9.71328 122.529C9.71328 121.93 15.2924 118.382 17.4383 117.57C22.3736 115.774 23.3607 115.86 26.3649 118.425C28.0386 119.835 27.6095 120.776 25.2491 120.776C23.4895 120.776 20.5712 121.545 19.3695 122.358C18.8974 122.657 18.2966 122.913 17.9962 122.913C17.2237 122.913 12.7174 125.692 11.1295 127.145C9.45578 128.684 9.36995 129.197 10.7433 129.796C11.6016 130.223 12.1595 130.01 14.8633 128.214C16.537 127.06 18.1678 125.991 18.4253 125.863C18.7257 125.735 19.5841 125.264 20.3566 124.837C21.172 124.452 22.9316 124.025 24.3478 123.896C26.6224 123.683 27.0515 123.768 27.9528 124.623C28.5536 125.179 29.0257 125.863 29.0257 126.162C29.0257 126.504 29.3261 127.402 29.7124 128.214C30.0986 129.026 30.3132 129.967 30.1845 130.352C29.927 130.95 29.7124 130.907 27.9528 130.181C26.0645 129.368 25.807 129.368 23.1032 129.967C19.112 130.907 15.4641 132.489 14.6916 133.729C14.0478 134.755 14.7345 135.738 16.1078 135.738C16.7945 135.738 17.5241 135.567 17.6528 135.31C17.9532 134.84 20.657 133.6 23.3178 132.788C25.9357 131.933 28.0386 132.788 29.412 135.268L30.442 137.106L29.6695 139.628C28.854 142.321 27.4378 144.031 26.1503 143.775C24.777 143.518 24.9486 141.509 26.4507 139.585C27.1803 138.645 27.6953 137.704 27.5236 137.448C27.0086 136.636 25.3349 137.02 23.9616 138.217C22.7599 139.286 22.5882 139.714 22.5882 141.552C22.5882 142.749 22.8028 143.903 23.0174 144.117C23.5753 144.672 24.7341 149.118 24.7341 150.615C24.7341 151.256 24.4336 152.624 24.0474 153.693C23.6182 154.932 23.4895 156.257 23.6611 157.54L23.9186 159.464L21.687 160.917C20.4424 161.729 18.082 162.713 16.4083 163.14C13.3612 163.952 8.4687 164.252 8.38287 163.61C8.33995 163.439 8.25412 162.713 8.2112 162.029C7.86787 158.78 7.05246 152.709 6.45163 149.204C6.10829 147.066 5.50746 143.518 5.16413 141.295C4.77788 139.072 4.17705 135.781 3.7908 134.028C3.40455 132.147 3.10414 128.684 3.10414 125.692C3.06122 120.006 3.49039 118.724 6.40871 115.56C9.2412 112.44 17.2666 107.524 19.4982 107.524C19.9274 107.524 20.4424 107.353 20.6999 107.096C20.9145 106.882 21.9874 106.498 23.0174 106.284C24.0903 106.027 25.6353 105.685 26.4507 105.429C27.7811 105.087 29.7982 105.172 30.2703 105.6ZM165.114 136.379C165.243 139.671 165.2 142.535 165.028 142.706C164.899 142.92 164.041 142.236 163.183 141.167L161.638 139.286V135.011C161.638 132.66 161.766 130.608 161.938 130.437C162.11 130.266 162.839 130.181 163.569 130.266L164.856 130.394L165.114 136.379ZM171.036 130.779C171.637 131.506 171.337 143.775 170.693 144.416C170.479 144.63 169.792 144.715 169.105 144.63L167.861 144.501L167.732 137.875C167.689 134.242 167.732 131.036 167.818 130.736C168.118 130.01 170.436 130.01 171.036 130.779ZM158.548 135.524C158.891 135.652 159.063 136.593 159.063 138.175C159.063 141.039 159.449 141.723 162.968 145.271L165.371 147.708H169.062C173.998 147.708 174.255 147.408 173.826 141.338C173.483 136.08 173.912 135.781 176.701 139.457C177.688 140.825 178.633 142.022 178.804 142.15C178.933 142.279 180.092 143.689 181.379 145.356C182.667 146.981 183.826 148.434 183.954 148.563C184.083 148.691 185.242 150.102 186.529 151.769C187.817 153.393 188.976 154.847 189.104 154.975C189.233 155.103 189.662 155.659 190.048 156.3C190.435 156.899 191.722 158.48 192.967 159.806C194.641 161.644 195.027 162.285 194.555 162.499C194.211 162.627 189.104 162.542 183.268 162.285C177.388 162.029 166.702 161.9 159.492 161.943L146.402 162.029L137.519 150.273C132.626 143.817 128.163 138.089 127.562 137.576C126.532 136.721 126.146 135.738 126.618 135.268C126.875 135.054 157.818 135.268 158.548 135.524ZM123.871 137.234C123.871 137.576 122.755 139.457 121.425 141.424C120.095 143.347 118.12 146.169 117.09 147.665C115.288 150.273 111.812 155.146 111.125 156.044C110.953 156.3 110.009 157.583 109.108 158.951C107.52 161.302 106.447 162.242 105.46 162.242C104.43 162.242 105.117 160.789 108.121 156.728C109.795 154.376 112.069 151.17 113.142 149.631C114.215 148.05 115.288 146.553 115.502 146.254C116.06 145.57 117.648 143.39 119.966 140.013C120.996 138.474 122.069 137.106 122.326 136.935C123.099 136.379 123.871 136.55 123.871 137.234ZM128.163 142.706C128.163 142.877 128.377 143.262 128.592 143.561C128.85 143.86 132.497 148.691 136.703 154.334L144.385 164.593L144.042 168.355C143.742 172.459 144.257 199.519 144.729 202.042C144.857 202.897 144.814 203.709 144.6 203.837C144.385 203.965 142.754 203.709 140.995 203.239C139.278 202.768 137.261 202.469 136.532 202.555C134.128 202.897 134.171 202.982 134.472 195.159C134.686 188.832 134.643 187.806 133.999 186.866L133.313 185.754H126.661C120.352 185.754 120.009 185.797 119.537 186.652C119.236 187.293 119.107 190.157 119.193 195.629L119.365 203.709L118.206 203.965C117.562 204.094 116.919 204.393 116.79 204.607C116.189 205.547 114.258 204.863 111.64 202.811L108.85 200.631L109.108 198.622C109.237 197.553 109.494 188.875 109.623 179.342L109.923 162.029L113.185 157.754C114.945 155.402 117.047 152.496 117.863 151.341C118.635 150.144 120.438 147.537 121.811 145.485C123.185 143.476 124.3 141.509 124.3 141.124C124.3 140.782 124.644 140.269 125.073 140.056C125.674 139.714 126.017 139.885 126.961 140.996C127.605 141.766 128.163 142.535 128.163 142.706ZM28.2532 160.404C28.7253 160.832 29.0257 161.687 29.0257 162.755C29.0257 163.653 29.3261 165.021 29.7124 165.705C30.914 168.099 30.6565 169.381 28.5536 171.262C26.2791 173.272 23.0174 174.981 20.4424 175.537C19.3695 175.794 17.567 176.178 16.3653 176.435C13.447 177.033 7.6962 176.691 5.97954 175.794C4.77788 175.152 4.60622 174.853 4.43455 172.844C4.34872 171.604 4.00539 169.253 3.70497 167.629C3.23289 165.021 3.2758 164.508 3.96247 163.055C4.94955 160.789 5.85079 160.874 5.85079 163.226C5.85079 166.218 6.75204 166.731 11.8162 166.688C17.567 166.688 22.4595 164.722 25.292 161.345C26.837 159.464 27.1374 159.378 28.2532 160.404ZM189.233 166.303C189.147 166.774 189.018 171.861 188.933 177.632L188.761 188.105L185.542 189.815C183.783 190.756 181.293 192.081 180.006 192.765C178.761 193.449 176.058 194.903 173.998 195.971C171.938 197.04 168.633 198.793 166.702 199.819C161.724 202.384 157.818 205.034 157.518 205.974C157.217 206.872 155.672 207.556 153.999 207.513C153.355 207.513 151.595 206.915 150.136 206.145L147.389 204.778L147.218 186.395C147.089 176.264 146.917 167.586 146.789 167.03C146.703 166.474 146.703 165.876 146.832 165.619C147.003 165.363 155.029 165.277 168.204 165.32C189.018 165.448 189.319 165.448 189.233 166.303ZM131.167 188.96C131.424 189.131 131.596 191.696 131.596 195.8C131.596 203.452 132.24 202.64 125.931 203.025L122.155 203.239V196.014C122.155 191.611 122.326 188.747 122.584 188.661C123.313 188.405 130.695 188.661 131.167 188.96ZM106.404 202.298C107.22 202.982 109.28 204.564 110.953 205.846C112.627 207.129 114 208.454 114 208.753C114 209.608 115.588 211.66 117.047 212.729C118.592 213.798 122.755 214.738 127.734 215.08C129.751 215.251 132.025 215.636 132.841 215.935C134.729 216.704 135.716 216.704 136.059 215.85C136.532 214.653 136.317 214.011 135.373 213.37C134.429 212.772 126.618 211.575 122.369 211.446C120.18 211.361 117.734 210.207 117.262 209.01C116.919 208.112 117.906 206.701 119.15 206.359C119.751 206.231 124.944 206.103 130.738 206.06C140.609 206.06 141.424 206.103 143.956 207.043C145.415 207.556 146.96 208.155 147.389 208.368C150.007 209.779 151.295 210.121 154.17 210.121C155.887 210.121 157.432 209.907 157.561 209.694C158.161 208.71 159.492 209.352 160.908 211.275C163.397 214.653 165.028 219.398 165.114 223.288C165.157 225.554 165.028 226.152 164.213 227.007C163.655 227.605 162.839 228.076 162.41 228.076C161.981 228.076 160.522 228.332 159.149 228.674C154.771 229.743 151.638 230.256 145.372 230.854C134.343 231.88 126.704 230.427 119.236 225.853C110.653 220.637 102.628 213.156 101.769 209.565C101.297 207.77 102.885 208.026 104.258 209.993C105.632 211.959 111.64 217.089 113.571 217.944C113.915 218.115 115.073 218.756 116.146 219.355C119.708 221.407 125.33 224.228 125.802 224.228C126.103 224.228 126.661 223.844 127.133 223.331C127.948 222.433 127.905 222.433 126.747 221.407C126.06 220.851 125.245 220.381 124.901 220.381C124.3 220.381 121.039 218.842 117.434 216.918C111.211 213.541 104.516 207.513 103.7 204.607C103.357 203.367 103.357 202.597 103.7 201.999C104.301 200.887 104.559 200.93 106.404 202.298ZM170.693 204.906C175.5 210.805 177.731 217.73 176.658 223.373C176.401 224.656 176.101 226.451 175.929 227.392C175.628 229.273 174.556 229.914 170.865 230.427C169.706 230.598 168.204 231.025 167.56 231.325C166.23 232.009 164.384 232.094 163.998 231.538C163.869 231.325 164.427 230.598 165.243 229.914C167.389 228.118 168.075 226.451 168.075 223.031C168.075 218.414 165.672 212.387 162.367 208.582C161.466 207.556 160.822 206.53 160.994 206.316C161.123 206.06 162.196 205.376 163.397 204.778C164.599 204.179 165.972 203.41 166.487 203.068C167.989 202.042 168.633 202.298 170.693 204.906Z" />
                                <path d="M108.636 36.6459C107.692 37.1162 106.576 37.8001 106.19 38.1849C105.16 39.0826 105.203 40.7071 106.276 41.0491C107.263 41.3483 108.851 40.9636 108.851 40.3651C108.851 40.1513 109.58 39.6811 110.481 39.2964C112.155 38.6124 114.687 38.6551 118.292 39.4674C120.61 39.9803 121.854 39.5101 121.64 38.1421C121.296 35.8764 112.198 34.8077 108.636 36.6459Z" />
                                <path d="M133.055 36.4321C130.523 37.1589 129.407 38.6123 130.566 39.5956C131.081 40.023 131.896 40.023 134.643 39.5528C138.334 38.9971 141.081 39.2108 142.668 40.2368C143.956 41.0918 144.9 40.707 144.9 39.4246C144.9 36.4321 138.548 34.8504 133.055 36.4321Z" />
                                <path d="M126.575 45.2384C125.759 45.5804 125.588 46.0079 125.588 47.4613C125.588 48.4018 125.759 49.385 125.974 49.5988C126.189 49.8553 126.575 50.7103 126.789 51.5225C127.519 53.9164 128.635 56.8234 129.021 57.2936C129.193 57.5073 129.493 58.4051 129.665 59.3028C130.094 61.483 128.892 62.6372 126.232 62.6372C124.515 62.6372 124.3 62.7655 124.043 63.7487C123.657 65.2877 124.472 65.7151 127.262 65.4587C129.836 65.2449 131.553 64.0052 132.497 61.6967C133.055 60.286 132.669 57.8493 131.424 55.1562C130.18 52.5057 128.592 47.7606 128.592 46.7774C128.592 46.4354 128.334 45.8369 128.077 45.4521C127.648 44.8964 127.304 44.8537 126.575 45.2384Z" />
                                <path d="M136.703 45.3239C136.102 45.6659 135.33 46.5209 135.03 47.2476C134.557 48.3591 134.6 48.8293 135.201 50.411C136.102 52.7195 137.647 53.3607 139.064 51.9927C140.351 50.7103 140.222 47.0766 138.849 45.7514C137.905 44.8109 137.733 44.8109 136.703 45.3239Z" />
                                <path d="M110.567 46.692C109.795 47.6325 109.666 48.2737 109.838 49.7699C110.181 52.8478 112.284 53.7456 114.215 51.6936C115.588 50.2402 115.631 48.06 114.344 46.6065C113.142 45.1958 111.726 45.2385 110.567 46.692Z" />
                                <path d="M87.092 50.9669C86.1478 51.3088 86.4911 52.8051 88.0361 55.37C88.8515 56.738 89.5382 58.0204 89.5382 58.2342C89.5382 58.8327 90.9974 60.0724 91.7269 60.0724C92.0703 60.0724 92.5853 59.6876 92.8857 59.1747C93.3578 58.4052 93.3578 58.1487 92.7999 57.5502C92.4136 57.1227 92.1132 56.6525 92.1132 56.4815C92.1132 56.3105 91.4265 55.1563 90.654 53.8738C89.109 51.5226 88.0361 50.6249 87.092 50.9669Z" />
                                <path d="M112.499 67.81C111.941 68.665 112.713 70.2467 114.516 71.9139C117.134 74.2651 121.597 75.6758 125.288 75.2911C130.18 74.7353 133.871 73.2391 134.429 71.5292C134.987 69.7765 132.755 69.3917 130.352 70.8452C129.022 71.7002 128.249 71.8284 124.301 71.8284C119.322 71.8284 117.992 71.3582 115.589 68.6222C114.43 67.3398 113.014 66.955 112.499 67.81Z" />
                                <path d="M119.665 162.627C119.236 162.884 119.107 164.765 119.107 170.707C119.065 174.982 119.193 178.658 119.365 178.914C119.537 179.171 122.24 179.342 126.446 179.342C135.115 179.342 134.557 179.94 134.386 170.45C134.3 165.748 134.085 163.311 133.742 162.884C133.313 162.371 131.939 162.242 126.704 162.242C123.142 162.242 119.966 162.413 119.665 162.627ZM125.502 170.664L125.373 176.136H123.657H121.94L121.811 170.664L121.682 165.235H123.657H125.631L125.502 170.664ZM131.382 170.792V176.136L130.18 176.52C129.407 176.82 128.849 176.777 128.549 176.478C128.163 176.093 127.948 169.98 128.163 165.534C128.163 165.32 128.892 165.235 129.794 165.32L131.382 165.449V170.792Z" />
                                <path d="M162.496 174.127C160.522 174.383 160.351 175.153 160.351 182.762C160.351 187.721 160.522 190.029 160.866 190.371C161.209 190.713 163.612 190.884 168.762 190.884C175.071 190.884 176.187 190.799 176.702 190.157C177.431 189.345 177.775 175.666 177.131 174.682C176.831 174.212 175.286 174.084 170.136 174.041C166.531 173.998 163.097 174.041 162.496 174.127ZM167.561 182.42L167.689 187.849L166.573 188.148C165.93 188.319 164.986 188.234 164.385 187.934C163.355 187.507 163.355 187.379 163.355 182.121V176.734L165.415 176.862L167.432 176.991L167.561 182.42ZM174.599 177.29C174.728 177.589 174.685 180.154 174.556 182.976L174.298 188.105H172.367H170.436L170.307 182.976C170.264 180.154 170.307 177.589 170.436 177.29C170.522 176.991 171.38 176.777 172.539 176.777C173.655 176.777 174.513 176.991 174.599 177.29Z" />
                                <path d="M189.533 57.9349C189.19 58.1486 188.074 58.7044 187.044 59.1746C179.405 62.8938 176.572 72.8115 181.164 79.9506C182.752 82.4728 186.186 85.5935 187.516 85.8072C188.46 85.9355 188.46 85.9355 188.675 100.256C188.846 111.97 189.018 114.748 189.533 115.518C189.876 116.073 190.391 116.501 190.649 116.501C190.906 116.501 191.379 116.8 191.679 117.142C192.451 118.04 195.799 117.997 196.786 117.014C197.172 116.629 197.988 115.561 198.503 114.663C199.447 113.167 199.576 113.081 201.764 113.081C204.854 113.081 205.412 112.483 205.412 109.063C205.412 105.728 204.726 104.959 201.807 104.959C200.391 104.959 199.747 104.745 199.533 104.318C199.189 103.42 199.361 103.334 201.979 102.821C205.112 102.223 205.412 101.881 205.412 98.9312C205.412 96.6655 205.283 96.3235 203.91 94.9555C202.751 93.8013 202.022 93.4165 200.606 93.331C198.46 93.16 198.288 92.7326 198.76 88.5432C199.018 86.0637 199.103 85.8927 200.648 85.166C202.322 84.3538 204.854 82.1736 205.713 80.7628C207.73 77.5139 208.159 76.1032 208.202 72.2558C208.202 68.8786 208.073 68.1519 207 66.0572C204.854 61.8678 202.365 59.7304 198.116 58.3624C195.284 57.5074 190.692 57.2509 189.533 57.9349ZM195.456 60.9701C199.661 61.6968 202.322 63.7488 204.683 68.0664C205.841 70.2466 205.67 74.436 204.339 77.1292C203.309 79.0956 199.318 83.1568 198.331 83.1568C198.116 83.1568 197.43 83.5415 196.872 83.969C195.842 84.7812 195.799 84.9095 195.885 90.2959C195.928 93.2883 195.928 95.896 195.971 96.0242C195.971 96.6655 197.473 96.7937 199.061 96.3235C200.734 95.8532 200.863 95.8532 201.85 97.0075C202.623 97.9479 202.837 98.5037 202.623 99.3586C202.236 100.855 202.193 100.855 200.133 100.812C197.558 100.684 196.4 101.582 196.4 103.676C196.4 105.685 197.902 107.096 200.005 107.096C201.85 107.096 202.966 107.951 202.751 109.276C202.623 110.217 202.365 110.302 200.048 110.516C197.001 110.773 196.4 111.072 196.4 112.397C196.4 112.953 196.014 113.722 195.541 114.15C194.726 114.877 194.597 114.919 193.181 114.235L191.679 113.509V99.2304V84.9095L190.563 84.0545C189.919 83.5415 189.233 83.1568 189.018 83.1568C188.417 83.1568 185.199 80.5918 184.383 79.5231C182.323 76.7444 181.379 72.2131 182.237 69.1779C183.224 65.587 186.701 62.1243 190.22 61.1838C191.379 60.8846 192.409 60.5853 192.494 60.5426C192.58 60.5426 193.911 60.7136 195.456 60.9701Z" />
                                <path d="M190.563 66.0145C187.302 67.981 186.4 71.7856 188.46 75.0345C189.319 76.3598 189.962 76.83 191.808 77.4285C194.082 78.1125 194.082 78.1125 195.799 77.0437C198.331 75.462 198.975 74.2651 198.975 71.0589C198.975 68.7932 198.803 68.1947 198.031 67.468C195.499 65.2023 192.795 64.6465 190.563 66.0145ZM195.413 69.1352C196.786 70.4177 196.7 72.2131 195.155 73.7948C193.61 75.3338 192.967 75.3338 191.293 73.9231C189.576 72.5124 189.49 70.7169 191.078 69.2634C192.495 67.9382 194.082 67.8955 195.413 69.1352Z" />
                            </svg>
                        </a>

                        <p className='md:hidden w-full text-center dark:text-title-dark text-title-light'>- or -</p>
                        <div className='md:block hidden transform md:rotate-10 md:w-[1px] w-full md:h-80 h-[1px] dark:bg-title-dark bg-title-light'></div>

                        <a href="/renter" className='relative w-full h-60 md:w-1/3 border-2 dark:border-title-dark border-title-light dark:text-title-dark text-title-light dark:hover:bg-bg-dark hover:bg-bg-light  transition-all duration-300 group rounded-3xl px-6 overflow-hidden flex items-end justify-end cursor-pointer'>
                            <h2 className='absolute top-4 left-6 text-2xl md:text-3xl'>Renter</h2>
                            <svg className='md:h-[90%] h-[80%] group-hover:scale-110 transition-all duration-300 fill-current' viewBox="0 0 229 246" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M112.674 0.578613C101.212 4.55847 91.448 14.4658 88.2641 25.4316C87.2453 28.9458 86.4387 30.5546 84.401 33.2643C83.4246 34.5345 82.0237 36.7361 81.2595 38.1333C79.9435 40.5466 79.8586 40.8854 79.8162 45.331C79.8162 47.8713 79.8586 51.5971 79.986 53.5871C80.1558 57.1859 80.1558 57.2282 78.203 61.2081C75.0191 67.686 74.8917 70.7344 77.3964 77.932C78.1181 80.0066 78.7124 81.9966 78.7124 82.3776C78.7124 83.1397 80.9624 85.6377 82.7454 86.8232C83.7218 87.4583 84.7406 87.67 87.2028 87.67C89.9622 87.67 90.599 87.797 91.8725 88.7708C94.7593 90.8877 100.278 92.1156 106.985 92.1156C109.49 92.1156 110.127 92.2426 110.127 92.7507C110.127 93.3857 108.768 94.1055 104.184 95.9261C102.91 96.4342 100.915 97.3233 99.7262 97.8313C96.9243 99.1015 92.4669 100.753 89.9622 101.43C86.3113 102.446 81.2171 104.606 77.6511 106.68C71.1135 110.533 65.0429 116.545 57.5713 126.622C55.661 129.162 53.9204 131.533 53.6657 131.83C53.411 132.126 52.3922 133.523 51.3733 135.005C50.3969 136.445 47.2979 140.721 44.4961 144.447C41.7367 148.215 39.232 151.644 38.9773 152.068C38.1707 153.38 37.534 152.237 37.067 148.808C36.8123 147.072 36.3453 143.939 36.0481 141.822C35.7085 139.747 35.4114 137.164 35.4114 136.19C35.4114 135.174 35.2416 133.65 34.9868 132.803C34.5623 131.279 33.4586 120.356 32.9916 113.073C32.7369 109.051 31.8454 106.807 30.3171 106.299C28.7888 105.833 28.619 105.114 29.0436 101.684L29.4681 98.4664L34.0104 93.9785L38.5953 89.5329L39.5292 90.7184C40.5056 91.8615 40.5056 92.0732 40.4207 101.6L40.2933 111.253L41.949 112.692C43.8169 114.301 45.9819 114.598 47.5102 113.454C48.3168 112.862 48.3592 112.269 48.4441 102.362L48.529 91.9462L49.7177 91.0994C53.2837 88.5591 54.6421 85.045 53.7506 80.7687C53.4959 79.4986 52.9865 78.1014 52.6044 77.7203C51.7978 76.8312 51.7978 75.8574 52.562 75.2223C52.8591 74.9683 53.3686 73.9098 53.6657 72.8937C54.8119 68.7444 51.8827 64.1295 47.4677 63.1557C46.7036 62.9863 44.9631 61.6315 43.0527 59.6839C37.6189 54.2222 34.6472 52.4016 30.5718 52.0205C28.4068 51.8088 25.52 52.825 24.3314 54.2645C24.0342 54.6455 22.7182 55.45 21.4446 56.1274C20.1286 56.7625 18.3881 57.948 17.5815 58.7101C16.7749 59.5145 15.2891 60.7 14.2703 61.3774C13.2939 62.0549 12.4873 62.7323 12.4873 62.944C12.4873 63.1557 11.0864 64.6799 9.38827 66.4158C5.35533 70.5227 4.84591 72.0045 4.84591 80.0913C4.84591 83.3091 5.05817 86.6538 5.27043 87.4583C5.52514 88.2627 5.8223 92.7507 5.99211 97.4503L6.24682 105.918L5.05817 106.85C4.42139 107.358 3.65725 107.781 3.40254 107.781C2.12898 107.781 1.15258 110.11 0.812964 113.92C-0.12098 124.801 -0.290788 147.241 0.5158 155.201C1.74691 167.31 3.44499 176.116 5.52514 180.901C5.86475 181.62 6.11947 182.509 6.11947 182.848C6.11947 183.187 6.41663 183.695 6.75625 183.991C7.09586 184.288 7.39303 184.711 7.39303 184.923C7.39303 185.177 8.11471 186.489 8.96375 187.886C11.8929 192.628 17.0721 196.481 23.3125 198.556C26.4115 199.572 34.2227 199.487 37.4491 198.429C42.8829 196.566 47.3828 194.449 51.5431 191.697C55.4063 189.114 65.8919 179.715 68.3117 176.667C70.3069 174.126 70.3918 174.846 70.0522 190.511C69.8824 198.471 69.5428 206.008 69.3305 207.278C69.1183 208.548 68.7786 211.512 68.5664 213.84C68.3541 216.169 67.9721 219.598 67.7173 221.461C67.4202 223.324 66.9108 226.838 66.5711 229.294C65.6796 235.73 64.7457 241.699 64.0665 245.849C63.2174 250.76 63.2599 252.03 64.2363 252.58C65.2551 253.089 194.522 253.173 195.371 252.623C195.795 252.369 195.88 251.48 195.753 249.151C195.498 245.171 194.437 238.058 193.757 235.73C193.163 233.782 193.503 232.935 195.116 232.427C197.493 231.707 208.828 224.34 214.007 220.191C221.776 214.01 225.851 209.056 228.313 202.874C229.29 200.461 229.205 193.052 228.186 189.03C226.658 183.314 224.578 177.683 221.054 170.019C220.46 168.749 219.696 167.098 219.398 166.421C215.96 158.546 214.559 155.624 208.318 143.134C197.918 122.346 195.243 118.069 189.257 112.438C184.418 107.908 177.371 103.674 169.56 100.626C167.267 99.6943 166.333 99.3132 163.829 98.2547C163.149 97.9584 161.621 97.408 160.433 96.9846C159.286 96.6035 157.164 95.7567 155.763 95.0793C153.343 93.9785 150.796 92.92 149.055 92.3696C147.357 91.8192 148.758 91.0571 152.452 90.549C159.117 89.5752 165.399 85.6801 167.607 81.0651C168.923 78.2707 168.965 77.8897 167.947 77.3393C166.885 76.7888 166.333 77.2122 165.484 79.2022C163.616 83.6901 157.079 87.2466 148.291 88.6014C145.999 88.9402 145.532 87.924 145.405 82.1236C145.277 77.2969 145.744 74.8836 147.315 71.8352C147.697 71.0307 148.376 69.5065 148.758 68.4481C149.395 66.6698 149.607 66.4581 151.305 66.0771C154.192 65.3997 155.593 64.5952 157.376 62.7323C162.98 56.7202 163.999 48.9721 159.668 44.6535C158.098 43.087 157.843 43.0023 155.508 43.0023C153.173 43.0023 152.834 43.1293 151.178 44.6535C149.437 46.2624 149.353 46.3047 148.461 45.6273C147.188 44.6112 144.81 39.9962 145.32 39.4882C145.617 39.1918 146.084 39.2765 146.721 39.6999C148.164 40.6313 150.244 40.9277 151.093 40.2926C152.154 39.5305 151.73 38.218 150.244 37.7523C146.466 36.6091 145.107 35.9317 143.919 34.5768C143.197 33.7724 140.523 31.0627 137.975 28.607C131.608 22.4679 129.782 19.5465 129.358 14.6352C128.976 10.4859 128.127 9.42746 126.513 11.2057C125.749 12.0525 125.749 12.6029 126.811 17.5989C127.744 22.0868 131.565 27.3792 136.787 31.4861C140.395 34.3228 143.664 39.9116 143.664 43.1293C143.664 44.5265 146.211 47.9136 147.824 48.6757C149.14 49.3108 149.353 49.3108 150.202 48.7181C150.669 48.337 151.857 47.4902 152.791 46.8128C153.725 46.1354 154.829 45.585 155.253 45.5426C157.928 45.5003 160.22 49.9459 159.329 53.333C157.758 59.1758 153.683 63.325 149.522 63.325C147.782 63.325 147.57 63.4521 146.933 64.8069C146.551 65.6537 146.211 66.6698 146.211 67.0509C146.211 67.8977 142.73 74.1638 141.839 74.9259C141.541 75.18 140.523 76.3231 139.631 77.4663C135.81 82.2929 129.91 85.7647 124.136 86.6538C118.363 87.543 113.65 85.8917 108.768 81.2345C101.042 73.8251 98.1979 64.5105 98.1554 46.6011C98.1554 36.6515 98.3252 36.1857 102.273 34.1535C103.929 33.3067 106.094 31.9942 107.113 31.2744C109.023 29.8772 112.419 25.7703 113.141 23.9921C113.353 23.4417 114.33 21.7905 115.306 20.3509C117.174 17.4719 118.914 16.3287 121.377 16.3287C123.839 16.3287 124.476 13.746 122.141 13.1533C120.995 12.8993 118.83 13.4073 116.58 14.5505C115.094 15.3126 112.716 18.234 111.018 21.4094C108.386 26.2784 104.736 30.0889 101.042 31.7825C99.7686 32.3752 98.4526 32.8409 98.113 32.8409C97.0941 32.8409 96.6696 33.7301 95.9055 37.2865C95.014 41.5628 95.2262 57.0165 96.2451 62.0549C97.8158 69.8876 97.9856 70.4803 100.49 75.6034C101.467 77.5509 102.953 79.4562 105.754 82.2506C107.877 84.4099 109.915 86.1881 110.254 86.1881C111.103 86.1881 112.377 87.7547 112.122 88.4744C111.995 88.8131 111.188 89.2365 110.339 89.4059C108.386 89.7446 99.7686 88.8131 97.8583 88.051C97.0941 87.7123 96.1602 87.4583 95.7781 87.4583C94.547 87.4583 91.6178 84.6216 91.0235 82.801C90.5141 81.2345 89.283 79.8373 88.3915 79.8373C88.2217 79.8373 87.882 80.2183 87.6273 80.7264C87.2453 81.4038 87.3302 81.8695 88.0094 83.0127C88.6886 84.1982 88.7311 84.5369 88.2641 84.9179C86.9481 86.0188 82.0237 83.4784 81.4718 81.4461C80.5379 77.932 79.7737 75.6457 79.2218 74.5449C78.7973 73.7404 78.5426 72.1739 78.5851 70.0993C78.5851 67.1779 78.7124 66.6698 80.4529 63.325C82.8303 58.7948 83.3821 56.3814 82.9152 52.5286C82.7454 50.8774 82.5756 47.9983 82.5756 46.1354C82.5331 41.9438 83.5519 39.2765 86.5236 35.8047C88.6462 33.3067 89.6226 31.4438 90.8112 27.5486C93.231 19.3771 97.3064 13.4497 103.717 8.79237C106.136 7.01414 107.58 6.16736 111.018 4.4738C113.141 3.41533 117.514 2.7379 120.825 2.9496C122.778 3.07661 127.999 3.33064 132.414 3.54234C140.82 3.96573 143.07 4.38911 147.145 6.33672C151.772 8.53835 158.692 16.0747 160.73 21.1977C161.112 22.1292 161.749 24.4155 162.131 26.2784C162.513 28.1413 163.022 30.0466 163.192 30.5123C163.404 30.978 163.829 32.0365 164.168 32.8409C164.848 34.5768 167.182 37.6676 170.197 41.0124C173.423 44.5265 174.229 46.4318 174.229 50.454C174.229 52.2746 174.017 54.5609 173.762 55.4923C172.871 58.8794 172.871 59.3028 173.932 61.4621C174.527 62.6053 175.545 64.5952 176.182 65.823C179.409 72.2586 176.607 79.1598 169.517 82.4623C166.631 83.7748 166.333 84.1558 166.843 85.5107C167.225 86.5268 168.414 86.3575 171.513 84.8333C174.866 83.182 177.328 80.6417 179.239 76.7465C181.361 72.3432 181.022 67.813 178.22 63.2827C176.395 60.3613 175.928 58.7524 176.437 57.4823C176.692 56.8472 176.946 53.9681 176.946 51.0467C176.989 46.3047 176.904 45.5426 175.97 43.7221C175.418 42.5789 173.89 40.5043 172.574 39.0648C171.258 37.6253 169.772 35.974 169.263 35.4236C167.819 33.8147 165.739 29.2845 165.315 26.8288C164.338 21.1554 162.767 17.4719 159.626 13.4497C154.956 7.39519 150.499 4.05042 144.004 1.7641C141.881 1.002 132.032 0.239899 120.952 0.0281982C115.985 -0.0564728 114.16 0.0281982 112.674 0.578613ZM32.9067 55.5347C35.1142 56.2544 40.9726 60.9964 43.1376 63.8331C44.1989 65.188 44.2414 65.3997 43.647 66.2464C43.0103 67.1356 40.5056 67.5589 40.5056 66.7545C40.5056 66.5851 39.3594 65.1456 37.916 63.5791C35.6236 61.0811 35.1566 60.7847 33.7557 60.7847C32.5671 60.7847 31.8878 60.4883 30.9539 59.5145C30.2747 58.8371 28.9162 57.948 27.8974 57.5669C25.7748 56.7625 25.5625 56.0427 27.2606 55.4076C28.9587 54.7302 30.5294 54.7726 32.9067 55.5347ZM25.6898 59.0911C29.8077 61.2081 32.8642 65.9077 32.8642 70.184C32.8642 72.3009 31.4209 75.18 30.3596 75.18C29.6803 75.18 29.5105 74.7142 29.2558 72.0892C28.7888 67.3896 26.3266 64.0871 21.5295 61.6738C20.5107 61.1658 19.7041 60.573 19.7041 60.3613C19.7041 60.0226 22.8031 58.3714 23.6522 58.2867C23.822 58.2444 24.7559 58.6254 25.6898 59.0911ZM20.9352 64.3835C23.4399 65.9501 25.0106 67.6013 26.0295 69.7182C27.77 73.4017 27.6426 77.2546 25.7323 79.4986C24.4587 81.0228 23.9493 80.43 23.9493 77.3816C23.9493 73.9098 23.1003 72.0045 20.2984 69.1678C18.8975 67.7706 17.8362 67.0932 16.69 66.9239C15.841 66.7545 14.7797 66.3735 14.3127 66.0347C13.591 65.4843 13.591 65.3997 14.6099 64.5952C16.9447 62.69 18.1758 62.6476 20.9352 64.3835ZM36.8547 65.696L38.3405 67.6436L37.534 69.2948C36.4727 71.3271 36.4727 72.0469 37.5764 74.5025C38.4255 76.4501 38.4255 76.5348 37.7038 77.6356C35.751 80.5147 35.4114 81.7002 35.4114 85.1296V88.5168L33.3737 90.6337C32.2699 91.8192 30.6567 93.3011 29.7652 94.0208C28.8737 94.6983 27.7275 96.0531 27.2181 96.9846C26.3691 98.5088 26.2842 99.2285 26.3691 103.843C26.454 107.654 26.3266 109.094 25.9021 109.432C24.7559 110.406 18.94 111.592 14.1853 111.846C9.8977 112.1 9.17601 112.057 8.58168 111.422C7.98736 110.872 7.9449 110.491 8.28452 109.602C9.0062 107.654 8.8364 91.1841 8.02981 86.1881C6.71379 78.1437 7.69019 71.5811 10.5769 69.3372C12.0203 68.194 12.742 68.194 14.907 69.1255C18.8551 70.9461 20.6805 72.9783 21.6569 76.7465C22.5908 80.2607 21.9116 82.801 20.0862 82.801C19.5768 82.801 18.8551 81.8272 17.7938 79.6256C16.0957 76.1961 14.3127 74.3332 12.6571 74.3332C10.8741 74.3332 10.959 75.5187 12.8693 77.3393C13.8457 78.2707 14.7372 79.6256 14.907 80.303C15.0344 80.9381 15.4165 81.7425 15.7136 81.9966C16.0532 82.2506 16.308 82.7163 16.308 82.9704C16.308 83.2244 16.8174 83.8171 17.4117 84.2829C20.2984 86.4845 20.9777 87.5006 20.9777 89.4906C20.9777 90.8877 20.6805 91.7769 19.9164 92.793C18.6428 94.4866 18.5579 95.3757 19.7041 95.7144C21.105 96.1378 22.5059 94.91 23.2701 92.5813C24.1191 89.914 24.1191 88.7285 23.2701 86.8655C22.3361 84.9179 22.6758 84.2829 25.1804 83.182C26.7936 82.5046 27.6002 81.8272 28.4068 80.43C29.0011 79.4139 30.02 78.313 30.6567 77.9743C34.5199 75.9421 35.5812 72.3009 34.3501 65.315C33.9255 63.071 34.9868 63.2404 36.8547 65.696ZM49.3781 67.3049C50.5667 68.5327 50.779 69.0831 50.8214 70.9037C50.8639 73.4864 50.1422 74.4179 47.3828 75.3493C44.8782 76.2384 44.1989 76.1961 42.2886 75.2223C40.5481 74.3332 39.0198 72.0469 39.2745 70.7344C39.4019 70.0569 39.9113 69.8452 41.5669 69.6759C43.9018 69.4642 45.0055 68.7868 46.1517 67.0085C47.1281 65.5267 47.68 65.569 49.3781 67.3049ZM50.1847 77.805C51.0762 78.9481 51.628 83.055 51.1186 85.0026C50.6941 86.6115 48.996 88.7285 48.147 88.7285C47.9772 88.7285 47.4253 89.1095 46.8734 89.5752C45.9395 90.3797 45.9395 90.5914 45.8121 100.414C45.7272 106.765 45.5149 110.575 45.2178 110.872C44.9206 111.168 44.5385 111.083 43.9018 110.533C43.0952 109.813 43.0527 109.263 43.0527 100.033V90.3373L40.7603 88.2204C39.3594 86.9502 38.3405 85.5954 38.1707 84.8756C37.8311 83.3091 39.0622 79.7526 40.2933 78.5671C41.0999 77.805 41.3971 77.7626 42.6707 78.186C44.6234 78.8635 44.6234 78.8211 43.3499 80.0913C41.7792 81.6578 41.8641 83.2244 43.5621 84.8756C45.3027 86.5692 46.1942 86.5268 47.9772 84.7486C49.7177 83.0127 49.845 81.4885 48.3592 80.0913C47.1706 78.9905 47.0857 78.5247 47.8073 77.805C48.4866 77.1276 49.6328 77.1699 50.1847 77.805ZM143.07 83.9865C143.112 86.9502 143.324 89.8716 143.579 90.4644C143.834 91.0994 144.81 92.1579 145.787 92.793C147.06 93.7245 147.442 94.2325 147.315 94.8676C145.787 101.049 144.725 104.69 144.343 105.198C144.131 105.495 142.518 106.384 140.862 107.188C133.136 110.787 124.518 112.396 119.679 111.126C118.745 110.872 117.301 110.533 116.495 110.364C114.415 109.856 112.037 108.712 109.193 106.765C107.495 105.664 107.665 104.098 109.957 99.6519C110.297 99.0592 110.551 98.2971 110.551 97.9584C110.551 97.3233 112.971 92.3273 114.032 90.8454C114.754 89.8716 114.882 89.8293 116.155 90.3373C116.919 90.6337 118.914 91.0148 120.57 91.1418C123.627 91.3958 126.513 90.8031 130.037 89.3212C132.372 88.3051 137.593 84.1558 140.183 81.2768C141.499 79.7949 142.688 78.5671 142.815 78.5671C142.942 78.5671 143.027 80.9804 143.07 83.9865ZM46.8734 81.5732C47.5526 82.7587 47.0857 83.6478 45.8546 83.6478C44.6234 83.6478 43.9867 82.2506 44.7508 81.3191C45.4725 80.43 46.3215 80.557 46.8734 81.5732ZM151.603 96.0108C154.404 97.2386 155.296 98.4664 156.357 102.7C156.569 103.505 157.121 105.706 157.631 107.527C158.947 112.311 159.796 116.969 159.796 119.467C159.796 122.049 159.286 122.6 155.975 123.7C153.216 124.59 150.541 125.775 149.522 126.58C148.164 127.596 148.546 130.136 150.456 132.761C151.39 134.031 152.452 135.725 152.834 136.487C153.598 137.969 153.47 138.646 151.942 142.922C150.711 146.352 150.371 147.453 150.032 148.638C149.82 149.316 149.48 150.459 149.225 151.179C147.782 155.201 145.787 161.679 145.787 162.398C145.787 164.431 147.57 163.796 148.716 161.382C149.607 159.392 152.579 150.797 152.579 150.078C152.579 149.824 152.834 149.019 153.131 148.299C154.362 145.42 156.06 140.086 156.272 138.604C156.485 137.122 155.211 133.481 154.362 133.1C153.725 132.846 151.73 129.924 151.73 129.247C151.73 128.612 154.999 126.834 156.187 126.834C157.291 126.834 161.154 124.547 161.961 123.404C163.659 121.033 162.683 113.581 159.371 103.335C158.904 101.938 158.522 100.541 158.522 100.245C158.522 99.3979 159.753 99.6519 163.065 101.218C164.805 102.023 166.418 102.7 166.631 102.7C166.885 102.7 167.607 102.954 168.201 103.251C168.838 103.589 170.027 104.14 170.833 104.479C174.357 106.003 179.111 108.374 179.239 108.712C179.324 108.882 179.578 109.051 179.791 109.051C180.767 109.051 187.135 114.386 189.555 117.18C194.394 122.769 197.154 127.469 205.262 143.769C207.851 149.019 210.144 153.592 210.356 153.931C210.568 154.269 210.908 154.947 211.12 155.412C211.502 156.259 214.474 162.695 215.62 165.15C216.809 167.691 218.337 171.163 220.502 176.37C221.733 179.292 222.879 182.044 223.092 182.509C225.809 188.733 226.912 197.751 225.469 201.858C223.092 208.548 216.342 215.491 204.158 223.621C200.677 225.949 194.267 229.717 193.757 229.717C193.503 229.717 193.333 229.887 193.333 230.098C193.333 230.31 192.908 230.649 192.399 230.818C191.89 230.945 190.319 231.919 188.833 232.893C187.39 233.909 186.074 234.629 185.946 234.459C185.819 234.332 185.692 233.274 185.692 232.088C185.692 229.675 184.588 225.865 182.89 222.181C181.616 219.514 177.286 213.544 175.418 212.02C174.781 211.469 174.229 210.792 174.229 210.495C174.229 210.241 175.8 208.802 177.753 207.405C182.338 203.975 191.465 196.651 192.059 195.846C192.696 195.084 197.96 191.358 199.955 190.3C201.823 189.284 202.757 189.072 205.135 189.072C208.191 189.072 209.04 188.649 209.04 187.167C209.04 183.949 202.757 184.923 196.347 189.157C194.352 190.469 193.333 190.469 193.333 189.114C193.333 188.31 192.399 185.812 191.592 184.415C191.38 184.076 191.04 183.399 190.828 182.933C190.616 182.467 189.767 180.562 188.875 178.699C188.026 176.836 186.88 174.338 186.328 173.195C185.776 172.009 184.588 169.427 183.611 167.352C182.635 165.32 181.871 163.457 181.871 163.245C181.871 163.033 181.574 162.144 181.192 161.255C180.81 160.366 180.343 159.265 180.13 158.8C177.838 153.084 177.838 153.126 176.31 153.931C175.333 154.481 175.291 155.539 176.097 157.191C177.074 159.054 178.05 161.425 178.05 161.89C178.05 162.102 178.347 162.525 178.687 162.822C179.027 163.118 179.324 163.753 179.324 164.261V165.15H160.475C150.117 165.15 141.541 165.066 141.414 164.939C141.287 164.812 141.372 162.525 141.584 159.858C141.796 157.191 142.136 150.84 142.39 145.759C142.645 140.721 143.027 136.063 143.239 135.471C143.494 134.878 143.664 133.227 143.664 131.787C143.664 129.416 144.089 126.029 145.362 118.154C145.659 116.503 146.041 113.92 146.211 112.396C146.423 110.829 146.763 108.839 147.018 107.95C147.867 104.563 148.716 100.71 149.013 98.8898C149.268 97.1116 149.862 95.5027 150.244 95.5027C150.329 95.5027 150.966 95.7144 151.603 96.0108ZM108.004 97.916C108.004 98.2971 107.75 98.9322 107.41 99.2709C107.113 99.6519 106.561 100.88 106.221 102.065C105.839 103.208 105.245 105.156 104.863 106.341C104.481 107.569 104.184 108.924 104.184 109.432C104.184 109.898 103.929 111.041 103.589 111.888C102.868 113.878 101.849 118.62 101 123.87C100.66 126.071 100.151 129.035 99.9384 130.432C99.6837 131.83 99.3016 134.878 99.0894 137.207C98.8347 139.535 98.5375 141.737 98.4102 142.076C97.9007 143.346 96.9243 163.796 96.5423 179.969C96.2027 196.143 95.6932 207.066 94.8017 217.227C94.547 220.022 94.2074 224.383 93.9951 226.965C93.8253 229.506 93.4433 232.766 93.1886 234.163C92.5093 238.101 91.7876 243.605 91.4905 246.865L91.2358 249.828L78.8398 249.955C65.0004 250.082 66.0617 250.337 66.8259 246.992C67.2079 245.213 67.7598 241.572 69.1607 231.834C69.5428 229.167 70.0947 225.229 70.4343 223.155C70.7739 221.038 71.156 217.608 71.2833 215.491C71.4107 213.375 71.6229 211.215 71.7503 210.623C71.8776 210.072 72.3022 205.118 72.6418 199.657C73.3635 187.675 73.1512 179.503 71.4956 159.138C71.0711 153.634 71.0711 151.306 71.4956 147.495C71.7503 144.87 72.1324 141.271 72.3022 139.535C72.5993 136.529 73.1087 133.777 74.1276 130.009C74.3399 129.078 74.5946 127.638 74.637 126.834C74.6795 125.521 74.5521 125.352 73.5333 125.225C72.5569 125.098 72.2597 125.309 71.7078 126.664C71.3682 127.511 71.0711 128.824 71.0711 129.543C71.0711 130.263 70.8588 131.533 70.6041 132.338C68.906 137.926 68.057 160.324 69.2881 168.241L69.8399 171.755L66.7409 174.592C65.0429 176.159 62.1986 178.784 60.458 180.435C53.6657 186.913 49.3781 190.046 43.9018 192.586C38.7226 194.957 37.534 195.338 33.2888 195.804C28.3219 196.354 23.6946 195.719 19.9588 193.941C17.3268 192.713 12.0203 187.929 11.2137 186.066C10.959 185.515 10.4496 184.457 10.0251 183.78C8.75149 181.62 7.52038 178.106 5.69495 171.501C4.25158 166.251 2.7233 147.368 2.7233 134.963C2.7233 126.791 2.5535 127.088 5.90721 128.527C10.5769 130.517 23.2276 128.951 29.2134 125.563C30.0624 125.098 30.9539 124.717 31.1237 124.717C31.336 124.717 31.5907 126.58 31.718 128.824C31.9727 134.201 33.5859 146.606 34.6048 150.967C34.8595 152.025 35.2416 153.931 35.4114 155.201C35.5812 156.471 36.2179 159.435 36.8547 161.763C38.1283 166.548 38.2981 170.866 37.3217 172.729C36.4727 174.338 36.5151 174.804 37.5764 175.777C38.4679 176.582 38.4679 176.54 39.4443 175.439C41.482 173.068 41.2273 165.616 38.85 157.699C38.4679 156.471 38.85 155.497 40.2933 154.185C42.0763 152.491 47.5102 145.674 50.9063 140.805C51.7978 139.535 52.6893 138.307 52.9016 138.053C53.0714 137.842 55.0666 135.132 57.2741 132.126C59.4817 129.078 61.4344 126.41 61.6043 126.198C61.8165 125.944 62.8354 124.632 63.9391 123.235C66.4438 119.975 71.1135 115.148 73.8304 113.031C75.0191 112.142 76.0379 111.253 76.1653 111.126C76.42 110.829 81.0473 108.162 82.5331 107.485C84.9953 106.341 87.7547 105.241 88.2641 105.241C88.9009 105.241 95.7781 102.319 96.33 101.811C97.3489 100.837 98.3252 101.727 97.3913 102.827C97.1366 103.124 96.4574 103.886 95.863 104.606C91.8725 109.305 87.6273 117.858 87.6273 121.202C87.6273 122.981 87.7971 123.277 90.1745 125.606C91.5754 126.961 92.9338 128.104 93.1461 128.104C93.9951 128.104 93.5282 129.12 91.066 132.803C87.5849 138.053 87.6273 137.715 89.5377 146.098C90.599 150.67 91.7452 156.683 92.5093 161.636C92.7216 162.991 92.9338 163.245 93.7829 163.245C95.2687 163.245 95.481 161.848 94.7168 157.868C94.3348 156.048 93.7404 152.66 93.3159 150.332C92.9338 148.003 92.3395 145.251 91.9999 144.235C91.7027 143.219 91.3631 141.314 91.3207 140.001C91.2358 137.715 91.3631 137.418 93.9102 133.608C97.3489 128.4 97.3489 127.638 94.165 125.352C90.981 123.065 89.8773 120.864 91.0235 118.874C91.2358 118.493 91.8301 117.223 92.2971 116.122C92.8065 114.979 93.9527 112.819 94.8866 111.337C95.7781 109.856 96.5423 108.501 96.5423 108.374C96.5423 108.247 97.1366 107.4 97.8158 106.511C98.5375 105.622 99.0894 104.733 99.0894 104.521C99.0894 103.759 103.122 99.6096 104.99 98.4241C107.24 97.0269 108.004 96.8999 108.004 97.916ZM108.641 109.898C109.533 110.914 113.268 112.862 114.245 112.862C114.584 112.862 115.518 113.158 116.282 113.497C118.15 114.428 130.037 114.174 133.476 113.158C137.296 112.057 141.754 110.152 142.178 109.475C142.518 108.924 144.089 108.924 144.089 109.475C144.089 109.729 143.749 111.676 143.282 113.835C142.008 120.144 140.353 132.719 139.971 139.324C139.928 140.721 139.546 146.055 139.164 151.179C138.782 156.302 138.57 161.34 138.697 162.398C138.824 163.499 138.824 164.515 138.655 164.769C138.485 164.981 132.075 165.15 122.905 165.193C108.174 165.193 107.452 165.235 106.858 166.04C106.349 166.717 106.264 171.247 106.391 197.032C106.476 216.931 106.391 227.177 106.094 227.219C103.929 227.346 97.1366 227.05 96.8819 226.838C96.7545 226.669 96.8819 224.806 97.179 222.731C97.9856 217.397 99.0894 197.963 99.1318 188.86C99.1318 175.608 100.278 150.797 101.212 143.092C102.953 129.035 104.141 121.753 106.094 113.412C106.434 111.973 106.731 110.406 106.731 109.94C106.731 108.797 107.665 108.797 108.641 109.898ZM6.03456 110.618C5.90721 111.846 5.05817 112.269 3.99687 111.634C3.48744 111.295 3.48744 111.083 4.16667 110.364C5.31288 109.094 6.20437 109.221 6.03456 110.618ZM30.402 116.461C30.6992 121.245 30.6567 121.584 29.8077 122.261C29.3407 122.684 28.7039 123.023 28.3643 123.023C28.0672 123.023 27.1757 123.277 26.4115 123.616C20.5107 126.071 13.3788 126.961 7.43548 125.944C3.02047 125.182 3.23273 125.479 3.31763 119.678C3.36009 116.884 3.57235 114.428 3.78461 114.217C4.03932 113.963 5.48269 114.132 7.39303 114.64C12.3599 115.868 20.2984 115.106 25.0106 112.862C30.2322 110.406 30.02 110.279 30.402 116.461ZM138.357 167.902C138.697 168.41 138.655 218.625 138.357 219.175C138.188 219.387 137.551 219.556 136.872 219.556C136.192 219.556 135.556 219.725 135.428 219.937C135.301 220.149 133.815 220.742 132.117 221.25C126.513 222.986 125.282 223.578 123.627 225.145C120.995 227.77 121.631 230.014 125.495 231.623C127.32 232.342 133.645 232.512 135.428 231.834C136.744 231.326 136.999 231.453 136.617 232.385C136.235 233.443 134.282 234.502 132.287 234.798C131.268 234.967 127.065 234.84 122.947 234.502C111.188 233.57 111.146 233.57 110.169 232.512C109.278 231.58 109.278 231.538 109.363 200.122L109.49 168.665L116.919 168.495C123.839 168.283 137.126 167.691 137.806 167.564C137.975 167.521 138.23 167.648 138.357 167.902ZM181.277 169.173C181.574 169.765 182.083 170.909 182.423 171.713C182.805 172.517 183.654 174.423 184.333 175.947C185.055 177.471 186.116 179.842 186.753 181.239C187.39 182.636 188.833 185.685 189.979 188.013L192.102 192.247L191.125 192.925C190.574 193.348 187.857 195.507 185.012 197.836C175.928 205.245 174.696 206.135 167.734 210.877C163.362 213.883 160.645 216 160.305 216.762C159.499 218.371 158.904 218.498 155.763 217.693C152.154 216.804 144.938 216.762 143.197 217.651C141.626 218.498 140.947 218.117 141.329 216.635C141.711 215.195 141.711 170.612 141.329 170.019C141.202 169.808 141.202 169.215 141.329 168.749C141.584 167.902 141.923 167.902 161.197 167.987L180.767 168.114L181.277 169.173ZM174.06 214.518C178.984 220.699 181.064 224.467 182.38 229.675C183.484 234.121 183.399 235.391 181.998 236.322C180.427 237.381 179.239 238.101 178.475 238.439C178.135 238.609 177.244 239.201 176.522 239.752C173.932 241.699 173.593 241.234 173.211 235.433C173.083 233.528 172.701 231.453 172.362 230.776C171.98 230.056 171.682 229.252 171.682 228.998C171.682 227.77 167.182 221.08 165.272 219.429L163.192 217.651L164.381 216.719C165.017 216.211 165.739 215.746 165.951 215.746C166.206 215.703 167.437 214.856 168.711 213.84C169.984 212.824 171.258 211.977 171.513 211.935C171.767 211.935 172.913 213.121 174.06 214.518ZM153.428 220.445C154.489 220.699 156.994 220.911 159.074 220.911H162.767L164.381 222.731C165.23 223.748 166.97 226.457 168.201 228.828C170.324 232.978 170.876 234.798 169.984 234.798C169.602 234.798 167.607 236.195 158.352 242.927C153.513 246.441 153.428 246.526 149.353 248.516C146.593 249.871 145.999 249.998 141.839 250.082C139.037 250.167 137.126 250.04 136.872 249.786C136.192 249.109 137.211 248.474 139.419 248.22C144.428 247.627 146.805 246.484 146.551 244.79C146.381 243.689 144.768 243.351 143.749 244.24C143.367 244.536 141.923 245.171 140.607 245.552C137.806 246.399 132.924 246.314 130.461 245.341C128.806 244.663 127.278 243.393 127.702 242.97C127.829 242.8 128.211 242.927 128.466 243.181C128.806 243.52 130.716 243.689 134.112 243.689C138.994 243.689 139.334 243.647 140.225 242.673L141.202 241.657L140.31 240.768C139.504 239.963 139.334 239.963 137.678 240.514C134.919 241.488 126.641 241.361 123.245 240.302C119.848 239.201 118.617 238.397 118.617 237.296C118.617 236.576 118.787 236.449 119.594 236.661C123.839 237.931 133.518 237.931 135.556 236.661C137.424 235.476 143.706 228.744 143.579 228.066C143.409 227.177 141.244 226.965 140.353 227.727C138.74 229.04 136.659 229.506 131.99 229.506C128.211 229.506 127.065 229.379 126.131 228.744C125.028 228.024 125.028 227.939 125.622 227.008C126.131 226.246 127.108 225.822 129.57 225.229C131.353 224.848 133.051 224.34 133.348 224.129C133.603 223.917 134.367 223.578 135.046 223.367C135.683 223.155 137.296 222.604 138.57 222.096C143.537 220.106 149.31 219.471 153.428 220.445ZM106.773 232.173C107.113 234.84 108.217 235.73 111.867 236.28C114.754 236.703 115.009 236.83 115.731 238.185C116.792 240.175 118.745 241.784 121.589 243.097C122.863 243.689 124.518 244.621 125.24 245.171C126.004 245.764 126.811 246.23 127.023 246.23C127.235 246.23 127.66 246.484 127.914 246.822C128.169 247.119 129.57 247.669 130.971 247.966C133.688 248.558 134.707 249.236 133.815 249.871C133.518 250.082 124.561 250.209 113.65 250.125L93.9951 249.998V248.855C93.9951 248.22 94.165 247.076 94.4197 246.314C94.6319 245.51 95.014 243.139 95.2687 241.022C95.481 238.863 95.863 235.645 96.0753 233.782C96.2876 231.961 96.6696 230.352 96.8819 230.183C97.0941 230.056 99.3866 230.014 101.891 230.141L106.518 230.352L106.773 232.173ZM191.635 239.54C191.89 241.953 192.399 245.129 192.696 246.653C193.036 248.177 193.163 249.532 192.993 249.701C192.484 250.209 154.277 250.209 153.768 249.701C153.428 249.363 153.598 249.109 154.404 248.812C156.145 248.135 161.239 244.705 163.574 242.588C164.72 241.572 165.866 240.726 166.164 240.726C166.418 240.726 167.225 241.318 167.947 242.038C170.621 244.663 172.404 244.621 178.05 241.826C184.036 238.82 187.347 237 188.578 236.111C190.786 234.459 191.083 234.798 191.635 239.54Z" />
                                <path d="M181.786 121.414C180.767 122.769 178.56 126.876 177.414 129.586C176.098 132.761 175.121 138.35 175.121 143.388C175.079 146.563 175.673 147.749 177.244 147.495C178.263 147.368 178.263 147.368 178.263 142.076C178.263 138.985 178.475 136.148 178.772 135.301C179.069 134.497 179.664 132.676 180.131 131.279C181.149 128.188 182.083 126.198 183.399 124.42C184.843 122.515 185.31 121.118 184.715 120.525C183.909 119.721 182.848 120.017 181.786 121.414Z" />
                                <path d="M103.759 35.8047C101.467 36.6515 100.363 37.5406 100.363 38.5991C100.363 39.6152 102.019 39.6999 103.505 38.8108C105.203 37.7523 107.877 37.6676 109.193 38.5991C109.703 38.9378 110.764 39.1918 111.528 39.1071C112.632 39.0225 112.929 38.7684 113.014 37.8793C113.184 36.2704 111.995 35.466 108.854 35.1696C106.689 35.0003 105.585 35.1273 103.759 35.8047Z" />
                                <path d="M126.471 35.2121C126.004 35.3391 124.985 35.7625 124.221 36.1435C123.117 36.6939 122.863 37.075 122.948 37.9218C123.117 39.2343 124.518 39.5307 126.471 38.5992C128.636 37.5407 132.16 37.7101 134.707 38.9802C136.405 39.8694 137.042 39.9964 137.721 39.6153C139.292 38.7686 138.57 37.4984 135.641 36.0165C134.155 35.2968 128.254 34.7463 126.471 35.2121Z" />
                                <path d="M104.905 45.5005C103.886 47.2364 103.971 50.2424 105.032 51.3856C106.178 52.6134 106.985 52.5711 108.216 51.2162C110.254 49.0146 109.277 44.2726 106.773 44.2726C105.966 44.2726 105.414 44.6537 104.905 45.5005Z" />
                                <path d="M115.943 44.5689C115.773 44.6959 115.646 45.331 115.646 45.9238C115.646 46.5165 115.349 47.575 115.009 48.2524C114.669 48.8875 114.372 49.6073 114.372 49.8189C114.372 50.0306 113.566 51.8512 112.632 53.8835C110.934 57.44 110.891 57.694 111.358 59.5146C112.207 62.7747 115.476 64.5529 118.915 63.6638C120.316 63.3251 120.825 62.9864 120.995 62.1819C121.165 61.6315 121.122 61.0388 120.952 60.8694C120.783 60.7001 119.382 60.5731 117.853 60.5731C115.264 60.5731 115.009 60.4884 114.415 59.4299C113.778 58.3291 113.82 58.1174 115.264 55.196C118.49 48.7181 119.084 46.7705 118.193 45.077C117.768 44.2725 116.495 43.9762 115.943 44.5689Z" />
                                <path d="M129.146 45.8389C128.806 46.2623 128.212 47.1091 127.872 47.7018C127.193 48.7603 127.235 48.8873 128.424 50.3692C129.952 52.1898 131.183 52.3168 132.839 50.7926C133.858 49.8611 133.985 49.5224 133.731 47.9559C133.561 46.9821 133.136 45.9236 132.754 45.6272C131.735 44.9075 129.91 44.9922 129.146 45.8389Z" />
                                <path d="M152.706 50.4964C150.88 52.952 149.437 55.9157 149.734 56.7202C149.904 57.1012 150.498 57.3976 151.093 57.3976C152.154 57.3976 152.791 56.4662 155.338 51.1314C156.611 48.5064 154.616 48.0407 152.706 50.4964Z" />
                                <path d="M126.046 68.4058C124.858 69.2949 123.457 69.803 121.292 70.1841C118.235 70.6921 117.301 70.5651 113.396 69.1256C112.377 68.7869 112.037 68.8292 111.358 69.549C109.278 71.5813 112.759 73.4865 118.532 73.4865C122.735 73.4442 126.004 72.5127 128.254 70.7345C129.867 69.5066 129.994 68.8292 128.891 67.8554C127.914 66.9663 128.084 66.924 126.046 68.4058Z" />
                            </svg>
                        </a>

                    </section>
                </main>
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