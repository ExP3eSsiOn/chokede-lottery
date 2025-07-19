import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Layout from './Layout';

// Auth pages
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';

// Protected pages
import HomePage from './lottery/HomePage';
import BuyPage from './lottery/BuyPage';
import ResultsPageSimple from './lottery/ResultsPageSimple';
import YikiRoundsSimple from './lottery/YikiRoundsSimple';
import DepositPage from './wallet/DepositPage';
import WithdrawPage from './wallet/WithdrawPage';
import ContactPage from './contact/ContactPage';
import TicketsPage from './lottery/TicketsPage';
import YikiDebug from './lottery/YikiDebug';
import LotteryAdmin from './admin/LotteryAdmin';
import LotteryTest from './test/LotteryTest';
import AuthTest from './test/AuthTest';
import ClearAuth from './test/ClearAuth';
import TestAdmin from './test/TestAdmin';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/clear-auth" element={<ClearAuth />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/results" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="results" element={<ResultsPageSimple />} />
          <Route path="buy" element={<BuyPage />} />
          <Route path="deposit" element={<DepositPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="yiki/rounds" element={<YikiRoundsSimple />} />
          <Route path="debug" element={<YikiDebug />} />
          <Route path="admin" element={<AdminRoute><LotteryAdmin /></AdminRoute>} />
          <Route path="test" element={<LotteryTest />} />
          <Route path="auth-test" element={<AuthTest />} />
          <Route path="test-admin" element={<TestAdmin />} />
        </Route>

        {/* Catch all - redirect to results */}
        <Route path="*" element={<Navigate to="/results" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;