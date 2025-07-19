# Chokede Lottery Web Application

A modern React-based lottery web application integrated with the Spinmax API server, featuring comprehensive lottery management, real-time betting, and secure payment processing.

## 🚀 Features

### Core Functionality
- **Multi-type Lottery System**: Support for Thai, Lao, Hanoi, and Stock-based lotteries
- **Real-time Betting**: Place bets on active lottery rounds with live updates
- **Wallet Management**: Secure deposits, withdrawals, and transfers
- **Transaction History**: Complete financial transaction tracking
- **Result Checking**: Real-time lottery result updates

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface using Lucide React icons
- **Context-based State Management**: Efficient state handling with React Context
- **Real-time Updates**: Live data synchronization with the server
- **Offline Support**: Graceful fallback when server is unavailable

### Security & Authentication
- **JWT-based Authentication**: Secure token-based login system
- **2FA Support**: Two-factor authentication for enhanced security
- **Role-based Access**: User and admin role differentiation
- **Session Management**: Automatic session restoration and token refresh
- **Secure API Communication**: HTTPS-ready with proper CORS handling

## 📋 Requirements

- Node.js 16+ and npm
- Spinmax API Server (running on localhost:8080)
- Modern web browser with JavaScript enabled

## 🛠️ Installation

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chokede-lottery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Development: `http://localhost:3000`
   - Production build: `npm run build`

### Environment Configuration

Create a `.env` file with:
```env
# Spinmax API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1

# Application Settings
REACT_APP_ENV=development
REACT_APP_DEBUG=true
REACT_APP_NAME=Chokede Lottery
REACT_APP_VERSION=1.0.0

# Contact Information
REACT_APP_LINE_URL=https://line.me/R/ti/p/@lotteryservice

# Production (uncomment for production)
# REACT_APP_API_BASE_URL=https://api.chokede.com/api/v1
# REACT_APP_ENV=production
# REACT_APP_DEBUG=false
```

## 📊 Application Structure

### Project Architecture
```
src/
├── components/              # React components
│   ├── auth/               # Authentication components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── ProtectedRoute.js
│   ├── lottery/            # Lottery-related components
│   │   ├── LotteryGrid.js
│   │   ├── BettingForm.js
│   │   └── ResultDisplay.js
│   ├── wallet/             # Wallet management
│   │   ├── WalletBalance.js
│   │   ├── DepositForm.js
│   │   └── WithdrawForm.js
│   ├── admin/              # Admin components
│   │   ├── AdminDashboard.js
│   │   ├── UserManagement.js
│   │   └── TransactionManagement.js
│   └── common/             # Shared components
│       ├── Header.js
│       ├── Navigation.js
│       └── LoadingSpinner.js
├── context/                 # React Context providers
│   ├── AuthContext.js      # Authentication state
│   ├── LotteryContext.js   # Lottery data state
│   └── WalletContext.js    # Wallet state
├── hooks/                   # Custom React hooks
│   ├── useAuth.js
│   ├── useLottery.js
│   └── useWallet.js
├── services/                # API integration
│   ├── api.js              # Main API configuration
│   ├── lotteryService.js   # Lottery operations
│   └── authService.js      # Authentication services
├── utils/                   # Utility functions
│   ├── constants.js        # Application constants
│   ├── helpers.js          # Helper functions
│   └── testConnection.js   # API testing utilities
└── styles/                  # Styling
    ├── globals.css
    └── components/
```

### Key Components

#### Authentication System
- **Login/Register**: User authentication with phone number
- **Protected Routes**: Role-based route protection
- **Session Management**: Automatic token refresh and session restoration

#### Lottery System
- **Lottery Grid**: Display available lottery types and rounds
- **Betting Interface**: Place bets with amount validation
- **Result Display**: Show lottery results and winning numbers

#### Wallet Management
- **Balance Display**: Real-time wallet balance
- **Deposit/Withdraw**: Financial transaction forms
- **Transaction History**: Complete transaction tracking

#### Admin Interface
- **Dashboard**: Administrative overview and analytics
- **User Management**: User approval and management
- **Transaction Control**: Transaction approval and monitoring

## 🔧 API Integration

### Spinmax Server Integration

The application integrates with the Spinmax API server:

```javascript
// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

// Authentication
authAPI.login(phone, password)
authAPI.register(phone, password, referralCode)
authAPI.logout()

// Lottery Operations
publicLotteryAPI.getTypes()
publicLotteryAPI.getCurrentRounds()
bettingAPI.placeBet(roundId, bets)

// Wallet Operations
walletAPI.getBalance()
walletAPI.deposit(amount, slipImage)
walletAPI.withdraw(amount, bankAccount)
```

