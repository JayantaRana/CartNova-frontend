import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://cartnova-6tap.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setMessage(result.message || "Registration successful! Redirecting...");
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(result.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Customer Sign Up</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" placeholder="Full Name" required 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="text" placeholder="Username" required 
            onChange={(e) => setFormData({...formData, username: e.target.value})} 
          />
          <input 
            type="password" placeholder="Password" required 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <p className="auth-message">{message}</p>
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default Signup;