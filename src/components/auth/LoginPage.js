import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!phone || !password) {
      alert('กรุณากรอกเบอร์โทรศัพท์และรหัสผ่าน');
      return;
    }

    if (phone.length !== 10) {
      alert('เบอร์โทรศัพท์ต้องเป็น 10 หลัก');
      return;
    }

    if (password.length !== 6) {
      alert('รหัสผ่านต้องเป็น 6 ตัว');
      return;
    }

    try {
      await login(phone, password);
      navigate('/results');
    } catch (error) {
      // Error is handled by context
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🎯</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">CHOKEDE</h1>
            </div>
            <p className="text-gray-600 text-lg">ยินดีต้อนรับกลับมา</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              <div className="flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="0812345678"
                maxLength={10}
                className="w-full p-4 border border-gray-300 rounded-xl text-lg text-center focus:border-blue-500 focus:outline-none input-focus"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">รหัสผ่าน (6 ตัว)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                maxLength={6}
                className="w-full p-4 border border-gray-300 rounded-xl text-lg text-center focus:border-blue-500 focus:outline-none input-focus"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg btn-hover btn-mobile"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  กำลังเข้าสู่ระบบ...
                </div>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </form>

          <div className="text-center pt-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-gray-500 text-sm">หรือ</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>
            <span className="text-gray-600">ยังไม่มีบัญชี? </span>
            <button
              onClick={() => navigate('/register')}
              className="text-blue-500 font-bold hover:text-blue-700 underline"
            >
              สมัครสมาชิกเลย
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
