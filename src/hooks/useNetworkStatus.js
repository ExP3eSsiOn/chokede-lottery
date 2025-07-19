import { useState, useEffect } from 'react';
import { useToast } from '../components/common/Toast';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        toast.success('กลับมาออนไลน์แล้ว');
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      toast.error('ไม่มีการเชื่อมต่ออินเทอร์เน็ต', 0); // Duration 0 = persistent
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline, toast]);

  return { isOnline };
};

// Network Status Banner Component
export const NetworkStatusBanner = () => {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ef4444',
      color: '#ffffff',
      padding: '0.75rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    }}>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M1 1l22 22M9 9a3 3 0 114.2 4.2M5.8 5.8a7.5 7.5 0 0110.4 10.4M2 2a15 15 0 0120 20" />
      </svg>
      ไม่มีการเชื่อมต่ออินเทอร์เน็ต
    </div>
  );
};

export default useNetworkStatus;