### Response Handling

The application handles multiple response formats from the Spinmax server:

```javascript
// Flexible response handling
const token = response.token || response.data?.token || response.data?.access_token;
const user = response.user || response.data?.user;
const balance = response.balance || response.data?.balance || 0;
```

### Error Handling

Comprehensive error handling with user-friendly messages:

```javascript
try {
  const response = await authAPI.login(phone, password);
  // Handle success
} catch (error) {
  if (error.message.includes('401')) {
    // Handle authentication error
  } else if (error.message.includes('Network')) {
    // Handle network error
  }
  // Display user-friendly error message
}
```

## 🔐 Security Features

### Authentication & Authorization
- JWT token-based authentication
- Automatic token refresh
- Role-based route protection (user/admin)
- Session persistence with security validation

### API Security
- CORS-compliant requests
- Secure token storage in localStorage
- Automatic logout on token expiry
- Request/response validation

### Input Validation
- Form validation with error messages
- Phone number format validation
- Amount validation for financial transactions
- XSS protection through React's built-in sanitization

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interfaces
- Adaptive layouts

### Modern Interface
- Clean and intuitive design
- Lucide React icons for consistency
- Loading states and feedback
- Error boundaries for stability

### User Experience
- Smooth navigation between sections
- Real-time updates without page refresh
- Offline-capable with graceful degradation
- Comprehensive feedback messages

## 🧪 Testing

### Development Testing
```bash
# Start development server
npm start

# Run tests (if configured)
npm test

# Build for production
npm run build
```

### API Integration Testing

Use the built-in test utility:

```javascript
// Test server connection
import { testSpinmaxConnection, testAuthentication } from './src/utils/testConnection.js';

// Test API connectivity
testSpinmaxConnection().then(console.log);

// Test authentication
testAuthentication('0812345678', 'password123').then(console.log);
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Lottery type display and betting
- [ ] Wallet balance and transactions
- [ ] Admin panel access (with admin account)
- [ ] Mobile responsiveness
- [ ] Error handling and recovery

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Serve static files
npx serve -s build
```

### Environment-specific Configuration

**Development:**
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

**Production:**
```env
REACT_APP_API_BASE_URL=https://api.chokede.com/api/v1
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

### Server Configuration

Ensure your Spinmax server CORS configuration includes your domain:

```go
// In Spinmax middleware/cors.go
AllowOrigins: []string{
    "http://localhost:3000",
    "http://localhost:3001", 
    "https://chokede.com"
}
```

## 📚 Development Guide

### Adding New Features

1. **Create Component**
   ```javascript
   // src/components/feature/NewComponent.js
   import React from 'react';
   
   const NewComponent = () => {
     return <div>New Feature</div>;
   };
   
   export default NewComponent;
   ```

2. **Add API Integration**
   ```javascript
   // src/services/api.js
   export const newFeatureAPI = {
     getData: async () => {
       return await apiCall('/new-endpoint');
     }
   };
   ```

3. **Update Context (if needed)**
   ```javascript
   // src/context/FeatureContext.js
   const FeatureContext = createContext();
   ```

### Code Style Guidelines

- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices
- Use descriptive variable names
- Comment complex logic
- Maintain consistent file structure

## 🐛 Troubleshooting

### Common Issues

**Network Error:**
- Check if Spinmax server is running on port 8080
- Verify CORS configuration in server
- Check browser console for specific errors

**Authentication Fails:**
- Verify API endpoints are correct
- Check token storage and retrieval
- Ensure server accepts the request format

**Lottery Data Not Loading:**
- Check if database has lottery types and rounds
- Verify API response format matches client expectations
- Check for server-side errors in logs

### Debug Mode

Enable debug mode in `.env`:
```env
REACT_APP_DEBUG=true
```

This will log all API calls and responses to browser console.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the troubleshooting section above
- Review the `SPINMAX_INTEGRATION.md` file for integration details
- Create an issue in the GitHub repository
- Check browser console for error messages

## 🔗 Related Projects

- **Spinmax API Server**: Go-based backend lottery management system
- **Admin Dashboard**: Administrative interface for system management
- **Mobile Apps**: React Native mobile applications

---

**Chokede Lottery Web Application** - Integrated with Spinmax API ❤️