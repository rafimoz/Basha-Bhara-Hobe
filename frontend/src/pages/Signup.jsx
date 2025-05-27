import {useState} from 'react'
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
        axios.post(backendURL + '/register', {name, email, password})
            .then(result => {console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

  return (
    <div>
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        <strong>Name</strong>
                    </label>
                    <input 
                        type="text"
                        placeholder='Enter Name'
                        autoComplete='off'
                        name='email'
                        className='border-2 p-2 rounded-2xl'
                        onChange={(e) => setName(e.target.value)}
                    /> 
                </div>
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
                <button type='submit' className='p-2 border-2 rounded-2xl'>Register</button>
                <p>Already Have an Account</p>
                <Link to="/login" className='p-1 border-2 rounded'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup