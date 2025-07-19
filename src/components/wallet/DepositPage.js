import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const DepositPage = () => {
  const { balance, updateBalance } = useAuth();
  const [showDepositHistory, setShowDepositHistory] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [uploadeSlip, setUploadedSlip] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock deposit history
  const [depositHistory] = useState([
    {
      id: 1,
      date: '2024-01-15 14:30:25',
      amount: 1000,
      status: 'สำเร็จ',
      bank: 'ธนาคารกรุงเทพ',
      reference: 'DEP001234'
    },
    {
      id: 2,
      date: '2024-01-14 09:15:10',
      amount: 500,
      status: 'รอตรวจสอบ',
      bank: 'ธนาคารกสิกรไทย',
      reference: 'DEP001235'
    },
    {
      id: 3,
      date: '2024-01-13 16:45:33',
      amount: 2000,
      status: 'สำเร็จ',
      bank: 'ธนาคารไทยพาณิชย์',
      reference: 'DEP001236'
    }
  ]);

  const banks = [
    { id: 'bbl', name: 'ธนาคารกรุงเทพ', account: '123-4-56789-0', color: '#1e40af' },
    { id: 'kbank', name: 'ธนาคารกสิกรไทย', account: '456-7-89012-3', color: '#059669' },
    { id: 'scb', name: 'ธนาคารไทยพาณิชย์', account: '789-0-12345-6', color: '#7c3aed' },
    { id: 'ktb', name: 'ธนาคารกรุงไทย', account: '321-6-54987-0', color: '#0ea5e9' }
  ];

  const handleDeposit = async () => {
    if (!depositAmount || !selectedBank) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (parseFloat(depositAmount) < 100) {
      alert('จำนวนเงินขั้นต่ำ 100 บาท');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`ส่งคำขอฝากเงินสำเร็จ!\nจำนวน: ${parseFloat(depositAmount).toLocaleString()} บาท\nธนาคาร: ${banks.find(b => b.id === selectedBank)?.name}\nสถานะ: รอการตรวจสอบ`);
      
      setDepositAmount('');
      setSelectedBank('');
      setUploadedSlip(null);
      
    } catch (error) {
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('ไฟล์ต้องมีขนาดไม่เกิน 5MB');
        return;
      }
      setUploadedSlip(file);
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
            onClick={() => setShowDepositHistory(false)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: !showDepositHistory ? '#10b981' : '#ffffff',
              color: !showDepositHistory ? '#ffffff' : '#64748b'
            }}
          >
            💳 ฝากเงิน
          </button>
          <button
            onClick={() => setShowDepositHistory(true)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: showDepositHistory ? '#3b82f6' : '#ffffff',
              color: showDepositHistory ? '#ffffff' : '#64748b'
            }}
          >
            📋 ประวัติฝาก
          </button>
        </div>

        {!showDepositHistory ? (
          <>
            {/* Balance Display */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
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

            {/* Deposit Form */}
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
                💰 ฝากเงิน
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
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="ใส่จำนวนเงินที่ต้องการฝาก (ขั้นต่ำ 100 บาท)"
                  min="100"
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
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  {[100, 500, 1000, 5000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setDepositAmount(amount.toString())}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        border: '1px solid #bbf7d0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: '#166534'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#dcfce7';
                        e.target.style.borderColor = '#86efac';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#f0fdf4';
                        e.target.style.borderColor = '#bbf7d0';
                      }}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Selection */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem', 
                  color: '#374151' 
                }}>
                  เลือกธนาคารที่โอนเข้า
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(1, 1fr)',
                  gap: '0.5rem'
                }}>
                  {banks.map(bank => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      style={{
                        padding: '1rem',
                        backgroundColor: selectedBank === bank.id ? bank.color : '#ffffff',
                        color: selectedBank === bank.id ? '#ffffff' : '#1e293b',
                        border: selectedBank === bank.id ? `2px solid ${bank.color}` : '2px solid #e2e8f0',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                        {bank.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                        เลขบัญชี: {bank.account}
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                        ชื่อบัญชี: บริษัท โชคดี จำกัด
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem', 
                  color: '#374151' 
                }}>
                  อัพโหลดสลิปโอนเงิน (ไม่บังคับ)
                </label>
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.target.style.borderColor = '#10b981';
                  e.target.style.backgroundColor = '#f0fdf4';
                }}
                onDragLeave={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileUpload({ target: { files: [file] } });
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="slip-upload"
                  />
                  <label htmlFor="slip-upload" style={{ cursor: 'pointer' }}>
                    {uploadeSlip ? (
                      <div>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                        <div style={{ color: '#10b981', fontWeight: 'bold' }}>
                          {uploadeSlip.name}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          ({(uploadeSlip.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
                        <div style={{ color: '#64748b' }}>
                          คลิกหรือลากไฟล์มาวางที่นี่
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                          รองรับ JPG, PNG ขนาดไม่เกิน 5MB
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Instructions */}
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ 
                  fontWeight: 'bold', 
                  color: '#1e40af', 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📋 วิธีการฝากเงิน:
                </h4>
                <ol style={{ 
                  fontSize: '0.875rem', 
                  color: '#1e40af', 
                  margin: 0,
                  paddingLeft: '1.25rem',
                  lineHeight: '1.6'
                }}>
                  <li>เลือกจำนวนเงินและธนาคารที่ต้องการโอน</li>
                  <li>โอนเงินเข้าบัญชีธนาคารที่เลือก</li>
                  <li>อัพโหลดสลิป (ไม่บังคับ แต่จะช่วยให้ตรวจสอบเร็วขึ้น)</li>
                  <li>กดยืนยันการฝาก</li>
                  <li>รอการตรวจสอบภายใน 5-15 นาที</li>
                </ol>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleDeposit}
                disabled={isProcessing || !depositAmount || !selectedBank}
                style={{
                  width: '100%',
                  backgroundColor: isProcessing ? '#94a3b8' : '#10b981',
                  color: '#ffffff',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: (!depositAmount || !selectedBank) ? 0.5 : 1
                }}
                onMouseOver={(e) => {
                  if (!isProcessing && depositAmount && selectedBank) {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isProcessing) {
                    e.target.style.backgroundColor = '#10b981';
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
                  '💳 ยืนยันการฝาก'
                )}
              </button>
            </div>
          </>
        ) : (
          /* Deposit History */
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
              📋 ประวัติการฝากเงิน
            </h2>
            
            {depositHistory.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {depositHistory.map(deposit => (
                  <div key={deposit.id} style={{
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
                            color: '#10b981'
                          }}>
                            +{deposit.amount.toLocaleString()} ฿
                          </div>
                          <div style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            backgroundColor: deposit.status === 'สำเร็จ' ? '#dcfce7' : '#fef3c7',
                            color: deposit.status === 'สำเร็จ' ? '#166534' : '#92400e',
                            fontWeight: 'bold'
                          }}>
                            {deposit.status}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                          {deposit.bank}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {deposit.date} | Ref: {deposit.reference}
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
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💳</div>
                <div>ยังไม่มีประวัติการฝากเงิน</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DepositPage;
