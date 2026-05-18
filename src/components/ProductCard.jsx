

// import React from 'react';
// import './ProductCard.css';
// import { useNavigate } from 'react-router-dom';

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();

//   const handleBuyNow = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       // User not logged in
//       alert("Please login to purchase items!");
//       navigate('/login');
//     } else {
//       // User logged in - send to checkout/payment
//       console.log("Proceeding to payment for:", product.name);
//       navigate(`/payment/${product.id}`); 
//     }
//   };

//   return (
//     <div className="product-card">
//       <div className="image-container">
//         <img src={product.imageUrl || "https://via.placeholder.com/200"} alt={product.name} />
//       </div>
      
//       <div className="product-info">
//         <h3 className="product-name">{product.name}</h3>
//         <div className="price-tag">₹{product.price}</div>
        
//         <div className="card-buttons">
//           <button className="add-to-cart-btn">
//             <span className="material-icons">shopping_cart</span>
//             Add to Cart
//           </button>
//           <button className="buy-now-btn" onClick={handleBuyNow}>
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // 🟢 Prevents triggering card click routing!
    const token = localStorage.getItem("token");

    // 1. Force Login Check
    if (!token) {
      toast.info("Please login to add items to cart");
      navigate('/login');
      return;
    }

    try {
      // 2. Fetch current cart from Backend to check if product exists
      const response = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const cart = await response.json();

      // 3. Check if this product ID is already in the backend cart
      const isItemInCart = cart.items.some(item => item.productId === product.id);

      if (isItemInCart) {
        // If exists, redirect to Cart Page
        navigate('/cart');
      } else {
        // 4. If not exists, Add to Backend Cart
        const addResponse = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id, quantity: 1 })
        });

        if (addResponse.ok) {
          toast.success(`${product.name} added to cart!`, { position: "bottom-center" });
          window.dispatchEvent(new Event('cartUpdated'));
        } else {
          toast.error("Failed to add to cart");
        }
      }
    } catch (error) {
      console.error("Cart Error:", error);
      toast.error("Something went wrong");
    }
  };



  const handleBuyNow = (e) => {
    e.stopPropagation(); // 🟢 Prevents triggering card click routing!
    const token = localStorage.getItem("token");

    // Check if the user is logged in
    if (!token) {
      toast.info("Please login to buy items instantly!");
      navigate('/login');
      return;
    }

    // If logged in, pass the single product price into location state matching CheckoutPage expects
    // Note: Verify if your checkout route path string is '/checkout' or '/payment' in App.js
    navigate('/checkout', { 
      state: { totalAmount: product.price ,isDirectBuy: true} 
    });
  };


// 🟢 Route cleanly to detail overview workspace view matching explicit entity layouts
  const handleCardClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };


  return (
    <div className="product-card"  onClick={handleCardClick}>
      <div className="image-container">
        <img src={product.imageUrl || "https://via.placeholder.com/200"} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="price-tag">₹{product.price}</div>
        <div className="card-buttons">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <span className="material-icons">shopping_cart</span>
            Add to Cart
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;