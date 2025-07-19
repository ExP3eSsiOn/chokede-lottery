import React, { useState } from 'react';
import lotteryService from '../../services/lotteryService';

const LotteryTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [categories, setCategories] = useState(lotteryService.getCategories());

  const addTestResult = (result) => {
    setTestResults(prev => [...prev, result]);
  };

  const runTests = () => {
    setTestResults([]);
    
    // Test 1: Get current categories
    try {
      const cats = lotteryService.getCategories();
      addTestResult({
        test: 'ดึงข้อมูลประเภทหวย',
        status: 'success',
        message: `พบ ${Object.keys(cats).length} ประเภท: ${Object.keys(cats).join(', ')}`
      });
    } catch (error) {
      addTestResult({
        test: 'ดึงข้อมูลประเภทหวย',
        status: 'error',
        message: error.message
      });
    }

    // Test 2: Add new lottery
    try {
      lotteryService.addLotteryToCategory('หวยไทย', {
        name: 'หวยทดสอบ ' + Date.now(),
        drawTime: '12:00 น.'
      });
      addTestResult({
        test: 'เพิ่มหวยใหม่ในหวยไทย',
        status: 'success',
        message: 'เพิ่มหวยทดสอบสำเร็จ'
      });
      setCategories(lotteryService.getCategories());
    } catch (error) {
      addTestResult({
        test: 'เพิ่มหวยใหม่ในหวยไทย',
        status: 'error',
        message: error.message
      });
    }

    // Test 3: Add new category
    try {
      const newCategoryName = 'หวยทดสอบ ' + Date.now();
      lotteryService.addNewCategory(newCategoryName, {
        icon: '🧪',
        color: 'from-pink-400 to-pink-600',
        types: [
          { name: 'หวยทดสอบเช้า', drawTime: '09:00 น.' },
          { name: 'หวยทดสอบเย็น', drawTime: '16:00 น.' }
        ]
      });
      addTestResult({
        test: 'เพิ่มประเภทหวยใหม่',
        status: 'success',
        message: `เพิ่ม ${newCategoryName} สำเร็จ`
      });
      setCategories(lotteryService.getCategories());
    } catch (error) {
      addTestResult({
        test: 'เพิ่มประเภทหวยใหม่',
        status: 'error',
        message: error.message
      });
    }

    // Test 4: Delete lottery
    try {
      const cats = lotteryService.getCategories();
      const firstCategory = Object.keys(cats)[0];
      const firstLottery = cats[firstCategory].types[0];
      
      if (firstLottery) {
        lotteryService.deleteLottery(firstCategory, firstLottery.name);
        addTestResult({
          test: 'ลบหวย',
          status: 'success',
          message: `ลบ ${firstLottery.name} จาก ${firstCategory} สำเร็จ`
        });
        setCategories(lotteryService.getCategories());
      }
    } catch (error) {
      addTestResult({
        test: 'ลบหวย',
        status: 'error',
        message: error.message
      });
    }

    // Test 5: localStorage persistence
    try {
      const stored = localStorage.getItem('lottery_categories');
      if (stored) {
        addTestResult({
          test: 'บันทึกข้อมูลใน localStorage',
          status: 'success',
          message: `ข้อมูลถูกบันทึก (${stored.length} ตัวอักษร)`
        });
      }
    } catch (error) {
      addTestResult({
        test: 'บันทึกข้อมูลใน localStorage',
        status: 'error',
        message: error.message
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        🧪 ทดสอบระบบจัดการหวย
      </h1>

      <button
        onClick={runTests}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        เริ่มทดสอบ
      </button>

      <button
        onClick={() => {
          lotteryService.resetToDefaults();
          setCategories(lotteryService.getCategories());
          addTestResult({
            test: 'รีเซ็ตค่าเริ่มต้น',
            status: 'success',
            message: 'รีเซ็ตข้อมูลสำเร็จ'
          });
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          marginLeft: '10px'
        }}
      >
        รีเซ็ตค่าเริ่มต้น
      </button>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            ผลการทดสอบ
          </h2>
          {testResults.map((result, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: result.status === 'success' ? '#d1fae5' : '#fee2e2',
              borderRadius: '5px'
            }}>
              <span style={{ fontSize: '20px' }}>
                {result.status === 'success' ? '✅' : '❌'}
              </span>
              <div>
                <strong>{result.test}</strong>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  {result.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Categories */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
          ประเภทหวยปัจจุบัน
        </h2>
        {Object.entries(categories).map(([category, data]) => (
          <div key={category} style={{
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#f9fafb',
            borderRadius: '5px'
          }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {data.icon} {category} ({data.types.length} หวย)
            </h3>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              {data.types.map(lottery => lottery.name).join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotteryTest;