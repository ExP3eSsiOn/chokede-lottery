import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const WithdrawPage = () => {
  const { balance, updateBalance } = useAuth();
  const [showWithdrawHistory, setShowWithdrawHistory] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawPin, setWithdrawPin] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock verified accounts
  const [userVerifiedAccounts] = useState([
    {
      id: 1,
      bankName: 'ธนาคารกรุงเทพ',
      accountNumber: '123-4-56789-0',
      accountName: 'นายสมชาย ใจดี',
      isVerified: true,
      verifiedDate: '2024-01-15'
    },
    {
      id: 2,
      bankName: 'ธนาคารกสิกรไทย',
      accountNumber: '456-7-89012-3',
      accountName: 'นายสมชาย ใจดี',
      isVerified: true,
      verifiedDate: '2024-01-20'
    }
  ]);

  // Mock withdraw history
  const [withdrawHistory] = useState([
    {
      id: 1,
      date: '2024-01-15 10:20:15',
      amount: 800,
      status: 'สำเร็จ',
      bank: 'ธนาคารกรุงเทพ',
      account: '123-4-56789-0',
      reference: 'WD001234'
    },
    {
      id: 2,
      date: '2024-01-14 15:10:45',
      amount: 1200,
      status: 'รอตรวจสอบ',
      bank: 'ธนาคารกสิกรไทย',
      account: '456-7-89012-3',
      reference: 'WD001235'
    },
    {
      id: 3,
      date: '2024-01-13 08:30:22',
      amount: 500,
      status: 'สำเร็จ',
      bank: 'ธนาคารกรุงเทพ',
      account: '123-4-56789-0',
      reference: 'WD001236'
    }
  ]);

  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawPin || !selectedAccount) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (amount < 100) {
      alert('จำนวนเงินขั้นต่ำ 100 บาท');
      return;
    }

    if (amount > balance) {
      alert('ยอดเงินไม่เพียงพอ');
      return;
    }

    if (withdrawPin.length !== 6) {
      alert('PIN ถอนเงินต้องเป็น 6 ตัว');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`ส่งคำขอถอนเงินสำเร็จ!\nจำนวน: ${amount.toLocaleString()} บาท\nบัญชี: ${selectedAccount.bankName}\nสถานะ: รอการตรวจสอบ`);
      
      setWithdrawAmount('');
      setWithdrawPin('');
      setSelectedAccount(null);
      
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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{
        padding: '1rem 0 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <button
            onClick={() => setShowWithdrawHistory(false)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: !showWithdrawHistory ? '#f97316' : '#ffffff',
              color: !showWithdrawHistory ? '#ffffff' : '#64748b'
            }}
          >
            💰 ถอนเงิน
          </button>
          <button
            onClick={() => setShowWithdrawHistory(true)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: showWithdrawHistory ? '#3b82f6' : '#ffffff',
              color: showWithdrawHistory ? '#ffffff' : '#64748b'
            }}
          >
            📋 ประวัติถอน
          </button>
        </div>

        {!showWithdrawHistory ? (
          <>
            {/* Balance Display */}
            <div style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              borderRadius: '1rem',
              padding: '1.5rem',
              color: '#ffffff',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                ยอดเงินคงเหลือ
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {balance?.toLocaleString() || '0'} ฿
              </div>
            </div>

            {/* Withdraw Form */}
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
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💸 ถอนเงิน
              </h2>
              
              {/* Amount Input */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem', 
                  color: '#374151' 
                }}>
                  จำนวนเงิน (บาท)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="ใส่จำนวนเงินที่ต้องการถอน (ขั้นต่ำ 100 บาท)"
                  min="100"
                  max={balance}
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
                  onFocus={(e) => e.target.style.borderColor = '#f97316'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  {[500, 1000, 5000, 10000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setWithdrawAmount(amount.toString())}
                      disabled={amount > balance}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: amount > balance ? '#f3f4f6' : '#fff7ed',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        border: amount > balance ? '1px solid #d1d5db' : '1px solid #fed7aa',
                        cursor: amount > balance ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        color: amount > balance ? '#9ca3af' : '#9a3412',
                        opacity: amount > balance ? 0.5 : 1
                      }}
                      onMouseOver={(e) => {
                        if (amount <= balance) {
                          e.target.style.backgroundColor = '#fed7aa';
                          e.target.style.borderColor = '#fb923c';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (amount <= balance) {
                          e.target.style.backgroundColor = '#fff7ed';
                          e.target.style.borderColor = '#fed7aa';
                        }
                      }}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', textAlign: 'center' }}>
                  สูงสุด: {balance?.toLocaleString() || '0'} บาท
                </div>
              </div>

              {/* PIN Input */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem', 
                  color: '#374151' 
                }}>
                  PIN ถอนเงิน (6 ตัว)
                </label>
                <input
                  type="password"
                  value={withdrawPin}
                  onChange={(e) => setWithdrawPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••••"
                  maxLength={6}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    fontSize: '1.25rem',
                    textAlign: 'center',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#1e293b',
                    letterSpacing: '0.5rem'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#f97316'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Account Selection */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem', 
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  🏦 บัญชีที่ยืนยันแล้ว <span style={{ color: '#10b981' }}>✓</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {userVerifiedAccounts.map(account => (
                    <button
                      key={account.id}
                      onClick={() => setSelectedAccount(account)}
                      style={{
                        padding: '1rem',
                        border: selectedAccount?.id === account.id ? '2px solid #f97316' : '2px solid #e2e8f0',
                        backgroundColor: selectedAccount?.id === account.id ? '#fff7ed' : '#ffffff',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '0.25rem' }}>
                            {account.bankName}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                            {account.accountNumber}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            {account.accountName}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#10b981',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <span>✓</span>
                            <span>ยืนยันแล้ว</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {userVerifiedAccounts.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      color: '#64748b',
                      padding: '2rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏦</div>
                      <div>ยังไม่มีบัญชีที่ยืนยัน</div>
                      <button style={{
                        color: '#3b82f6',
                        textDecoration: 'underline',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '0.5rem'
                      }}>
                        เพิ่มบัญชีธนาคาร
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructions */}
              <div style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #fde047',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ 
                  fontWeight: 'bold', 
                  color: '#92400e', 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  ⚠️ ข้อมูลการถอนเงิน:
                </h4>
                <ul style={{ 
                  fontSize: '0.875rem', 
                  color: '#92400e', 
                  margin: 0,
                  paddingLeft: '1.25rem',
                  lineHeight: '1.6'
                }}>
                  <li>ถอนได้ขั้นต่ำ 100 บาท สูงสุด 50,000 บาท/ครั้ง</li>
                  <li>ระยะเวลาดำเนินการ 15-30 นาที ในเวลาทำการ</li>
                  <li>สามารถถอนได้เฉพาะบัญชีที่ยืนยันแล้ว</li>
                  <li>ไม่มีค่าธรรมเนียมการถอน</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleWithdraw}
                disabled={isProcessing || !withdrawAmount || !withdrawPin || !selectedAccount}
                style={{
                  width: '100%',
                  backgroundColor: isProcessing ? '#94a3b8' : '#f97316',
                  color: '#ffffff',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: (!withdrawAmount || !withdrawPin || !selectedAccount) ? 0.5 : 1
                }}
                onMouseOver={(e) => {
                  if (!isProcessing && withdrawAmount && withdrawPin && selectedAccount) {
                    e.target.style.backgroundColor = '#ea580c';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(249, 115, 22, 0.25)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isProcessing) {
                    e.target.style.backgroundColor = '#f97316';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
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
                    กำลังส่งคำขอ...
                  </div>
                ) : (
                  '💰 ยืนยันการถอน'
                )}
              </button>
            </div>
          </>
        ) : (
          /* Withdraw History */
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
              marginBottom: '1rem', 
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📋 ประวัติการถอนเงิน
            </h2>
            
            {withdrawHistory.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {withdrawHistory.map(withdraw => (
                  <div key={withdraw.id} style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.75rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          <div style={{
                            fontSize: '1.125rem',
                            fontWeight: 'bold',
                            color: '#f97316'
                          }}>
                            -{withdraw.amount.toLocaleString()} ฿
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            backgroundColor: withdraw.status === 'สำเร็จ' ? '#dcfce7' : '#fef3c7',
                            color: withdraw.status === 'สำเร็จ' ? '#166534' : '#92400e',
                            fontWeight: 'bold'
                          }}>
                            {withdraw.status}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                          {withdraw.bank} - {withdraw.account}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {withdraw.date} | Ref: {withdraw.reference}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                color: '#64748b',
                padding: '2rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💸</div>
                <div>ยังไม่มีประวัติการถอนเงิน</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default WithdrawPage;
