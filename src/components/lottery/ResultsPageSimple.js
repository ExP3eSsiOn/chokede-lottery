import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottery } from '../../context/LotteryContext';
import { useAuth } from '../../context/AuthContext';
import { getLotteryCategories } from '../../utils/constants';

const ResultsPageSimple = () => {
  const navigate = useNavigate();
  const { setSelectedLotteryType } = useLottery();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [lotteryCategories, setLotteryCategories] = React.useState(getLotteryCategories());
  
  // Debug
  React.useEffect(() => {
    console.log('ResultsPageSimple - Current user:', user);
  }, [user]);
  
  // Refresh lottery categories when component gains focus
  React.useEffect(() => {
    const handleFocus = () => {
      setLotteryCategories(getLotteryCategories());
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleBuyClick = (lotteryType) => {
    setSelectedLotteryType(lotteryType);
    navigate('/buy');
  };

  // Mock data สำหรับเลขเด็ด
  const hotNumbers = {
    '2ตัว': ['45', '78', '23', '56'],
    '3ตัว': ['123', '456', '789', '234']
  };

  // ฟังก์ชันคำนวณเวลาที่เหลือ
  const getTimeRemaining = (closeTime) => {
    const now = new Date();
    const [hours, minutes] = closeTime.split(':').map(Number);
    const closeDate = new Date();
    closeDate.setHours(hours, minutes, 0, 0);
    
    // ถ้าเวลาปิดผ่านไปแล้ววันนี้ ให้เป็นวันพรุ่งนี้
    if (closeDate <= now) {
      closeDate.setDate(closeDate.getDate() + 1);
    }
    
    const diff = closeDate - now;
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
    
    return {
      totalMinutes: Math.floor(diff / (1000 * 60)),
      display: `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`
    };
  };

  // ดึงหวยที่กำลังจะปิดรับจากข้อมูลจริง (ยกเว้นหวยยี่กี)
  const getClosingSoonLotteries = () => {
    const allLotteries = [];
    
    Object.entries(lotteryCategories).forEach(([category, data]) => {
      if (category !== 'หวยยี่กี') {
        data.types.forEach(lottery => {
          // ตรวจสอบว่ามี drawTime หรือไม่
          if (lottery.drawTime) {
            // แยกเวลาจาก drawTime (เช่น "14:30 น." -> "14:30")
            const timeMatch = lottery.drawTime.match(/(\d{1,2}:\d{2})/);
            if (timeMatch) {
            const closeTime = timeMatch[1];
            const timeRemaining = getTimeRemaining(closeTime);
            
            allLotteries.push({
              name: lottery.name,
              category: category,
              closeTime: closeTime,
              timeRemaining: timeRemaining,
              color: category === 'หวยไทย' ? '#dc2626' : 
                     category === 'หวยลาว' ? '#2563eb' :
                     category === 'หวยฮานอย' ? '#be185d' : '#059669'
            });
            }
          }
        });
      }
    });
    
    // เรียงตามเวลาที่เหลือน้อยไปมาก และเอาแค่ 3 อันดับแรก
    return allLotteries
      .sort((a, b) => a.timeRemaining.totalMinutes - b.timeRemaining.totalMinutes)
      .slice(0, 3);
  };

  const closingSoon = getClosingSoonLotteries();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        color: 'white',
        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
      }}>
        <h1 style={{ 
          margin: '0 0 15px 0',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          🎯 แทงหวยออนไลน์
        </h1>
        
        {/* หวยที่กำลังจะปิดรับ */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '15px',
          marginBottom: '15px'
        }}>
          <h3 style={{ 
            margin: '0 0 10px 0',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⏰ กำลังจะปิดรับ
          </h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {closingSoon.map((lottery, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 12px',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '14px' }}>{lottery.name}</span>
                <span style={{
                  color: lottery.timeRemaining.totalMinutes < 30 ? '#fbbf24' : '#ffffff',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {lottery.timeRemaining.display}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* เลขเด็ดประจำวัน */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '15px'
        }}>
          <h3 style={{ 
            margin: '0 0 10px 0',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🔥 เลขเด็ดประจำวัน
          </h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '14px', opacity: 0.8 }}>2 ตัว: </span>
              {hotNumbers['2ตัว'].map((num, i) => (
                <span key={i} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  marginLeft: '5px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {num}
                </span>
              ))}
            </div>
            <div>
              <span style={{ fontSize: '14px', opacity: 0.8 }}>3 ตัว: </span>
              {hotNumbers['3ตัว'].map((num, i) => (
                <span key={i} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  marginLeft: '5px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* สถิติและข้อมูลน่าสนใจ */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '10px',
        marginBottom: '20px'
      }}>
        <div style={{
          backgroundColor: '#fef3c7',
          borderRadius: '12px',
          padding: '15px',
          textAlign: 'center',
          border: '2px solid #fde68a'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>🏆</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#d97706' }}>2.5M</div>
          <div style={{ fontSize: '12px', color: '#92400e' }}>รางวัลสูงสุดวันนี้</div>
        </div>
        
        <div style={{
          backgroundColor: '#dbeafe',
          borderRadius: '12px',
          padding: '15px',
          textAlign: 'center',
          border: '2px solid #bfdbfe'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>👥</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1d4ed8' }}>1,234</div>
          <div style={{ fontSize: '12px', color: '#1e3a8a' }}>คนกำลังแทง</div>
        </div>
        
        <div style={{
          backgroundColor: '#d1fae5',
          borderRadius: '12px',
          padding: '15px',
          textAlign: 'center',
          border: '2px solid #a7f3d0'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>💰</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#047857' }}>89%</div>
          <div style={{ fontSize: '12px', color: '#064e3b' }}>จ่ายรางวัลแล้ววันนี้</div>
        </div>
      </div>

      {/* Search Box */}
      <div style={{
        marginBottom: '20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{
            position: 'absolute',
            left: '15px',
            fontSize: '20px',
            color: '#6b7280'
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="ค้นหาหวย... (เช่น หวยไทย, ยี่กี, ฮานอย)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 15px 12px 45px',
              fontSize: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              outline: 'none',
              transition: 'all 0.2s',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#6b7280',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              ✕
            </button>
          )}
        </div>
        
        {/* แสดงจำนวนผลการค้นหา */}
        {searchQuery && (
          <div style={{
            marginTop: '10px',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            {(() => {
              let count = 0;
              Object.entries(lotteryCategories).forEach(([category, data]) => {
                data.types.forEach(lottery => {
                  if (lottery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      category.toLowerCase().includes(searchQuery.toLowerCase())) {
                    count++;
                  }
                });
              });
              return `พบ ${count} รายการ`;
            })()}
          </div>
        )}
      </div>

      {/* Quick Menu */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: user?.role === 'admin' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', 
        gap: '10px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => navigate('/tickets')}
          style={{
            backgroundColor: 'white',
            border: '2px solid #3b82f6',
            borderRadius: '12px',
            padding: '15px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#eff6ff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{ fontSize: '24px' }}>📋</span>
          <span style={{ fontWeight: 'bold', color: '#1f2937' }}>โพยหวย</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>ตรวจสอบตั๋วที่ซื้อ</span>
        </button>
        
        <button
          onClick={() => navigate('/tickets?tab=history')}
          style={{
            backgroundColor: 'white',
            border: '2px solid #10b981',
            borderRadius: '12px',
            padding: '15px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ecfdf5';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{ fontSize: '24px' }}>📊</span>
          <span style={{ fontWeight: 'bold', color: '#1f2937' }}>ประวัติการแทง</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>ดูประวัติทั้งหมด</span>
        </button>
        
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            style={{
              backgroundColor: 'white',
              border: '2px solid #8b5cf6',
              borderRadius: '12px',
              padding: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f3e8ff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '24px' }}>⚙️</span>
            <span style={{ fontWeight: 'bold', color: '#1f2937' }}>จัดการหวย</span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>เพิ่ม/ลบหวย</span>
          </button>
        )}
      </div>
      
      {/* หวยยี่กี Section - แสดงเฉพาะเมื่อไม่มีการค้นหาหรือตรงกับคำค้นหา */}
      {(!searchQuery || 'หวยยี่กี'.includes(searchQuery.toLowerCase()) || 
        'ยี่กี'.includes(searchQuery.toLowerCase())) && (
      <div style={{ 
        marginBottom: '20px',
        backgroundColor: '#fff7ed',
        border: '2px solid #fed7aa',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(251, 146, 60, 0.1)'
      }}>
        <h2 style={{ 
          margin: '0 0 15px 0',
          color: '#ea580c',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🎯 หวยยี่กี
        </h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          {/* หวยยี่กี 5 นาที */}
          <div style={{ 
            border: '1px solid #e5e7eb', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>หวยยี่กีห้านาที</h3>
              <p style={{ margin: 0, color: '#6b7280' }}>ออกผลทุก 5 นาที (264 รอบ/วัน)</p>
            </div>
            <button
              onClick={() => {
                setSelectedLotteryType('หวยยี่กีห้านาที');
                navigate('/yiki/rounds');
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ดูรอบ
            </button>
          </div>
          
          {/* หวยยี่กี 15 นาที */}
          <div style={{ 
            border: '1px solid #e5e7eb', 
            padding: '15px', 
            borderRadius: '8px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>หวยยี่กี</h3>
              <p style={{ margin: 0, color: '#6b7280' }}>ออกผลทุก 15 นาที (88 รอบ/วัน)</p>
            </div>
            <button
              onClick={() => {
                setSelectedLotteryType('หวยยี่กี');
                navigate('/yiki/rounds');
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ดูรอบ
            </button>
          </div>
        </div>
      </div>
      )}

      {/* หวยอื่นๆ */}
      {Object.entries(lotteryCategories).map(([category, data]) => {
        if (category === 'หวยยี่กี') return null;
        
        // กรองตามคำค้นหา
        if (searchQuery) {
          const hasMatch = data.types.some(lottery => 
            lottery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (!hasMatch) return null;
        }
        
        // กำหนดสีและ icon สำหรับแต่ละกลุ่ม
        const categoryStyles = {
          'หวยไทย': {
            bgColor: '#fef3c7',
            borderColor: '#fde68a',
            textColor: '#d97706',
            icon: '🇹🇭'
          },
          'หวยลาว': {
            bgColor: '#dbeafe',
            borderColor: '#bfdbfe',
            textColor: '#1d4ed8',
            icon: '🇱🇦'
          },
          'หวยฮานอย': {
            bgColor: '#fce7f3',
            borderColor: '#fbcfe8',
            textColor: '#be185d',
            icon: '🇻🇳'
          },
          'หวยหุ้นไทย': {
            bgColor: '#d1fae5',
            borderColor: '#a7f3d0',
            textColor: '#047857',
            icon: '📈'
          },
          'หวยหุ้นต่างประเทศ': {
            bgColor: '#e9d5ff',
            borderColor: '#d8b4fe',
            textColor: '#7c3aed',
            icon: '🌏'
          }
        };
        
        const style = categoryStyles[category] || {
          bgColor: '#f3f4f6',
          borderColor: '#e5e7eb',
          textColor: '#374151',
          icon: '📊'
        };
        
        return (
          <div key={category} style={{ 
            marginBottom: '20px',
            backgroundColor: style.bgColor,
            border: `2px solid ${style.borderColor}`,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ 
              margin: '0 0 15px 0',
              color: style.textColor,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              {style.icon} {category}
            </h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              {data.types.filter(lottery => {
                if (!searchQuery) return true;
                return lottery.name.toLowerCase().includes(searchQuery.toLowerCase());
              }).map((lottery) => (
                <div 
                  key={lottery.name}
                  style={{ 
                    border: `1px solid ${style.borderColor}`, 
                    padding: '15px', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>{lottery.name}</h3>
                    <p style={{ margin: 0, color: '#6b7280' }}>{lottery.drawTime}</p>
                  </div>
                  <button
                    onClick={() => handleBuyClick(lottery.name)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: style.textColor,
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    ซื้อหวย
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsPageSimple;