// อัพเดทไฟล์ src/components/contact/ContactPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('channels');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Contact channels data - เน้น LINE OA และ Telegram
  const contactChannels = [
    {
      id: 'line-main',
      name: 'LINE Official หลัก',
      icon: '💬',
      details: '@chokede-lottery',
      description: 'ช่องทางหลักที่แนะนำ - ตอบเร็วที่สุด',
      action: 'เพิ่มเพื่อน LINE หลัก',
      url: 'https://line.me/R/ti/p/@chokede-lottery',
      available: '24 ชั่วโมง',
      color: 'from-green-500 to-green-600',
      priority: 'main',
      badge: 'หลัก'
    },
    {
      id: 'line-backup',
      name: 'LINE Official สำรอง',
      icon: '💬',
      details: '@chokede-support',
      description: 'ช่องทางสำรองเมื่อไลน์หลักไม่สามารถใช้งานได้',
      action: 'เพิ่มเพื่อน LINE สำรอง',
      url: 'https://line.me/R/ti/p/@chokede-support',
      available: '24 ชั่วโมง',
      color: 'from-green-400 to-green-500',
      priority: 'backup',
      badge: 'สำรอง'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      details: '@chokede_support',
      description: 'ช่องทางทางเลือกสำหรับการติดต่อ',
      action: 'ไปที่ Telegram',
      url: 'https://t.me/chokede_support',
      available: '24 ชั่วโมง',
      color: 'from-blue-400 to-blue-600',
      priority: 'alternative',
      badge: 'ทางเลือก'
    }
  ];

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: 'วิธีการฝากเงินเข้าระบบ',
      answer: 'คุณสามารถฝากเงินผ่านธนาคารที่ร่วมรายการ ได้แก่ กรุงเทพ กสิกรไทย ไทยพาณิชย์ และอื่นๆ โดยโอนเงินแล้วแจ้งใน LINE Official หรือกรอกข้อมูลในหน้าฝากเงิน',
      category: 'การเงิน'
    },
    {
      id: 2,
      question: 'เวลาในการถอนเงิน',
      answer: 'การถอนเงินจะดำเนินการภายใน 5-15 นาที ในเวลาทำการ (8:00-22:00) หากถอนนอกเวลาจะดำเนินการในเช้าวันถัดไป',
      category: 'การเงิน'
    },
    {
      id: 3,
      question: 'วิธีการซื้อหวย',
      answer: 'เลือกประเภทหวยที่ต้องการ > เลือกเลขที่ต้องการแทง > กรอกจำนวนเงิน > ยืนยันการซื้อ ระบบจะหักเงินจากยอดคงเหลือทันที',
      category: 'การใช้งาน'
    },
    {
      id: 4,
      question: 'ลืมรหัสผ่าน',
      answer: 'ติดต่อทีมงานผ่าน LINE Official พร้อมแนบรูปบัตรประชาชน ทีมงานจะช่วยรีเซ็ตรหัสผ่านให้ภายใน 30 นาที',
      category: 'บัญชี'
    },
    {
      id: 5,
      question: 'ขั้นตอนการยืนยันตัวตน (KYC)',
      answer: 'อัพโหลดรูปบัตรประชาชนและรูปเซลฟี่ถือบัตรประชาชน ทีมงานจะตรวจสอบและอนุมัติภายใน 24 ชั่วโมง',
      category: 'บัญชี'
    },
    {
      id: 6,
      question: 'LINE Official ไม่ตอบ ต้องทำอย่างไร?',
      answer: 'หากไลน์หลักไม่ตอบ สามารถติดต่อผ่าน LINE Official สำรอง หรือ Telegram ได้ทันที ทีมงานจะดูแลทุกช่องทางเท่าเทียมกัน',
      category: 'การติดต่อ'
    }
  ];

  const containerStyle = {
    padding: '1.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    animation: 'fadeIn 0.5s ease-out'
  };

  const getBadgeStyle = (priority) => {
    switch (priority) {
      case 'main':
        return {
          backgroundColor: '#dc2626',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem'
        };
      case 'backup':
        return {
          backgroundColor: '#f59e0b',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem'
        };
      case 'alternative':
        return {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem',
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem'
        };
      default:
        return {};
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
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .contact-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .faq-item:hover {
          background-color: #f8fafc;
        }
        
        .main-channel {
          animation: pulse 2s infinite;
          border: 2px solid #10b981;
        }
      `}</style>
      
      <div style={containerStyle}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💬</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
            ติดต่อเรา
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            ทีมงานพร้อมให้บริการตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <button
            onClick={() => setActiveSection('channels')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeSection === 'channels' ? '#10b981' : 'transparent',
              color: activeSection === 'channels' ? '#ffffff' : '#6b7280',
              transition: 'all 0.3s ease'
            }}
          >
            📞 ช่องทางติดต่อ
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeSection === 'faq' ? '#10b981' : 'transparent',
              color: activeSection === 'faq' ? '#ffffff' : '#6b7280',
              transition: 'all 0.3s ease'
            }}
          >
            ❓ FAQ
          </button>
        </div>

        {/* Contact Channels */}
        {activeSection === 'channels' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* คำแนะนำ */}
            <div style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '1rem',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 'bold', 
                color: '#1e40af',
                margin: '0 0 0.5rem 0' 
              }}>
                💡 วิธีการติดต่อที่แนะนำ
              </h3>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#1e40af', 
                margin: 0,
                lineHeight: 1.5 
              }}>
                แนะนำให้ใช้ <strong>LINE Official หลัก</strong> เป็นอันดับแรก<br/>
                หากไม่สามารถติดต่อได้ให้ใช้ <strong>LINE สำรอง</strong> หรือ <strong>Telegram</strong>
              </p>
            </div>

            {contactChannels.map(channel => (
              <div
                key={channel.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: channel.priority === 'main' ? '2px solid #10b981' : '1px solid #e5e7eb',
                  boxShadow: channel.priority === 'main' 
                    ? '0 8px 25px rgba(16, 185, 129, 0.2)' 
                    : '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className={`contact-item ${channel.priority === 'main' ? 'main-channel' : ''}`}
              >
                {/* Badge */}
                <div style={getBadgeStyle(channel.priority)}>
                  {channel.badge}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: `linear-gradient(135deg, ${channel.color.replace('from-', '').replace(' to-', ', ')})`,
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    {channel.icon}
                  </div>
                  <div style={{ flex: 1, paddingRight: '3rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>
                      {channel.name}
                    </h3>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
                      {channel.description}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>
                    {channel.details}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>
                    ⏰ {channel.available}
                  </div>
                </div>

                <button
                  onClick={() => window.open(channel.url, '_blank')}
                  style={{
                    width: '100%',
                    background: `linear-gradient(135deg, ${channel.color.replace('from-', '').replace(' to-', ', ')})`,
                    color: '#ffffff',
                    padding: channel.priority === 'main' ? '1rem' : '0.75rem',
                    borderRadius: '0.5rem',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: channel.priority === 'main' ? '1.125rem' : '1rem',
                    transition: 'transform 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  {channel.action}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
              คำถามที่พบบ่อย (FAQ)
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {faqData.map(faq => (
                <div
                  key={faq.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                  className="faq-item"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      textAlign: 'left',
                      backgroundColor: expandedFaq === faq.id ? '#f3f4f6' : '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.25rem' }}>
                        {faq.question}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {faq.category}
                      </div>
                    </div>
                    <div style={{
                      transform: expandedFaq === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      fontSize: '1.25rem',
                      color: '#6b7280'
                    }}>
                      ▼
                    </div>
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: '#f9fafb',
                      borderTop: '1px solid #e5e7eb',
                      animation: 'fadeIn 0.3s ease-out'
                    }}>
                      <p style={{ margin: 0, color: '#374151', lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions - เน้น LINE เป็นหลัก */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            📱 การติดต่อด่วน
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* LINE Official หลัก */}
            <button
              onClick={() => window.open('https://line.me/R/ti/p/@chokede-lottery', '_blank')}
              style={{
                background: 'linear-gradient(135deg, #00b900, #00a000)',
                color: '#ffffff',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(0, 185, 0, 0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              💬 LINE Official หลัก (แนะนำ)
            </button>
            
            {/* ปุ่มช่องทางสำรอง */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                onClick={() => window.open('https://line.me/R/ti/p/@chokede-support', '_blank')}
                style={{
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: '#ffffff',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                💬 LINE สำรอง
              </button>
              <button
                onClick={() => window.open('https://t.me/chokede_support', '_blank')}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: '#ffffff',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✈️ Telegram
              </button>
            </div>
          </div>
        </div>

        {/* คำแนะนำพิเศษ */}
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '1rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            color: '#92400e',
            margin: '0 0 0.5rem 0' 
          }}>
            ⚠️ หมายเหตุสำคัญ
          </h4>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#92400e', 
            margin: 0,
            lineHeight: 1.5 
          }}>
            ทีมงานจะไม่ติดต่อขอรหัสผ่านหรือข้อมูลส่วนตัวผ่านช่องทางใดๆ<br/>
            หากมีผู้ติดต่อมาขอข้อมูลดังกล่าว โปรดอย่าให้ข้อมูลและแจ้งทีมงานทันที
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;