import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const SideBar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate()
      const { id: ownerId } = useParams(); 


    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 w-full md:w-64 rounded-r-lg md:rounded-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%)] md:-translate-x-[calc(100%)]'}`}>
                {/* Sidebar content area */}
                <div className="p-6 h-full flex flex-col">
                    {/* Sidebar Header/Logo */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Basha Bhara Hobe.</h2>

                    {/* Navigation Links */}
                    <nav className="flex-grow">
                        <ul>
                            <li className="mb-4">
                                <div onClick={()=>{navigate(`/dashboard/${ownerId}`)}}
                                    className="flex items-center cursor-pointer text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200"
                                >
                                    {/* Dashboard Icon */}
                                    <svg
                                        className="w-5 h-5 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    Dashboard
                                </div>
                            </li>
                            <li className="mb-4">
                                <div
                                onClick={()=>{navigate(`/profile/${ownerId}`)}}
                                    className="flex cursor-pointer items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200"
                                >
                                    {/* Users Icon */}
                                    <svg
                                        className="w-5 h-5 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.596.14-1.166.413-1.677M12 20v-2c0-.596.14-1.166.413-1.677m0 0a3 3 0 00-5.356-1.857M12 10a6 6 0 110-12 6 6 0 010 12zm-6 0a6 6 0 110-12 6 6 0 010 12z"
                                        />
                                    </svg>
                                    Profile
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Sidebar Toggle Button (inside sidebar, always visible at the edge) */}
                <div
                    onClick={toggleSidebar}
                    className={`absolute top-7 ${isSidebarOpen ? "-right-6 rotate-180" : "-right-7"} -right-4.5 flex justify-center items-center w-fit h-fit text-center bg-white rounded-full shadow-md transition-all duration-300 ease-in-out cursor-pointer`}
                >
                    <svg width="50" height="50" viewBox="0 0 103 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="51.5" cy="52" r="50.5" stroke="black" />
                        <path d="M37 50C35.8954 50 35 50.8954 35 52C35 53.1046 35.8954 54 37 54L37 50ZM68.4142 53.4142C69.1953 52.6332 69.1953 51.3668 68.4142 50.5858L55.6863 37.8579C54.9052 37.0768 53.6389 37.0768 52.8579 37.8579C52.0768 38.6389 52.0768 39.9052 52.8579 40.6863L64.1716 52L52.8579 63.3137C52.0768 64.0948 52.0768 65.3611 52.8579 66.1421C53.6389 66.9232 54.9052 66.9232 55.6863 66.1421L68.4142 53.4142ZM37 52L37 54L67 54L67 52L67 50L37 50L37 52Z" fill="black" />
                    </svg>


                </div>
            </div>
        </div>
    )
}

export default SideBar