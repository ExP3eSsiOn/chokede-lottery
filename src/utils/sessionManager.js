// Session Management Utilities

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before timeout
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart'];

class SessionManager {
  constructor() {
    this.timeout = null;
    this.warningTimeout = null;
    this.lastActivity = Date.now();
    this.onTimeout = null;
    this.onWarning = null;
    this.isActive = false;
  }

  start(onTimeout, onWarning) {
    if (this.isActive) return;
    
    this.onTimeout = onTimeout;
    this.onWarning = onWarning;
    this.isActive = true;
    this.lastActivity = Date.now();
    
    // Add activity listeners
    ACTIVITY_EVENTS.forEach(event => {
      window.addEventListener(event, this.handleActivity, true);
    });
    
    this.resetTimer();
  }

  stop() {
    if (!this.isActive) return;
    
    this.isActive = false;
    this.clearTimers();
    
    // Remove activity listeners
    ACTIVITY_EVENTS.forEach(event => {
      window.removeEventListener(event, this.handleActivity, true);
    });
  }

  handleActivity = () => {
    this.lastActivity = Date.now();
    this.resetTimer();
  };

  resetTimer() {
    this.clearTimers();
    
    // Set warning timeout
    this.warningTimeout = setTimeout(() => {
      if (this.onWarning) {
        this.onWarning();
      }
    }, SESSION_TIMEOUT - WARNING_TIME);
    
    // Set session timeout
    this.timeout = setTimeout(() => {
      if (this.onTimeout) {
        this.onTimeout();
      }
      this.stop();
    }, SESSION_TIMEOUT);
  }

  clearTimers() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (this.warningTimeout) {
      clearTimeout(this.warningTimeout);
      this.warningTimeout = null;
    }
  }

  extendSession() {
    this.lastActivity = Date.now();
    this.resetTimer();
  }

  getTimeRemaining() {
    const elapsed = Date.now() - this.lastActivity;
    const remaining = SESSION_TIMEOUT - elapsed;
    return Math.max(0, remaining);
  }
}

// Create singleton instance
const sessionManager = new SessionManager();

// Session timeout warning modal component
export const SessionTimeoutModal = ({ isVisible, onExtend, onLogout, timeRemaining }) => {
  if (!isVisible) return null;

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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
        zIndex: 10000,
        animation: 'fadeIn 0.3s ease-out',
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '24rem',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>⏰</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              เซสชันกำลังจะหมดอายุ
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              ระบบจะออกจากระบบอัตโนมัติใน
            </p>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#ef4444',
              margin: '1rem 0'
            }}>
              {formatTime(timeRemaining)}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '0.75rem'
          }}>
            <button
              onClick={onLogout}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                color: '#6b7280',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffffff';
              }}
            >
              ออกจากระบบ
            </button>
            <button
              onClick={onExtend}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: 'none',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#2563eb';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
              }}
            >
              ใช้งานต่อ
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// React hook for session management
export const useSessionManager = (onTimeout, onWarning) => {
  const extendSession = () => {
    sessionManager.extendSession();
  };

  return {
    startSession: () => sessionManager.start(onTimeout, onWarning),
    stopSession: () => sessionManager.stop(),
    extendSession,
    getTimeRemaining: () => sessionManager.getTimeRemaining()
  };
};

export default sessionManager;