import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('') // Initialize with empty string
    const [password, setPassword] = useState('') // Initialize with empty string
    const navigate = useNavigate()
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(backendURL + '/login', { email, password })
            .then(result => {
                console.log(result)
                if (result.data) {
                    navigate(`/dashboard/${result.data}`)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex justify-center items-center h-screen bg-white'> {/* Outer container for centering */}
            <div className='bg-white p-8 rounded-lg w-96'> {/* Content wrapper */}
                <h2 className='text-4xl font-bold text-center mb-10 text-black'>Login</h2> {/* Login title */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'> {/* Form container */}
                    <div>
                        {/* <label htmlFor="email" className='sr-only'>Email</label> */} {/* Hidden label for accessibility */}
                        <input
                            type="email"
                            placeholder='Email'
                            autoComplete='off'
                            name='email'
                            className='w-full px-4 py-3 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        {/* <label htmlFor="password" className='sr-only'>Password</label> */} {/* Hidden label for accessibility */}
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            className='w-full px-4 py-3 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors duration-200'>Login</button>
                    <div className='flex justify-center items-center gap-1'>
                        <p className='text-center text-gray-700'>Don't Have an Account?</p>
                        <Link to="/register" className='text-purple-600 hover:underline'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login