// src/utils/validators.js
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  return password && password.length === 6 && /^\d{6}$/.test(password);
};

export const validatePin = (pin) => {
  return pin && pin.length === 6 && /^\d{6}$/.test(pin);
};

export const validateAmount = (amount, min = 0, max = Infinity) => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount >= min && numAmount <= max;
};

export const validateBetNumber = (number, betCategory) => {
  if (!number || !betCategory) return false;
  
  const { maxDigits } = BET_CATEGORIES[betCategory] || {};
  if (!maxDigits) return false;
  
  return number.length === maxDigits && /^\d+$/.test(number);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAccountNumber = (accountNumber) => {
  // Basic validation for Thai bank account numbers
  const cleaned = accountNumber.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};
