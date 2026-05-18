import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MyOrdersPage.css';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const API_BASE_URL = "https://cartnova-6tap.onrender.com";

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your orders");
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        // Handshake to your customer orders history endpoint
        const response = await fetch(`${API_BASE_URL}/customer/orders`, {
          headers: { 
            "Authorization": `Bearer ${token}` 
          }
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        const data = await response.json();
        // Sorting orders to display the newest transactions at the very top
        setOrders(Array.isArray(data) ? data.reverse() : []);
      } catch (error) {
        toast.error("Failed to load your order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  // if (loading) return <div className="loader">Loading your orders...</div>;

  if (loading) {
  return (
    <div className="loader-container">
      <div className="circular-spinner-wrapper">
        {/* Animated outer ring border */}
        <div className="spinner-ring"></div>
        {/* Central fixed text context core */}
        <div className="spinner-text">
          <span>Loading</span>
          <small>your orders...</small>
        </div>
      </div>
    </div>
  );
}




  if (orders.length === 0) {
    return (
      <div className="empty-orders-container">
        <div className="empty-orders-card">
          <img 
            src="https://media.istockphoto.com/id/877144476/photo/last-minute-christmas-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=k3gnyxz4BfbfXEqXYKaNzvGVUeg3tfmxSOpf5qPVbEI=" 
            alt="No Orders" 
            className="empty-orders-img" 
          />
          <h2>You haven't placed any orders yet!</h2>
          <p>Explore our catalog and find something great to add to your collection.</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>SHOP NOW</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="page-title">My Orders History ({orders.length})</h2>
      
      {orders.map((order) => (
        <div key={order.orderId || order.id} className="order-group-card">
          
          {/* Top banner detailing global order metrics */}
          <div className="order-header-banner">
            <div className="banner-column">
              <span className="banner-label">ORDER PLACED</span>
              <span className="banner-value">
                {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'long', day: 'numeric'
                }) : 'N/A'}
              </span>
            </div>
            <div className="banner-column">
              <span className="banner-label">TOTAL PAID</span>
              <span className="banner-value price-highlight">₹{order.totalAmount || order.price}</span>
            </div>
            <div className="banner-column">
              <span className="banner-label">ORDER ID</span>
              <span className="banner-value reference-id">#CN-{order.orderId || order.id}</span>
            </div>
            <div className="banner-column status-column">
              <span className={`status-badge ${(order.orderStatus || 'SUCCESS').toLowerCase()}`}>
                ● {order.orderStatus || 'CONFIRMED'}
              </span>
            </div>
          </div>

          {/* Mapping individual item items inside the order */}
          <div className="order-items-list">
            {(order.items || [order]).map((item, index) => (
              <div key={item.orderItemId || index} className="order-item-row">
                <div className="item-thumbnail-wrapper">
                  <img 
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'} 
                    alt={item.productName || item.name} 
                    className="item-thumbnail" 
                  />
                </div>
                
                <div className="item-details-main">
                  <h3 className="item-product-name">{item.productName || item.name || "Product Item"}</h3>
                  <p className="item-meta-category">Category: <span>{item.category || "General"}</span></p>
                  <p className="item-meta-qty">Quantity: <strong>{item.quantity || 1}</strong></p>
                </div>

                <div className="item-pricing-summary">
                  <p className="item-unit-price">Price: ₹{item.price}</p>
                  {item.subtotal && <p className="item-row-subtotal">Subtotal: <span>₹{item.subtotal}</span></p>}
                </div>

                <div className="item-action-delivery">
                  <p className="delivery-milestone">Expected Delivery</p>
                  <span className="delivery-subtext">Item updates processed securely via Razorpay token verification.</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default MyOrdersPage;