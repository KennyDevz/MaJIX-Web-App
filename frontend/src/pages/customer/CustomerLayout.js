import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/nav_bar';
import Footer from '../../components/Footer';
import '../../styles/App.css';

const CustomerLayout = () => {
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Outlet /> {/* This is where the page content (Shop, Home, etc.) goes */}
      </div>
      <Footer />
    </>
  );
};

export default CustomerLayout;