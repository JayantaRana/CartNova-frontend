// import React from 'react';
// import './Navbar.css';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="navbar">
//       {/* 1. App Name */}
//       <div className="navbar-logo" onClick={() => navigate('/')}>
//         CartNova
//       </div>

//       {/* 2. Search Box */}
//       <div className="navbar-search">
//         <input type="text" placeholder="Search for products, brands and more" />
//         <span className="material-icons search-icon">search</span>
//       </div>

//       {/* 3. Right Side Icons */}
//       <div className="navbar-links">
        
//         {/* Profile with Hover Menu */}
//         <div className="profile-container">
//           <div className="nav-item">
//             <span className="material-icons">account_circle</span>
//             <span>Profile</span>
//           </div>
          
//           <div className="profile-dropdown">
//             <div className="dropdown-item" onClick={() => navigate('/login')}>Login</div>
//             <div className="dropdown-item" onClick={() => navigate('/signup')}>Sign Up</div>
//             <hr />
//             <div className="dropdown-item admin-link" onClick={() => navigate('/admin')}>Admin Login</div>
//           </div>
//         </div>

//         {/* Cart */}
//         <div className="nav-item" onClick={() => navigate('/cart')}>
//           <span className="material-icons">shopping_cart</span>
//           <span>Cart</span>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import CartNovaLogo from './CartNovaLogo';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);


  //add for  cart badge
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const response = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      if (data && data.items) {
        setCartCount(data.items.length);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    // Listen for the custom "cartUpdated" event from ProductCard
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => window.removeEventListener('cartUpdated', fetchCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
    window.location.reload(); // Refresh to update UI
  };

  return (
    <nav className="navbar">
      {/* <div className="navbar-logo" onClick={() => navigate('/')}>CartNova</div> */}



      {/* <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <CartNovaLogo size={38} /> 
        <span className="navbar-logo-text">CartNova</span>
      </div> */}

      <div className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <img 
          src="/logo.png" 
          alt="CartNova Logo" 
          style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
        />
        
      </div>

      {/* <div className="navbar-search">
        <input type="text" placeholder="Search for products..." />
        <span className="material-icons search-icon">search</span>
      </div> */}


      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Search for products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="material-icons search-icon">search</span>
      </div>

      <div className="navbar-links">
        <div className="profile-container">
          <div className="nav-item">
            <span className="material-icons">account_circle</span>
            {/* Dynamic Text: Show Name or 'Profile' */}
            <span>{user ? `Hi, ${user}` : 'Profile'}</span>
          </div>
          
          <div className="profile-dropdown">
            {!user ? (
              <>
                <div className="dropdown-item" onClick={() => navigate('/login')}>Login</div>
                <div className="dropdown-item" onClick={() => navigate('/signup')}>Sign Up</div>
              </>
            ) : (
              <>
                {/* <div className="dropdown-item">My Orders</div> */}
                <div className="dropdown-item" onClick={() => navigate('/orders')}>
        📦 My Orders
      </div>
      
                {/* <div className="dropdown-item">Wishlist</div> */}
                <hr />
                <div className="dropdown-item logout-text" onClick={handleLogout}>Logout</div>
              </>
            )}
            <hr />
            <div className="dropdown-item admin-link" onClick={() => navigate('/admin')}>Admin Login</div>
          </div>
        </div>

        {/* <div className="nav-item" onClick={() => navigate('/cart')}>
          <span className="material-icons">shopping_cart</span>
          <span>Cart</span>
        </div> */}


        <div className="nav-item" onClick={() => navigate('/cart')}>
         
            <span className="material-icons">shopping_cart</span>
            {cartCount > 12563&& <span className="cart-badge">{cartCount}</span>}
          
          <span>Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;