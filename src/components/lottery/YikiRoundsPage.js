import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ShoppingCart, ChevronLeft } from 'lucide-react';
import { useLottery } from '../../context/LotteryContext';

const YikiRoundsPage = () => {
  const navigate = useNavigate();
  const { selectedLotteryType, setSelectedLotteryType } = useLottery();
  const [countdowns, setCountdowns] = useState({});
  const today = new Date();
  
  // Determine interval and total rounds based on type
  const isYiki5Min = selectedLotteryType === 'หวยยี่กีห้านาที';
  const intervalMinutes = isYiki5Min ? 5 : 15;
  const totalRounds = isYiki5Min ? 264 : 88;
  
  // Generate rounds
  const generateRounds = () => {
    const rounds = [];
    const now = new Date();
    const baseTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0);
    
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
        status: status,
        roundNumber: roundNumber
      });
    }
    
    return rounds;
  };
  
  const rounds = generateRounds();
  
  // Update countdowns
  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns = {};
      const now = new Date();
      
      rounds.forEach((round) => {
        if (round.status === 'waiting') {
          const diff = round.drawDate - now;
          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            newCountdowns[round.roundNumber] = { hours, minutes, seconds };
          }
        }
      });
      
      setCountdowns(newCountdowns);
    };
    
    updateCountdowns();
    const timer = setInterval(updateCountdowns, 1000);
    return () => clearInterval(timer);
  }, [rounds]);
  
  const formatCountdown = (countdown) => {
    if (!countdown) return '';
    return `${String(countdown.hours).padStart(2, '0')}:${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`;
  };
  
  const handleBuyLottery = (round) => {
    setSelectedLotteryType(`${selectedLotteryType} ${round.name}`);
    navigate('/buy');
  };
  
  // Find current round
  const now = new Date();
  const currentRoundIndex = rounds.findIndex(round => round.drawDate > now) - 1;
  
  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 60px - 70px)',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          onClick={() => navigate('/yiki/selection')}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            {selectedLotteryType}
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: '4px 0 0 0'
          }}>
            เลือกรอบที่ต้องการแทง
          </p>
        </div>
        
        <div style={{
          backgroundColor: isYiki5Min ? '#fce7f3' : '#ede9fe',
          color: isYiki5Min ? '#be185d' : '#7c3aed',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {totalRounds} รอบ/วัน
        </div>
      </div>
      
      {/* Current Round Highlight */}
      {currentRoundIndex >= 0 && currentRoundIndex < rounds.length && (
        <div style={{
          backgroundColor: '#fef3c7',
          border: '2px solid #fbbf24',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>🎯</span>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '4px'
            }}>
              รอบปัจจุบัน: รอบ {currentRoundIndex + 1}/{totalRounds}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#78350f'
            }}>
              กำลังรับแทง - ปิดรับเวลา {rounds[currentRoundIndex + 1]?.drawTime} น.
            </p>
          </div>
        </div>
      )}
      
      {/* Rounds Grid */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '12px',
          maxHeight: '500px',
          overflowY: 'auto',
          padding: '4px'
        }}>
          {rounds.map((round, idx) => {
            const isCurrentRound = idx === currentRoundIndex + 1;
            const countdown = countdowns[round.roundNumber];
            
            return (
              <div
                key={idx}
                style={{
                  border: `2px solid ${round.status === 'announced' ? '#10b981' : isCurrentRound ? '#fbbf24' : '#e5e7eb'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  backgroundColor: round.status === 'announced' ? '#f0fdf4' : isCurrentRound ? '#fef3c7' : '#ffffff',
                  transition: 'all 0.2s',
                  cursor: round.status === 'waiting' ? 'pointer' : 'default'
                }}
                onMouseOver={(e) => {
                  if (round.status === 'waiting') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '4px'
                }}>
                  {round.name}
                </div>
                
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={12} />
                  {round.drawTime} น.
                </div>
                
                {round.status === 'announced' ? (
                  <div style={{
                    fontSize: '11px',
                    color: '#059669',
                    fontWeight: '500',
                    textAlign: 'center',
                    padding: '4px',
                    backgroundColor: '#d1fae5',
                    borderRadius: '4px'
                  }}>
                    ประกาศผลแล้ว
                  </div>
                ) : (
                  <>
                    {countdown && (
                      <div style={{
                        fontSize: '11px',
                        color: '#dc2626',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: '8px',
                        backgroundColor: '#fee2e2',
                        padding: '4px',
                        borderRadius: '4px'
                      }}>
                        {formatCountdown(countdown)}
                      </div>
                    )}
                    <button
                      onClick={() => handleBuyLottery(round)}
                      style={{
                        width: '100%',
                        padding: '6px',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b82f6';
                      }}
                    >
                      <ShoppingCart size={14} />
                      แทง
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YikiRoundsPage;