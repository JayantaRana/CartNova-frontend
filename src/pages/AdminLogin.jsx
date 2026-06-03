import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Reusing the same Auth styles for consistency

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setMessage("Verifying Admin credentials...");

    try {
      const response = await fetch("https://cartnova-6tap.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage("Unauthorized: Invalid Admin credentials");
        return;
      }

      // Security check: Ensure the role returned is actually ADMIN
      if (result.role !== "ADMIN") {
        setMessage("Access Denied: You do not have Admin privileges.");
        return;
      }

      // Store credentials exactly like your old auth.js
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      localStorage.setItem("role", result.role);

      setMessage("Admin Verified! Redirecting to Dashboard...");

      setTimeout(() => {
        navigate('/admin-dashboard');
        // window.location.reload(); 
      }, 1500);

    } catch (error) {
      setMessage("Connection Error: Backend is not responding.");
    }
  };

  return (
    <div className="auth-container admin-bg">
      <div className="auth-card admin-border">
        <div className="admin-icon-header">
          <span className="material-icons">admin_panel_settings</span>
        </div>
        <h2 style={{color: 'var(--primary-blue)'}}>Admin Portal</h2>
        <p style={{fontSize: '12px', marginBottom: '20px'}}>Please enter your administrator credentials</p>
        
        <form onSubmit={handleAdminLogin}>
          <input 
            type="text" 
            placeholder="Admin Username" 
            required 
            className="admin-input"
            onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Admin Password" 
            required 
            className="admin-input"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
          />
          <button type="submit" className="admin-login-btn">
            Verify & Enter
          </button>
        </form>
        
        <p className="auth-message">{message}</p>
        
        <div className="auth-footer">
          <button className="back-btn" onClick={() => navigate('/')}>
            <span className="material-icons" style={{fontSize: '16px'}}>arrow_back</span> Back to Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
