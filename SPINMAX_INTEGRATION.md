# Spinmax Server Integration Guide

This document outlines the updates made to the Chokede-Lottery client to integrate with the Spinmax server.

## 🚀 Integration Overview

The client application has been successfully updated to work with the Spinmax lottery server. All mock implementations have been replaced with real API calls.

## 📋 Changes Made

### 1. ✅ API Configuration Updated
- **File**: `src/services/api.js`
- **Changes**: 
  - Base URL now uses environment variable: `process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1'`
  - Response handling updated for Spinmax server format
  - Authentication token handling improved

### 2. ✅ Environment Configuration
- **File**: `.env.example`
- **Changes**: 
  - Updated API base URL to point to Spinmax server
  - Added development/production environment variables
  - Added configuration documentation

### 3. ✅ Authentication System Replaced
- **File**: `src/context/AuthContext.js`
- **Changes**: 
  - Removed all mock authentication functions
  - Integrated real Spinmax API calls
  - Added 2FA support handling
  - Improved session restoration with server validation

### 4. ✅ Lottery Service Integration
- **File**: `src/services/lotteryService.js`
- **Changes**: 
  - Added Spinmax API integration methods
  - Maintained fallback to local data for offline functionality
  - Updated to handle server response formats

### 5. ✅ Admin Authentication
- **File**: `src/components/AdminRoute.js`
- **Status**: Already using role-based authentication (`user?.role !== 'admin'`)
- **Compatible**: Works perfectly with Spinmax server user roles

### 6. ✅ Response Data Mapping
- **Files**: Multiple API service files
- **Changes**: 
  - Updated all API calls to handle Spinmax response format
  - Added fallback data extraction (`response.data?.field || response.field`)
  - Improved error handling

## 🛠️ Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the project root:

```env
# Copy from .env.example and modify as needed
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

### 2. Start Spinmax Server

Ensure the Spinmax server is running:

```bash
cd /Users/expression/go/src/spinmax_final
go run main.go
```

Server should be accessible at `http://localhost:8080`

### 3. Start Client Application

```bash
cd /Users/expression/chokede-lottery
npm install
npm start
```

Application will be accessible at `http://localhost:3000`

## 🧪 Testing Integration

### Manual Testing

Use the test utility to verify connection:

```javascript
// In browser console
import { testSpinmaxConnection, testAuthentication } from './src/utils/testConnection.js';

// Test server connection
testSpinmaxConnection().then(console.log);

// Test authentication (use real credentials)
testAuthentication('0812345678', 'password123').then(console.log);
```

### Admin Access

- Login with admin credentials from Spinmax server
- Admin access is determined by `user.role === 'admin'` from server response
- No longer uses phone pattern matching

## 📊 API Endpoint Mapping

| Feature | Client Endpoint | Spinmax Endpoint | Status |
|---------|----------------|------------------|---------|
| Login | `/auth/login` | `/auth/login` | ✅ |
| Register | `/auth/register` | `/auth/register` | ✅ |
| Profile | `/profile` | `/profile` | ✅ |
| Balance | `/wallet/balance` | `/wallet/balance` | ✅ |
| Lottery Types | `/public/lottery/types` | `/public/lottery/types` | ✅ |
| Current Rounds | `/public/lottery/current` | `/public/lottery/current` | ✅ |
| Place Bet | `/bet/place` | `/bet/place` | ✅ |

## 🔐 Authentication Flow

### Standard Login
1. User enters phone/password
2. Client calls `/auth/login`
3. Server responds with token and user data
4. Client stores token and updates state

### 2FA Login (if enabled)
1. User enters phone/password
2. Client calls `/auth/login`
3. Server responds with `requires_otp: true`
4. Client prompts for OTP
5. Client calls `/auth/login/verify-otp`
6. Server responds with token and user data

## 🚨 Error Handling

- Network errors are handled gracefully
- Invalid tokens trigger automatic logout
- API errors are displayed to users
- Fallback data is used when server is unavailable

## 🔧 Production Deployment

### Environment Variables

For production, update `.env`:

```env
REACT_APP_API_BASE_URL=https://your-production-spinmax-api.com/api/v1
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

### CORS Configuration

Ensure Spinmax server allows requests from your client domain:

```go
// In Spinmax main.go
router.Use(cors.New(cors.Config{
    AllowOrigins: []string{
        "http://localhost:3000",  // Development
        "https://your-client-domain.com",  // Production
    },
    AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
}))
```

## 📝 Notes

1. **Backward Compatibility**: Local lottery category management is preserved as fallback
2. **Offline Support**: App gracefully handles server unavailability
3. **Security**: All authentication uses JWT tokens from Spinmax server
4. **Performance**: Response caching and error recovery implemented

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Spinmax server CORS configuration includes client URL
2. **Authentication Fails**: Verify server is running and credentials are correct
3. **API Errors**: Check server logs and network console for detailed errors

### Debug Mode

Enable debug mode in `.env`:
```env
REACT_APP_DEBUG=true
```

This will log all API calls and responses to browser console.

## ✅ Integration Status

All integration tasks completed successfully:

- ✅ API base URL configuration updated
- ✅ Mock authentication replaced with real API
- ✅ Response data mapping updated
- ✅ Environment configuration created
- ✅ Lottery service integration completed
- ✅ Admin authentication uses role-based approach
- ✅ Test utilities created

The client application is now fully integrated with the Spinmax server and ready for production use.