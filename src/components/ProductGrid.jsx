// import React, { useState, useEffect } from 'react';
// import './ProductGrid.css';
// import ProductCard from './ProductCard';

// const ProductGrid = () => {
//   const [categories, setCategories] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

// const fetchProducts = async () => {
//   setLoading(true);
  
//   // 1. Define the correct backend URL
//   // Replace 8080 with the port shown in your Spring Boot console
//   const API_URL = "https://cartnova-6tap.onrender.com/admin/products";

//   try {
//     console.log("Attempting to connect to:", API_URL);

//     const response = await fetch(API_URL, {
//       method: "GET",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//       }
//     });

//     // 2. Check if the server is blocking the request (403/401)
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`Server Error (${response.status}):`, errorText);
//       throw new Error(`HTTP Error ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Data received from DB:", data);

//     // 3. Group products by Category
//     if (data && Array.isArray(data)) {
//       const grouped = data.reduce((acc, product) => {
//         // Fallback to "General" if category is missing in DB
//         const cat = product.category || "General"; 
//         if (!acc[cat]) {
//           acc[cat] = [];
//         }
//         acc[cat].push(product);
//         return acc;
//       }, {});

//       setCategories(grouped);
//     } else {
//       console.warn("Received data is not an array:", data);
//     }

//     setLoading(false);
//   } catch (error) {
//     // 4. Detailed error logging for debugging
//     console.error("Fetch failed! Check 3 things:");
//     console.error("1. Is Spring Boot running?");
//     console.error("2. Is the port 8080 correct?");
//     console.error("3. Is @CrossOrigin enabled in your Controller?");
//     console.error("Original Error:", error.message);
//     setLoading(false);
//   }
// };
//   if (loading) return <div style={{textAlign: 'center', padding: '20px'}}>Loading CartNova Deals...</div>;

//   return (
//     <div className="home-products-container">
//       {Object.keys(categories).map((categoryName) => (
//         <div key={categoryName} className="product-section">
//           <div className="section-header">
//             <h2>{categoryName}</h2>
//             <button className="view-all-btn">View All</button>
//           </div>
//           <div className="product-grid">
//             {categories[categoryName].map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };



// export default ProductGrid;📌work fine
// import React, { useState, useEffect } from 'react';
// import './ProductGrid.css';
// import ProductCard from './ProductCard';

// const ProductGrid = ({ selectedCategory = "For You", setSelectedCategory }) => {
//   const [categories, setCategories] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     const API_URL = "https://cartnova-6tap.onrender.com/admin/products";

//     try {
//       console.log("Attempting to connect to:", API_URL);
//       const response = await fetch(API_URL, {
//         method: "GET",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Data received from DB:", data);

//       if (data && Array.isArray(data)) {
//         const grouped = data.reduce((acc, product) => {
//           const cat = product.category || "General"; 
          
//           // 1. Find if a similar key already exists (ignoring plural/singular case differences)
//           const matchingKey = Object.keys(acc).find(
//             k => k.toLowerCase() === cat.toLowerCase() || 
//                  k.toLowerCase() === `${cat.toLowerCase()}s` ||
//                  `${k.toLowerCase()}s` === cat.toLowerCase()
//           ) || cat;

//           // 2. Initialize the array if it doesn't exist yet
//           if (!acc[matchingKey]) {
//             acc[matchingKey] = [];
//           }
          
//           // 3. Push the product EXACTLY ONCE
//           acc[matchingKey].push(product);
//           return acc;
//         }, {});

//         setCategories(grouped);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Fetch failed:", error.message);
//       setLoading(false);
//     }
//   };

//   if (loading) return <div style={{textAlign: 'center', padding: '20px'}}>Loading CartNova Deals...</div>;

//   // ========================================================================
//   // LAYOUT 1: DEFAULT "FOR YOU" (Horizontal Scrollable Rows)
//   // ========================================================================
//   if (selectedCategory === "For You") {
//     return (
//       <div className="home-products-container">
//         {Object.keys(categories).map((categoryName) => (
//           <div key={categoryName} className="product-section">
//             <div className="section-header">
//               <h2>{categoryName}</h2>
//               <button className="view-all-btn"  onClick={() => setSelectedCategory(categoryName)}>
//                 View All <span className="material-icons" style={{ fontSize: '16px', marginLeft: '4px' }}>arrow_forward</span>
//               </button>
//             </div>
//             <div className="product-grid-scrollable"> 
//               {categories[categoryName].map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // ========================================================================
//   // LAYOUT 2: SPECIFIC CATEGORY SELECTED (Vertical Grid Style)
//   // ========================================================================
//   const activeCategoryKey = Object.keys(categories).find(
//     cat => cat.toLowerCase() === selectedCategory.toLowerCase() || 
//            cat.toLowerCase() === `${selectedCategory.toLowerCase()}s` ||
//            selectedCategory.toLowerCase() === `${cat.toLowerCase()}s`
//   );

