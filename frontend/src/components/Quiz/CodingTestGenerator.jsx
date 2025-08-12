
import { useContext, useState, useRef } from "react";
import {
  Code,
  Cpu,
  Hash,
  BarChart2,
  Briefcase,
  Sliders,
  ChevronDown,
  ChevronRight,
  RotateCw,
  Zap,
  Plus,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight as RightIcon,
} from "lucide-react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const CodingTestGeneration = () => {
  const [topic, setTopic] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("medium");
  const [questionsCount, setQuestionsCount] = useState(5);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState("javascript");
  const [targetCompany, setTargetCompany] = useState("");
  const [grade, setGrade] = useState("placement");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const { backend_URL } = useContext(AppContext);
  const sliderRef = useRef(null);

  const languages = [
    "javascript",
    "python",
    "java",
    "c++",
    "c#",
    "go",
    "ruby",
    "swift",
    "typescript",
    "php",
  ];

  const graderTypes = [
    { value: "placement", label: "Placement Preparation" },
    { value: "competitive", label: "Competitive Programming" },
    { value: "1-12", label: "Grade 1-12" },
    { value: "college", label: "College Level" },
  ];

  const popularCompanies = [
    "Google",
    "Amazon",
    "Microsoft",
    "Facebook",
    "Apple",
    "Netflix",
  ];

  // 10 most popular topics with unique background colors
  const popularTopics = [
    { name: "Arrays", bg: "bg-gradient-to-r from-cyan-500 to-blue-500" },
    { name: "Strings", bg: "bg-gradient-to-r from-purple-500 to-pink-500" },
    {
      name: "Linked Lists",
      bg: "bg-gradient-to-r from-orange-500 to-yellow-500",
    },
    { name: "Recursion", bg: "bg-gradient-to-r from-green-500 to-teal-500" },
    { name: "Sorting", bg: "bg-gradient-to-r from-red-500 to-orange-500" },
    {
      name: "Dynamic Programming",
      bg: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      name: "Binary Trees",
      bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
    { name: "Graphs", bg: "bg-gradient-to-r from-pink-500 to-rose-500" },
    {
      name: "OOP Concepts",
      bg: "bg-gradient-to-r from-teal-500 to-emerald-500",
    },
    {
      name: "System Design",
      bg: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

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

  const applyPreset = (presetTopic) => {
    setTopic(presetTopic);
    document.getElementById("topic")?.focus();
  };

  const generateTest = async () => {
    if (
      !topic ||
      !questionsCount ||
      !programmingLanguage ||
      !targetCompany ||
      !difficultyLevel ||
      !grade
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (!topic.trim()) {
      toast.error("Please enter a coding topic");
      return;
    }

    setIsGenerating(true);

    try {
      toast.success("Generating Coding test...");
      const requestData = {
        topic,
        questionsCount,
        difficultyLevel,
        programmingLanguage,
        grade,
        targetCompany,
        tags,
      };

      const { data } = await axios.post(
        `${backend_URL}/api/quiz/generate-coding-test`,
        requestData
      );

      if (data.success) {
        console.log(data);
        toast.success("Quiz Generated Successfully");
      } else {
        toast.error(data.message || "Failed to generate quiz.");
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Popular Topics Slider */}
          <div className="mt-4 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Popular Topics
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  type="button"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  type="button"
                >
                  <RightIcon size={16} />
                </button>
              </div>
            </div>

            <div
              ref={sliderRef}
              className="flex space-x-3 overflow-x-auto scrollbar-none py-2"
            >
              {popularTopics.map((topicItem, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(topicItem.name)}
                  className={`${topicItem.bg} text-white px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 shadow-md hover:shadow-lg transition-all transform hover:scale-105`}
                  type="button"
                >
                  {topicItem.name}
                </button>
              ))}
            </div>
          </div>
          {/* Topic input with slider */}
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
            >
              <Code size={16} className="mr-1.5" />
              Coding Topic <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="topic"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
                placeholder="e.g. Arrays, String, Loops, etc"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          </div>

          {/* Rest of your form components remain the same */}
          {/* Difficulty, Questions count, and Language */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
              >
                <BarChart2 size={16} className="mr-1.5" />
                Difficulty
              </label>
              <div className="relative">
                <select
                  id="difficulty"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
              >
                <Hash size={16} className="mr-1.5" />
                Questions
              </label>
              <div className="relative">
                <select
                  id="questions"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
                  value={questionsCount}
                  onChange={(e) => setQuestionsCount(parseInt(e.target.value))}
                >
                  {[3, 5, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num}
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
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
              >
                <Cpu size={16} className="mr-1.5" />
                Language
              </label>
              <div className="relative">
                <select
                  id="language"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
                  value={programmingLanguage}
                  onChange={(e) => setProgrammingLanguage(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Target Company and Grader Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
              >
                <Briefcase size={16} className="mr-1.5" />
                Target Company (optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="e.g. Google, Amazon"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  list="companies"
                />
                <datalist id="companies">
                  {popularCompanies.map((company) => (
                    <option key={company} value={company} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label
                htmlFor="grader"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
              >
                <BarChart2 size={16} className="mr-1.5" />
                Grader Type
              </label>
              <div className="relative">
                <select
                  id="grader"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  {graderTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Advanced options */}
          <div className="pt-2">
            <button
              className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              type="button"
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
              <div className="mt-4 space-y-4 px-4 pt-4 pb-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/50 transition-all">
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
                  >
                    <Hash size={16} className="mr-1.5" />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-gray-600 dark:text-indigo-100"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1.5 text-indigo-600 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white"
                          type="button"
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
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white"
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

          {/* Generate button */}
          <div className="pt-4">
            <button
              className="w-full py-3.5 bg-gradient-to-r cursor-not-allowed from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] shadow-md hover:shadow-lg disabled:opacity-70 disabled:transform-none disabled:shadow-md"
              onClick={generateTest}
              disabled
              type="button"
            >
              {isGenerating ? (
                <>
                  <RotateCw size={18} className="animate-spin" />
                  <span>Generating Coding Test...</span>
                </>
              ) : (
                <>
                  <Zap size={18} className="fill-white" />
                  <span>Generate Test</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="hidden lg:block z-10">
          <div className="sticky top-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
              <div className="bg-gradient-to-r from-[#f8ff00] to-[#3ad59f] rounded-xl px-4 py-2 mb-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-black tracking-wide text-center">
                  Coding Test Preview
                </h3>
              </div>

              <div className="space-y-5">
                {/* Topic Section */}
                <div className="bg-indigo-100 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm font-medium text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
                    Topic
                  </div>
                  <div className="text-gray-900 dark:text-white mt-1 truncate font-semibold">
                    {topic || "Not specified"}
                  </div>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Questions", value: questionsCount },
                    {
                      label: "Difficulty",
                      value: difficultyLevel,
                      isCap: true,
                    },
                    { label: "Language", value: programmingLanguage },
                    { label: "Company", value: targetCompany },
                  ].map(({ label, value, isCap }) => (
                    <div
                      key={label}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {label}
                      </div>
                      <div
                        className={`text-lg font-semibold text-gray-800 dark:text-white ${
                          isCap ? "capitalize" : ""
                        }`}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      🏷️ Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
                        >
                          🔖 {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="mt-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-blue-800 dark:text-blue-100 flex items-center gap-2">
                <Sparkles size={16} /> Pro Tip
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                Be specific with your topic for better results. For example:
                <br />
                <strong className="text-blue-800 dark:text-blue-100">
                  "JavaScript ES6 arrow functions"
                </strong>{" "}
                instead of just{" "}
                <strong className="text-blue-800 dark:text-blue-100">
                  "JavaScript"
                </strong>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingTestGeneration;