import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(backendURL + '/register', { name, email, password })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex justify-center items-center h-screen bg-white'>
            <div className='bg-white p-8 rounded-lg w-96'>
                <h2 className='text-4xl font-bold text-center mb-10 text-black'>Register</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='email'
                            className='w-full px-4 py-3 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='w-full px-4 py-3 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            className='w-full px-4 py-3 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors duration-200'>Register</button>
                    <div className='flex justify-center items-center gap-1'>
                        <p className='text-center text-gray-700'>Already Have an Account</p>
                        <Link to="/login" className='text-purple-600 hover:underline'>Login</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Signup