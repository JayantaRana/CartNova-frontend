// import React, { useState, useEffect } from 'react';
// import './AutoCarousel.css';

// const AutoCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = [
//     { id: 1, content: "UP TO 80% OFF ON ELECTRONICS", color: "var(--primary-blue)" },
//     { id: 2, content: "FASHION BONANZA - BUY 1 GET 1", color: "#e53935" }, // A variation for contrast
//     { id: 3, content: "NEW ARRIVALS IN SMARTPHONES", color: "#1b5e20" }
//   ];

//   // Auto-slide logic
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 4000); // Change slide every 4 seconds

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="carousel-container">
//       {/* Slide Content */}
//       <div 
//         className="carousel-wrapper" 
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div 
//             key={slide.id} 
//             className="carousel-slide" 
//             style={{ backgroundColor: slide.color }}
//           >
//             <h2>{slide.content}</h2>
//             <button className="shop-now-btn">Shop Now</button>
//           </div>
//         ))}
//       </div>

//       {/* Manual Navigation Dots */}
//       <div className="carousel-dots">
//         {slides.map((_, index) => (
//           <span 
//             key={index} 
//             className={`dot ${currentIndex === index ? 'active' : ''}`}
//             onClick={() => goToSlide(index)}
//           ></span>
//         ))}
//       </div>

//       {/* Side Controls */}
//       <button className="nav-btn prev" onClick={() => setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}>
//         <span className="material-icons">chevron_left</span>
//       </button>
//       <button className="nav-btn next" onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}>
//         <span className="material-icons">chevron_right</span>
//       </button>
//     </div>
//   );
// };

// export default AutoCarousel;




import React, { useState, useEffect } from 'react';
import './AutoCarousel.css';

// 🟢 Move slides array outside the component to prevent unnecessary re-renders
const slides = [
  { 
    id: 1, 
    imageUrl: "/banners/banner1.jpg", // 📂 Place these in your public/banners/ folder
    altText: "Up to 80% off on Electronics" 
  },
  { 
    id: 2, 
    imageUrl: "/banners/banner7.webp", 
    altText: "Fashion Bonanza - Buy 1 Get 1 Free" 
  },
  { 
    id: 3, 
    imageUrl: "/banners/banner8.webp", 
    altText: "New Arrivals in Smartphones" 
  },
    { 
    id: 4, 
    imageUrl: "/banners/banner4.webp", 
    altText: "New Arrivals in Smartphones" 
  },
    { 
    id: 5, 
    imageUrl: "/banners/banner5.webp", 
    altText: "New Arrivals in Smartphones" 
  },
    { 
    id: 6, 
    imageUrl: "/banners/banner9.webp", 
    altText: "New Arrivals in Smartphones" 
  },
    { 
    id: 7, 
    imageUrl: "/banners/banner10.webp", 
    altText: "New Arrivals in Smartphones" 
  }
];

const AutoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []); // 🟢 Empty array works perfectly now since slides is stable outside

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div className="carousel-container">
      {/* Slide Content Frame */}
      <div 
        className="carousel-wrapper" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            {/* 🟢 Render the full banner image instead of background colors and text h2 blocks */}
            <img 
              src={slide.imageUrl} 
              alt={slide.altText} 
              className="carousel-banner-img"
              // Fallback placeholder image if your downloaded image fails to load or path is wrong
              onError={(e) => { 
                e.target.src = "https://via.placeholder.com/1200x400?text=Banner+Image+Missing"; 
              }}
            />
          </div>
        ))}
      </div>

      {/* Manual Navigation Dots */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>

      {/* Side Controls */}
      <button className="nav-btn prev" onClick={prevSlide}>
        <span className="material-icons">chevron_left</span>
      </button>
      <button className="nav-btn next" onClick={nextSlide}>
        <span className="material-icons">chevron_right</span>
      </button>
    </div>
  );
};

export default AutoCarousel;