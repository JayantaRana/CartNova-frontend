import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminForms.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '', description: '', price: '', stock: '', category: '', imageUrl: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://cartnova-6tap.onrender.com/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        setMessage("Product added successfully!");
        setTimeout(() => navigate('/admin-dashboard'), 1500);
      } else {
        setMessage("Failed to add product. Check your Admin permissions.");
      }
    } catch (error) {
      setMessage("Server connection error.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" required onChange={(e) => setProduct({...product, name: e.target.value})} />
          <textarea placeholder="Description" rows="3" onChange={(e) => setProduct({...product, description: e.target.value})}></textarea>
          <div className="form-row">
            <input type="number" placeholder="Price (₹)" required onChange={(e) => setProduct({...product, price: e.target.value})} />
            <input type="number" placeholder="Stock Quantity" required onChange={(e) => setProduct({...product, stock: e.target.value})} />
          </div>
          <input type="text" placeholder="Category (e.g. Electronics)" required onChange={(e) => setProduct({...product, category: e.target.value})} />
          <input type="text" placeholder="Image URL" onChange={(e) => setProduct({...product, imageUrl: e.target.value})} />
          
          <div className="form-actions">
            <button type="submit" className="save-btn">Save Product</button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/admin-dashboard')}>Cancel</button>
          </div>
        </form>
        <p className="status-msg">{message}</p>
      </div>
    </div>
  );
};

export default AddProduct;