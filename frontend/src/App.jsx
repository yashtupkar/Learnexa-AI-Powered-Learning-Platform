// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LogInPage from "./pages/LogInPage";
// import SignUpPage from "./pages/SignUpPage";
// import Dashboard from "./pages/Dashboard";
// import CreateQuiz from "./pages/CreateQuiz";
// import QuizPage from "./pages/QuizPage";
// import MyQuizzes from "./pages/MyQuizzes";
// import EmailVerify from "./pages/EmailVerify";
// import ResetPassword from "./pages/ResetPassword";
// import ChallengeFriendPage from "./pages/ChallengeFriendPage";
// import CurrentAffairs from "./pages/CurrentAffairs";
// import StudyTube from "./pages/StudyTube";
// import SearchResults from "./components/studyTubeComponents/SearchResultPage";
// import HRInterviewPage from "./pages/HRInterviewPage";
// import HRQuestionDetailPage from "./pages/HRQuestionDetailPage";
// import QuestionsPage from "./pages/QuestionsPage";
// import SubjectTopicsPage from "./pages/SubjectTopicsPage";
// import QuestionEditPage from "./pages/QuestionsEditPage";
// import Layout from "./components/layouts/layout";
// import StreakMap from "./pages/StreakPage";
// import QuizInterface from "./pages/QuizInterface";
// import { Toaster } from "react-hot-toast";
// import SettingsPage from "./components/SettingPage";
// import NotificationPage from "./pages/NotificationPage";
// import ComingSoonPage from "./pages/ComingSoonPage";
// import PracticeArena from "./pages/PracticeArenaPage";
// import QuizResults from "./components/QuizInterface/QuizResults";
// import HelpSupportPage from "./pages/HelpSupportPage";
// import Pricing from "./pages/PricingPage";
// import AboutUs from "./pages/AboutUsPage";
// import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
// import TermsAndConditions from "./components/Legal/T&C";

// // Protected route component

// const App = () => {
//   return (
//     <>
//       <Toaster />
//       <Routes>
//         {/* Public routes */}
//         <Route element={<Layout />}>
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/create" element={<CreateQuiz />} />
//           <Route path="/quiz/:quizId" element={<QuizInterface />} />
//           <Route path="/quiz-result/:quizId" element={<QuizResults />} />

//           <Route path="/my-quizzes" element={<MyQuizzes />} />
//           <Route path="/challenge/:id" element={<ChallengeFriendPage />} />
//           <Route path="/current-affairs" element={<CurrentAffairs />} />
//           <Route path="/study-plan" element={<HRInterviewPage />} />
//           <Route path="/interview" element={<ComingSoonPage />} />
//           <Route path="/practice-arena" element={<PracticeArena />} />

//           <Route path="/streak" element={<StreakMap />} />
//           <Route path="/settings" element={<SettingsPage />} />
//           <Route path="/help-center" element={<HelpSupportPage />} />

//           <Route
//             path="/hr-interview/question/:id"
//             element={<HRQuestionDetailPage />}
//           />
//           <Route path="/:subject/:topic" element={<QuestionsPage />} />
//           <Route path="/:subject/:topic/edit" element={<QuestionEditPage />} />

//           <Route path="/study-tube/search=:query" element={<SearchResults />} />
//           <Route path="/:subject" element={<SubjectTopicsPage />} />
//           <Route
//             path="/video/:videoId"
//             element={
//               <Layout>
//                 <StudyTube />
//               </Layout>
//             }
//           />
//           <Route
//             path="/study-tube"
//             element={
//               <Layout>
//                 <StudyTube />
//               </Layout>
//             }
//           />
//           <Route path="/login" element={<LogInPage />} />
//         </Route>
//         <Route path="/" element={<HomePage />} />

//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/verify-account" element={<EmailVerify />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/notifications" element={<NotificationPage />} />
//         <Route path="/plans" element={<Pricing />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />

//         <Route path="/terms" element={<TermsAndConditions />} />
//       </Routes>
//     </>
//   );
// };

// export default App;
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
import SearchResults from "./components/studyTubeComponents/SearchResultPage";
import HRInterviewPage from "./pages/HRInterviewPage";
import HRQuestionDetailPage from "./pages/HRQuestionDetailPage";
import QuestionsPage from "./pages/QuestionsPage";
import SubjectTopicsPage from "./pages/SubjectTopicsPage";
import QuestionEditPage from "./pages/QuestionsEditPage";
import Layout from "./components/layouts/layout";
import StreakMap from "./pages/StreakPage";
import QuizInterface from "./pages/QuizInterface";
import { Toaster } from "react-hot-toast";
import SettingsPage from "./components/SettingPage";
import NotificationPage from "./pages/NotificationPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import PracticeArena from "./pages/PracticeArenaPage";
import QuizResults from "./components/QuizInterface/QuizResults";
import HelpSupportPage from "./pages/HelpSupportPage";
import Pricing from "./pages/PricingPage";
import AboutUs from "./pages/AboutUsPage";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import TermsAndConditions from "./components/Legal/T&C";
import InvitationLanding from "./pages/invitationPage";
import RcTopics from "./pages/RcTopics";
import ReadingComprehensionPage from "./pages/ReadingComprehensionPage";
import BulkQuestionUpload from "./pages/BulkQuestionsUpload";




const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes without layout */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-account" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/login" element={<LogInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quiz/:quizId" element={<QuizInterface />} />
        <Route path="/quiz-result/:quizId" element={<QuizResults />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/challenge/:id" element={<ChallengeFriendPage />} />
        <Route path="/current-affairs" element={<CurrentAffairs />} />
        <Route path="/study-plan" element={<HRInterviewPage />} />
        <Route path="/interview" element={<ComingSoonPage />} />
        <Route path="/practice-arena" element={<PracticeArena />} />
        <Route path="/streak" element={<StreakMap />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help-center" element={<HelpSupportPage />} />
        <Route path="/invitation" element={<InvitationLanding />} />

        <Route
          path="/hr-interview/question/:id"
          element={<HRQuestionDetailPage />}
        />
        <Route path="/:subject/:topic" element={<QuestionsPage />} />
        <Route
          path="/verbal-ability/reading-comprehension"
          element={<RcTopics />}
        />
        <Route
          path="/verbal-ability/reading-comprehension/:id"
          element={<ReadingComprehensionPage/>}
        />
        <Route path="/bulk-upload" element={<BulkQuestionUpload/>} />
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
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/plans" element={<Pricing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
};

export default App;