import React from 'react';
import './ProductSkeleton.css';

const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      {/* Mimics the product image container */}
      <div className="skeleton-image placeholder-shimmer"></div>
      
      <div className="skeleton-info">
        {/* Mimics the product title text line */}
        <div className="skeleton-line title placeholder-shimmer"></div>
        
        {/* Mimics the price tag text line */}
        <div className="skeleton-line price placeholder-shimmer"></div>
        
        {/* Mimics the dual button action strip */}
        <div className="skeleton-buttons">
          <div className="skeleton-btn placeholder-shimmer"></div>
          <div className="skeleton-btn placeholder-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;