import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ClearAuth = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const clearAndRestart = () => {
    // Clear all localStorage
    localStorage.clear();
    
    // Force logout
    logout();
    
    // Redirect to login
    setTimeout(() => {
      navigate('/login');
    }, 100);
  };

  React.useEffect(() => {
    clearAndRestart();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h1>🔄 กำลัง Clear ข้อมูล...</h1>
      <p>กรุณารอสักครู่</p>
    </div>
  );
};

export default ClearAuth;