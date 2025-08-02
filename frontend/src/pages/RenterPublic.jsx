import React from 'react';
import { QrCode, Smartphone, Eye, Mail, MapPin, Clock, DollarSign, Camera, Search, CheckCircle } from 'lucide-react';

const RenterPublic = () => {
  return (
    <div className="min-h-screen dark:bg-bg-dark bg-bg-light">
      {/* Nav Section */}
      <nav className={`sticky top-0 w-full dark:bg-nav-dark/60 bg-nav-light/60 backdrop-blur-sm z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-35 h-35 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-6">
              <QrCode className="w-20 h-20 text-white" />
            </div>
            <h2 className="md:text-4xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-4">
              Find Your Perfect Rental - No Signup Required!
            </h2>
            <p className="md:text-xl text-lg dark:text-subtitle-dark text-subtitle-light max-w-2xl mx-auto">
              Simply scan a QR code on any building and instantly discover available rental units.
              It's that easy - no accounts, no hassle, just instant access to rental listings.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="dark:bg-card-light bg-card-dark p-6 rounded-3xl shadow-sm">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold dark:text-title-light text-title-dark mb-2">No Registration</h3>
              <p className="dark:text-subtitle-light text-subtitle-dark">Start browsing rental units immediately without creating any account</p>
            </div>
            <div className="dark:bg-card-light bg-card-dark p-6 rounded-3xl shadow-sm">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold dark:text-title-light text-title-dark mb-2">Instant Access</h3>
              <p className="dark:text-subtitle-light text-subtitle-dark">Get real-time information about available units in seconds</p>
            </div>
            <div className="dark:bg-card-light bg-card-dark p-6 rounded-3xl shadow-sm">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold dark:text-title-light text-title-dark mb-2">Complete Details</h3>
              <p className="dark:text-subtitle-light text-subtitle-dark">View photos, prices, and all essential information upfront</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 dark:bg-card-dark bg-card-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="md:text-3xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-4">How It Works</h2>
            <p className="md:text-lg text-md dark:text-subtitle-dark text-subtitle-light">Follow these simple steps to find your next rental</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center border dark:border-subtitle-dark border-subtitle-light rounded-3xl hover:dark:bg-title-light hover:bg-title-dark p-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              </div>
              <h3 className="text-lg font-semibold dark:text-title-dark text-title-light mb-2">Look for QR Codes</h3>
              <p className="dark:text-subtitle-dark text-subtitle-light">Find QR codes displayed on buildings you're interested in</p>
            </div>

            {/* Step 2 */}
            <div className="text-center border dark:border-subtitle-dark border-subtitle-light rounded-3xl hover:dark:bg-title-light hover:bg-title-dark p-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              </div>
              <h3 className="text-lg font-semibold dark:text-title-dark text-title-light mb-2">Scan with Phone</h3>
              <p className="dark:text-subtitle-dark text-subtitle-light">Use your smartphone's camera to scan the QR code</p>
            </div>

            {/* Step 3 */}
            <div className="text-center border dark:border-subtitle-dark border-subtitle-light rounded-3xl hover:dark:bg-title-light hover:bg-title-dark p-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <h3 className="text-lg font-semibold dark:text-title-dark text-title-light mb-2">View Listings</h3>
              <p className="dark:text-subtitle-dark text-subtitle-light">Instantly access all available units in that building</p>
            </div>

            {/* Step 4 */}
            <div className="text-center border dark:border-subtitle-dark border-subtitle-light rounded-3xl hover:dark:bg-title-light hover:bg-title-dark p-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              </div>
              <h3 className="text-lg font-semibold dark:text-title-dark text-title-light mb-2">Explore Details</h3>
              <p className="dark:text-subtitle-dark text-subtitle-light">Browse photos, prices, and contact information</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="md:text-3xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-4">What Information You'll Get</h2>
            <p className="md:text-lg text-md dark:text-subtitle-dark text-subtitle-light">Every listing includes comprehensive details to help you make informed decisions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="dark:bg-card-dark bg-card-light border dark:border-subtitle-dark border-subtitle-light p-6 rounded-3xl shadow-sm">
              <div className="flex items-center mb-4">
                <Camera className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold dark:text-title-dark text-title-light">Photos</h3>
              </div>
              <p className="dark:text-subtitle-dark text-subtitle-light">High-quality images of the rental unit, rooms, and common areas</p>
            </div>

            <div className="dark:bg-card-dark bg-card-light border dark:border-subtitle-dark border-subtitle-light p-6 rounded-3xl shadow-sm">
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold dark:text-title-dark text-title-light">Rent Price</h3>
              </div>
              <p className="dark:text-subtitle-dark text-subtitle-light">Clear pricing information including monthly rent and any additional costs</p>
            </div>

            <div className="dark:bg-card-dark bg-card-light border dark:border-subtitle-dark border-subtitle-light p-6 rounded-3xl shadow-sm ">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold dark:text-title-dark text-title-light">Availability</h3>
              </div>
              <p className="dark:text-subtitle-dark text-subtitle-light">Current availability status and move-in dates</p>
            </div>

            <div className="dark:bg-card-dark bg-card-light border dark:border-subtitle-dark border-subtitle-light p-6 rounded-3xl shadow-sm">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold dark:text-title-dark text-title-light">Location Details</h3>
              </div>
              <p className="dark:text-subtitle-dark text-subtitle-light">Specific unit information and building location</p>
            </div>

            <div className="dark:bg-card-dark bg-card-light border dark:border-subtitle-dark border-subtitle-light p-6 rounded-3xl shadow-sm">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-semibold dark:text-title-dark text-title-light">Full Description</h3>
              </div>
              <p className="dark:text-subtitle-dark text-subtitle-light">Detailed description of the unit, amenities, and features</p>
            </div>

            <div className="dark:bg-card-dark bg-card-light border dark:border-subtitle-dark border-subtitle-light p-6 rounded-3xl shadow-sm ">
              <div className="flex items-center mb-4">
                <Smartphone className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold dark:text-title-dark text-title-light">Contact Info</h3>
              </div>
              <p className="dark:text-subtitle-dark text-subtitle-light">Direct contact information to reach the property owner</p>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Scanning Tips */}
      <section className="py-16 dark:bg-card-dark bg-card-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="md:text-3xl text-2xl font-neueplak-black dark:text-title-dark text-title-light mb-4">QR Code Scanning Tips</h2>
            <p className="md:text-lg text-md dark:text-subtitle-dark text-subtitle-light">Make sure you get the best scanning experience</p>
          </div>

          <div className="dark:bg-card-light bg-card-dark rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="md:text-xl text-lg font-semibold dark:text-title-light text-title-dark mb-4">Scanning Best Practices</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>Hold your phone steady about 6-12 inches from the QR code</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>Ensure good lighting - avoid shadows on the code</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>Make sure the entire QR code is visible in your camera frame</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>Wait a moment for your phone to recognize and process the code</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="md:text-xl text-lg font-semibold dark:text-title-light text-title-dark mb-4">Helpful Notes</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>Most modern smartphones can scan QR codes with the default camera app</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>You'll see a notification to open the link - tap it to view listings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>The page will load instantly - no app download required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className='dark:text-subtitle-light text-subtitle-dark'>Bookmark the page if you want to revisit later</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 dark:bg-title-light bg-title-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-title-light dark:text-title-dark">
            <QrCode className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="md:text-3xl text-2xl font-neueplak-black mb-4">Ready to Find Your Next Home?</h2>
            <p className="md:text-xl text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Start exploring available rental units in your area today. Look for QR codes on buildings
              and discover your perfect rental match instantly!
            </p>
            <div className="max-w-xl mx-auto">
              <p className="md:text-lg text-md font-semibold mb-3">Look for this QR code on buildings:</p>
              <div className="w-full bg-white rounded-3xl overflow-hidden">
                <img className='w-full h-full object-cover' src="https://res.cloudinary.com/dhlh7av5k/image/upload/v1754168917/wimxj8iarnwzkarajlt2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark:bg-bg-dark bg-bg-light dark:text-title-dark text-title-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex md:flex-row flex-col justify-between gap-8">
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
                <a href="/register" className="block dark:text-subtitle-dark text-subtitle-light dark:hover:text-white hover:text-black/50 transition-colors">Register as Home-owner</a>
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
          </div>
          <div className="border-t dark:border-description-dark border-description-light mt-10 pt-8 text-center dark:text-description-dark text-description-light">
            <p>&copy; 2025 Basha Bhara Hobe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RenterPublic