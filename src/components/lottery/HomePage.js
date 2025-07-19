import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottery } from '../../context/LotteryContext';
import { getLotteryCategories } from '../../utils/constants';
import '../../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    selectedCategory,
    setSelectedCategory,
    selectedLotteryType,
    setSelectedLotteryType,
    timeLeft,
    getLatestResults
  } = useLottery();
  
  const latestResults = getLatestResults(selectedLotteryType);
  const LOTTERY_CATEGORIES = getLotteryCategories();

  return (
    <div className="home-container">
      {/* ผลรางวัลล่าสุด */}
      <div className="result-card">
        <div className="result-header">
          <div className="lottery-type-selector" onClick={() => {}}>
            <span style={{ fontSize: '1.5rem' }}>🏆</span>
            <div>
              <h2 className="lottery-type-text">ผลรางวัลล่าสุด</h2>
              <p className="draw-number">งวดวันที่ 16 มกราคม 2567</p>
            </div>
            <span style={{ 
              background: `linear-gradient(135deg, ${LOTTERY_CATEGORIES[selectedCategory].color.replace('from-', '').replace(' to-', ', ')})`,
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginLeft: 'auto'
            }}>
              {selectedLotteryType}
            </span>
          </div>
        </div>
        
        <div className="result-content">
          <div className="result-number">
            <span className="result-label">รางวัลที่ 1</span>
            <span className="first-prize-number">{latestResults.first}</span>
            
            <div className="sub-numbers">
              <div className="sub-number">
                <span className="sub-number-label">2 ตัว</span>
                <span className="sub-number-value">{latestResults.last2}</span>
              </div>
              <div className="sub-number">
                <span className="sub-number-label">หน้า 3 ตัว</span>
                <span className="sub-number-value">{latestResults.last3front}</span>
              </div>
              <div className="sub-number">
                <span className="sub-number-label">ท้าย 3 ตัว</span>
                <span className="sub-number-value">{latestResults.last3back}</span>
              </div>
            </div>
          </div>
          
          <div className="action-buttons">
            <button 
              onClick={() => {
                if (selectedCategory === 'หวยยี่กี') {
                  navigate('/results');
                } else {
                  navigate('/buy');
                }
              }}
              className="action-button action-button-primary"
            >
              <span style={{ fontSize: '1.25rem' }}>🎯</span>
              ซื้อหวย
            </button>
            <button 
              onClick={() => navigate('/results')}
              className="action-button action-button-secondary"
            >
              ดูผลทั้งหมด
            </button>
          </div>
        </div>
      </div>

      {/* Timer Section */}
      <div className="timer-section">
        <div className="timer-label">⏰ เวลาที่เหลือก่อนปิดรับ</div>
        <div className="timer-display">
          <span className="timer-unit">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span>:</span>
          <span className="timer-unit">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span>:</span>
          <span className="timer-unit">{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Category Selection */}
      <div className="category-section">
        <h3 className="section-title">
          <span style={{ fontSize: '1.25rem' }}>📋</span>
          เลือกประเภทหวย
        </h3>
        
        <div className="category-tabs">
          {Object.keys(LOTTERY_CATEGORIES).map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                const firstType = LOTTERY_CATEGORIES[category].types[0];
                setSelectedLotteryType(typeof firstType === 'string' ? firstType : firstType.name);
              }}
              className={`category-tab ${selectedCategory === category ? 'category-tab-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="lottery-type-grid">
          {LOTTERY_CATEGORIES[selectedCategory].types.map((type) => {
            const isString = typeof type === 'string';
            const name = isString ? type : type.name;
            const drawTime = isString ? '' : type.drawTime;
            
            return (
              <div
                key={name}
                onClick={() => setSelectedLotteryType(name)}
                className={`lottery-type-card ${selectedLotteryType === name ? 'lottery-type-card-selected' : ''}`}
              >
                <div className="lottery-type-name">{name}</div>
                {drawTime && <div className="lottery-type-time">{drawTime}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;