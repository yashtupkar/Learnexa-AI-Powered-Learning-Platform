// components/quiz/QuizGeneration.js
import { useContext, useState, useEffect } from "react";
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
  Play,
  Edit,
  Share2,
  Download,
  Trash2,
  Check,
  Award,
  Plus,
  X,
  Eye,
  Info,
} from "lucide-react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import toast from 'react-hot-toast'
import QuizGeneratingModal from "../modal/QuizGeneratingModal";
import {useNavigate} from 'react-router-dom';

const QuizGeneration = () => {
  const [difficultyLevel, setDifficultyLevel] = useState("beginner");
  const [questionsCount, setQuestionsCount] = useState(5);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [questionTypes, setQuestionTypes] = useState("mcq");
  const [includeImages, setIncludeImages] = useState(false);
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [quizTimer, setquizTimer] = useState(10);
  const [quizReady, setquizReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
    const [topic, setTopic] = useState("");
    const [grade, setGrade] = useState("placements");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [showQuizGeneratingModal, setShowQuizGeneratingModal] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
 
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const { backend_URL } = useContext(AppContext);


  const presets = [
    {
      name: "Quick Practice",
      questions: 5,
      difficultyLevel: "intermediate",
      quizTimer: 15,
      type: "mcq",
      bgGradient:
        "bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600",
    },
    {
      name: "Exam Simulation",
      questions: 20,
      difficultyLevel: "advanced",
      quizTimer: 45,
      type: "mixed",
      bgGradient: "bg-gradient-to-r from-orange-500 to-yellow-500",
    },
    {
      name: "Flash Cards",
      questions: 15,
      difficultyLevel: "beginner",
      quizTimer: 5,
      type: "mixed",
      bgGradient: "bg-gradient-to-r from-green-500 to-teal-500",
    },
  ];
  

  
  const addTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const applyPreset = (preset) => {
    setSelectedPreset(preset.name);
    setQuestionsCount(preset.questions);
    setDifficultyLevel(preset.difficultyLevel);
    setquizTimer(preset.quizTimer);
    setQuestionTypes(preset.type);
  };

  const fetchSuggestions = async (input) => {
    try {
      const res = await axios.post(backend_URL + "/api/quiz/suggest-topic", {
        input,
      });
      setSuggestions(res.data.suggestions || []);
   
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false); // Move loading state management here
    }
  };

  const handleTopicChange = (e) => {
    const value = e.target.value;
    setTopic(value);
  };

  const handleSuggestionClick = (sug) => {
    setTopic(sug);
    setSuggestions([]);
  };
  
  const generateQuiz = async () => {

    setquizReady(false)
    // Validate topic input
    if (!topic.trim()) {
      const topicInput = document.getElementById("topic");
      topicInput.focus();
      topicInput.classList.add("ring-2", "ring-red-500");

      setTimeout(() => {
        topicInput.classList.remove("ring-2", "ring-red-500");
      }, 2000);

      return;
    }

    toast.success("Generating Quiz...");
    setIsGenerating(true);
    setShowQuizGeneratingModal(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Sending token:", token); 
      const { data } = await axios.post(
        backend_URL + "/api/quiz/generate-quiz",
        {
          topic,
          questionTypes,
          questionsCount,
          difficultyLevel,
          quizTimer: quizTimer,
          grade,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setCurrentQuiz(data.quiz);
        setquizReady(true);
        setTimeout(() => {
          setShowQuizGeneratingModal(false);
        }, 2000);
        toast.success("Quiz Generated Successfully");

        // You can optionally do:
        // setQuiz(data.quiz); // If you're saving quiz data
      } else {
        toast.error(data.message || "Failed to generate quiz.");
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsGenerating(false);
    }
  };
  const FeatureItem = ({ active, label }) => (
    <div className="flex items-center text-sm text-gray-700 dark:text-gray-400">
      <div
        className={`w-3 h-3 rounded-full mr-2 ${
          active ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
        }`}
      />
      {active ? label : `No ${label.toLowerCase()}`}
    </div>
  );
  

 return (
   <>
     <QuizGeneratingModal
       isOpen={showQuizGeneratingModal}
       onClose={() => setShowQuizGeneratingModal(false)}
       message="Generating your quiz, please wait..."
       isSuccess={quizReady}
     />

     {/* Current Quiz Card */}
     {currentQuiz && (
       <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-6 shadow-lg mb-6">
         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
           <div>
             <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
               {currentQuiz.quiz_title || topic}
             </h2>
             <div className="flex flex-wrap items-center gap-2 mt-2">
               <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                 {currentQuiz.questions?.length || questionsCount} questions
               </span>
               <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 capitalize">
                 {currentQuiz.difficultyLevel || difficultyLevel}
               </span>
               {currentQuiz.quizTimer > 0 && (
                 <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                   ⏱️ {currentQuiz.quizTimer || quizTimer} min
                 </span>
               )}
             </div>
           </div>

           <div className="flex flex-wrap gap-2 w-full md:w-auto">
             <button
               onClick={() => navigate(`/quiz/${currentQuiz._id}`)}
               className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm md:text-base"
             >
               <Play size={16} />
               Start Quiz
             </button>

             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm md:text-base">
               <Share2 size={16} />
               Share
             </button>

             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm md:text-base">
               <Download size={16} />
               Export
             </button>
           </div>
         </div>
       </div>
     )}

     <div className="space-y-6 z-10">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main form section */}
         <div className="lg:col-span-2 space-y-6">
           {/* Quick Presets */}
           <div>
             <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
               <Award size={16} className="mr-1.5" />
               QUICK PRESETS
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
               {presets.map((preset) => (
                 <button
                   key={preset.name}
                   className={`p-3 cursor-pointer rounded-lg border transition-all transform
                      ${preset.bgGradient} 
                      ${
                        selectedPreset === preset.name
                          ? "-translate-y-2 border-gray-800 bg-indigo-50 dark:bg-gray-700 ring-4 ring-blue-400 dark:ring-gray-700"
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                      }`}
                   onClick={() => applyPreset(preset)}
                 >
                   <div className="text-sm font-medium text-white">
                     {preset.name}
                   </div>
                   <div className="text-xs text-gray-300 mt-1">
                     {preset.questions} Qs • {preset.quizTimer || "No"} min
                   </div>
                 </button>
               ))}
             </div>
           </div>

           {/* Topic Input */}
           <div>
             <label
               htmlFor="topic"
               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
             >
               <BookOpen size={16} className="mr-1.5" />
               Quiz Topic <span className="text-red-500 ml-1">*</span>
             </label>
             <div className="relative">
               <input
                 type="text"
                 id="topic"
                 className="w-full  px-4 py-3 text-sm  border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:text-white transition-all"
                 placeholder="e.g. JavaScript Fundamentals, Organic Chemistry, World War II"
                 value={topic}
                 onChange={handleTopicChange}
                 required
               />
             </div>
           </div>

           {/* Difficulty and Questions Count */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label
                 htmlFor="difficulty"
                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
               >
                 <BarChart2 size={16} className="mr-1.5" />
                 Difficulty Level
               </label>
               <div className="relative">
                 <select
                   id="difficulty"
                   className="w-full px-4 py-3 text-sm  border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:text-white transition-all"
                   value={difficultyLevel}
                   onChange={(e) => setDifficultyLevel(e.target.value)}
                 >
                   <option value="beginner">Beginner</option>
                   <option value="intermediate">Intermediate</option>
                   <option value="advanced">Advanced</option>
                   <option value="expert">Expert</option>
                 </select>
                 <ChevronDown
                   size={16}
                   className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
                 />
               </div>
             </div>

             <div>
               <label
                 htmlFor="questions"
                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
               >
                 <BookOpen size={16} className="mr-1.5" />
                 Number of Questions
               </label>
               <div className="relative">
                 <select
                   id="questions"
                   className="w-full px-4 py-3 text-sm  border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:text-white transition-all"
                   value={questionsCount}
                   onChange={(e) => setQuestionsCount(parseInt(e.target.value))}
                 >
                   {[5, 10, 15, 20, 25, 30].map((num) => (
                     <option key={num} value={num}>
                       {num} questions
                     </option>
                   ))}
                 </select>
                 <ChevronDown
                   size={16}
                   className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
                 />
               </div>
             </div>

             <div>
               <label
                 htmlFor="question-type"
                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
               >
                 Question Type
               </label>
               <div className="relative">
                 <select
                   id="question-type"
                   className="w-full px-4 py-3 text-sm  border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:text-white"
                   value={questionTypes}
                   onChange={(e) => setQuestionTypes(e.target.value)}
                 >
                   <option value="mcq">Multiple Choice</option>
                   <option value="true-false">True/False</option>
                   <option value="short-answer">Short Answer</option>
                   <option value="fill-blank">Fill in the Blank</option>
                   <option value="mixed">Mixed Types</option>
                 </select>
                 <ChevronDown
                   size={16}
                   className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
                 />
               </div>
             </div>

             <div>
               <label
                 htmlFor="grade"
                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
               >
                 Grade
               </label>
               <div className="relative">
                 <select
                   id="grade"
                   className="w-full px-4 py-3 text-sm  border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:text-white"
                   value={grade}
                   onChange={(e) => setGrade(e.target.value)}
                 >
                   <option value="class-1to5">Class 1 to 5</option>
                   <option value="class-6to10">Class 5 to 10</option>
                   <option value="class-11">Class 11</option>
                   <option value="class-12">Class 12</option>
                   <option value="college-level">College Level</option>
                   <option value="placement-level">Placements</option>
                   <option value="upsc">UPSC</option>
                   <option value="jee/neet">JEE/NEET</option>
                 </select>
                 <ChevronDown
                   size={16}
                   className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
                 />
               </div>
             </div>
           </div>

           {/* Advanced Options */}
           <div className="pt-2">
             <button
               className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
               onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
             >
               <Sliders size={16} className="mr-2" />
               {showAdvancedOptions ? "Hide" : "Show"} Advanced Options
               {showAdvancedOptions ? (
                 <ChevronDown size={16} className="ml-1" />
               ) : (
                 <ChevronRight size={16} className="ml-1" />
               )}
             </button>

             {showAdvancedOptions && (
               <div className="mt-4 space-y-4 px-4 pt-4 pb-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-zinc-900 transition-all">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {/* Checkboxes */}
                   <div className="flex items-center">
                     <input
                       type="checkbox"
                       id="include-images"
                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-black"
                       checked={includeImages}
                       onChange={() => setIncludeImages(!includeImages)}
                     />
                     <label
                       htmlFor="include-images"
                       className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                     >
                       <span className="flex items-center">
                         <Image size={14} className="mr-1" />
                         Include images
                       </span>
                     </label>
                   </div>

                   <div className="flex items-center">
                     <input
                       type="checkbox"
                       id="include-explanations"
                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-black"
                       checked={includeExplanations}
                       onChange={() =>
                         setIncludeExplanations(!includeExplanations)
                       }
                     />
                     <label
                       htmlFor="include-explanations"
                       className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                     >
                       <span className="flex items-center">
                         <HelpCircle size={14} className="mr-1" />
                         Include explanations
                       </span>
                     </label>
                   </div>
                 </div>

                 {/* Time Limit */}
                 <div>
                   <label
                     htmlFor="time-limit"
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                   >
                     <Clock size={16} className="mr-1.5" />
                     Time Limit (minutes, 0 for unlimited)
                   </label>
                   <input
                     type="number"
                     id="time-limit"
                     min="0"
                     max="180"
                     className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:text-white"
                     value={quizTimer}
                     onChange={(e) => {
                       const value = parseInt(e.target.value);
                       setquizTimer(isNaN(value) ? 0 : value);
                     }}
                   />
                 </div>

                 {/* Tags */}
                 <div>
                   <label
                     htmlFor="tags"
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
                   >
                     <Tag size={16} className="mr-1.5" />
                     Tags
                   </label>
                   <div className="flex flex-wrap gap-2 mb-2">
                     {tags.map((tag) => (
                       <span
                         key={tag}
                         className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-gray-600 dark:text-indigo-100"
                       >
                         {tag}
                         <button
                           onClick={() => removeTag(tag)}
                           className="ml-1.5 text-indigo-600 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white"
                         >
                           <X size={14} />
                         </button>
                       </span>
                     ))}
                   </div>
                   <form onSubmit={addTag} className="flex">
                     <input
                       type="text"
                       id="tags"
                       className="flex-1 px-4 py-3 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:text-white"
                       placeholder="Add tags..."
                       value={currentTag}
                       onChange={(e) => setCurrentTag(e.target.value)}
                     />
                     <button
                       type="submit"
                       className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-xl flex items-center justify-center transition-colors"
                     >
                       <Plus size={18} />
                     </button>
                   </form>
                 </div>
               </div>
             )}
           </div>

           {/* Generate Button */}
           <div className="pt-4">
             <button
               className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] shadow-md hover:shadow-lg disabled:opacity-70 disabled:transform-none disabled:shadow-md text-sm md:text-base"
               onClick={generateQuiz}
               disabled={isGenerating}
             >
               {isGenerating ? (
                 <>
                   <RotateCw size={18} className="animate-spin" />
                   <span>Generating Your Quiz...</span>
                 </>
               ) : (
                 <>
                   <Zap size={18} className="fill-white" />
                   <span>Generate Quiz</span>
                 </>
               )}
             </button>
           </div>
         </div>

         {/* Preview Panel (hidden on mobile) */}
         {/* Right Panel - Preview */}
         <div className="hidden lg:block z-10">
           <div className="sticky top-6">
             {isGenerating ? (
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
                 <div className="flex flex-col items-center justify-center py-8">
                   <div className="relative mb-6">
                     <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                     <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                   </div>
                   <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                     Generating Your Quiz
                   </h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs">
                     This usually takes 10-30 seconds depending on complexity
                   </p>
                   <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                     <div
                       className="bg-blue-600 h-2 rounded-full animate-pulse"
                       style={{ width: "70%" }}
                     ></div>
                   </div>
                 </div>
               </div>
             ) : (
               <>
                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                   {/* Preview Header */}
                   <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-4">
                     <h2 className="font-semibold text-lg text-white flex items-center gap-2">
                       <Eye size={18} />
                       Live Preview
                     </h2>
                   </div>

                   {/* Preview Content */}
                   <div className="p-5 space-y-5">
                     {/* Preview Card */}
                     <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                       <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                         Quiz Preview
                       </div>
                       <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                         {topic || "Your Quiz Title"}
                       </h3>
                       <div className="mt-3 flex flex-wrap gap-2">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                           {questionsCount} questions
                         </span>
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 capitalize">
                           {difficultyLevel}
                         </span>
                         {quizTimer > 0 && (
                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                             ⏱️ {quizTimer} min
                           </span>
                         )}
                       </div>
                     </div>

                     {/* Settings Summary */}
                     <div className="space-y-4">
                       <div>
                         <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                           Quiz Settings
                         </h4>
                         <div className="grid grid-cols-2 gap-3">
                           <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                             <div className="text-xs text-gray-500 dark:text-gray-400">
                               Type
                             </div>
                             <div className="text-sm font-medium text-gray-800 dark:text-white capitalize">
                               {questionTypes === "mcq"
                                 ? "Multiple Choice"
                                 : questionTypes === "true-false"
                                 ? "True/False"
                                 : questionTypes === "short-answer"
                                 ? "Short Answer"
                                 : questionTypes === "fill-blank"
                                 ? "Fill Blank"
                                 : "Mixed"}
                             </div>
                           </div>
                           <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                             <div className="text-xs text-gray-500 dark:text-gray-400">
                               Time
                             </div>
                             <div className="text-sm font-medium text-gray-800 dark:text-white">
                               {quizTimer ? `${quizTimer} min` : "Unlimited"}
                             </div>
                           </div>
                           <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                             <div className="text-xs text-gray-500 dark:text-gray-400">
                               Grade
                             </div>
                             <div className="text-sm font-medium text-gray-800 dark:text-white capitalize">
                               {grade === "placements"
                                 ? "Placements"
                                 : grade === "class-1"
                                 ? "Class 1"
                                 : grade === "class-2"
                                 ? "Class 2"
                                 : grade}
                             </div>
                           </div>
                         </div>
                       </div>

                       {/* Features */}
                       <div>
                         <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                           Features
                         </h4>
                         <div className="space-y-2">
                           <div className="flex items-center gap-2">
                             <div
                               className={`w-2 h-2 rounded-full ${
                                 includeImages ? "bg-green-500" : "bg-gray-300"
                               }`}
                             ></div>
                             <span className="text-sm text-gray-700 dark:text-gray-300">
                               Images
                             </span>
                           </div>
                           <div className="flex items-center gap-2">
                             <div
                               className={`w-2 h-2 rounded-full ${
                                 includeExplanations
                                   ? "bg-green-500"
                                   : "bg-gray-300"
                               }`}
                             ></div>
                             <span className="text-sm text-gray-700 dark:text-gray-300">
                               Explanations
                             </span>
                           </div>
                         </div>
                       </div>

                       {/* Tags */}
                       {tags.length > 0 && (
                         <div>
                           <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                             Tags
                           </h4>
                           <div className="flex flex-wrap gap-2">
                             {tags.map((tag) => (
                               <span
                                 key={tag}
                                 className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                               >
                                 {tag}
                               </span>
                             ))}
                           </div>
                         </div>
                       )}
                     </div>
                   </div>
                 </div>

                 {/* Help Card */}
                 <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                   <div className="flex items-start gap-3">
                     <Info
                       size={18}
                       className="text-blue-500 mt-0.5 flex-shrink-0"
                     />
                     <div>
                       <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                         Quick Tips
                       </h4>
                       <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                         <li>Be specific with your topic for better results</li>
                         <li>Use tags to organize your quizzes</li>
                         <li>Try different difficulty levels</li>
                         <li>
                           Select appropriate grade level for targeted questions
                         </li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </>
             )}
           </div>
         </div>
       </div>
     </div>
   </>
 );
};

export default QuizGeneration;
