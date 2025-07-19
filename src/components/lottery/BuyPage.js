import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLottery } from '../../context/LotteryContext';
import { LOTTERY_CATEGORIES, BET_CATEGORIES } from '../../utils/constants';
import '../../styles/BuyPage.css';

const BuyPage = () => {
  const navigate = useNavigate();
  const { selectedCategory, selectedLotteryType } = useLottery();
  const { balance, updateBalance } = useAuth();
  
  // Betting states
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [betAmount, setBetAmount] = useState('');
  const [betType, setBetType] = useState('3ตัวบน');
  const [betCategory, setBetCategory] = useState('เลข 3 ตัว');
  const [currentNumber, setCurrentNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Functions
  const addNumber = (digit) => {
    const maxLength = BET_CATEGORIES[betCategory].maxDigits;
    if (currentNumber.length < maxLength) {
      setCurrentNumber(currentNumber + digit);
    }
  };

  const clearNumber = () => {
    setCurrentNumber('');
  };

  const deleteLastDigit = () => {
    setCurrentNumber(currentNumber.slice(0, -1));
  };

  const addToBet = () => {
    if (!currentNumber || !betAmount) {
      alert('กรุณากรอกเลขและจำนวนเงิน');
      return;
    }

    if (currentNumber.length !== BET_CATEGORIES[betCategory].maxDigits) {
      alert(`กรุณากรอกเลข ${BET_CATEGORIES[betCategory].maxDigits} หลัก`);
      return;
    }

    if (parseInt(betAmount) < 10) {
      alert('จำนวนเงินขั้นต่ำ 10 บาท');
      return;
    }

    const newBet = {
      number: currentNumber,
      category: betCategory,
      type: betType,
      amount: parseInt(betAmount),
      id: Date.now()
    };

    setSelectedNumbers([...selectedNumbers, newBet]);
    setCurrentNumber('');
    setBetAmount('');
    
    // Show success feedback
    const button = document.querySelector('.add-bet-btn');
    if (button) {
      button.style.background = '#10b981';
      button.textContent = 'เพิ่มแล้ว ✓';
      setTimeout(() => {
        button.style.background = '#3b82f6';
        button.textContent = 'เพิ่มลงโพย';
      }, 1000);
    }
  };

  const removeBet = (id) => {
    setSelectedNumbers(selectedNumbers.filter(bet => bet.id !== id));
  };

  const getTotalAmount = () => {
    return selectedNumbers.reduce((sum, bet) => sum + bet.amount, 0);
  };

  const handlePlaceBet = async () => {
    if (selectedNumbers.length === 0) {
      alert('กรุณาเลือกเลขที่ต้องการแทง');
      return;
    }

    const totalAmount = getTotalAmount();
    if (totalAmount > balance) {
      alert('ยอดเงินไม่เพียงพอ');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update balance (mock)
      const newBalance = balance - totalAmount;
      updateBalance();
      
      // Clear bets
      setSelectedNumbers([]);
      
      alert(`แทงหวยสำเร็จ!\nยอดรวม: ${totalAmount.toLocaleString()} บาท\nยอดเงินคงเหลือ: ${newBalance.toLocaleString()} บาท`);
      
    } catch (error) {
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .processing { animation: pulse 1s infinite; }
      `}</style>

      <div style={{
        padding: '1rem 0 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {/* Header - ปรับให้อ่านง่าย */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '1rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: `linear-gradient(135deg, ${LOTTERY_CATEGORIES[selectedCategory].color.replace('from-', '').replace(' to-', ', ')})`,
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              {LOTTERY_CATEGORIES[selectedCategory].icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
                {selectedCategory}
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e293b' }}>
                {selectedLotteryType}
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e2e8f0';
                e.target.style.borderColor = '#94a3b8';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f1f5f9';
                e.target.style.borderColor = '#cbd5e1';
              }}
            >
              เปลี่ยน
            </button>
          </div>
        </div>

        {/* Main Betting Interface - พื้นหลังขาวอ่านง่าย */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem', 
            color: '#1e293b',
            borderBottom: '2px solid #f1f5f9',
            paddingBottom: '0.75rem'
          }}>
            🎯 เลือกเลขและราคา
          </h2>
          
          {/* Number Display - ปรับสีให้เห็นชัด */}
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            border: '2px solid #e2e8f0',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#64748b', 
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              เลขที่เลือก ({betCategory})
            </div>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#1e293b', 
              minHeight: '3rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              letterSpacing: '0.25rem'
            }}>
              {currentNumber || '0'.repeat(BET_CATEGORIES[betCategory].maxDigits)}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#94a3b8', 
              marginTop: '0.5rem',
              fontWeight: '500'
            }}>
              {BET_CATEGORIES[betCategory].maxDigits} หลัก
            </div>
          </div>

          {/* Keypad - ปรับสีให้สบายตา */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            {[1,2,3,4,5,6,7,8,9,'C',0,'⌫'].map((key, index) => (
              <button
                key={index}
                onClick={() => {
                  if (key === 'C') clearNumber();
                  else if (key === '⌫') deleteLastDigit();
                  else addNumber(key.toString());
                }}
                style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minHeight: '3.5rem',
                  backgroundColor: key === 'C' || key === '⌫' ? '#fef2f2' : '#f8fafc',
                  color: key === 'C' || key === '⌫' ? '#dc2626' : '#1e293b',
                  border: '1px solid ' + (key === 'C' || key === '⌫' ? '#fecaca' : '#e2e8f0')
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  if (key === 'C' || key === '⌫') {
                    e.target.style.backgroundColor = '#fee2e2';
                  } else {
                    e.target.style.backgroundColor = '#f1f5f9';
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                  if (key === 'C' || key === '⌫') {
                    e.target.style.backgroundColor = '#fef2f2';
                  } else {
                    e.target.style.backgroundColor = '#f8fafc';
                  }
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Bet Category Selection */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem', 
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📋</span> ประเภทหวย
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem'
            }}>
              {Object.entries(BET_CATEGORIES).map(([category, info]) => (
                <button
                  key={category}
                  onClick={() => {
                    setBetCategory(category);
                    setBetType(info.types[0]);
                    setCurrentNumber('');
                  }}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.875rem',
                    backgroundColor: betCategory === category ? '#3b82f6' : '#f8fafc',
                    color: betCategory === category ? '#ffffff' : '#374151',
                    border: '1px solid ' + (betCategory === category ? '#3b82f6' : '#e2e8f0'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <span style={{ fontSize: '1.125rem' }}>{info.icon}</span>
                  <span style={{ fontSize: '0.75rem' }}>{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bet Type Selection */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem', 
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>🎲</span> แทง {betCategory}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem'
            }}>
              {BET_CATEGORIES[betCategory].types.map(type => (
                <button
                  key={type}
                  onClick={() => setBetType(type)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: betType === type ? '#10b981' : '#f8fafc',
                    color: betType === type ? '#ffffff' : '#374151',
                    border: '1px solid ' + (betType === type ? '#10b981' : '#e2e8f0')
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem', 
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>💰</span> ราคา (บาท)
            </div>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="ใส่จำนวนเงิน (ขั้นต่ำ 10 บาท)"
              min="10"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                textAlign: 'center',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#1e293b'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}>
              {[10, 20, 50, 100].map(amount => (
                <button
                  key={amount}
                  onClick={() => setBetAmount(amount.toString())}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: '#475569'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#e2e8f0';
                    e.target.style.borderColor = '#94a3b8';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f1f5f9';
                    e.target.style.borderColor = '#e2e8f0';
                  }}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bet Button */}
          <button
            onClick={addToBet}
            disabled={!currentNumber || !betAmount || currentNumber.length !== BET_CATEGORIES[betCategory].maxDigits}
            className="add-bet-btn"
            style={{
              width: '100%',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: (!currentNumber || !betAmount || currentNumber.length !== BET_CATEGORIES[betCategory].maxDigits) ? 0.5 : 1
            }}
            onMouseOver={(e) => {
              if (!e.target.disabled) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.25)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ➕ เพิ่มลงโพย
          </button>
        </div>

        {/* Bet Summary - ปรับสีให้เห็นชัด */}
        {selectedNumbers.length > 0 && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '2px solid #f59e0b',
            boxShadow: '0 4px 20px rgba(245, 158, 11, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📄</span> โพยของคุณ ({selectedNumbers.length} เลข)
            </h3>
            
            <div style={{ maxHeight: '15rem', overflowY: 'auto', marginBottom: '1rem' }}>
              {selectedNumbers.map(bet => (
                <div key={bet.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#fefce8',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  border: '1px solid #fde047'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e293b' }}>
                      {bet.number}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {bet.category} - {bet.type}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#059669', fontWeight: 'bold' }}>
                      {bet.amount} บาท
                    </div>
                  </div>
                  <button
                    onClick={() => removeBet(bet.id)}
                    style={{
                      backgroundColor: '#fef2f2',
                      color: '#dc2626',
                      border: '1px solid #fecaca',
                      borderRadius: '0.5rem',
                      width: '2rem',
                      height: '2rem',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#fee2e2';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#fef2f2';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div style={{
              borderTop: '2px solid #f59e0b',
              paddingTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}>
              <span style={{ color: '#1e293b' }}>ยอดรวม:</span>
              <span style={{ color: '#059669' }}>{getTotalAmount().toLocaleString()} บาท</span>
            </div>

            <button
              onClick={handlePlaceBet}
              disabled={isProcessing}
              className={isProcessing ? 'processing' : ''}
              style={{
                width: '100%',
                backgroundColor: '#f97316',
                color: '#ffffff',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
                marginTop: '1rem',
                transition: 'all 0.3s ease',
                opacity: isProcessing ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!isProcessing) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.25)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {isProcessing ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '1rem',
                    height: '1rem',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  กำลังดำเนินการ...
                </div>
              ) : (
                '🎯 ยืนยันการซื้อ'
              )}
            </button>
          </div>
        )}

        {/* Balance Info - ปรับสีให้เห็นชัด */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '2px solid #10b981',
          borderRadius: '0.75rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#047857', 
            marginBottom: '0.25rem',
            fontWeight: '600'
          }}>
            💳 ยอดเงินคงเหลือ
          </div>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#059669' 
          }}>
            {balance?.toLocaleString() || '0'} บาท
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyPage;