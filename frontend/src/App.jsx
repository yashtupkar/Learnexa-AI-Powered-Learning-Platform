import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import QuizPage from "./pages/QuizPage";
import MyQuizzes from "./pages/MyQuizzes";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import ChallengeFriendPage from "./pages/ChallengeFriendPage";
import CurrentAffairs from "./pages/CurrentAffairs";
import StudyTube from "./pages/StudyTube";
import StudyTubeLayout from "./components/layouts/studyTubeLayout";
import SearchResults from "./components/studyTubeComponents/SearchResultPage";
import HRInterviewPage from "./pages/HRInterviewPage";
import HRQuestionDetailPage from "./pages/HRQuestionDetailPage";
import QuestionsPage from "./pages/QuestionsPage";
import SubjectTopicsPage from "./pages/SubjectTopicsPage";
import QuestionEditPage from "./pages/QuestionsEditPage";
import Layout from "./components/layouts/layout";

// Protected route component

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verify-email" element={<EmailVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/quiz/:quizId" element={<QuizPage />} />
      <Route path="/my-quizzes" element={<MyQuizzes />} />
      <Route path="/challenge/:id" element={<ChallengeFriendPage />} />
      <Route path="/current-affairs" element={<CurrentAffairs />} />
      <Route path="/interview" element={<HRInterviewPage />} />
      <Route
        path="/hr-interview/question/:id"
        element={<HRQuestionDetailPage />}
      />
      <Route path="/:subject/:topic" element={<QuestionsPage />} />
      <Route path="/:subject/:topic/edit" element={<QuestionEditPage />} />

      <Route path="/study-tube/search=:query" element={<SearchResults />} />
      <Route path="/:subject" element={<SubjectTopicsPage />} />
      <Route
        path="/video/:videoId"
        element={
          <Layout>
            <StudyTube />
          </Layout>
        }
      />
      <Route
        path="/study-tube"
        element={
          <Layout>
            <StudyTube />
          </Layout>
        }
      />
    </Routes>
  );
};



export default App;
