// src/components/Header.js

import React from 'react';
// Assuming you'll add specific CSS classes (e.g., 'header-container', 'logo', 'nav-link')
// for styling that matches the image.

const Header = () => {
  return (
    <header className="header-container">
      {/* Top Bar for Signup/Login */}
      <div className="top-signup-bar">
        <span>Sign up and get 20% off your first order. <a href="/signup">Sign Up Now</a></span>
        {/* Placeholder icon for closing the bar */}
        <span className="close-icon">×</span> 
      </div>

      {/* Main Navigation Row */}
      <div className="main-nav-row">
        {/* Logo Section */}
        <div className="logo">
          <a href="/">MajIX</a>
        </div>

        {/* Navigation Links */}
        <nav className="main-nav-links">
          <a href="/shop" className="nav-link">Shop</a>
          <a href="/on-sale" className="nav-link">On Sale</a>
          <a href="/new-arrivals" className="nav-link nav-active">New Arrivals</a>
        </nav>

        {/* Search Bar */}
        <div className="search-container">
          {/* Placeholder for Search Icon */}
          <span className="search-icon">🔍</span> 
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="search-input"
          />
        </div>
        
        {/* Icons (Cart, Account) */}
        <div className="icon-group">
          {/* Cart Icon and Count */}
          <a href="/cart" className="nav-icon cart-icon">
            🛒
            <span className="cart-count">0</span>
          </a>
          {/* Account/Profile Icon */}
          <a href="/account" className="nav-icon profile-icon">
            👤
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;