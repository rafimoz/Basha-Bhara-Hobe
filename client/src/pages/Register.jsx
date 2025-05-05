import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      alert("Registration successful. Your QR Code is generated.");
      console.log("QR URL:", data.qrCodeUrl);
      navigate("/admin/login");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="w-full h-[100vh] p-6 text-center flex justify-center items-center flex-col">
      <h1 className="text-6xl font-bold mb-7 leading-13">Register</h1>
      <form onSubmit={handleSubmit} className="p-4 w-full md:w-[40vw]">
        <input className="mb-2 w-full p-3 rounded-3xl bg-transparent border-2 border-black" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="mb-2 w-full p-3 rounded-3xl bg-transparent border-2 border-black" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="mb-2 w-full p-3 rounded-3xl bg-transparent border-2 border-black" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="bg-black text-white w-full p-3 rounded-3xl">Register</button>
      </form>
      <p>Already have an account? <span className='text-blue-500 font-semibold cursor-pointer hover:underline'>Login</span></p>
    </div>
  );
}