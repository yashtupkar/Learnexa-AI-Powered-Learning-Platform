


import { useState, useCallback, useContext } from "react";
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
  Play,
  Share2,
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfQuizGeneration = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [gradeLevel, setGradeLevel] = useState("college");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customInstructions, setCustomInstructions] = useState("");
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a PDF file");
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        if (
          !confirm(
            "This PDF is large and may take longer to process. Continue?"
          )
        ) {
          return;
        }
      }

      setIsUploading(true);
      setFile(selectedFile);
      setIsUploading(false);
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

  const extractTextFromPdf = async (pdfFile) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let extractedText = "";
      const maxPages = 5;
      const maxChars = 10000;

      for (let i = 1; i <= Math.min(pdf.numPages, maxPages); i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      if (extractedText.length > maxChars) {
        const chunks = [];
        while (extractedText.length > 0) {
          chunks.push(extractedText.substring(0, maxChars));
          extractedText = extractedText.substring(maxChars);
        }
        return chunks;
      }

      return extractedText;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw error;
    }
  };

  const { backend_URL } = useContext(AppContext);

  const generateQuiz = async () => {
    if (!file) {
      const dropzone = document.querySelector(".dropzone");
      dropzone.classList.add("ring-2", "ring-red-500");
      setTimeout(() => {
        dropzone.classList.remove("ring-2", "ring-red-500");
      }, 2000);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedQuiz(null);

    try {
      const extractedText = await extractTextFromPdf(file);

      const payload = {
        pdfText: extractedText,
        questionsCount: questionCount,
        difficultyLevel: difficulty,
        questionTypes: questionType,
        grade: gradeLevel,
        customInstructions,
        includeAnswers,
      };

      const response = await axios.post(
        `${backend_URL}/api/quiz/generate-quiz-from-pdf`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setCurrentQuiz(response.data.quiz);
        setGeneratedQuiz(response.data.quiz);
      } else {
        throw new Error(response.data.message || "Failed to generate quiz");
      }
    } catch (error) {
      console.error("Quiz generation error:", error);
      setError(error.message || "Failed to generate quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setGeneratedQuiz(null);
    setFile(null);
    setError(null);
  };

  // Loading state during generation
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <RotateCw size={48} className="animate-spin text-indigo-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Generating Your Quiz...
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This may take a moment as we analyze your PDF and create questions.
        </p>
      </div>
    );
  }

 

  // Original form for quiz generation
  return (
    <div className="space-y-6">
      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {currentQuiz && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 md:p-6 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                {currentQuiz.quiz_title }
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  {currentQuiz.questions?.length || questionCount} questions
                </span>
                <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 capitalize">
                  {currentQuiz.difficultyLevel || difficulty}
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
                className="flex-1 md:flex-none cursor-pointer flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm md:text-base"
              >
                <Play size={16} />
                Start Quiz
              </button>

              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors text-sm md:text-base">
                <Share2 size={16} />
                Share
              </button>

            
            </div>
          </div>
        </div>
      )}

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
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeAnswers"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                checked={includeAnswers}
                onChange={(e) => setIncludeAnswers(e.target.checked)}
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