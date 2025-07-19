import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthTest = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const testAdminLogin = async () => {
    logout();
    setTimeout(() => {
      navigate('/login');
    }, 100);
  };

  const forceClearAndReload = () => {
    // Clear everything
    localStorage.clear();
    sessionStorage.clear();
    
    // Force reload the page
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        🔐 ทดสอบระบบ Authentication
      </h1>

      <div style={{
        backgroundColor: isAuthenticated ? '#d1fae5' : '#fee2e2',
        border: `1px solid ${isAuthenticated ? '#a7f3d0' : '#fecaca'}`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
          สถานะปัจจุบัน
        </h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div>
            <strong>Login Status:</strong> {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}
          </div>
          {user && (
            <>
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Phone:</strong> {user.phone}
              </div>
              <div style={{
                backgroundColor: user.role === 'admin' ? '#fef3c7' : '#e0e7ff',
                padding: '10px',
                borderRadius: '5px',
                fontWeight: 'bold'
              }}>
                <strong>Role:</strong> {user.role || 'ไม่มี role'} 
                {user.role === 'admin' ? ' 👑' : ' 👤'}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        <button
          onClick={forceClearAndReload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🚨 Force Clear ข้อมูลทั้งหมดและ Reload
        </button>
        
        <button
          onClick={testAdminLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Logout และไป Login ใหม่
        </button>

        <button
          onClick={() => navigate('/results')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📋 ไปหน้าแทงหวย
        </button>

        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ⚙️ ไปหน้า Admin
          </button>
        )}
      </div>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
          📝 วิธีทดสอบ
        </h3>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>Logout และ Login ด้วยเบอร์ <strong>0800000001</strong> (Admin)</li>
          <li>ตรวจสอบว่า Role แสดงเป็น <strong>admin 👑</strong></li>
          <li>ไปหน้าแทงหวย - ควรเห็นปุ่มจัดการหวย</li>
          <li>ลอง Login ด้วยเบอร์ <strong>0812345678</strong> (User)</li>
          <li>ตรวจสอบว่า Role แสดงเป็น <strong>user 👤</strong></li>
        </ol>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#fef3c7',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <strong>Debug Info:</strong>
        <pre style={{ marginTop: '5px', fontSize: '12px' }}>
          {JSON.stringify({ user, isAuthenticated }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AuthTest;