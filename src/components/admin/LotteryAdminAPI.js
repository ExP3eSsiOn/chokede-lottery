import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import lotteryAPI from '../../services/api/lotteryAPI';

// Component สำหรับใช้กับ API จริง
const LotteryAdminAPI = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lotteries, setLotteries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    drawTime: '',
    closeTime: '',
    drawDays: [],
    pricePerUnit: 80,
    maxNumber: 999999,
    prizeStructure: {
      first: { amount: 6000000, count: 1 },
      three_digit_front: { amount: 4000, count: 2 },
      three_digit_back: { amount: 4000, count: 2 },
      two_digit_back: { amount: 2000, count: 1 }
    }
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await lotteryAPI.getAllLotteries();
      setLotteries(data.lotteries || []);
      setCategories(data.categories || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'ไม่สามารถโหลดข้อมูลได้' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await lotteryAPI.createLottery(formData);
      setMessage({ type: 'success', text: 'สร้างหวยสำเร็จ' });
      setShowAddForm(false);
      resetForm();
      await loadData();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'เกิดข้อผิดพลาด' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lotteryId) => {
    if (!window.confirm('ต้องการลบหวยนี้หรือไม่?')) return;
    
    try {
      setLoading(true);
      await lotteryAPI.deleteLottery(lotteryId);
      setMessage({ type: 'success', text: 'ลบหวยสำเร็จ' });
      await loadData();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'ไม่สามารถลบได้' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      categoryId: '',
      name: '',
      drawTime: '',
      closeTime: '',
      drawDays: [],
      pricePerUnit: 80,
      maxNumber: 999999,
      prizeStructure: {
        first: { amount: 6000000, count: 1 },
        three_digit_front: { amount: 4000, count: 2 },
        three_digit_back: { amount: 4000, count: 2 },
        two_digit_back: { amount: 2000, count: 1 }
      }
    });
  };

  const weekDays = [
    { value: 'MON', label: 'จันทร์' },
    { value: 'TUE', label: 'อังคาร' },
    { value: 'WED', label: 'พุธ' },
    { value: 'THU', label: 'พฤหัส' },
    { value: 'FRI', label: 'ศุกร์' },
    { value: 'SAT', label: 'เสาร์' },
    { value: 'SUN', label: 'อาทิตย์' }
  ];

  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  if (loading && !showAddForm) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
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
          ⚙️ จัดการหวย (API Mode)
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

      {/* Add Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
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
        ➕ สร้างหวยใหม่
      </button>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>สร้างหวยใหม่</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ประเภทหวย
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              >
                <option value="">เลือกประเภท</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                ชื่อหวย
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
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
                type="time"
                value={formData.drawTime}
                onChange={(e) => setFormData({ ...formData, drawTime: e.target.value })}
                required
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
                เวลาปิดรับ
              </label>
              <input
                type="time"
                value={formData.closeTime}
                onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                required
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
                ราคาต่อหน่วย
              </label>
              <input
                type="number"
                value={formData.pricePerUnit}
                onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                required
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
                เลขสูงสุด
              </label>
              <input
                type="number"
                value={formData.maxNumber}
                onChange={(e) => setFormData({ ...formData, maxNumber: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '5px'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              วันที่ออก (สำหรับหวยรายเดือน เลือกวันที่ / สำหรับหวยรายสัปดาห์ เลือกวัน)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {weekDays.map(day => (
                <label key={day.value} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    checked={formData.drawDays.includes(day.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, drawDays: [...formData.drawDays, day.value] });
                      } else {
                        setFormData({ ...formData, drawDays: formData.drawDays.filter(d => d !== day.value) });
                      }
                    }}
                  />
                  {day.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'กำลังบันทึก...' : 'สร้างหวย'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                resetForm();
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
        </form>
      )}

      {/* Lottery List */}
      <div style={{ display: 'grid', gap: '20px' }}>
        {categories.map(category => {
          const categoryLotteries = lotteries.filter(l => l.category_id === category.id);
          if (categoryLotteries.length === 0) return null;

          return (
            <div key={category.id} style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
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
                {category.icon} {category.name}
                <span style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  fontWeight: 'normal'
                }}>
                  ({categoryLotteries.length} หวย)
                </span>
              </h2>
              
              <div style={{ display: 'grid', gap: '10px' }}>
                {categoryLotteries.map((lottery) => (
                  <div key={lottery.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                        {lottery.name}
                      </h3>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        ออกผล: {lottery.draw_time} | ปิดรับ: {lottery.close_time}
                        {lottery.is_active ? (
                          <span style={{ marginLeft: '10px', color: '#10b981' }}>● เปิดใช้งาน</span>
                        ) : (
                          <span style={{ marginLeft: '10px', color: '#ef4444' }}>● ปิดใช้งาน</span>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => navigate(`/admin/lottery/${lottery.id}/rounds`)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        จัดการรอบ
                      </button>
                      
                      <button
                        onClick={() => handleDelete(lottery.id)}
                        disabled={loading}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          opacity: loading ? 0.5 : 1
                        }}
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LotteryAdminAPI;