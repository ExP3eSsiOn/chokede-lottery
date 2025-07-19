// Debug utilities for authentication
window.debugAuth = {
  checkPhone: (phone) => {
    console.log('Phone:', phone);
    console.log('Length:', phone.length);
    console.log('Starts with 080000000 (9 digits):', phone.startsWith('080000000'));
    console.log('First 9 chars:', phone.substring(0, 9));
    return phone.startsWith('080000000');
  },
  
  checkLocalStorage: () => {
    const phone = localStorage.getItem('userPhone');
    const token = localStorage.getItem('authToken');
    console.log('Saved phone:', phone);
    console.log('Token:', token);
    if (phone) {
      window.debugAuth.checkPhone(phone);
    }
  },
  
  setAdminPhone: () => {
    localStorage.setItem('userPhone', '0800000001');
    console.log('Set admin phone: 0800000001');
    console.log('Please reload the page');
  },
  
  clearAndSetAdmin: () => {
    localStorage.clear();
    localStorage.setItem('userPhone', '0800000001');
    localStorage.setItem('authToken', 'mock_token_123');
    console.log('Cleared and set admin credentials');
    console.log('Reloading page...');
    setTimeout(() => window.location.reload(), 1000);
  }
};

console.log('Debug Auth loaded! Available commands:');
console.log('- debugAuth.checkPhone("0800000001")');
console.log('- debugAuth.checkLocalStorage()');
console.log('- debugAuth.setAdminPhone()');
console.log('- debugAuth.clearAndSetAdmin()');

export default window.debugAuth;