// import React, { useState, useEffect } from 'react';
// import './CartPage.css';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(savedCart);
//   }, []);

//   // Increase/Decrease Quantity
//   const updateQuantity = (id, delta) => {
//     const updatedCart = cartItems.map(item => {
//       if (item.id === id) {
//         const newQty = Math.max(1, item.quantity + delta);
//         return { ...item, quantity: newQty };
//       }
//       return item;
//     });
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const removeItem = (id) => {
//     const filteredCart = cartItems.filter(item => item.id !== id);
//     setCartItems(filteredCart);
//     localStorage.setItem('cart', JSON.stringify(filteredCart));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//   };

//   return (
//     <div className="cart-container">
//       <div className="cart-left">
//         <div className="cart-header">My Cart ({cartItems.length})</div>
        
//         {cartItems.map(item => (
//           <div key={item.id} className="cart-item">
//             <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
            
//             <div className="cart-item-details">
//               <h3>{item.name}</h3>
//               <p className="item-price">₹{item.price}</p>
              
//               <div className="quantity-controls">
//                 <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//                 <input type="text" value={item.quantity} readOnly />
//                 <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//                 <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
//               </div>
//             </div>

//             <div className="cart-item-subtotal">
//               Subtotal: <span>₹{item.price * item.quantity}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="cart-right">
//         <div className="price-details">
//           <h3>PRICE DETAILS</h3>
//           <hr />
//           <div className="price-row">
//             <span>Price ({cartItems.length} items)</span>
//             <span>₹{calculateTotal()}</span>
//           </div>
//           <div className="price-row">
//             <span>Delivery Charges</span>
//             <span className="free">FREE</span>
//           </div>
//           <hr />
//           <div className="total-amount">
//             <span>Total Amount</span>
//             <span>₹{calculateTotal()}</span>
//           </div>
//           <button className="place-order-btn">PLACE ORDER</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


//work fine
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './CartPage.css';

// const CartPage = () => {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const fetchCart = async () => {
//     try {
//       const response = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (response.status === 401) navigate('/login');
//       const data = await response.json();
//       setCart(data);
//       setLoading(false);
//     } catch (error) {
//       toast.error("Error loading cart");
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchCart(); }, []);

//   const updateQty = async (cartItemId, newQty) => {
//     if (newQty < 1) return;
//     try {
//       await fetch(`https://cartnova-6tap.onrender.com/customer/cart/${cartItemId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({ quantity: newQty })
//       });
//       fetchCart(); // Refresh data
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   const removeItem = async (cartItemId) => {
//     try {
//       await fetch(`https://cartnova-6tap.onrender.com/customer/cart/${cartItemId}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       toast.warn("Item removed");
//       fetchCart();
//     } catch (error) {
//       toast.error("Remove failed");
//     }
//   };

//   if (loading) return <div className="loader">Loading Cart...</div>;
//   if (!cart || cart.items.length === 0) return <div className="empty-cart">Your cart is empty!</div>;

//   return (
//     <div className="cart-container">
//       <div className="cart-left">
//         <div className="cart-header">FlipStore Cart ({cart.items.length})</div>
//         {cart.items.map(item => (
//           <div key={item.cartItemId} className="cart-item">
//             <img src={item.imageUrl} alt={item.productName} className="cart-item-img" />
//             <div className="cart-item-details">
//               <h3>{item.productName}</h3>
//               <p className="item-price">₹{item.price}</p>
//               <div className="quantity-controls">
//                 <button onClick={() => updateQty(item.cartItemId, item.quantity - 1)}>-</button>
//                 <input type="text" value={item.quantity} readOnly />
//                 <button onClick={() => updateQty(item.cartItemId, item.quantity + 1)}>+</button>
//                 <button className="remove-btn" onClick={() => removeItem(item.cartItemId)}>REMOVE</button>
//               </div>
//             </div>
//             <div className="cart-item-subtotal">
//               Subtotal: <span>₹{item.subtotal}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="cart-right">
//         <div className="price-details">
//           <h3>PRICE DETAILS</h3>
//           <div className="price-row"><span>Total Amount</span> <span>₹{cart.totalAmount}</span></div>
//           <button className="place-order-btn" onClick={() => navigate('/checkout')}>PLACE ORDER</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

//update for 📌 razorpay
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Updated to point cleanly to your new backend name domain
  const API_BASE_URL = "https://cartnova-6tap.onrender.com";

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer/cart`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.status === 401) navigate('/login');
      const data = await response.json();
      setCart(data);
      loading && setLoading(false);
    } catch (error) {
      toast.error("Error loading cart");
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (!token) {
      navigate('/login');
    } else {
      fetchCart(); 
    }
  }, []);

  const updateQty = async (cartItemId, newQty) => {
    if (newQty < 1) return;
    try {
      await fetch(`${API_BASE_URL}/customer/cart/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQty })
      });
      fetchCart(); 
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await fetch(`${API_BASE_URL}/customer/cart/${cartItemId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      toast.warn("Item removed");
      fetchCart();
    } catch (error) {
      toast.error("Remove failed");
    }
  };

  // if (loading) return <div className="loader">Loading Cart...</div>;


  if (loading) {
  return (
    <div className="loader-container">
      <div className="circular-spinner-wrapper">
        {/* Animated outer ring border */}
        <div className="spinner-ring"></div>
        {/* Central fixed text context core */}
        <div className="spinner-text">
          <span>Loading</span>
          <small>Cart...</small>
        </div>
      </div>
    </div>
  );
}


  if (!cart || !cart.items || cart.items.length === 0) return <div className="empty-cart">Your cart is empty!</div>;

  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="cart-header">FlipStore Cart ({cart.items.length})</div>
        {cart.items.map(item => (
          <div key={item.cartItemId} className="cart-item">
            <img src={item.imageUrl} alt={item.productName} className="cart-item-img" />
            <div className="cart-item-details">
              <h3>{item.productName}</h3>
              <p className="item-price">₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQty(item.cartItemId, item.quantity - 1)}>-</button>
                <input type="text" value={item.quantity} readOnly />
                <button onClick={() => updateQty(item.cartItemId, item.quantity + 1)}>+</button>
                <button className="remove-btn" onClick={() => removeItem(item.cartItemId)}>REMOVE</button>
              </div>
            </div>
            <div className="cart-item-subtotal">
              Subtotal: <span>₹{item.subtotal}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-right">
        <div className="price-details">
          <h3>PRICE DETAILS</h3>
          <div className="price-row"><span>Total Amount</span> <span>₹{cart.totalAmount}</span></div>
          {/* Passing the total amount through state router navigation */}
          <button 
            className="place-order-btn" 
            onClick={() => navigate('/checkout', { state: { totalAmount: cart.totalAmount } })}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;