import React from 'react';

// Loading Overlay Component
export const LoadingOverlay = ({ isLoading, message = 'กำลังโหลด...' }) => {
  if (!isLoading) return null;

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{
            fontSize: '1rem',
            color: '#4b5563',
            margin: 0,
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            {message}
          </p>
        </div>
      </div>
    </>
  );
};

// Inline Loading Component
export const LoadingSpinner = ({ size = 'md', color = '#3b82f6' }) => {
  const sizes = {
    sm: { width: '1rem', height: '1rem', border: '2px' },
    md: { width: '1.5rem', height: '1.5rem', border: '3px' },
    lg: { width: '2.5rem', height: '2.5rem', border: '4px' }
  };

  const sizeConfig = sizes[size] || sizes.md;

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={{
        width: sizeConfig.width,
        height: sizeConfig.height,
        border: `${sizeConfig.border} solid #e5e7eb`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        display: 'inline-block'
      }} />
    </>
  );
};

// Button with Loading State
export const LoadingButton = ({ 
  children, 
  isLoading, 
  loadingText = 'กำลังดำเนินการ...', 
  disabled,
  onClick,
  style = {},
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        opacity: (isLoading || disabled) ? 0.7 : 1,
        cursor: (isLoading || disabled) ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        ...style
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="#ffffff" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Skeleton Loader
export const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '0.25rem',
  style = {} 
}) => {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      
      <div style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#e5e7eb',
        background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style
      }} />
    </>
  );
};

// List Skeleton
export const ListSkeleton = ({ count = 3, gap = '1rem' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.75rem',
          padding: '1rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
            <Skeleton width="3rem" height="3rem" borderRadius="50%" />
            <div style={{ flex: 1 }}>
              <Skeleton height="1.25rem" style={{ marginBottom: '0.5rem' }} />
              <Skeleton width="60%" height="0.875rem" />
            </div>
          </div>
          <Skeleton height="0.875rem" />
        </div>
      ))}
    </div>
  );
};

export default {
  LoadingOverlay,
  LoadingSpinner,
  LoadingButton,
  Skeleton,
  ListSkeleton
};