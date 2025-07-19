import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './common/Header';
import BottomNavigation from './common/BottomNavigation';
import '../styles/Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  // Close profile when changing pages
  useEffect(() => {
    setShowProfile(false);
  }, [location.pathname]);

  const handleNavigate = (page) => {
    const routes = {
      home: '/',
      results: '/results',
      buy: '/buy',
      deposit: '/deposit',
      withdraw: '/withdraw',
      contact: '/contact',
      'yiki-selection': '/yiki/selection',
      'yiki-rounds': '/yiki/rounds'
    };
    
    if (routes[page]) {
      navigate(routes[page]);
    }
  };

  return (
    <div className="app-container">
      <Header 
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        setCurrentPage={handleNavigate}
      />

      <div className="main-content">
        <Outlet />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Layout;