import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { useLottery } from '../../context/LotteryContext';

const YikiSelectionPage = () => {
  const navigate = useNavigate();
  const { setSelectedLotteryType } = useLottery();
  const yikiTypes = [
    {
      name: 'หวยยี่กีห้านาที',
      rounds: 264,
      interval: '5 นาที',
      icon: 'ยี่กี',
      roundText: '264',
      bgColor: '#FFC107',
      description: 'ออกผลทุก 5 นาที ตลอด 24 ชั่วโมง'
    },
    {
      name: 'หวยยี่กี',
      rounds: 88,
      interval: '15 นาที',
      icon: 'ยี่กี',
      roundText: '88',
      bgColor: '#DC3545',
      description: 'ออกผลทุก 15 นาที ตลอด 24 ชั่วโมง'
    }
  ];

  const handleSelectType = (type) => {
    console.log('Selecting type:', type.name);
    setSelectedLotteryType(type.name);
    console.log('Navigating to /yiki/rounds');
    navigate('/yiki/rounds');
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 60px - 70px)',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Back button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log('Back button clicked');
          navigate(-1); // ใช้ -1 เพื่อกลับไปหน้าก่อนหน้า
        }}
        style={{
          backgroundColor: '#f3f4f6',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          color: '#374151',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#e5e7eb';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
      >
        ← กลับ
      </button>

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          ⚡ หวยยี่กี
        </h1>
        <p style={{
          color: '#6b7280',
          fontSize: '16px'
        }}>
          เลือกประเภทหวยยี่กีที่ต้องการแทง
        </p>
      </div>

      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {yikiTypes.map((type, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '12px'
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
                backgroundColor: type.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'white'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{type.icon}</div>
                  <div style={{ fontSize: '12px' }}>{type.roundText}</div>
                </div>
              </div>
              
              {/* Title */}
              <div style={{ 
                flex: 1,
                backgroundColor: type.bgColor,
                color: 'white',
                padding: '12px 20px',
                borderRadius: '25px',
                fontSize: '18px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                {type.name}
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
                  fontSize: '14px'
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
                onClick={() => handleSelectType(type)}
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
              >
                แทงเลย
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YikiSelectionPage;