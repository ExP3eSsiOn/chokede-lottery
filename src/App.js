// src/App.js - แก้ไขแล้ว
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { LotteryProvider } from './context/LotteryContext';
import AppRouter from './components/AppRouter';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <LotteryProvider>
        <div className="App">
          <AppRouter />
        </div>
      </LotteryProvider>
    </AuthProvider>
  );
}

export default App;
