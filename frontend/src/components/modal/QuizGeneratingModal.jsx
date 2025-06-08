// // src/components/LottieModal.js
// import React from "react";

// import quizGeneratingAnimation from "../../assets/quizGeneratingAnimation.json";
// import Lottie from "lottie-react";

// const QuizGeneratingModal = ({ isOpen, onClose, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 blur-1xl flex items-center justify-center z-50">
//       <div
//         className={`relative rounded-2xl flex flex-col items-center justify-center gap-4 p-6 w-11/12 max-w-md shadow-xl transition-all 
//            dark:bg-gray-900 dark:text-white bg-white text-gray-800
//         `}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-red-500"
//         >
//           ×
//         </button>

//         {/* Animation */}
//         <Lottie
//           animationData={quizGeneratingAnimation}
//           loop
//           className="w-48 h-48 md:w-58 md:h-58 transition-all duration-300 group-hover:scale-110"
//         />

//         {/* Message */}
//         <p className="text-center mt-4 text-lg font-medium">{message}</p>
//       </div>
//     </div>
//   );
// };

// export default QuizGeneratingModal;
// src/components/LottieModal.js
import React, { useEffect, useState } from "react";
import quizGeneratingAnimation from "../../assets/quizGeneratingAnimation.json";
import doneAnimation from "../../assets/doneAnimation.json";
import Lottie from "lottie-react";

const QuizGeneratingModal = ({ isOpen, onClose, message, isSuccess }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating
          ? "bg-black/70 backdrop-blur-md"
          : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={handleBackdropClick}
      style={{
        backdropFilter: isAnimating ? "blur(8px) saturate(150%)" : "none",
        WebkitBackdropFilter: isAnimating ? "blur(8px) saturate(150%)" : "none",
      }}
    >
      {/* Modal Container */}
      <div
        className={`relative bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 w-full max-w-md transform transition-all duration-300 ease-out ${
          isAnimating
            ? "scale-100 opacity-100 translate-y-0 rotate-0"
            : "scale-75 opacity-0 translate-y-8 rotate-1"
        }`}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-75 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-110 hover:rotate-90 group"
          aria-label="Close modal"
        >
          <span className="text-xl font-light group-hover:font-bold transition-all duration-200">
            ×
          </span>
        </button>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          {/* Loading indicator dots */}
          <div className="flex gap-2 mb-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>

          {/* Main Animation Container */}
          <div className="relative group">
            {/* Rotating background circle */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-spin"
              style={{ animationDuration: "10s" }}
            />

            {/* Pulsing glow effect */}
            <div
              className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping"
              style={{ animationDuration: "2s" }}
            />

            {/* Lottie Animation */}
            <div className="relative transform transition-all duration-300 group-hover:scale-105">
              <Lottie
                animationData={
                  isSuccess ? doneAnimation : quizGeneratingAnimation
                }
                loop={!isSuccess}
                className={`w-56 h-56 md:w-64 md:h-64 transition-all duration-500 ${
                  isAnimating ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3))",
                }}
              />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <p
              className={`text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-500 ${
                isAnimating
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {isSuccess ? "Quiz Ready!" : message || "Generating your quiz..."}
            </p>

            {/* Animated progress bar */}
            <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"
                style={{
                  animation: "progress 2s ease-in-out infinite",
                }}
              />
            </div>

            <p
              className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-700 ${
                isAnimating
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              {isSuccess
                ? "You can now start your quiz!"
                : "This might take a few moments..."}
            </p>
          </div>
        </div>

        {/* Floating elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-40 animate-bounce transition-all duration-1000 ${
              isAnimating ? "opacity-40" : "opacity-0"
            }`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + (i % 2) * 80}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${1.5 + Math.random()}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizGeneratingModal;