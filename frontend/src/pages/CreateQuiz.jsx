// import React, { useState } from "react";
// import Layout from "../components/layouts/layout";
// import {
//   ChevronDown,
//   ChevronRight,
//   RotateCw,
//   Zap,
//   HelpCircle,
//   Image,
//   BookOpen,
//   Clock,
//   Tag,
//   Sliders,
//   Sparkles,
//   BarChart2,
//   Award,
//   Plus,
//   X,
// } from "lucide-react";
// import QuizGeneration from "../components/Quiz/QuizGenerator";
// import CodingTestGeneration from "../components/Quiz/CodingTestGenerator";
// import PdfQuizGeneration from "../components/Quiz/PdfQuizGenerator";

// const CreateQuiz = () => {
//   const [activeTab, setActiveTab] = useState("quiz");




//   return (
//     <Layout>
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//               {activeTab === "quiz"
//                 ? "Create New Quiz"
//                 : activeTab === "coding"
//                 ? "Generate New Coding Test"
//                 : "Generate Quiz From PDF"}
//             </h2>
//             <p className="text-gray-500 dark:text-gray-400 mt-1">
//               {activeTab === "quiz"
//                 ? "Generate a customized quiz tailored to your needs"
//                 : activeTab === "coding"
//                 ? "Prepare coding assessments based on skill level"
//                 : "Extract questions from uploaded PDF to auto-generate a quiz"}
//             </p>
//           </div>

//           <div className="mt-5   rounded-2xl p-5">
//             <h4 className="text-sm font-bold text-blue-800 dark:text-blue-100 flex items-center gap-2">
//               <Sparkles size={16} /> Pro Tip
//             </h4>
//             <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
//               Be specific with your topic for better results. For example:
//               <br />
//               <strong className="text-blue-800 dark:text-blue-100">
//                 "JavaScript ES6 arrow functions"
//               </strong>{" "}
//               instead of just{" "}
//               <strong className="text-blue-800 dark:text-blue-100">
//                 "JavaScript"
//               </strong>
//               .
//             </p>
//           </div>
//         </div>

//         {/* Tab System */}
//         <div className="mb-6">
//           <div className="flex border-b border-gray-200 dark:border-gray-700">
//             <button
//               className={`py-2 px-4 font-medium text-sm border-b-2 ${
//                 activeTab === "quiz"
//                   ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
//                   : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               }`}
//               onClick={() => setActiveTab("quiz")}
//             >
//               Standard Quiz
//             </button>
//             <button
//               className={`py-2 px-4 font-medium text-sm border-b-2 ${
//                 activeTab === "coding"
//                   ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
//                   : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               }`}
//               onClick={() => setActiveTab("coding")}
//             >
//               Coding Test
//             </button>
//             <button
//               className={`py-2 px-4 font-medium text-sm border-b-2 ${
//                 activeTab === "pdf"
//                   ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
//                   : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               }`}
//               onClick={() => setActiveTab("pdf")}
//             >
//               PDF Quiz
//             </button>
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div>
//           {activeTab === "quiz" && <QuizGeneration />}
//           {activeTab === "coding" && <CodingTestGeneration />}
//           {activeTab === "pdf" && <PdfQuizGeneration />}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateQuiz;
import React, { useState } from "react";
import Layout from "../components/layouts/layout";
import {
  ChevronDown,
  ChevronRight,
  RotateCw,
  Zap,
  HelpCircle,
  Image,
  BookOpen,
  Clock,
  Tag,
  Sliders,
  Sparkles,
  BarChart2,
  Award,
  Plus,
  X,
} from "lucide-react";
import QuizGeneration from "../components/Quiz/QuizGenerator";
import CodingTestGeneration from "../components/Quiz/CodingTestGenerator";
import PdfQuizGeneration from "../components/Quiz/PdfQuizGenerator";

const CreateQuiz = () => {
  const [activeTab, setActiveTab] = useState("quiz");

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {activeTab === "quiz"
                ? "Create New Quiz"
                : activeTab === "coding"
                ? "Generate Coding Test"
                : "Generate Quiz From PDF"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {activeTab === "quiz"
                ? "Generate a customized quiz tailored to your specific needs and preferences"
                : activeTab === "coding"
                ? "Create programming assessments with customizable difficulty levels and languages"
                : "Upload documents and automatically generate quizzes from the content"}
            </p>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 max-w-md">
            <div className="flex items-center gap-2">
              <Sparkles
                className="text-blue-600 dark:text-blue-300"
                size={18}
              />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Pro Tip
              </span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
              Be specific with your topic for better results. For example:
              <br />
              <span className="font-medium text-blue-800 dark:text-blue-100">
                "JavaScript ES6 arrow functions"
              </span>{" "}
              instead of just{" "}
              <span className="font-medium text-blue-800 dark:text-blue-100">
                "JavaScript"
              </span>
              .
            </p>
          </div>
        </div>

        {/* Tab System */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === "quiz"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("quiz")}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                Standard Quiz
              </div>
            </button>
            <button
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === "coding"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("coding")}
            >
              <div className="flex items-center gap-2">
                <Zap size={16} />
                Coding Test
              </div>
            </button>
            <button
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
                activeTab === "pdf"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("pdf")}
            >
              <div className="flex items-center gap-2">
                <Image size={16} />
                PDF Quiz
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="rounded-lg bg-white dark:bg-gray-800/50 p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          {activeTab === "quiz" && <QuizGeneration />}
          {activeTab === "coding" && <CodingTestGeneration />}
          {activeTab === "pdf" && <PdfQuizGeneration />}
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuiz;