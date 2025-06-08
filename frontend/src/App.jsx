import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ResetPassword from './pages/ResetPassword';
import SignUpPage from './pages/SignUpPage';
import toast, { Toaster } from 'react-hot-toast';
import LogInPage from './pages/LogInPage';
import EmailVerify from './pages/EmailVerify';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz';

import MyQuizzes from './pages/MyQuizzes';

import { useDispatch } from 'react-redux';
import { AppContext } from './context/AppContext';
import { loginFailure, loginStart, loginSuccess } from './redux/authSlice';
import QuizInterface from './pages/QuizPage';

const App = () => {

  const dispatch = useDispatch();
  const { backend_URL } = useContext(AppContext);

  const fetchUser = async () => {
    dispatch(loginStart());
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backend_URL}/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(loginSuccess(res.data)); 
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-account" element={<EmailVerify />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/quiz/:quizId" element={<QuizInterface />} />
      </Routes>
    </div>
  );
}

export default App