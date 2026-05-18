// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './ProductDetailsPage.css';

// const ProductDetailsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [adding, setAdding] = useState(false);

//   // Fallback to avoid crashes if user hits the URL raw
//   const product = location.state?.product;

//   if (!product) {
//     return (
//       <div className="details-error-view">
//         <h3>Product data unavailable.</h3>
//         <button onClick={() => navigate('/')}>Back To Shopping</button>
//       </div>
//     );
//   }

//   // Stock tracking rules evaluation
//   const isOutOfStock = product.stock === 0 || product.stock === undefined;

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.info("Please login to add items to cart");
//       navigate('/login');
//       return;
//     }

//     setAdding(true);
//     try {
//       const response = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       const cart = await response.json();
//       const isItemInCart = cart.items.some(item => item.productId === product.id);

//       if (isItemInCart) {
//         navigate('/cart');
//       } else {
//         const addResponse = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`
//           },
//           body: JSON.stringify({ productId: product.id, quantity: 1 })
//         });

//         if (addResponse.ok) {
//           toast.success(`${product.name} added to cart!`);
//           window.dispatchEvent(new Event('cartUpdated'));
//         } else {
//           toast.error("Failed adding item to cart.");
//         }
//       }
//     } catch (err) {
//       toast.error("Network issue updating cart references.");
//     } finally {
//       setAdding(false);
//     }
//   };

//   const handleBuyNow = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.info("Please login to complete your checkout instantly!");
//       navigate('/login');
//       return;
//     }

//     navigate('/checkout', { 
//       state: { totalAmount: product.price, isDirectBuy: true } 
//     });
//   };

//   return (
//     <div className="details-page-wrapper">
//       <button className="details-back-btn" onClick={() => navigate(-1)}>
//         <span className="material-icons">arrow_back</span> Back to Results
//       </button>

//       <div className="details-container">
//         {/* Left Column: Big Image Frame */}
//         <div className="details-image-section">
//           <div className="big-image-frame">
//             <img src={product.imageUrl || "https://via.placeholder.com/400"} alt={product.name} />
//           </div>
//         </div>

//         {/* Right Column: Information Panel */}
//         <div className="details-info-section">
//           <span className="details-category-tag">{product.category || "General"}</span>
//           <h1 className="details-product-title">{product.name}</h1>
          
//           <div className="details-price-row">
//             <span className="details-price">₹{product.price}</span>
//             <span className="details-tax-inclusive">Inclusive of all taxes</span>
//           </div>

//           {/* Dynamic Stock Indicator Badge */}
//           <div className="details-stock-status">
//             {isOutOfStock ? (
//               <span className="stock-badge out-of-stock">
//                 <span className="material-icons">error_outline</span> Out of Stock
//               </span>
//             ) : (
//               <span className="stock-badge in-stock">
//                 <span className="material-icons">check_circle_outline</span> In Stock ({product.stock} items left)
//               </span>
//             )}
//           </div>

//           <div className="details-description-block">
//             <h3>Product Overview Description</h3>
//             <p>{product.description || "No product summary details provided by vendor inventory yet."}</p>
//           </div>

//           {/* Action Control Panel Footer */}
//           <div className="details-action-buttons">
//             <button 
//               className="details-add-cart" 
//               onClick={handleAddToCart}
//               disabled={isOutOfStock || adding}
//             >
//               <span className="material-icons">shopping_cart</span> 
//               {adding ? "Adding..." : "ADD TO CART"}
//             </button>
//             <button 
//               className="details-buy-now" 
//               onClick={handleBuyNow}
//               disabled={isOutOfStock}
//             >
//               <span className="material-icons">flash_on</span> BUY NOW
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard'; 
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const product = location.state?.product;

  useEffect(() => {
    if (product) {
      window.scrollTo(0, 0); // Smooth scroll to top when main product changes
      fetchSimilarCategoryItems();
    }
  }, [product]);

  const fetchSimilarCategoryItems = async () => {
    try {
      const response = await fetch("https://cartnova-6tap.onrender.com/admin/products");
      if (!response.ok) throw new Error("Failed to pull reference items");
      
      const allProducts = await response.json();
      
      if (allProducts && Array.isArray(allProducts)) {
        const filtered = allProducts.filter(item => 
          item.category?.toLowerCase() === product.category?.toLowerCase() && 
          item.id !== product.id
        );
        
        // 🟢 FIXED: Removed .slice(0, 4) so all remaining products (e.g., all 9 items) show up!
        setSimilarProducts(filtered);
      }
    } catch (error) {
      console.error("Error building recommendations grid:", error);
    }
  };

  if (!product) {
    return (
      <div className="details-error-view">
        <h3>Product data unavailable.</h3>
        <button onClick={() => navigate('/')}>Back To Shopping</button>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0 || product.stock === undefined;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please login to add items to cart");
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      const response = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const cart = await response.json();
      const isItemInCart = cart.items.some(item => item.productId === product.id);

      if (isItemInCart) {
        navigate('/cart');
      } else {
        const addResponse = await fetch("https://cartnova-6tap.onrender.com/customer/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id, quantity: 1 })
        });

        if (addResponse.ok) {
          toast.success(`${product.name} added to cart!`);
          window.dispatchEvent(new Event('cartUpdated'));
        } else {
          toast.error("Failed adding item to cart.");
        }
      }
    } catch (err) {
      toast.error("Network issue updating cart references.");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please login to complete your checkout instantly!");
      navigate('/login');
      return;
    }
    navigate('/checkout', { 
      state: { totalAmount: product.price, isDirectBuy: true } 
    });
  };

  return (
    <div className="details-page-wrapper">
      <button className="details-back-btn" onClick={() => navigate(-1)}>
        <span className="material-icons">arrow_back</span> Back to Results
      </button>

      <div className="details-container">
        <div className="details-image-section">
          <div className="big-image-frame">
            <img src={product.imageUrl || "https://via.placeholder.com/400"} alt={product.name} />
          </div>
        </div>

        <div className="details-info-section">
          <span className="details-category-tag">{product.category || "General"}</span>
          <h1 className="details-product-title">{product.name}</h1>
          
          <div className="details-price-row">
            <span className="details-price">₹{product.price}</span>
            <span className="details-tax-inclusive">Inclusive of all taxes</span>
          </div>

          <div className="details-stock-status">
            {isOutOfStock ? (
              <span className="stock-badge out-of-stock">
                <span className="material-icons">error_outline</span> Out of Stock
              </span>
            ) : (
              <span className="stock-badge in-stock">
                <span className="material-icons">check_circle_outline</span> In Stock ({product.stock} items left)
              </span>
            )}
          </div>

          <div className="details-description-block">
            <h3>Product Overview Description</h3>
            <p>{product.description || "No product summary details provided by vendor inventory yet."}</p>
          </div>

          <div className="details-action-buttons">
            <button className="details-add-cart" onClick={handleAddToCart} disabled={isOutOfStock || adding}>
              <span className="material-icons">shopping_cart</span> 
              {adding ? "Adding..." : "ADD TO CART"}
            </button>
            <button className="details-buy-now" onClick={handleBuyNow} disabled={isOutOfStock}>
              <span className="material-icons">flash_on</span> BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Container */}
      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <hr className="recommendation-divider" />
          <h2 className="similar-title">Similar Products You May Like ({similarProducts.length})</h2>
          <div className="similar-grid">
            {similarProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;