import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottery } from '../../context/LotteryContext';

const YikiDebug = () => {
  const navigate = useNavigate();
  const { setSelectedLotteryType } = useLottery();

  const handleTestNavigation = () => {
    console.log('Testing navigation to /yiki/rounds');
    setSelectedLotteryType('หวยยี่กี');
    navigate('/yiki/rounds');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2>Debug Panel</h2>
      <button 
        onClick={handleTestNavigation}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Navigate to Yiki Rounds
      </button>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default YikiDebug;