import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async'


function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [image, setImage] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false) // Add loading state
    const navigate = useNavigate()
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Only handle the first file
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result); // Set a single image
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true) // Start loading animation

        axios.post(backendURL + '/register', { name, email, password, image })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(error => {
                toast.error("Registration Unsuccessful")
            })
            .finally(() => {
                setIsLoading(false) // Stop loading animation
            })
    }

    return (
        <div className='h-screen dark:bg-bg-dark bg-bg-light'>
            <Helmet>
                <title>Register</title>
                <meta name='description' content="Register page for - Basha Bhara Hobe." />
            </Helmet>
            <ToastContainer />

            <main className='flex h-full md:gap-20 p-6'>
                <section className='w-full h-full flex flex-col justify-between'>
                    <div className="flex dark:text-subtitle-dark text-subtitle-light items-center justify-center">
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
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='text-center text-title-dark mb-10'>
                            <h2 className='text-4xl playfair-display-500'>Welcome!</h2>
                            <p>Enter your name, email and password to signup</p>
                        </div>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:w-[70%] w-full'> {/* Form container */}
                            <div className='w-full flex justify-center'>
                                <label className="w-20 h-20 transition-all dark:bg-card-dark bg-card-light rounded-full flex items-center justify-center cursor-pointer overflow-hidden">
                                    <img className='h-full w-full object-cover scale-105' src={image} alt="" />
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div>
                                <label htmlFor="name" className='dark:text-subtitle-dark text-subtitle-light'>Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Name'
                                    autoComplete='off'
                                    name='name'
                                    className='w-full mt-1 px-3 py-2 dark:bg-card-dark bg-card-light dark:text-subtitle-dark text-subtitle-light rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-subtitle-dark focus:ring-subtitle-light'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='dark:text-subtitle-dark text-subtitle-light'>Email</label>
                                <input
                                    type="email"
                                    placeholder='Enter Email'
                                    autoComplete='off'
                                    name='email'
                                    className='w-full mt-1 px-3 py-2 dark:bg-card-dark bg-card-light dark:text-subtitle-dark text-subtitle-light rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-subtitle-dark focus:ring-subtitle-light'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='dark:text-subtitle-dark text-subtitle-light'>password</label>
                                <input
                                    type="password"
                                    placeholder='Enter Password'
                                    name='password'
                                    className='w-full mt-1 px-3 py-2 dark:bg-card-dark bg-card-light dark:text-subtitle-dark text-subtitle-light rounded-xl focus:outline-none focus:ring-2 dark:focus:ring-subtitle-dark focus:ring-subtitle-light'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <button type='submit' disabled={isLoading}
                                    className={`w-full cursor-pointer dark:bg-title-dark dark:text-bg-dark bg-subtitle-light mt-5 text-bg-light py-3 rounded-xl transition-colors duration-200 flex justify-center items-center 
                            ${isLoading
                                            ? 'dark:bg-subtitle-dark bg-subtitle-light cursor-not-allowed'
                                            : 'dark:hover:bg-subtitle-dark/60 hover:bg-subtitle-light/60'
                                        }`}>
                                    {isLoading ? (
                                        // Loading spinner SVG
                                        <svg className="animate-spin h-6 w-6 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : 'Sign In'}
                                </button>

                                {/* <button type='button'
                                    onClick={() => googleLogin()}
                                    className={`w-full cursor-pointer border-2 dark:border-bg-light border-bg-dark text-bg-light py-3 rounded-xl transition-colors duration-200 flex justify-center gap-2 items-center`}>
                                    <svg className='w-6' viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.7142 10.4598H21.8752V10.4166H12.5002V14.5833H18.3871C17.5283 17.0088 15.2205 18.7499 12.5002 18.7499C9.0486 18.7499 6.25016 15.9515 6.25016 12.4999C6.25016 9.04836 9.0486 6.24992 12.5002 6.24992C14.0934 6.24992 15.5429 6.85096 16.6465 7.83273L19.5929 4.88638C17.7325 3.15252 15.2439 2.08325 12.5002 2.08325C6.74756 2.08325 2.0835 6.74731 2.0835 12.4999C2.0835 18.2525 6.74756 22.9166 12.5002 22.9166C18.2528 22.9166 22.9168 18.2525 22.9168 12.4999C22.9168 11.8015 22.845 11.1197 22.7142 10.4598Z" fill="#FFC107" />
                                        <path d="M3.28418 7.65148L6.70658 10.1614C7.63262 7.86867 9.87533 6.24992 12.4998 6.24992C14.093 6.24992 15.5425 6.85096 16.6462 7.83273L19.5925 4.88638C17.7321 3.15252 15.2436 2.08325 12.4998 2.08325C8.49876 2.08325 5.02897 4.34211 3.28418 7.65148Z" fill="#FF3D00" />
                                        <path d="M12.5 22.9168C15.1906 22.9168 17.6354 21.8871 19.4839 20.2126L16.2599 17.4845C15.2141 18.2767 13.9141 18.7501 12.5 18.7501C9.79062 18.7501 7.4901 17.0225 6.62344 14.6116L3.22656 17.2288C4.95052 20.6022 8.45156 22.9168 12.5 22.9168Z" fill="#4CAF50" />
                                        <path d="M22.7141 10.46H21.875V10.4167H12.5V14.5834H18.387C17.9745 15.7485 17.225 16.7532 16.2583 17.485L16.2599 17.4839L19.4839 20.2121C19.2557 20.4194 22.9167 17.7084 22.9167 12.5001C22.9167 11.8016 22.8448 11.1199 22.7141 10.46Z" fill="#1976D2" />
                                    </svg>
                                    Sign Up with Google
                                </button> */}
                            </div>
                        </form>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                        <p className='text-center dark:text-subtitle-dark text-subtitle-light'>Already Have an Account? </p>
                        <Link to="/login" className='text-blue-500 hover:underline'>Sign In</Link>
                    </div>
                </section>

                <section className='hidden md:block w-full h-full dark:bg-card-dark bg-card-light rounded-2xl'>

                </section>
            </main>

        </div >
    )
}

export default Signup