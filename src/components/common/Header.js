import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MessageCircle } from 'lucide-react';

const Header = ({ showProfile, setShowProfile, setCurrentPage }) => {
  const navigate = useNavigate();
  const { user, balance, logout } = useAuth();

  const headerStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 40
  };

  const containerStyle = {
    maxWidth: '28rem',
    margin: '0 auto',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const balanceContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const balanceStyle = {
    textAlign: 'right'
  };

  const balanceLabelStyle = {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  };

  const balanceAmountStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#16a34a'
  };

  const profileButtonStyle = {
    width: '3rem',
    height: '3rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    position: 'relative'
  };

  const profilePopupStyle = {
    position: 'absolute',
    top: '3.5rem',
    right: 0,
    width: '18rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '1.5rem',
    zIndex: 50,
    animation: 'slideDown 0.3s ease-out'
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div style={headerStyle}>
        <div style={containerStyle}>
          <div style={logoStyle}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
            <span>CHOKEDE</span>
          </div>
          
          <div style={balanceContainerStyle}>
            <div style={balanceStyle}>
              <div style={balanceLabelStyle}>ยอดเงิน</div>
              <div style={balanceAmountStyle}>
                {balance?.toLocaleString() || '0'} ฿
              </div>
            </div>
            
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                style={{
                  ...profileButtonStyle,
                  backgroundColor: showProfile ? '#eff6ff' : '#f3f4f6',
                  transform: showProfile ? 'scale(0.95)' : 'scale(1)'
                }}
                onMouseOver={(e) => {
                  if (!showProfile) e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseOut={(e) => {
                  if (!showProfile) e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>👤</span>
              </button>
              
              {showProfile && (
                <>
                  <div 
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 40
                    }}
                    onClick={() => setShowProfile(false)}
                  />
                  <div style={profilePopupStyle}>
                    <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>
                        {user?.name || 'ผู้ใช้งาน'}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        รหัสสมาชิก: {user?.memberId || 'N/A'}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '500', marginTop: '0.25rem' }}>
                        {user?.level || 'สมาชิกใหม่'}
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#374151' }}>โทรศัพท์:</span>
                        <span style={{ fontWeight: '500' }}>{user?.phone || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#374151', fontSize: '0.875rem' }}>ฝากสะสม:</span>
                        <span style={{ color: '#16a34a', fontWeight: 'bold' }}>
                          {user?.totalDeposit?.toLocaleString() || '0'} ฿
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#374151', fontSize: '0.875rem' }}>ถอนสะสม:</span>
                        <span style={{ color: '#ea580c', fontWeight: 'bold' }}>
                          {user?.totalWithdraw?.toLocaleString() || '0'} ฿
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        logout();
                        setShowProfile(false);
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
