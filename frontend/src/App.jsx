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
import VideoPage from "./components/studyTubeComponents/VideoPage";
import SearchResults from "./components/studyTubeComponents/SearchResultPage";

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
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/quiz/:quizId" element={<QuizPage />} />
      <Route path="/my-quizzes" element={<MyQuizzes />} />
      <Route path="/challenge/:id" element={<ChallengeFriendPage />} />
      <Route path="/current-affairs" element={<CurrentAffairs />} />
      <Route path="/study-tube/search=:query" element={<SearchResults />} />
      <Route
        path="/video/:videoId"
        element={
          <StudyTubeLayout>
            <StudyTube />
          </StudyTubeLayout>
        }
      />
      <Route
        path="/study-tube"
        element={
          <StudyTubeLayout>
            <StudyTube />
          </StudyTubeLayout>
        }
      />
    </Routes>
  );
};



export default App;
