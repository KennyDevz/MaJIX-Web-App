// src/components/Footer.js

import React from 'react';
// This component has a distinct dark grey background in the image.

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Left Section: Brand Info */}
        <div className="footer-section brand-info">
          <h3>MaJIX</h3>
          <p>Find clothes that matches your style.</p>
          <p>We craft style that suits your style and which you're proud to wear. From sunset to dawn.</p>
          {/* Placeholder for social media icons */}
          <div className="social-icons">
            <span>🐦</span><span>📘</span><span>📷</span><span>📌</span>
          </div>
        </div>

        {/* Middle Sections: Company & Help Links */}
        <div className="footer-section links-group">
          <div className="link-column">
            <h4>COMPANY</h4>
            <a href="/about" className="footer-link">About</a>
            <a href="/features" className="footer-link">Features</a>
            <a href="/works" className="footer-link">Works</a>
            <a href="/career" className="footer-link">Career</a>
          </div>
          
          <div className="link-column">
            <h4>HELP</h4>
            <a href="/support" className="footer-link">Customer Support</a>
            <a href="/delivery" className="footer-link">Delivery Details</a>
            <a href="/terms" className="footer-link">Terms & Conditions</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </div>
        </div>

        {/* Right Section: F.A.Q. Links */}
        <div className="footer-section link-column faq-group">
          <h4>F.A.Q.</h4>
          <a href="/account" className="footer-link">Account</a>
          <a href="/deliveries" className="footer-link">Manage Deliveries</a>
          <a href="/orders" className="footer-link">Orders</a>
          <a href="/payments" className="footer-link">Payments</a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="copyright-bar">
        <p>MaJIX © 2020-2025, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;