import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>กำลังโหลด...</div>
      </div>
    );
  }

  // ถ้าไม่ได้ login ให้ไปหน้า login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ถ้าไม่ใช่ admin ให้ไปหน้าหลัก
  if (user?.role !== 'admin') {
    return <Navigate to="/results" replace />;
  }

  return children;
};

export default AdminRoute;