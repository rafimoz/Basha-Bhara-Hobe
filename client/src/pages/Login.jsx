import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert('Invalid login');
    }
  };

  return (
    <section className="w-full h-[100vh] p-6 text-center flex justify-center items-center flex-col">
      <h1 className="text-6xl font-bold mb-7 leading-13">Login</h1>
      <form onSubmit={handleLogin} className="p-4 w-full md:w-[40vw]">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border-2 border-black mb-2 w-full p-3 rounded-3xl bg-transparent"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-2 w-full p-3 rounded-3xl bg-transparent border-2 border-black"
        />
        <button type="submit" className="bg-black text-white w-full p-3 rounded-3xl">Login</button>
      </form>
      <p>Don't have an account? <span className='text-blue-500 font-semibold cursor-pointer hover:underline'>Register</span></p>
    </section>
  );
}
