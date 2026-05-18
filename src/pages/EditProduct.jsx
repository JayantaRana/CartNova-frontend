import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminForms.css'; // Reusing the Add Product styles

const EditProduct = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState({
    name: '', description: '', price: '', stock: '', category: '', imageUrl: ''
  });
  const [message, setMessage] = useState('Loading product data...');

  // 1. Fetch current product details on component load
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://cartnova-6tap.onrender.com/admin/products/${id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setMessage('');
        } else {
          setMessage("Could not find product.");
        }
      } catch (error) {
        setMessage("Error connecting to server.");
      }
    };
    fetchProductDetails();
  }, [id, token]);

  // 2. Handle the Update (PUT request)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://cartnova-6tap.onrender.com/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        setMessage("Product updated successfully!");
        setTimeout(() => navigate('/admin-dashboard'), 1500);
      } else {
        setMessage("Update failed. Check your permissions.");
      }
    } catch (error) {
      setMessage("Server error during update.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Edit Product #{id}</h2>
        <form onSubmit={handleUpdate}>
          <label>Product Name</label>
          <input 
            type="text" value={product.name} required 
            onChange={(e) => setProduct({...product, name: e.target.value})} 
          />

          <label>Description</label>
          <textarea 
            rows="3" value={product.description} 
            onChange={(e) => setProduct({...product, description: e.target.value})}
          ></textarea>

          <div className="form-row">
            <div>
              <label>Price (₹)</label>
              <input 
                type="number" value={product.price} required 
                onChange={(e) => setProduct({...product, price: e.target.value})} 
              />
            </div>
            <div>
              <label>Stock</label>
              <input 
                type="number" value={product.stock} required 
                onChange={(e) => setProduct({...product, stock: e.target.value})} 
              />
            </div>
          </div>

          <label>Category</label>
          <input 
            type="text" value={product.category} required 
            onChange={(e) => setProduct({...product, category: e.target.value})} 
          />

          <label>Image URL</label>
          <input 
            type="text" value={product.imageUrl} 
            onChange={(e) => setProduct({...product, imageUrl: e.target.value})} 
          />
          
          <div className="form-actions">
            <button type="submit" className="save-btn">Update Product</button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/admin-dashboard')}>Cancel</button>
          </div>
        </form>
        <p className={`status-msg ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default EditProduct;