import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Calendar, ShoppingCart, Search } from 'lucide-react';
import { useLottery } from '../../context/LotteryContext';
import { LOTTERY_CATEGORIES } from '../../utils/constants';
import '../../styles/ResultsPage.css';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { setSelectedLotteryType } = useLottery();
  const today = new Date();
  const todayStr = today.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // State for countdown timers
  const [countdowns, setCountdowns] = useState({});
  
  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  
  // Function to generate Yiki lottery rounds
  const generateYikiRounds = (intervalMinutes, totalRounds) => {
    const rounds = [];
    const now = new Date();
    const baseTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0);
    
    // Generate all rounds for today
    for (let i = 0; i < totalRounds; i++) {
      const roundNumber = i + 1;
      const drawTime = new Date(baseTime.getTime() + (i * intervalMinutes * 60 * 1000));
      
      let status = 'waiting';
      if (drawTime < now) {
        status = 'announced';
      }
      
      rounds.push({
        name: `รอบ ${roundNumber}/${totalRounds}`,
        drawTime: drawTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        drawDate: drawTime,
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: status,
        roundNumber: roundNumber,
        ...(status === 'announced' && {
          lastUpdate: new Date(drawTime.getTime() + (2 * 60 * 1000)).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
          result: {
            firstPrize: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
            lastTwoDigits: Math.floor(Math.random() * 100).toString().padStart(2, '0'),
            firstThreeDigits: [Math.floor(Math.random() * 1000).toString().padStart(3, '0'), Math.floor(Math.random() * 1000).toString().padStart(3, '0')],
            lastThreeDigits: [Math.floor(Math.random() * 1000).toString().padStart(3, '0'), Math.floor(Math.random() * 1000).toString().padStart(3, '0')]
          }
        })
      });
    }
    
    return rounds;
  };

  // Mock data สำหรับผลรางวัลของวันนี้
  const todayResults = {
    'หวยไทย': [
      {
        name: 'หวยรัฐบาลไทย',
        drawTime: '16:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '16:05',
        result: {
          firstPrize: '847329',
          lastTwoDigits: '34',
          firstThreeDigits: ['234', '567'],
          lastThreeDigits: ['456', '789']
        }
      },
      {
        name: 'หวยออมสิน',
        drawTime: '16:30',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 30),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      },
      {
        name: 'หวย ธ.ก.ส.',
        drawTime: '17:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      }
    ],
    'หวยลาว': [
      {
        name: 'หวยลาวพัฒนา',
        drawTime: '20:30',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 30),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      },
      {
        name: 'หวยลาววิพากษ์',
        drawTime: '21:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      },
      {
        name: 'หวยลาวเคนโซ',
        drawTime: '21:30',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 30),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      }
    ],
    'หวยฮานอย': [
      {
        name: 'หวยฮานอยพิเศษ',
        drawTime: '17:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '17:05',
        result: {
          specialPrize: '12345',
          firstPrize: '67890',
          twoDigits: '45',
          threeDigits: '890'
        }
      },
      {
        name: 'หวยฮานอยปกติ',
        drawTime: '18:15',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 15),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      },
      {
        name: 'หวยฮานอย VIP',
        drawTime: '19:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      }
    ],
    'หวยหุ้น': [
      {
        name: 'หวยหุ้นไทยเช้า',
        drawTime: '10:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '10:05',
        result: {
          market: 'SET',
          closing: '1,456.78',
          change: '+12.34',
          twoDigits: '78',
          threeDigits: '678'
        }
      },
      {
        name: 'หวยหุ้นไทยเย็น',
        drawTime: '16:40',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 40),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '16:45',
        result: {
          market: 'SET',
          closing: '1,465.23',
          change: '+8.45',
          twoDigits: '23',
          threeDigits: '523'
        }
      },
      {
        name: 'หวยหุ้นไทยไนท์',
        drawTime: '22:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'waiting',
        result: null
      }
    ],
    'หวยหุ้นต่างประเทศ': [
      {
        name: 'หวยนิเคอิ',
        drawTime: '09:30',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '09:35',
        result: {
          market: 'NIKKEI',
          closing: '28,765.43',
          change: '-123.45',
          twoDigits: '43',
          threeDigits: '543'
        }
      },
      {
        name: 'หวยดาวโจนส์',
        drawTime: '05:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 5, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '05:05',
        result: {
          market: 'DOW JONES',
          closing: '35,432.10',
          change: '+234.56',
          twoDigits: '10',
          threeDigits: '210'
        }
      },
      {
        name: 'หวยฮั่งเส็ง',
        drawTime: '11:00',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '11:05',
        result: {
          market: 'HANG SENG',
          closing: '18,234.56',
          change: '-89.12',
          twoDigits: '56',
          threeDigits: '456'
        }
      },
      {
        name: 'หวยจีน',
        drawTime: '10:30',
        drawDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
        drawDateStr: today.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        status: 'announced',
        lastUpdate: '10:35',
        result: {
          market: 'SHANGHAI',
          closing: '3,123.45',
          change: '+15.67',
          twoDigits: '45',
          threeDigits: '345'
        }
      }
    ],
    'หวยยี่กี': generateYikiRounds(15, 88),
    'หวยยี่กี 5 นาที': generateYikiRounds(5, 264)
  };

  // Calculate countdown
  const calculateCountdown = (drawDate) => {
    const now = new Date();
    const diff = drawDate - now;
    
    if (diff <= 0) return null;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
  };

  // Update countdowns every second
  useEffect(() => {
    const updateAllCountdowns = () => {
      const newCountdowns = {};
      
      Object.entries(todayResults).forEach(([category, lotteries]) => {
        lotteries.forEach((lottery) => {
          if (lottery.status === 'waiting' && lottery.drawDate) {
            const countdown = calculateCountdown(lottery.drawDate);
            if (countdown) {
              newCountdowns[`${category}-${lottery.name}`] = countdown;
            }
          }
        });
      });
      
      setCountdowns(newCountdowns);
    };

    updateAllCountdowns();
    const timer = setInterval(updateAllCountdowns, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle buy lottery
  const handleBuyLottery = (lotteryName) => {
    setSelectedLotteryType(lotteryName);
    navigate('/buy');
  };
  
  // Handle Yiki category click
  const handleYikiCategoryClick = () => {
    navigate('/yiki/selection');
  };

  // Format countdown display
  const formatCountdown = (countdown) => {
    if (!countdown) return '';
    return `${String(countdown.hours).padStart(2, '0')}:${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`;
  };

  // เรียงลำดับหวยที่ออกผลแล้วขึ้นก่อน
  const sortLotteryByStatus = (lotteries) => {
    const statusOrder = { 'announced': 0, 'live': 1, 'waiting': 2 };
    return [...lotteries].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
  };

  const getStatusBadge = (status, lottery, category) => {
    switch (status) {
      case 'announced':
        return <span className="status-badge announced">ประกาศผลแล้ว</span>;
      case 'live':
        return <span className="status-badge live">กำลังออกผล</span>;
      case 'waiting':
        const countdownKey = `${category}-${lottery.name}`;
        const countdown = countdowns[countdownKey];
        return (
          <div className="status-waiting">
            <span className="status-badge waiting">รอผล</span>
            {countdown && (
              <span className="countdown-timer">
                <Clock size={14} />
                {formatCountdown(countdown)}
              </span>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const renderThaiResult = (result) => (
    <div className="result-content thai">
      <div className="main-number">
        <span className="label">รางวัลที่ 1</span>
        <span className="number">{result.firstPrize}</span>
      </div>
      <div className="sub-numbers">
        <div className="number-group">
          <span className="label">2 ตัวล่าง</span>
          <span className="number small">{result.lastTwoDigits}</span>
        </div>
        <div className="number-group">
          <span className="label">3 ตัวหน้า</span>
          <div className="number-list">
            {result.firstThreeDigits.map((num, idx) => (
              <span key={idx} className="number small">{num}</span>
            ))}
          </div>
        </div>
        <div className="number-group">
          <span className="label">3 ตัวหลัง</span>
          <div className="number-list">
            {result.lastThreeDigits.map((num, idx) => (
              <span key={idx} className="number small">{num}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHanoiResult = (result) => (
    <div className="result-content hanoi">
      <div className="main-number">
        <span className="label">รางวัลพิเศษ</span>
        <span className="number">{result.specialPrize}</span>
      </div>
      <div className="sub-numbers">
        <div className="number-group">
          <span className="label">รางวัลที่ 1</span>
          <span className="number medium">{result.firstPrize}</span>
        </div>
        <div className="number-group">
          <span className="label">2 ตัว</span>
          <span className="number small">{result.twoDigits}</span>
        </div>
        <div className="number-group">
          <span className="label">3 ตัว</span>
          <span className="number small">{result.threeDigits}</span>
        </div>
      </div>
    </div>
  );

  const renderStockResult = (result) => (
    <div className="result-content stock">
      <div className="market-info-compact">
        <span className="market-name">{result.market}</span>
        <span className={`market-change ${result.change.startsWith('+') ? 'positive' : 'negative'}`}>
          {result.change}
        </span>
      </div>
      <div className="stock-numbers">
        <div className="number-group">
          <span className="label">ค่าปิด</span>
          <span className="closing">{result.closing}</span>
        </div>
        <div className="number-group">
          <span className="label">2 ตัว</span>
          <span className="number medium">{result.twoDigits}</span>
        </div>
        <div className="number-group">
          <span className="label">3 ตัว</span>
          <span className="number medium">{result.threeDigits}</span>
        </div>
      </div>
    </div>
  );

  const renderResult = (lottery, categoryName) => {
    if (!lottery.result) return null;
    
    if (categoryName === 'หวยไทย' || categoryName === 'หวยยี่กี') {
      return renderThaiResult(lottery.result);
    } else if (categoryName === 'หวยฮานอย') {
      return renderHanoiResult(lottery.result);
    } else if (categoryName === 'หวยหุ้น' || categoryName === 'หวยหุ้นต่างประเทศ') {
      return renderStockResult(lottery.result);
    }
    return renderThaiResult(lottery.result);
  };
  
  // Filter lotteries based on search
  const filterLotteries = (lotteries) => {
    if (!searchQuery) return lotteries;
    return lotteries.filter(lottery => 
      lottery.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="results-page">
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="ค้นหาหวย..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="results-container">
        {Object.entries(LOTTERY_CATEGORIES).map(([categoryName, categoryData]) => {
          // แสดงเฉพาะหวยยี่กี
          if (categoryName !== 'หวยยี่กี') return null;
          
          // สำหรับหวยยี่กี แสดงเฉพาะกลุ่ม
          
          return (
            <div key={categoryName} className={`category-section ${categoryName === 'หวยยี่กี' ? 'yiki-category' : categoryName === 'หวยยี่กี 5 นาที' ? 'yiki-5min-category' : ''}`}>
              <div 
                className="category-header"
                onClick={categoryName === 'หวยยี่กี' ? handleYikiCategoryClick : undefined}
                style={categoryName === 'หวยยี่กี' ? { cursor: 'pointer' } : {}}
              >
                <div className="category-title">
                  <span className="category-icon">{categoryData.icon}</span>
                  <h2>{categoryName}</h2>
                </div>
                <span className="lottery-count">{LOTTERY_CATEGORIES['หวยยี่กี'].types.length} รายการ</span>
              </div>
              
              <div className="lottery-list" style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                {LOTTERY_CATEGORIES['หวยยี่กี'].types.map((type, idx) => {
                  const isYiki5Min = type === 'หวยยี่กี 5 นาที';
                  const bgColor = isYiki5Min ? '#FFC107' : '#DC3545';
                  
                  return (
                    <div 
                      key={idx}
                      onClick={handleYikiCategoryClick}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* Icon */}
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          backgroundColor: bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <div style={{ textAlign: 'center', color: 'white' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>ยี่กี</div>
                            <div style={{ fontSize: '12px' }}>{isYiki5Min ? '264' : '88'}</div>
                          </div>
                        </div>
                        
                        {/* Title */}
                        <div style={{ 
                          flex: 1,
                          backgroundColor: bgColor,
                          color: 'white',
                          padding: '12px 20px',
                          borderRadius: '25px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                          {type}
                        </div>
                      </div>
                      
                      {/* Bottom info */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid #f0f0f0'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{
                            backgroundColor: '#2C3E50',
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            📅 18/07/68
                          </div>
                          <div style={{
                            padding: '6px 16px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '20px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            กติกา
                          </div>
                          <div style={{
                            color: '#28A745',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            ✓ 24 ชม.
                          </div>
                        </div>
                        
                        <button
                          style={{
                            backgroundColor: '#28A745',
                            color: 'white',
                            border: 'none',
                            padding: '10px 30px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#218838';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#28A745';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleYikiCategoryClick();
                          }}
                        >
                          แทงเลย
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* No results message */}
      {searchQuery && Object.entries(LOTTERY_CATEGORIES).every(([categoryName]) => {
        const lotteries = todayResults[categoryName] || [];
        return filterLotteries(lotteries).length === 0;
      }) && (
        <div className="no-results">
          <p>ไม่พบหวยที่ค้นหา "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;