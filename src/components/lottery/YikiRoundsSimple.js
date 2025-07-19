import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottery } from '../../context/LotteryContext';

const YikiRoundsSimple = () => {
  const navigate = useNavigate();
  const { selectedLotteryType, setSelectedLotteryType } = useLottery();
  
  // Generate simple rounds
  const generateSimpleRounds = () => {
    const rounds = [];
    const isYiki5Min = selectedLotteryType === 'หวยยี่กีห้านาที';
    const totalRounds = isYiki5Min ? 10 : 5; // แสดงแค่บางรอบ
    
    for (let i = 0; i < totalRounds; i++) {
      rounds.push({
        number: `รอบที่ ${i + 1}`,
        time: `${10 + i}:00 น.`,
        status: i === 0 ? 'กำลังรับแทง' : 'รอเปิดรับ'
      });
    }
    return rounds;
  };
  
  const rounds = generateSimpleRounds();

  const handleBack = () => {
    console.log('Back button clicked in YikiRounds');
    navigate('/results');
  };

  const handleBuy = (round) => {
    setSelectedLotteryType(`${selectedLotteryType} ${round.number}`);
    navigate('/buy');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header with back button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleBack}
          style={{
            padding: '10px 20px',
            backgroundColor: '#e5e7eb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          ← กลับ
        </button>
        
        <h1>{selectedLotteryType || 'หวยยี่กี'}</h1>
        <p>เลือกรอบที่ต้องการแทง</p>
      </div>

      {/* Rounds list */}
      <div style={{ display: 'grid', gap: '10px' }}>
        {rounds.map((round, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{round.number}</h3>
              <p style={{ margin: '0', color: '#6b7280' }}>
                เวลา: {round.time} | {round.status}
              </p>
            </div>
            
            {round.status === 'กำลังรับแทง' && (
              <button
                onClick={() => handleBuy(round)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                แทงเลย
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YikiRoundsSimple;