// src/utils/formatters.js
export const formatCurrency = (amount, options = {}) => {
  const {
    locale = 'th-TH',
    currency = 'THB',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options;

  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount);
};

export const formatNumber = (number, options = {}) => {
  const {
    locale = 'th-TH',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options;

  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(number);
};

export const formatDate = (date, options = {}) => {
  const {
    locale = 'th-TH',
    dateStyle = 'medium',
    timeStyle = 'short'
  } = options;

  if (!date) return '';

  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle
  }).format(dateObj);
};

export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as xxx-xxx-xxxx
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

export const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  
  // Remove all non-digits and hyphens
  const cleaned = accountNumber.replace(/[^\d-]/g, '');
  
  return cleaned;
};

export const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  
  const cleaned = accountNumber.replace(/\D/g, '');
  
  if (cleaned.length > 6) {
    const first3 = cleaned.slice(0, 3);
    const last3 = cleaned.slice(-3);
    const middle = '*'.repeat(cleaned.length - 6);
    return `${first3}${middle}${last3}`;
  }
  
  return accountNumber;
};

export const formatTimeRemaining = (timeLeft) => {
  const { hours = 0, minutes = 0, seconds = 0 } = timeLeft;
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
