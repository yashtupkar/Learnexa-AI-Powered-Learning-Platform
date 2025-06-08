// components/quiz/PdfQuizGeneration.js
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  FileText,
  UploadCloud,
  X,
  Hash,
  BarChart2,
  BookOpen,
  Sliders,
  ChevronDown,
  ChevronRight,
  RotateCw,
  Zap,
} from "lucide-react";

const PdfQuizGeneration = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [gradeLevel, setGradeLevel] = useState("college");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.type === "application/pdf") {
        setIsUploading(true);
        // Simulate upload
        setTimeout(() => {
          setFile(selectedFile);
          setIsUploading(false);
        }, 1500);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
  };

  const generateQuiz = () => {
    if (!file) {
      // Add visual feedback
      const dropzone = document.querySelector(".dropzone");
      dropzone.classList.add("ring-2", "ring-red-500");
      setTimeout(() => {
        dropzone.classList.remove("ring-2", "ring-red-500");
      }, 2000);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* PDF Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center">
          <FileText size={16} className="mr-1.5" />
          Upload PDF <span className="text-red-500 ml-1">*</span>
        </label>
        <div
          {...getRootProps()}
          className={`dropzone border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragActive
              ? "border-indigo-500 bg-indigo-50 dark:bg-gray-700"
              : "border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500"
          }`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <RotateCw size={24} className="animate-spin text-indigo-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Uploading PDF...
              </p>
            </div>
          ) : file ? (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <FileText size={20} className="text-indigo-500" />
                <span className="text-sm font-medium text-gray-800 dark:text-white truncate max-w-xs">
                  {file.name}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <UploadCloud
                size={36}
                className="mx-auto text-gray-400 dark:text-gray-500"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isDragActive
                  ? "Drop the PDF here"
                  : "Drag & drop a PDF file, or click to select"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supported format: PDF (max 10MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Questions count and Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="questions"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
          >
            <Hash size={16} className="mr-1.5" />
            Number of Questions
          </label>
          <div className="relative">
            <select
              id="questions"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            >
              {[5, 10, 15, 20].map((num) => (
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
            htmlFor="difficulty"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
          >
            <BarChart2 size={16} className="mr-1.5" />
            Difficulty Level
          </label>
          <div className="relative">
            <select
              id="difficulty"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Question Type and Grade Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="questionType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
          >
            <Sliders size={16} className="mr-1.5" />
            Question Type
          </label>
          <div className="relative">
            <select
              id="questionType"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
              <option value="essay">Essay</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="gradeLevel"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:flex items-center"
          >
            <BookOpen size={16} className="mr-1.5" />
            Grade Level
          </label>
          <div className="relative">
            <select
              id="gradeLevel"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            >
              <option value="elementary">Elementary</option>
              <option value="middle-school">Middle School</option>
              <option value="high-school">High School</option>
              <option value="college">College</option>
              <option value="professional">Professional</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          {showAdvancedOptions ? (
            <ChevronDown size={16} className="mr-1" />
          ) : (
            <ChevronRight size={16} className="mr-1" />
          )}
          Advanced Options
        </button>

        {showAdvancedOptions && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Instructions
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
                rows={3}
                placeholder="Add specific instructions for quiz generation..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeAnswers"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label
                htmlFor="includeAnswers"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Include answer key
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={generateQuiz}
        disabled={isGenerating || !file}
        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl font-medium text-white ${
          isGenerating || !file
            ? "bg-indigo-400 dark:bg-indigo-600 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        } transition-colors`}
      >
        {isGenerating ? (
          <>
            <RotateCw size={18} className="animate-spin mr-2" />
            Generating Quiz...
          </>
        ) : (
          <>
            <Zap size={18} className="mr-2" />
            Generate Quiz
          </>
        )}
      </button>
    </div>
  );
};

export default PdfQuizGeneration;
