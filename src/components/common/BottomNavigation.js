import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getPageFromPath = (pathname) => {
    const pathMap = {
      '/results': 'results',
      '/deposit': 'deposit',
      '/withdraw': 'withdraw',
      '/contact': 'contact'
    };
    return pathMap[pathname] || 'results';
  };
  
  const currentPage = getPageFromPath(location.pathname);
  const navItems = [
    { 
      id: 'results', 
      icon: '🏆', 
      label: 'แทงหวย',
      activeColor: '#dc2626',
      activeBg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      activeShadow: '0 4px 12px rgba(220, 38, 38, 0.15)'
    },
    { 
      id: 'deposit', 
      icon: '💳', 
      label: 'ฝาก',
      activeColor: '#059669',
      activeBg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      activeShadow: '0 4px 12px rgba(5, 150, 105, 0.15)'
    },
    { 
      id: 'withdraw', 
      icon: '💰', 
      label: 'ถอน',
      activeColor: '#ea580c',
      activeBg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
      activeShadow: '0 4px 12px rgba(234, 88, 12, 0.15)'
    },
    { 
      id: 'contact', 
      icon: '💬', 
      label: 'ติดต่อ',
      activeColor: '#8b5cf6',
      activeBg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
      activeShadow: '0 4px 12px rgba(139, 92, 246, 0.15)'
    }
  ];

  const containerStyle = {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '28rem',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #f1f5f9',
    boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.08)',
    zIndex: 50,
    paddingBottom: 'env(safe-area-inset-bottom)',
    backdropFilter: 'blur(20px)',
    background: 'rgba(255, 255, 255, 0.95)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 0,
    padding: '0.5rem 0.25rem'
  };

  const getItemStyle = (item) => {
    const isActive = currentPage === item.id;
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem 0.5rem',
      margin: '0.25rem',
      borderRadius: '1rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: isActive ? item.activeBg : 'transparent',
      color: isActive ? item.activeColor : '#6b7280',
      boxShadow: isActive ? item.activeShadow : 'none',
      transform: isActive ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
      minHeight: '3.5rem'
    };
  };

  const iconStyle = {
    fontSize: '1.25rem',
    marginBottom: '0.25rem',
    transition: 'all 0.3s ease'
  };

  const labelStyle = {
    fontSize: '0.6875rem',
    fontWeight: '600',
    lineHeight: '1',
    transition: 'all 0.3s ease'
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-8px,0); }
          70% { transform: translate3d(0,-4px,0); }
          90% { transform: translate3d(0,-2px,0); }
        }
        
        .nav-item-active {
          animation: bounce 0.6s ease-out;
        }
      `}</style>
      
      <div style={containerStyle}>
        <div style={gridStyle}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const routes = {
                  results: '/results',
                  deposit: '/deposit', 
                  withdraw: '/withdraw',
                  contact: '/contact'
                };
                navigate(routes[item.id] || '/');
              }}
              style={getItemStyle(item)}
              className={currentPage === item.id ? 'nav-item-active' : ''}
              onMouseOver={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.transform = 'translateY(-1px) scale(1.02)';
                }
              }}
              onMouseOut={(e) => {
                if (currentPage !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }
              }}
            >
              <div style={iconStyle}>
                {item.icon}
              </div>
              <div style={labelStyle}>
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
