import React from 'react';

const NovaSparkLogo = ({ size = 36 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Modern High-Speed Minimalist Cart Base */}
      <path d="M20 25H30L45 65H75L85 35H40" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="48" cy="78" r="6" fill="#3b82f6" />
      <circle cx="72" cy="78" r="6" fill="#3b82f6" />
      {/* The Nova Star/Spark Effect */}
      <path d="M75 15V30M67 22H83" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/> 
    </svg>
  );
};

export default NovaSparkLogo;