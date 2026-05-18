// import React from 'react';
// import './CategoryBar.css';

// const CategoryBar = () => {
//   const categories = [
//     { name: 'Grocery', icon: 'shopping_basket' },
//     { name: 'Mobiles', icon: 'smartphone' },
//     { name: 'Fashion', icon: 'checkroom' },
//     { name: 'Electronics', icon: 'laptop_mac' },
//     { name: 'Home', icon: 'home' },
//     { name: 'Appliances', icon: 'kitchen' },
//     { name: 'Travel', icon: 'flight' },
//     { name: 'Toys', icon: 'toys' }
//   ];

//   return (
//     <div className="category-container">
//       {categories.map((item, index) => (
//         <div key={index} className="category-item">
//           <span className="material-icons category-icon">{item.icon}</span>
//           <span className="category-name">{item.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CategoryBar;
import React from 'react';
import './CategoryBar.css';

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    { name: 'For You', icon: 'auto_awesome' }, // Default item added at the beginning
    { name: 'Grocery', icon: 'shopping_basket' },
    { name: 'Mobiles', icon: 'smartphone' },
    { name: 'Fashion', icon: 'checkroom' },
    { name: 'Electronics', icon: 'laptop_mac' },
    { name: 'Home', icon: 'home' },
    { name: 'Applience', icon: 'kitchen' },
    { name: 'Travel', icon: 'flight' },
    { name: 'Toys', icon: 'toys' }
  ];

  return (
    <div className="category-container">
      {categories.map((item, index) => {
        // Check if this item matches the currently selected state
        const isActive = selectedCategory === item.name;

        return (
          <div 
            key={index} 
            className={`category-item ${isActive ? 'active' : ''}`}
            onClick={() => setSelectedCategory(item.name)}
          >
            <span className="material-icons category-icon">{item.icon}</span>
            <span className="category-name">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBar;