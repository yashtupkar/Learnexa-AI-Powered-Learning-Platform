import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ResetPassword from './pages/ResetPassword';
import SignUpPage from './pages/SignUpPage';
import { Toaster } from 'react-hot-toast';
import LogInPage from './pages/LogInPage';
import EmailVerify from './pages/EmailVerify';
const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-account" element={<EmailVerify/>} />
      </Routes>
    </div>
  );
}

export default App