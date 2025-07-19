import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import lotteryService from '../../services/lotteryService';

const LotteryAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newLottery, setNewLottery] = useState({ name: '', drawTime: '' });
  const [newCategory, setNewCategory] = useState({ name: '', icon: '', color: '' });
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setCategories(lotteryService.getCategories());
  };

  const handleAddLottery = () => {
    if (!selectedCategory || !newLottery.name || !newLottery.drawTime) {
      setMessage({ type: 'error', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
      return;
    }

    try {
      lotteryService.addLotteryToCategory(selectedCategory, newLottery);
      setMessage({ type: 'success', text: 'เพิ่มหวยสำเร็จ' });
      setNewLottery({ name: '', drawTime: '' });
      setShowAddForm(false);
      loadCategories();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      setMessage({ type: 'error', text: 'กรุณากรอกชื่อประเภทหวย' });
      return;
    }

    try {
      lotteryService.addNewCategory(newCategory.name, {
        icon: newCategory.icon || '🎯',
        color: newCategory.color || 'from-gray-400 to-gray-600',
        types: []
      });
      setMessage({ type: 'success', text: 'เพิ่มประเภทหวยสำเร็จ' });
      setNewCategory({ name: '', icon: '', color: '' });
      setShowNewCategoryForm(false);
      loadCategories();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleDeleteLottery = (category, lotteryName) => {
    if (window.confirm(`ต้องการลบ ${lotteryName} ออกจาก ${category} หรือไม่?`)) {
      try {
        lotteryService.deleteLottery(category, lotteryName);
        setMessage({ type: 'success', text: 'ลบหวยสำเร็จ' });
        loadCategories();
      } catch (error) {
        setMessage({ type: 'error', text: error.message });
      }
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('ต้องการรีเซ็ตกลับไปใช้ค่าเริ่มต้นหรือไม่? ข้อมูลที่เพิ่มไว้จะหายทั้งหมด')) {
      lotteryService.resetToDefaults();
      setMessage({ type: 'success', text: 'รีเซ็ตข้อมูลสำเร็จ' });
      loadCategories();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
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
        
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          ⚙️ จัดการหวย
        </h1>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          แอดมิน: {user?.name} ({user?.phone})
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div style={{
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: message.type === 'success' ? '#047857' : '#dc2626',
          border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
        }}>
          {message.text}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowNewCategoryForm(false);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ➕ เพิ่มหวยใหม่
        </button>
        
        <button
          onClick={() => {
            setShowNewCategoryForm(!showNewCategoryForm);
            setShowAddForm(false);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📁 เพิ่มประเภทหวยใหม่
        </button>
        
        <button
          onClick={handleResetToDefaults}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: 'auto'
          }}
        >
          🔄 รีเซ็ตค่าเริ่มต้น
        </button>
      </div>

      {/* Add New Category Form */}
      {showNewCategoryForm && (
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>เพิ่มประเภทหวยใหม่</h3>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ชื่อประเภท
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="เช่น หวยมาเลย์"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ไอคอน (อิโมจิ)
              </label>
              <input
                type="text"
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                placeholder="เช่น 🇲🇾"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                สี (Tailwind gradient)
              </label>
              <input
                type="text"
                value={newCategory.color}
                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                placeholder="เช่น from-yellow-400 to-yellow-600"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleAddCategory}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                เพิ่มประเภท
              </button>
              
              <button
                onClick={() => {
                  setShowNewCategoryForm(false);
                  setNewCategory({ name: '', icon: '', color: '' });
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Lottery Form */}
      {showAddForm && (
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>เพิ่มหวยใหม่</h3>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ประเภทหวย
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              >
                <option value="">เลือกประเภท</option>
                {Object.keys(categories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ชื่อหวย
              </label>
              <input
                type="text"
                value={newLottery.name}
                onChange={(e) => setNewLottery({ ...newLottery, name: e.target.value })}
                placeholder="เช่น หวยมาเลย์เช้า"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                เวลาออกผล
              </label>
              <input
                type="text"
                value={newLottery.drawTime}
                onChange={(e) => setNewLottery({ ...newLottery, drawTime: e.target.value })}
                placeholder="เช่น 11:00 น."
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleAddLottery}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                เพิ่มหวย
              </button>
              
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewLottery({ name: '', drawTime: '' });
                  setSelectedCategory('');
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories List */}
      {Object.entries(categories).map(([category, data]) => (
        <div key={category} style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {data.icon} {category}
            <span style={{
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: 'normal'
            }}>
              ({data.types.length} หวย)
            </span>
          </h2>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            {data.types.map((lottery) => (
              <div key={lottery.name} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{lottery.name}</span>
                  <span style={{ marginLeft: '10px', color: '#6b7280' }}>
                    {lottery.drawTime}
                  </span>
                </div>
                
                <button
                  onClick={() => handleDeleteLottery(category, lottery.name)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ลบ
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LotteryAdmin;