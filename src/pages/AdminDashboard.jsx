import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Security Check
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!token || role !== "ADMIN") {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://cartnova-6tap.onrender.com/admin/products", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      const response = await fetch(`https://cartnova-6tap.onrender.com/admin/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        alert("Product deleted!");
        fetchProducts();
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">CartNova <span>Admin</span></div>
        <nav>
          <div className="menu-item active"><span className="material-icons">inventory_2</span> Products</div>
          <div className="menu-item" onClick={() => navigate('/admin/add-product')}><span className="material-icons">add_box</span> Add Product</div>
          <div className="menu-item"><span className="material-icons">shopping_bag</span> Orders</div>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>
          <span className="material-icons">logout</span> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>Product Inventory Management</h2>
          <button className="add-btn" onClick={() => navigate('/admin/add-product')}>+ New Product</button>
        </header>

        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td className="product-cell">
                    <img src={p.imageUrl || "https://via.placeholder.com/40"} alt="" />
                    {p.name}
                  </td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td><span className={`stock-badge ${p.stock < 10 ? 'low' : ''}`}>{p.stock}</span></td>
                  <td className="action-cell">
                    <span className="material-icons edit-icon" onClick={() => navigate(`/admin/edit-product/${p.id}`)}>edit</span>
                    <span className="material-icons delete-icon" onClick={() => handleDelete(p.id)}>delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;