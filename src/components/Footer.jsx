import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top-container">
        {/* Column 1: Brand Pitch */}
        <div className="footer-brand-column">
          <h2 className="footer-logo">CartNova</h2>
          <p className="footer-tagline">
            Your premium destination for high-quality electronics, accessories, and next-gen mobile devices. Experience shopping redefined.
          </p>
          <div className="footer-socials">
            <span className="material-icons social-icon">facebook</span>
            <span className="material-icons social-icon">language</span>
            <span className="material-icons social-icon">smart_display</span>
          </div>
        </div>

        {/* Column 2: Quick Navigation */}
        <div className="footer-links-column">
          <h3>Shop Collections</h3>
          <ul>
            <li><a href="/">Mobiles</a></li>
            <li><a href="/">Laptops</a></li>
            <li><a href="/">Accessories</a></li>
            <li><a href="/">Featured Deals</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Care Help */}
        <div className="footer-links-column">
          <h3>Customer Support</h3>
          <ul>
            <li><a href="/">Track Order</a></li>
            <li><a href="/">Shipping Policy</a></li>
            <li><a href="/">Returns & Refunds</a></li>
            <li><a href="/">FAQs</a></li>
          </ul>
        </div>

        {/* Column 4: Contact/Location Meta Details */}
        <div className="footer-links-column">
          <h3>Get In Touch</h3>
          <ul className="footer-contact-info">
            <li>
              <span className="material-icons">email</span>
              support@cartnova.com
            </li>
            <li>
              <span className="material-icons">location_on</span>
              Paschim Medinipur, West Bengal, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar containing your signature */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} CartNova. All rights reserved.</p>
          {/* <p className="developer-signature">
            Developed by <span className="dev-name">Jayanta Rana</span> made with <span className="heart">❤️</span>
          </p> */}


          <p className="developer-signature">
  Developed by{' '}
  <a 
    href="https://jayantarana.netlify.app" // 🟢 Replace this with your actual portfolio URL!
    className="dev-link" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    Jayanta Rana
  </a>{' '}
  made with <span className="heart">❤️</span>
</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;