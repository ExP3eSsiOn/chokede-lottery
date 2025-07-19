// แก้ไขไฟล์ src/components/lottery/CheckPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLottery } from '../../context/LotteryContext';
import { LOTTERY_CATEGORIES } from '../../utils/constants';

const CheckPage = () => {
  const navigate = useNavigate();
  const { 
    selectedCategory, 
    setSelectedCategory, 
    selectedLotteryType, 
    setSelectedLotteryType 
  } = useLottery();
  const [checkNumber, setCheckNumber] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [checkHistory, setCheckHistory] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [showCheckHistory, setShowCheckHistory] = useState(false);
  const [checkPageMode, setCheckPageMode] = useState('home'); // 'home' หรือ 'check'

  // Mock lottery results
  const mockLotteryResults = {
    'หวยรัฐบาลไทย': {
      date: '2025-01-15',
      drawDate: '16 มกราคม 2568',
      round: 'งวดที่ 1/2568',
      results: {
        first: '123456',
        firstNear: ['123455', '123457'],
        second: ['012345', '234567'],
        third: ['345678', '456789'],
        last3front: '123',
        last3back: '456',
        last2: '56'
      },
      prizes: {
        first: 6000000,
        firstNear: 100000,
        second: 200000,
        third: 80000,
        last3front: 4000,
        last3back: 4000,
        last2: 2000
      }
    },
    'หวยออมสิน': {
      date: '2025-01-15',
      drawDate: '16 มกราคม 2568',
      round: 'งวดที่ 1/2568',
      results: {
        first: '789012',
        last3front: '789',
        last3back: '012',
        last2: '12'
      },
      prizes: {
        first: 6000000,
        last3front: 4000,
        last3back: 4000,
        last2: 2000
      }
    },
    'หวยยี่กี 15 นาที': {
      date: '2025-01-17',
      drawDate: '17 มกราคม 2568 14:30',
      round: 'รอบที่ 97',
      results: {
        first: '13579',
        last3front: '135',
        last3back: '579',
        last2: '79'
      },
      prizes: {
        first: 50000,
        last3front: 5000,
        last3back: 5000,
        last2: 3000
      }
    }
  };

  const getCurrentResults = () => mockLotteryResults[selectedLotteryType] || mockLotteryResults['หวยรัฐบาลไทย'];
  const getCurrentCategory = () => LOTTERY_CATEGORIES[selectedCategory];

  // ฟังชั่นตรวจหวย
  const checkLotteryResult = async () => {
    if (!checkNumber || checkNumber.length < 2) {
      alert('กรุณาใส่เลขอย่างน้อย 2 หลัก');
      return;
    }

    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const results = getCurrentResults();
    const prizes = [];
    let totalWinning = 0;

    // ตรวจรางวัลที่ 1
    if (checkNumber === results.results.first) {
      prizes.push({ type: 'รางวัลที่ 1', amount: results.prizes.first });
      totalWinning += results.prizes.first;
    }

    // ตรวจรางวัลข้างเคียง
    if (results.results.firstNear?.includes(checkNumber)) {
      prizes.push({ type: 'รางวัลข้างเคียงรางวัลที่ 1', amount: results.prizes.firstNear });
      totalWinning += results.prizes.firstNear;
    }

    // ตรวจรางวัลที่ 2
    if (results.results.second?.includes(checkNumber)) {
      prizes.push({ type: 'รางวัลที่ 2', amount: results.prizes.second });
      totalWinning += results.prizes.second;
    }

    // ตรวจรางวัลที่ 3
    if (results.results.third?.includes(checkNumber)) {
      prizes.push({ type: 'รางวัลที่ 3', amount: results.prizes.third });
      totalWinning += results.prizes.third;
    }

    // ตรวจเลขหน้า 3 ตัว
    if (checkNumber.length >= 3 && results.results.last3front === checkNumber.slice(0, 3)) {
      prizes.push({ type: 'เลขหน้า 3 ตัว', amount: results.prizes.last3front });
      totalWinning += results.prizes.last3front;
    }

    // ตรวจเลขท้าย 3 ตัว
    if (checkNumber.length >= 3 && results.results.last3back === checkNumber.slice(-3)) {
      prizes.push({ type: 'เลขท้าย 3 ตัว', amount: results.prizes.last3back });
      totalWinning += results.prizes.last3back;
    }

    // ตรวจเลขท้าย 2 ตัว
    if (checkNumber.length >= 2 && results.results.last2 === checkNumber.slice(-2)) {
      prizes.push({ type: 'เลขท้าย 2 ตัว', amount: results.prizes.last2 });
      totalWinning += results.prizes.last2;
    }

    const result = {
      number: checkNumber,
      lottery: selectedLotteryType,
      date: results.date,
      round: results.round,
      isWinner: prizes.length > 0,
      prizes: prizes,
      totalWinning: totalWinning,
      timestamp: new Date().toISOString()
    };

    setCheckResult(result);
    setCheckHistory(prev => [result, ...prev.slice(0, 9)]);
    setIsChecking(false);
  };

  const clearCheck = () => {
    setCheckNumber('');
    setCheckResult(null);
  };

  // หน้าเลือกประเภทหวย (เหมือนในภาพ)
  if (checkPageMode === 'home') {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* ปุ่มกลับหน้าแรก */}
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <span className="text-xl">🏠</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">ตรวจผลรางวัล</h1>
        </div>

        {/* กริดประเภทหวย 2x2 (ตรงกับภาพ) */}
        <div className="grid grid-cols-2 gap-4">
          {/* หวยลาว */}
          <button
            onClick={() => {
              setSelectedCategory('หวยลาว');
              setSelectedLotteryType('หวยลาวพัฒนา');
            }}
            className={`p-6 rounded-2xl text-white font-bold transition-all min-h-32 flex flex-col items-center justify-center gap-3 ${
              selectedCategory === 'หวยลาว' 
                ? 'bg-gray-500 shadow-lg' 
                : 'bg-gray-400'
            }`}
          >
            <span className="text-3xl">🇱🇦</span>
            <span className="text-lg">หวยลาว</span>
          </button>

          {/* หวยฮานอย */}
          <button
            onClick={() => {
              setSelectedCategory('หวยฮานอย');
              setSelectedLotteryType('หวยฮานอยพิเศษ');
            }}
            className={`p-6 rounded-2xl text-white font-bold transition-all min-h-32 flex flex-col items-center justify-center gap-3 ${
              selectedCategory === 'หวยฮานอย' 
                ? 'bg-gray-500 shadow-lg' 
                : 'bg-gray-400'
            }`}
          >
            <span className="text-3xl">🇻🇳</span>
            <span className="text-lg">หวยฮานอย</span>
          </button>

          {/* หวยหุ้น */}
          <button
            onClick={() => {
              setSelectedCategory('หวยหุ้น');
              setSelectedLotteryType('หวยหุ้นไทยเย็น');
            }}
            className={`p-6 rounded-2xl text-white font-bold transition-all min-h-32 flex flex-col items-center justify-center gap-3 ${
              selectedCategory === 'หวยหุ้น' 
                ? 'bg-gray-500 shadow-lg' 
                : 'bg-gray-400'
            }`}
          >
            <span className="text-3xl">📈</span>
            <span className="text-lg">หวยหุ้น</span>
          </button>

          {/* หวยหุ้นต่างประเทศ */}
          <button
            onClick={() => {
              setSelectedCategory('หวยหุ้นต่างประเทศ');
              setSelectedLotteryType('หวยนิเคอิ');
            }}
            className={`p-6 rounded-2xl text-white font-bold transition-all min-h-32 flex flex-col items-center justify-center gap-3 ${
              selectedCategory === 'หวยหุ้นต่างประเทศ' 
                ? 'bg-gray-500 shadow-lg' 
                : 'bg-gray-400'
            }`}
          >
            <span className="text-3xl">🌍</span>
            <span className="text-lg">หวยหุ้นต่างประเทศ</span>
          </button>
        </div>

        {/* ชื่อหมวดหมู่ที่เลือก */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">{selectedCategory}</h3>
          
          {/* รายการหวยในหมวดหมู่ที่เลือก */}
          <div className="space-y-3">
            {getCurrentCategory().types.map(type => (
              <button
                key={type}
                onClick={() => {
                  setSelectedLotteryType(type);
                  setCheckResult(null);
                }}
                className={`w-full p-4 rounded-xl text-left font-bold transition-all min-h-16 ${
                  selectedLotteryType === type
                    ? 'bg-blue-50 text-blue-800 border-2 border-blue-300 shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{type}</span>
                  {selectedLotteryType === type && (
                    <span className="text-blue-600 text-lg">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ปุ่มไปตรวจหวย */}
        <button 
          onClick={() => setCheckPageMode('check')}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg transition-all hover:shadow-xl min-h-20"
        >
          <span className="text-2xl">🔍</span>
          ตรวจ {selectedLotteryType}
        </button>
      </div>
    );
  }

  // หน้าตรวจหวย
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header พร้อมปุ่มกลับ */}
      <div className={`bg-gradient-to-r ${getCurrentCategory().color} rounded-2xl p-6 text-white shadow-lg`}>
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => setCheckPageMode('home')}
            className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <span className="text-lg">←</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getCurrentCategory().icon}</div>
            <div>
              <div className="text-sm opacity-90">{selectedCategory}</div>
              <div className="text-lg font-bold">{selectedLotteryType}</div>
            </div>
          </div>
        </div>
      </div>

      {/* แท็บนำทาง */}
      <div className="flex bg-white rounded-xl border overflow-hidden shadow-sm">
        <button
          onClick={() => setShowCheckHistory(false)}
          className={`flex-1 py-3 px-4 font-bold transition-all ${
            !showCheckHistory ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          🔍 ตรวจหวย
        </button>
        <button
          onClick={() => setShowCheckHistory(true)}
          className={`flex-1 py-3 px-4 font-bold transition-all ${
            showCheckHistory ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          📋 ประวัติ ({checkHistory.length})
        </button>
      </div>

      {!showCheckHistory ? (
        <>
          {/* กรอกเลข */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">ใส่เลขที่ต้องการตรวจ</h3>
            
            <div className="mb-4">
              <input
                type="text"
                value={checkNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setCheckNumber(value);
                    setCheckResult(null);
                  }
                }}
                placeholder="ใส่เลขที่ต้องการตรวจ"
                className="w-full p-4 border-2 border-gray-200 rounded-xl text-2xl text-center font-bold focus:border-blue-500 focus:outline-none"
                maxLength={6}
              />
              <div className="text-center text-sm text-gray-500 mt-2">
                {checkNumber.length}/6 หลัก
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1,2,3,4,5,6,7,8,9,'C',0,'⌫'].map((key, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (key === 'C') {
                      clearCheck();
                    } else if (key === '⌫') {
                      setCheckNumber(checkNumber.slice(0, -1));
                      setCheckResult(null);
                    } else if (checkNumber.length < 6) {
                      setCheckNumber(checkNumber + key.toString());
                      setCheckResult(null);
                    }
                  }}
                  className={`p-4 rounded-xl text-xl font-bold transition-all ${
                    key === 'C' || key === '⌫' 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <button
              onClick={checkLotteryResult}
              disabled={!checkNumber || isChecking}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-xl font-bold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
            >
              {isChecking ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  กำลังตรวจสอบ...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  🔍 ตรวจผลรางวัล
                </div>
              )}
            </button>
          </div>

          {/* ผลการตรวจ */}
          {checkResult && (
            <div className={`bg-white rounded-2xl p-6 border-2 shadow-lg ${
              checkResult.isWinner ? 'border-green-300' : 'border-red-300'
            }`}>
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">
                  {checkResult.isWinner ? '🎉' : '😔'}
                </div>
                <h3 className={`text-2xl font-bold ${
                  checkResult.isWinner ? 'text-green-600' : 'text-red-600'
                }`}>
                  {checkResult.isWinner ? 'ยินดีด้วย! ถูกรางวัล' : 'เสียใจด้วย ไม่ถูกรางวัล'}
                </h3>
                <div className="text-gray-600 mt-2">
                  เลข <span className="font-bold text-3xl text-gray-800">{checkResult.number}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {checkResult.lottery} - {checkResult.round}
                </div>
              </div>

              {checkResult.isWinner && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-bold text-green-600 mb-3 text-center flex items-center justify-center gap-2">
                    🏆 รางวัลที่ถูก
                  </h4>
                  <div className="space-y-2">
                    {checkResult.prizes.map((prize, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-green-200 last:border-b-0">
                        <span className="font-medium">{prize.type}</span>
                        <span className="font-bold text-green-600">
                          {prize.amount.toLocaleString()} บาท
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-green-200 pt-3 mt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>รวมทั้งหมด:</span>
                      <span className="text-green-600">
                        {checkResult.totalWinning.toLocaleString()} บาท
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ผลรางวัลล่าสุด */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏆</span>
              <h3 className="text-lg font-bold text-gray-800">
                ผลรางวัล {selectedLotteryType} งวดล่าสุด
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl text-center">
                <div className="text-sm opacity-90 mb-1">รางวัลที่ 1</div>
                <div className="text-3xl font-bold">{getCurrentResults().results.first}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-xl text-center border">
                  <div className="text-sm text-gray-600 font-medium">เลขหน้า 3 ตัว</div>
                  <div className="text-xl font-bold text-blue-600">
                    {getCurrentResults().results.last3front}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-xl text-center border">
                  <div className="text-sm text-gray-600 font-medium">เลขท้าย 3 ตัว</div>
                  <div className="text-xl font-bold text-green-600">
                    {getCurrentResults().results.last3back}
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl text-center border">
                <div className="text-sm text-gray-600 font-medium">เลขท้าย 2 ตัว</div>
                <div className="text-2xl font-bold text-purple-600">
                  {getCurrentResults().results.last2}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* หน้าประวัติ */
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-gray-800">ประวัติการตรวจหวย</h2>
          
          {checkHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-medium">ยังไม่มีประวัติการตรวจหวย</p>
              <p className="text-sm">เริ่มตรวจหวยเพื่อดูประวัติ</p>
            </div>
          ) : (
            <div className="space-y-3">
              {checkHistory.map((history, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    history.isWinner 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{history.number}</span>
                      <span className="text-xl">
                        {history.isWinner ? '✅' : '❌'}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${
                        history.isWinner ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {history.isWinner ? `+${history.totalWinning.toLocaleString()}฿` : 'ไม่ถูก'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">{history.lottery}</div>
                    <div>{new Date(history.timestamp).toLocaleString('th-TH')}</div>
                  </div>

                  {history.isWinner && history.prizes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs space-y-1">
                        {history.prizes.map((prize, pIndex) => (
                          <div key={pIndex} className="flex justify-between">
                            <span>{prize.type}</span>
                            <span className="font-bold text-green-600">
                              {prize.amount.toLocaleString()}฿
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckPage;