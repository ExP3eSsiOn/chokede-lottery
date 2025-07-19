// สร้างไฟล์ src/components/auth/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    referralCode: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Validation functions
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) return 'กรุณากรอกเบอร์โทรศัพท์';
    if (!phoneRegex.test(phone)) return 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก';
    if (!phone.startsWith('0')) return 'เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'กรุณากรอกรหัสผ่าน';
    if (password.length !== 6) return 'รหัสผ่านต้องเป็นตัวเลข 6 หลัก';
    if (!/^[0-9]+$/.test(password)) return 'รหัสผ่านต้องเป็นตัวเลขเท่านั้น';
    return '';
  };

  const validateName = (name, field) => {
    if (!name) return `กรุณากรอก${field}`;
    if (name.length < 2) return `${field}ต้องมีอย่างน้อย 2 ตัวอักษร`;
    if (name.length > 50) return `${field}ต้องไม่เกิน 50 ตัวอักษร`;
    return '';
  };

  const validateForm = (step) => {
    const newErrors = {};

    if (step >= 1) {
      newErrors.phone = validatePhone(formData.phone);
      newErrors.password = validatePassword(formData.password);
      
      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
      }
    }

    if (step >= 2) {
      newErrors.firstName = validateName(formData.firstName, 'ชื่อ');
      newErrors.lastName = validateName(formData.lastName, 'นามสกุล');
      
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'กรุณายอมรับเงื่อนไขการใช้งาน';
      }
    }

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNextStep = () => {
    if (validateForm(1)) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    if (!validateForm(2)) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API response
      const mockResponse = {
        success: true,
        user: {
          id: Math.floor(Math.random() * 10000),
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          referralCode: generateReferralCode(),
          createdAt: new Date().toISOString()
        },
        message: 'สมัครสมาชิกสำเร็จ'
      };

      if (mockResponse.success) {
        // Show success message
        alert(`สมัครสมาชิกสำเร็จ!\nรหัสแนะนำของคุณ: ${mockResponse.user.referralCode}\nกรุณาบันทึกรหัสแนะนำไว้`);
        
        // Navigate to login page
        navigate('/login');
      }
    } catch (error) {
      setErrors({ submit: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' });
    } finally {
      setIsLoading(false);
    }
  };

  const generateReferralCode = () => {
    return 'CKD' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #d1d5db',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#ffffff'
  };

  const inputFocusStyle = {
    borderColor: '#10b981',
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
  };

  const inputErrorStyle = {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: '0.75rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: "'Prompt', 'Kanit', 'Sarabun', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: '#ffffff',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))',
          borderRadius: '50%',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
            }}>
              <span style={{ fontSize: '1.5rem', color: '#ffffff' }}>✨</span>
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 0.5rem 0'
            }}>
              CHOKEDE
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              margin: 0
            }}>
              สร้างบัญชีใหม่
            </p>
          </div>

          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
            gap: '1rem'
          }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              backgroundColor: currentStep >= 1 ? '#10b981' : '#d1d5db',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }}>
              1
            </div>
            <div style={{
              width: '3rem',
              height: '2px',
              backgroundColor: currentStep >= 2 ? '#10b981' : '#d1d5db'
            }}></div>
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              backgroundColor: currentStep >= 2 ? '#10b981' : '#d1d5db',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.875rem'
            }}>
              2
            </div>
          </div>

          {errors.submit && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              color: '#991b1b',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {errors.submit}
            </div>
          )}

          {/* Step 1: Account Information */}
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'center',
                margin: 0
              }}>
                ข้อมูลบัญชี
              </h2>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  📱 เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                  placeholder="0812345678"
                  maxLength={10}
                  style={{
                    ...inputStyle,
                    ...(errors.phone ? inputErrorStyle : {})
                  }}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    if (!errors.phone) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                />
                {errors.phone && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  🔐 รหัสผ่าน (6 หลัก)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    maxLength={6}
                    style={{
                      ...inputStyle,
                      paddingRight: '3rem',
                      ...(errors.password ? inputErrorStyle : {})
                    }}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => {
                      if (!errors.password) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.25rem'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  🔒 ยืนยันรหัสผ่าน
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    maxLength={6}
                    style={{
                      ...inputStyle,
                      paddingRight: '3rem',
                      ...(errors.confirmPassword ? inputErrorStyle : {})
                    }}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => {
                      if (!errors.confirmPassword) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.25rem'
                    }}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p style={{ color: '#10b981', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    ✓ รหัสผ่านตรงกัน
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    flex: 1
                  }}
                >
                  ← กลับ
                </button>
                <button
                  onClick={handleNextStep}
                  style={{
                    ...buttonStyle,
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    flex: 2
                  }}
                >
                  ถัดไป →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937',
                textAlign: 'center',
                margin: 0
              }}>
                ข้อมูลส่วนตัว
              </h2>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  👤 ชื่อ
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="กรอกชื่อ"
                  style={{
                    ...inputStyle,
                    ...(errors.firstName ? inputErrorStyle : {})
                  }}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    if (!errors.firstName) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                />
                {errors.firstName && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  👤 นามสกุล
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="กรอกนามสกุล"
                  style={{
                    ...inputStyle,
                    ...(errors.lastName ? inputErrorStyle : {})
                  }}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    if (!errors.lastName) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                />
                {errors.lastName && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  🎁 รหัสแนะนำ (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  value={formData.referralCode}
                  onChange={(e) => handleInputChange('referralCode', e.target.value.toUpperCase())}
                  placeholder="กรอกรหัสแนะนำ (ถ้ามี)"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                  รหัสแนะนำจะช่วยให้คุณได้รับสิทธิประโยชน์พิเศษ
                </p>
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.75rem',
                  border: errors.agreeToTerms ? '2px solid #ef4444' : '1px solid #e5e7eb'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      marginTop: '0.125rem'
                    }}
                  />
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#374151',
                    lineHeight: 1.5
                  }}>
                    ฉันยอมรับ <strong>เงื่อนไขการใช้งาน</strong> และ <strong>นโยบายความเป็นส่วนตัว</strong> ของ CHOKEDE
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handlePrevStep}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    flex: 1
                  }}
                >
                  ← ย้อนกลับ
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  style={{
                    ...buttonStyle,
                    background: isLoading 
                      ? '#9ca3af' 
                      : 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    flex: 2
                  }}
                >
                  {isLoading ? (
                    <>
                      <div style={{
                        width: '1rem',
                        height: '1rem',
                        border: '2px solid #ffffff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      กำลังสมัคร...
                    </>
                  ) : (
                    <>
                      🚀 สร้างบัญชี
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Login Link */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <span style={{ color: '#6b7280' }}>มีบัญชีแล้ว? </span>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#10b981',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: 'inherit'
              }}
            >
              เข้าสู่ระบบที่นี่
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;