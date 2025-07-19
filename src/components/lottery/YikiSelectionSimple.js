import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottery } from '../../context/LotteryContext';

const YikiSelectionSimple = () => {
  const navigate = useNavigate();
  const { setSelectedLotteryType } = useLottery();

  const yikiTypes = [
    { name: 'หวยยี่กีห้านาที', interval: '5 นาที' },
    { name: 'หวยยี่กี', interval: '15 นาที' }
  ];

  const handleSelect = (typeName) => {
    console.log('Selected:', typeName);
    setSelectedLotteryType(typeName);
    navigate('/yiki/rounds');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => navigate('/results')}
        style={{ 
          padding: '10px 20px', 
          marginBottom: '20px',
          backgroundColor: '#e5e7eb',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← กลับ
      </button>

      <h1>เลือกประเภทหวยยี่กี</h1>

      {yikiTypes.map((type, index) => (
        <div 
          key={index}
          style={{ 
            border: '1px solid #ccc', 
            padding: '20px', 
            marginBottom: '10px',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}
        >
          <h3>{type.name}</h3>
          <p>ออกผลทุก {type.interval}</p>
          <button 
            onClick={() => handleSelect(type.name)}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#28A745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            แทงเลย
          </button>
        </div>
      ))}
    </div>
  );
};

export default YikiSelectionSimple;