//   const filteredProducts = activeCategoryKey ? categories[activeCategoryKey] : [];

//   return (
//     <div className="category-view-container">
//       <h2 className="category-title">{selectedCategory} Collection</h2>
      
//       {filteredProducts.length === 0 ? (
//         <div className="no-products">No products found in this category right now.</div>
//       ) : (
//         <div className="category-vertical-grid">
//           {filteredProducts.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;


//update for search box 
import React, { useState, useEffect } from 'react';
import './ProductGrid.css';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const ProductGrid = ({ selectedCategory = "For You", setSelectedCategory, searchQuery, setSearchQuery }) => {
  const [allProductsRaw, setAllProductsRaw] = useState([]); // Keeps a reference copy of all elements
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const API_URL = "https://cartnova-6tap.onrender.com/admin/products";

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const data = await response.json();

      if (data && Array.isArray(data)) {
        setAllProductsRaw(data); // Save raw data array for absolute searching layouts

        const grouped = data.reduce((acc, product) => {
          const cat = product.category || "General"; 
          const matchingKey = Object.keys(acc).find(
            k => k.toLowerCase() === cat.toLowerCase() || 
                 k.toLowerCase() === `${cat.toLowerCase()}s` ||
                 `${k.toLowerCase()}s` === cat.toLowerCase()
          ) || cat;

          if (!acc[matchingKey]) acc[matchingKey] = [];
          acc[matchingKey].push(product);
          return acc;
        }, {});

        setCategories(grouped);
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch failed:", error.message);
      setLoading(false);
    }
  };

  // if (loading) return <div style={{textAlign: 'center', padding: '20px'}}>Loading CartNova Deals...</div>;
// 🟢 NEW: Clean Shimmer Grid UI State Interceptor
if (loading) {
  // Create an array placeholder of 8 items to render a realistic initial screen
  const skeletonArray = Array(8).fill(null);

  return (
    <div className="category-view-container" style={{ marginTop: '20px' }}>
      <h2 className="category-title" style={{ color: '#cbd5e1' }}>Loading collections...</h2>
      
      {/* 
         Reuses your existing grid class layout styles so the placeholder cards 
         line up exactly where your finished product elements will eventually map!
      */}
      <div className="category-vertical-grid">
        {skeletonArray.map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}


  // ========================================================================
  // LAYOUT INTERCEPTOR: ACTIVE GLOBAL SEARCH (Shows as Vertical Grid)
  // ========================================================================
  if (searchQuery.trim() !== "") {
    const searchFilteredProducts = allProductsRaw.filter(product => 
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="category-view-container">
        <div className="search-results-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="category-title">Search Results for "{searchQuery}"</h2>
          <button 
            className="view-all-btn" 
            onClick={() => setSearchQuery("")} // Clear search input state block
            style={{ color: '#dc3545' }}
          >
            Clear Search
          </button>
        </div>
        
        {searchFilteredProducts.length === 0 ? (
          <div className="no-products">No matches found for "{searchQuery}". Try another keyword!</div>
        ) : (
          <div className="category-vertical-grid">
            {searchFilteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ========================================================================
  // LAYOUT 1: DEFAULT "FOR YOU" (Horizontal Scrollable Rows)
  // ========================================================================
  if (selectedCategory === "For You") {
    return (
      <div className="home-products-container">
        {Object.keys(categories).map((categoryName) => (
          <div key={categoryName} className="product-section">
            <div className="section-header">
              <h2>{categoryName}</h2>
              <button className="view-all-btn" onClick={() => setSelectedCategory(categoryName)}>
                View All <span className="btn-arrow">&rarr;</span>
              </button>
            </div>
            <div className="product-grid-scrollable"> 
              {categories[categoryName].map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ========================================================================
  // LAYOUT 2: SPECIFIC CATEGORY SELECTED (Vertical Grid Style)
  // ========================================================================
  const activeCategoryKey = Object.keys(categories).find(
    cat => cat.toLowerCase() === selectedCategory.toLowerCase() || 
           cat.toLowerCase() === `${selectedCategory.toLowerCase()}s` ||
           selectedCategory.toLowerCase() === `${cat.toLowerCase()}s`
  );

  const filteredProducts = activeCategoryKey ? categories[activeCategoryKey] : [];

  return (
    <div className="category-view-container">
      <h2 className="category-title">{selectedCategory} Collection</h2>
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">No products found in this category right now.</div>
      ) : (
        <div className="category-vertical-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;