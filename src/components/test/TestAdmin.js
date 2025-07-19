import React from 'react';

const TestAdmin = () => {
  const testPhoneNumbers = [
    '0800000001',
    '0800000000',
    '08000000001',
    '0812345678',
    '0899999999'
  ];

  const checkIsAdmin = (phone) => {
    return phone.startsWith('080000000');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        🧪 ทดสอบการตรวจสอบ Admin Phone
      </h1>

      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
          ทดสอบเบอร์โทร
        </h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>เบอร์โทร</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>ผลการตรวจสอบ</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {testPhoneNumbers.map(phone => {
              const isAdmin = checkIsAdmin(phone);
              return (
                <tr key={phone} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>{phone}</td>
                  <td style={{ padding: '10px' }}>
                    {phone.startsWith('080000000') ? (
                      <span style={{ color: '#10b981' }}>✅ เริ่มต้นด้วย 080000000</span>
                    ) : (
                      <span style={{ color: '#ef4444' }}>❌ ไม่เริ่มต้นด้วย 080000000</span>
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: isAdmin ? '#fef3c7' : '#e0e7ff',
                      fontWeight: 'bold'
                    }}>
                      {isAdmin ? 'admin 👑' : 'user 👤'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{
        backgroundColor: '#fef3c7',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
          📝 หมายเหตุ
        </h3>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>เบอร์ Admin ต้องเริ่มต้นด้วย <strong>080000000</strong> (9 หลักแรก)</li>
          <li>ตัวอย่างเบอร์ Admin: 0800000001, 0800000002, ..., 0800000099</li>
          <li>เบอร์ 0812345678 จะไม่ใช่ Admin เพราะไม่เริ่มต้นด้วย 080000000</li>
        </ul>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#dbeafe',
        borderRadius: '8px'
      }}>
        <strong>Test Code:</strong>
        <pre style={{ marginTop: '10px', fontSize: '14px' }}>
{`const phone = '0800000001';
const isAdmin = phone.startsWith('080000000');
console.log('Is Admin?', isAdmin); // true

const phone2 = '0812345678';
const isAdmin2 = phone2.startsWith('080000000');
console.log('Is Admin?', isAdmin2); // false`}
        </pre>
      </div>
    </div>
  );
};

export default TestAdmin;