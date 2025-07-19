import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending'); // pending, won, history

  // Mock data for tickets
  const mockTickets = {
    pending: [
      {
        id: 'TK001',
        lotteryType: 'หวยรัฐบาลไทย',
        drawDate: '16 มกราคม 2567',
        numbers: [
          { type: '3 ตัวบน', number: '123', amount: 100 },
          { type: '2 ตัวล่าง', number: '45', amount: 50 }
        ],
        totalAmount: 150,
        status: 'รอผลรางวัล'
      },
      {
        id: 'TK002',
        lotteryType: 'หวยยี่กี',
        drawDate: '18 กรกฎาคม 2567 รอบ 15:00',
        numbers: [
          { type: '3 ตัวบน', number: '789', amount: 200 }
        ],
        totalAmount: 200,
        status: 'รอผลรางวัล'
      }
    ],
    won: [
      {
        id: 'TK003',
        lotteryType: 'หวยลาวพัฒนา',
        drawDate: '15 มกราคม 2567',
        numbers: [
          { type: '2 ตัวล่าง', number: '67', amount: 100, won: true, prize: 7000 }
        ],
        totalAmount: 100,
        totalWin: 7000,
        status: 'ถูกรางวัล'
      }
    ],
    history: [
      {
        id: 'TK004',
        lotteryType: 'หวยฮานอยพิเศษ',
        drawDate: '14 มกราคม 2567',
        numbers: [
          { type: '3 ตัวบน', number: '456', amount: 150 }
        ],
        totalAmount: 150,
        status: 'ไม่ถูกรางวัล'
      }
    ]
  };

  const getTickets = () => {
    switch(activeTab) {
      case 'pending': return mockTickets.pending;
      case 'won': return mockTickets.won;
      case 'history': return [...mockTickets.won, ...mockTickets.history];
      default: return [];
    }
  };

  const tabStyles = {
    active: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.2s'
    },
    inactive: {
      backgroundColor: '#e5e7eb',
      color: '#6b7280',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/results')}
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
        
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          📋 โพยหวย
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '10px'
      }}>
        <button
          onClick={() => setActiveTab('pending')}
          style={activeTab === 'pending' ? tabStyles.active : tabStyles.inactive}
        >
          รอผลรางวัล ({mockTickets.pending.length})
        </button>
        <button
          onClick={() => setActiveTab('won')}
          style={activeTab === 'won' ? tabStyles.active : tabStyles.inactive}
        >
          ถูกรางวัล ({mockTickets.won.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={activeTab === 'history' ? tabStyles.active : tabStyles.inactive}
        >
          ประวัติทั้งหมด
        </button>
      </div>

      {/* Tickets List */}
      <div style={{ display: 'grid', gap: '15px' }}>
        {getTickets().map(ticket => (
          <div key={ticket.id} style={{
            backgroundColor: 'white',
            border: ticket.status === 'ถูกรางวัล' ? '2px solid #10b981' : '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}>
            {/* Ticket Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>
                  {ticket.lotteryType}
                </h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                  งวดวันที่ {ticket.drawDate}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  หมายเลขบิล
                </div>
                <div style={{ fontWeight: 'bold', color: '#374151' }}>
                  {ticket.id}
                </div>
              </div>
            </div>

            {/* Numbers */}
            <div style={{ 
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              {ticket.numbers.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: index < ticket.numbers.length - 1 ? '10px' : 0
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ 
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: item.won ? '#10b981' : '#1f2937'
                    }}>
                      {item.number}
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {item.type}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      ฿{item.amount}
                    </div>
                    {item.won && (
                      <div style={{ fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}>
                        +฿{item.prize.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '15px'
            }}>
              <div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: 
                    ticket.status === 'รอผลรางวัล' ? '#fef3c7' :
                    ticket.status === 'ถูกรางวัล' ? '#d1fae5' : '#fee2e2',
                  color:
                    ticket.status === 'รอผลรางวัล' ? '#d97706' :
                    ticket.status === 'ถูกรางวัล' ? '#047857' : '#dc2626'
                }}>
                  {ticket.status}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  ยอดซื้อ: ฿{ticket.totalAmount}
                </div>
                {ticket.totalWin && (
                  <div style={{ fontSize: '16px', color: '#10b981', fontWeight: 'bold' }}>
                    รางวัลรวม: ฿{ticket.totalWin.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {getTickets().length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📋</div>
          <p>ไม่มีรายการในหมวดนี้</p>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;