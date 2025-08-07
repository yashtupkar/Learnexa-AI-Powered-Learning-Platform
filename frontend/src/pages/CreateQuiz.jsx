// import React, { useEffect, useState } from "react";
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
// import { useSearchParams } from "react-router-dom";
// import { Helmet } from "react-helmet-async";

// const CreateQuiz = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [activeTab, setActiveTab] = useState("quiz");

//   useEffect(() => {
//     const tab = searchParams.get("tab");
//     if (tab) {
//       setActiveTab(tab);
//     }
//   }, [searchParams]);

//   const handleTabChange = (tabName) => {
//     setSearchParams({ tabs: tabName });
//     setActiveTab(tabName);
//   };



//   return (
//     <Layout>
//       <Helmet>
//         <title>Create Quiz | Learnexa</title>
//       </Helmet>
//       <div className="p-6 max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row gap-6 justify-between">
//           <div className="space-y-2">
//             <h2 className="text-3xl  text-gray-800 dark:text-white">
//               {activeTab === "quiz"
//                 ? "Create New Quiz"
//                 : activeTab === "coding"
//                 ? "Generate Coding Test"
//                 : "Generate Quiz From PDF"}
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
//               {activeTab === "quiz"
//                 ? "Generate a customized quiz tailored to your specific needs and preferences"
//                 : activeTab === "coding"
//                 ? "Create programming assessments with customizable difficulty levels and languages"
//                 : "Upload documents and automatically generate quizzes from the content"}
//             </p>
//           </div>

//           {/* Pro Tip Card */}
//           <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 max-w-md">
//             <div className="flex items-center gap-2">
//               <Sparkles
//                 className="text-blue-600 dark:text-blue-300"
//                 size={18}
//               />
//               <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
//                 Pro Tip
//               </span>
//             </div>
//             <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
//               Be specific with your topic for better results. For example:
//               <br />
//               <span className="font-medium text-blue-800 dark:text-blue-100">
//                 "JavaScript ES6 arrow functions"
//               </span>{" "}
//               instead of just{" "}
//               <span className="font-medium text-blue-800 dark:text-blue-100">
//                 "JavaScript"
//               </span>
//               .
//             </p>
//           </div>
//         </div>

//         {/* Tab System */}
//         <div className="border-b border-gray-200 dark:border-gray-700">
//           <nav className="flex space-x-8">
//             <button
//               className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
//                 activeTab === "quiz"
//                   ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
//                   : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
//               }`}
//               onClick={() => handleTabChange("quiz")}
//             >
//               <div className="flex items-center gap-2">
//                 <BookOpen size={16} />
//                 Standard Quiz
//               </div>
//             </button>
//             <button
//               className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
//                 activeTab === "coding"
//                   ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
//                   : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
//               }`}
//               onClick={() => handleTabChange("coding")}
//             >
//               <div className="flex items-center gap-2">
//                 <Zap size={16} />
//                 Coding Test
//               </div>
//             </button>
//             <button
//               className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
//                 activeTab === "pdf"
//                   ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
//                   : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
//               }`}
//               onClick={() => handleTabChange("pdf")}
//             >
//               <div className="flex items-center gap-2">
//                 <Image size={16} />
//                 PDF Quiz
//               </div>
//             </button>
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="rounded-lg bg-white dark:bg-gray-800/50 p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
//           {activeTab === "quiz" && <QuizGeneration />}
//           {activeTab === "coding" && <CodingTestGeneration />}
//           {activeTab === "pdf" && <PdfQuizGeneration />}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateQuiz;

import React, { useEffect, useState } from "react";
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
  Crown,
} from "lucide-react";
import QuizGeneration from "../components/Quiz/QuizGenerator";
import CodingTestGeneration from "../components/Quiz/CodingTestGenerator";
import PdfQuizGeneration from "../components/Quiz/PdfQuizGenerator";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CreateQuiz = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("quiz");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
    setActiveTab(tabName);
  };

  return (
    <Layout>
      <Helmet>
        <title>Create Quiz | Learnexa</title>
      </Helmet>
      <div className="p-3 md:p-6 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl  text-gray-800 dark:text-white">
              {activeTab === "quiz"
                ? "Create New Quiz"
                : activeTab === "pdf"
                ? "Generate Quiz From PDF"
                : "Generate Coding Test"}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base dark:text-gray-400 max-w-2xl">
              {activeTab === "quiz"
                ? "Generate a customized quiz tailored to your specific needs and preferences"
                : activeTab === "pdf"
                ? "Upload documents and automatically generate quizzes from the content"
                : "Premium feature: Create programming assessments with customizable difficulty levels and languages"}
            </p>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-gradient-to-br hidden md:block from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/50 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 max-w-md">
            <div className="flex items-center gap-2">
              <Sparkles
                className="text-blue-600 dark:text-blue-300"
                size={18}
              />
              <span className="text-xs md:text-sm font-semibold text-blue-700 dark:text-blue-300">
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

        {/* Enhanced Tab System */}
        <div className="relative">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-2">
              <button
                className={`py-2 md:py-3 px-2 md:px-4  cursor-pointer font-medium text-xs md:text-sm  rounded-t-lg  flex items-center gap-2 ${
                  activeTab === "quiz"
                    ? "bg-white dark:bg-gray-800 border-t border-x border-gray-200 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 "
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => handleTabChange("quiz")}
              >
                <BookOpen size={16} className="flex-shrink-0" />
                <span>Standard Quiz</span>
              </button>

              <button
                className={`py-2 md:py-3 px-2 md:px-4 font-medium cursor-pointer text-xs md:text-sm  rounded-t-lg  flex items-center gap-2 ${
                  activeTab === "pdf"
                    ? "bg-white dark:bg-gray-800 border-t border-x border-gray-200 dark:border-gray-700 text-indigo-600 dark:text-indigo-400 "
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => handleTabChange("pdf")}
              >
                <Image size={16} className="flex-shrink-0" />
                <span>PDF Quiz</span>
              </button>

              <button
                className={`py-2 md:py-3 px-2 md:px-4 font-medium text-xs md:text-sm  cursor-pointer rounded-t-lg  flex items-center gap-2 relative ${
                  activeTab === "coding"
                    ? "bg-white dark:bg-gray-800 border-t border-x border-gray-200 dark:border-gray-700 text-amber-600 dark:text-amber-400 "
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => handleTabChange("coding")}
              >
                <div className="relative">
                  <Zap size={16} className="flex-shrink-0" />
                </div>
                <span>Coding Test</span>
                <span className="ml-1 flex items-center gap-2 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 text-amber-800 dark:text-amber-200">
                  <Crown size={12} className=" text-amber-500" /> <span className="hidden md:block">Premium</span>
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-b-lg rounded-tr-lg bg-white dark:bg-gray-800/50 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          {activeTab === "quiz" && <QuizGeneration />}
          {activeTab === "pdf" && <PdfQuizGeneration />}
          {activeTab === "coding" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 flex items-start gap-4">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
                  <Crown
                    className="text-amber-600 dark:text-amber-400"
                    size={20}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base text-amber-900 dark:text-amber-200">
                    Premium Feature
                  </h3>
                  <p className="text-xs md:text-sm text-amber-800 dark:text-amber-300 mt-1">
                    Coding tests are available with our Pro plan. Upgrade now to
                    unlock this feature and create customized programming
                    assessments for your candidates.
                  </p>
                  <button className="mt-3 text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-md md:text-sm font-medium shadow-sm transition-all duration-200">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
              <CodingTestGeneration />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuiz;