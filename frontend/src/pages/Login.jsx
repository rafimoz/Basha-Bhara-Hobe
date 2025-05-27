import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
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
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='border-2 p-2 rounded-2xl'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            className='border-2 p-2 rounded-2xl'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='p-2 border-2 rounded-2xl'>Login</button>
                    <p>Don't Have an Account?</p>
                    <Link to="/register" className='p-1 border-2 rounded'>Register</Link>
                </form>
            </div>
        </div>
    )
}

export default Login