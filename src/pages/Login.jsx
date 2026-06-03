import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://cartnova-6tap.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage("Invalid credentials. Please try again.");
        return;
      }

      // Saving data to localStorage exactly like your old script
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      localStorage.setItem("role", result.role);

      setMessage("Login successful!");

      // Redirect based on role
      setTimeout(() => {
        if (result.role === "ADMIN") {
          navigate('/admin-home');
        } else {
          navigate('/'); // Redirect to Home for customers
        }
        // Forces a refresh so the Navbar updates the "Hi, {User}" text
        // window.location.reload();
      }, 1000);

    } catch (error) {
      setMessage("Error: Could not connect to the server.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Customer Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username" 
            required 
            onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>
        
        <p className="auth-message">{message}</p>
        
        <div className="auth-footer">
          <p>Don't have an account? <span onClick={() => navigate('/signup')} className="link-text">Sign Up</span></p>
          <button className="back-btn" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
