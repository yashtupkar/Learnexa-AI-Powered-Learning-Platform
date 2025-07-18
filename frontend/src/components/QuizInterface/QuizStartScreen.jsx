
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Brain,
  BookOpen,
  Timer,
  Medal,
  Play,
  Users,
  Book,
  Gift,
  ChevronRight,
  Share2,
  Star,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  Lightbulb,
  Zap,
  Trophy,
  Sparkles,
  Target,
  Crown,
  Flame,
} from "lucide-react";

const CountdownScreen2 = ({ onComplete, theme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Ready", "3", "2", "1", "GO!"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const isNumber = !isNaN(parseInt(steps[currentStep]));
  const isGo = steps[currentStep] === "GO!";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-gradient-to-br ${theme.colors} flex items-center justify-center z-50 overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-line-${i}`}
            className="absolute top-0 bottom-0 w-px bg-white"
            style={{ left: `${i * 5}%` }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-line-${i}`}
            className="absolute left-0 right-0 h-px bg-white"
            style={{ top: `${i * 5}%` }}
          />
        ))}
      </div>
      {/* Main countdown display */}
      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              scale: 0.3,
              opacity: 0,
              rotateY: -90,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotateY: 0,
            }}
            exit={{
              scale: 1.2,
              opacity: 0,
              rotateY: 90,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-3xl ${
                isGo
                  ? "bg-green-500/50"
                  : isNumber
                  ? "bg-white"
                  : "bg-yellow-500/50"
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />

            {/* Text display */}

            <motion.div
              className={`relative text-8xl md:text-9xl font-black tracking-wider  ${
                isGo
                  ? "text-green-400"
                  : isNumber
                  ? "text-white"
                  : "text-yellow-400"
              } drop-shadow-2xl`}
              animate={{
                scale: isGo ? [1, 1.1, 1] : [1, 1.05, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
              }}
            >
              {steps[currentStep]}
            </motion.div>

            {/* Subtitle for "Ready" */}
            {steps[currentStep] === "Ready" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl text-white/80 mt-4 font-medium"
              >
                Get ready to start your quiz!
              </motion.div>
            )}

            {/* Subtitle for "GO!" */}
            {steps[currentStep] === "GO!" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl text-white/80 mt-4 font-medium"
              >
                Let's begin!
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex items-center gap-3">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep ? "bg-green-500" : "bg-white/30"
                }`}
                animate={{
                  scale: index === currentStep ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  repeat: index === currentStep ? Infinity : 0,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
const CountdownScreen = ({ onComplete, theme }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Ready", "3", "2", "1", "GO!"];
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Initialize audio context when component mounts
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    setAudioContext(new AudioContext());

    return () => {
      if (audioContext) audioContext.close();
    };
  }, []);

  useEffect(() => {
    const playTone = () => {
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      // Only play tones for numbers and GO!
      // Higher frequency for GO! (1200Hz)
      if (steps[currentStep] === "GO!") {
        oscillator.frequency.value = 1200;
      } else if (!isNaN(parseInt(steps[currentStep]))) {
        oscillator.frequency.value = 440;
      } else {
        return; // Don't play tone for "Ready"
      }

      gainNode.gain.value = 0.3;

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.5
      );
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          playTone();
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete, currentStep, audioContext]);

  const isNumber = !isNaN(parseInt(steps[currentStep]));
  const isGo = steps[currentStep] === "GO!";
  const isReady = steps[currentStep] === "Ready";

  const getTextSize = () => {
    if (isGo) return "text-7xl sm:text-8xl md:text-9xl";
    if (isNumber) return "text-8xl sm:text-9xl md:text-[10rem]";
    return "text-5xl sm:text-6xl md:text-7xl";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-gradient-to-br ${theme.colors} flex flex-col items-center justify-center z-50 overflow-hidden`}
    >
      {/* Main countdown text */}
      <div className="flex-1 flex items-center justify-center w-full px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="text-center"
          >
            <motion.div
              className={`relative font-black tracking-wider ${getTextSize()} ${
                isGo
                  ? "text-green-400"
                  : isNumber
                  ? "text-white"
                  : "text-yellow-400"
              } drop-shadow-2xl`}
              animate={{
                scale: isGo ? [1, 1.2, 1] : isNumber ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {steps[currentStep]}
            </motion.div>

            {/* Subtitle */}
            {(isReady || isGo) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-lg sm:text-xl md:text-2xl ${
                  isGo ? "text-green-200" : "text-yellow-200"
                } mt-4 font-medium`}
              >
                {isReady ? "Get ready to start!" : "Let's begin!"}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicator - positioned at bottom with unique keys */}
      <div className="w-full flex justify-center pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {steps.map((_, index) => (
            <motion.div
              key={`step-${index}`}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index <= currentStep ? "bg-white" : "bg-white/30"
              }`}
              animate={{
                scale: index === currentStep ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: index === currentStep ? Infinity : 0,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const QuizStartScreen = ({
  quizData = {
    quiz_title: "Beginner Permutation Concepts Quiz",
    questions: [],
    quiz_timer: 10,
    difficultyLevel: "beginner",
    topic: "Permutation",
    grade: "placements",
    question_type: "mixed",
  },
  setQuizStarted = () => {},
  setQuizMode = () => {},
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("cyber");
  const [showSettings, setShowSettings] = useState(false);
  const [level, setLevel] = useState(5);
  const [isHoveringStart, setIsHoveringStart] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const controls = useAnimation();

  const themes = [
    {
      id: "neon",
      name: "Neon Dreams",
      colors: "from-indigo-900 via-purple-900 to-fuchsia-900",
      accent: "bg-gradient-to-r from-cyan-400 to-fuchsia-500",
    },
    {
      id: "cyber",
      name: "Cyber Punk",
      colors: "from-gray-900 via-blue-900 to-indigo-900",
      accent: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      id: "sunset",
      name: "Electric Sunset",
      colors: "from-orange-900 via-rose-900 to-fuchsia-900",
      accent: "bg-gradient-to-r from-yellow-400 to-red-500",
    },
    {
      id: "ocean",
      name: "Deep Ocean",
      colors: "from-blue-900 via-indigo-900 to-violet-900",
      accent: "bg-gradient-to-r from-teal-400 to-blue-500",
    },
  ];

  const currentTheme = themes.find((t) => t.id === selectedTheme);

  const difficultyColors = {
    beginner: "text-green-400 bg-green-900/50",
    intermediate: "text-yellow-400 bg-yellow-900/50",
    advanced: "text-orange-400 bg-orange-900/50",
    expert: "text-red-400 bg-red-900/50",
  };

  const totalQuestions = quizData.questions?.length || 0;
  const totalPoints = totalQuestions * 100;
  const passingScore = 70;
  const attempts = 3;
  const bestScore = 0;

  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;

      controls.start({
        x: (x - 0.5) * 20,
        y: (y - 0.5) * 20,
        transition: { type: "spring", damping: 10 },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [controls]);

  const handleStartQuiz = () => {
    setShowCountdown(true);
  };

  const handleStartPracticeQuiz = () => {
    setQuizMode("practice");

    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setQuizStarted(true);
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-br ${currentTheme.colors} relative overflow-hidden text-white`}
      >
        {/* Interactive Parallax Background */}
        <motion.div className="absolute inset-0" animate={controls}>
          {/* Animated grid lines */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute top-0 bottom-0 w-px bg-white"
                style={{ left: `${i * 5}%` }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                x: [0, Math.random() * 60 - 30],
                y: [0, Math.random() * 60 - 30],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          />
        </motion.div>

        <div className="relative z-10 p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen w-full max-w-md lg:max-w-xl mx-auto">
          {/* Header with User Stats */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center shadow-md"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 211, 238, 0.7)",
                      "0 0 0 6px rgba(34, 211, 238, 0)",
                      "0 0 0 0 rgba(34, 211, 238, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xs font-bold text-gray-900">
                    {level}
                  </span>
                </motion.div>
              </motion.div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Level {level} Scholar
                </div>
                <div className="text-xs text-gray-300/80">
                  {quizData.grade} Level
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>

          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 mb-6 border border-white/10 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-white">Sound Effects</span>
                    </div>
                    <motion.button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`w-12 h-6 rounded-full relative transition-all ${
                        soundEnabled ? "bg-cyan-500" : "bg-gray-600"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                          soundEnabled ? "right-0.5" : "left-0.5"
                        }`}
                        layout
                      />
                    </motion.button>
                  </div>

                  <div>
                    <span className="text-sm text-white mb-2 block">Theme</span>
                    <div className="grid grid-cols-4 gap-2">
                      {themes.map((theme) => (
                        <motion.button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`h-8 rounded-lg ${
                            theme.accent
                          } border-2 transition-all ${
                            selectedTheme === theme.id
                              ? "border-white scale-105"
                              : "border-transparent"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-orange-300 text-sm font-medium">
                    {quizData.question_type} Questions
                  </span>
                </div>
                <motion.div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    difficultyColors[quizData.difficultyLevel]
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {quizData.difficultyLevel.toUpperCase()}
                </motion.div>
              </div>

              <motion.h1
                className="text-2xl font-bold text-white mb-4 leading-tight"
                whileHover={{ x: 2 }}
              >
                {quizData.quiz_title}
              </motion.h1>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div
                  className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-300">Questions</div>
                  <div className="text-lg font-bold text-white">
                    {totalQuestions}
                  </div>
                </motion.div>
                <motion.div
                  className="bg-white/5 rounded-xl p-3 text-center border border-white/5 hover:border-white/10 transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Timer className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-300">Duration</div>
                  <div className="text-lg font-bold text-white">
                    {quizData.quiz_timer}m
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">Pass: {passingScore}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">Best: {bestScore}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300">{totalPoints} XP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full space-y-4"
          >
            {/* Primary Start Button */}
            <motion.button
              onClick={handleStartQuiz}
              className={`w-full ${currentTheme.accent} text-white py-4 rounded-xl font-bold text-lg shadow-xl transition-all relative overflow-hidden group`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHoveringStart(true)}
              onHoverEnd={() => setIsHoveringStart(false)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  x: isHoveringStart ? "100%" : "-100%",
                  opacity: isHoveringStart ? 0.2 : 0,
                }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex items-center justify-center gap-3">
                <motion.div
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  animate={{
                    scale: isHoveringStart ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </motion.div>
                <span>Start Quiz Challenge</span>
                <motion.div
                  animate={{
                    rotate: isHoveringStart ? [0, 20, -20, 0] : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.button>

            {/* Secondary Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                className="bg-indigo-600 hover:bg-indigo-600/80 backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-indigo-500/30"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="w-4 h-4" />
                <span>Challenge</span>
              </motion.button>

              <motion.button
                onClick={handleStartPracticeQuiz}
                className="bg-purple-600 hover:bg-purple-600/80 cursor-pointer backdrop-blur-md text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-purple-500/30"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Book className="w-4 h-4" />
                <span>Practice</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full mt-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-300">{totalPoints} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">
                  {attempts} attempts left
                </span>
              </div>
            </div>

            <motion.button
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4 text-white" />
              <span className="text-xs text-white">Share</span>
            </motion.button>
          </motion.div>

          {/* Topic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <Lightbulb className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white font-medium">
                {quizData.topic}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Countdown Screen */}
      <AnimatePresence>
        {showCountdown && (
          <CountdownScreen
            onComplete={handleCountdownComplete}
            theme={currentTheme}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default QuizStartScreen;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import {
//   Brain,
//   BookOpen,
//   Timer,
//   Medal,
//   Play,
//   Users,
//   Book,
//   Gift,
//   ChevronRight,
//   Share2,
//   Star,
//   RotateCcw,
//   Settings,
//   Volume2,
//   VolumeX,
//   Lightbulb,
//   Zap,
//   Trophy,
//   Sparkles,
//   Target,
//   Crown,
//   Flame,
// } from "lucide-react";

// const CountdownScreen = ({ onComplete, theme }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const steps = ["Ready", "3", "2", "1", "GO!"];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentStep((prev) => {
//         if (prev < steps.length - 1) {
//           return prev + 1;
//         } else {
//           clearInterval(timer);
//           setTimeout(() => onComplete(), 500);
//           return prev;
//         }
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [onComplete]);

//   const isNumber = !isNaN(parseInt(steps[currentStep]));
//   const isGo = steps[currentStep] === "GO!";
//   const isReady = steps[currentStep] === "Ready";

//   const getTextSize = () => {
//     if (isGo) return "text-7xl sm:text-8xl md:text-9xl";
//     if (isNumber) return "text-8xl sm:text-9xl md:text-[10rem]";
//     return "text-5xl sm:text-6xl md:text-7xl";
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className={`fixed inset-0 bg-gradient-to-br ${theme.colors} flex flex-col items-center justify-center z-50 overflow-hidden`}
//     >
//       {/* Grid background with unique keys */}
//       <div className="absolute inset-0 opacity-10">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <div
//             key={`h-line-${i}`}
//             className="absolute top-0 bottom-0 w-px bg-white"
//             style={{ left: `${i * 5}%` }}
//           />
//         ))}
//         {Array.from({ length: 20 }).map((_, i) => (
//           <div
//             key={`v-line-${i}`}
//             className="absolute left-0 right-0 h-px bg-white"
//             style={{ top: `${i * 5}%` }}
//           />
//         ))}
//       </div>

//       {/* Main countdown text */}
//       <div className="flex-1 flex items-center justify-center w-full px-4">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentStep}
//             initial={{ scale: 0.5, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 1.5, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 500, damping: 20 }}
//             className="text-center"
//           >
//             <motion.div
//               className={`relative font-black tracking-wider ${getTextSize()} ${
//                 isGo
//                   ? "text-green-400"
//                   : isNumber
//                   ? "text-white"
//                   : "text-yellow-400"
//               } drop-shadow-2xl`}
//               animate={{
//                 scale: isGo ? [1, 1.2, 1] : isNumber ? [1, 1.1, 1] : 1,
//               }}
//               transition={{ duration: 0.5, repeat: Infinity }}
//             >
//               {steps[currentStep]}
//             </motion.div>

//             {/* Subtitle */}
//             {(isReady || isGo) && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`text-lg sm:text-xl md:text-2xl ${
//                   isGo ? "text-green-200" : "text-yellow-200"
//                 } mt-4 font-medium`}
//               >
//                 {isReady ? "Get ready to start!" : "Let's begin!"}
//               </motion.div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Progress indicator - positioned at bottom with unique keys */}
//       <div className="w-full flex justify-center pb-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="flex items-center gap-2 sm:gap-3"
//         >
//           {steps.map((_, index) => (
//             <motion.div
//               key={`step-${index}`}
//               className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
//                 index <= currentStep ? "bg-white" : "bg-white/30"
//               }`}
//               animate={{
//                 scale: index === currentStep ? [1, 1.5, 1] : 1,
//               }}
//               transition={{
//                 duration: 0.6,
//                 repeat: index === currentStep ? Infinity : 0,
//               }}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// const QuizStartScreen = ({
//   quizData = {
//     quiz_title: "Beginner Permutation Concepts Quiz",
//     questions: [],
//     quiz_timer: 10,
//     difficultyLevel: "beginner",
//     topic: "Permutation",
//     grade: "placements",
//     question_type: "mixed",
//   },
//   setQuizStarted = () => {},
//   setQuizMode = () => {},
// }) => {
//   const [soundEnabled, setSoundEnabled] = useState(true);
//   const [selectedTheme, setSelectedTheme] = useState("cyber");
//   const [showSettings, setShowSettings] = useState(false);
//   const [level, setLevel] = useState(5);
//   const [isHoveringStart, setIsHoveringStart] = useState(false);
//   const [showCountdown, setShowCountdown] = useState(false);
//   const controls = useAnimation();

//   const capitalize = (val) => {
//     if (val === undefined || val === null) return "";
//     const str = val.toString().trim().toLowerCase();
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   const themes = [
//     {
//       id: "neon",
//       name: "Neon Dreams",
//       colors: "from-indigo-900 via-purple-900 to-fuchsia-900",
//       accent: "bg-gradient-to-r from-cyan-400 to-fuchsia-500",
//     },
//     {
//       id: "cyber",
//       name: "Cyber Punk",
//       colors: "from-gray-900 via-blue-900 to-indigo-900",
//       accent: "bg-gradient-to-r from-green-400 to-blue-500",
//     },
//     {
//       id: "sunset",
//       name: "Electric Sunset",
//       colors: "from-orange-900 via-rose-900 to-fuchsia-900",
//       accent: "bg-gradient-to-r from-yellow-400 to-red-500",
//     },
//     {
//       id: "ocean",
//       name: "Deep Ocean",
//       colors: "from-blue-900 via-indigo-900 to-violet-900",
//       accent: "bg-gradient-to-r from-teal-400 to-blue-500",
//     },
//   ];

//   const currentTheme = themes.find((t) => t.id === selectedTheme);

//   const difficultyColors = {
//     beginner: "text-green-400 bg-green-900/50",
//     intermediate: "text-yellow-400 bg-yellow-900/50",
//     advanced: "text-orange-400 bg-orange-900/50",
//     expert: "text-red-400 bg-red-900/50",
//   };

//   const totalQuestions = quizData.questions?.length || 0;
//   const totalPoints = totalQuestions * 100;
//   const passingScore = 70;
//   const attempts = 3;
//   const bestScore = 0;

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e;
//       const x = clientX / window.innerWidth;
//       const y = clientY / window.innerHeight;

//       controls.start({
//         x: (x - 0.5) * 20,
//         y: (y - 0.5) * 20,
//         transition: { type: "spring", damping: 10 },
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [controls]);

//   const handleStartQuiz = () => {
//     setQuizMode("quiz");
//     setShowCountdown(true);
//   };

//   const handleStartPracticeQuiz = () => {
//     setQuizMode("practice");
//     setShowCountdown(true);
//   };

//   const handleCountdownComplete = () => {
//     setShowCountdown(false);
//     setQuizStarted(true);
//   };

//   return (
//     <>
//       <div
//         className={`min-h-screen bg-gradient-to-br ${currentTheme.colors} relative overflow-hidden text-white`}
//       >
//         {/* Interactive Parallax Background */}
//         <motion.div className="absolute inset-0" animate={controls}>
//           {/* Grid background with unique keys */}
//           <div className="absolute inset-0 opacity-10">
//             {Array.from({ length: 20 }).map((_, i) => (
//               <motion.div
//                 key={`h-grid-${i}`}
//                 className="absolute top-0 bottom-0 w-px bg-white"
//                 style={{ left: `${i * 5}%` }}
//                 animate={{
//                   opacity: [0.3, 0.7, 0.3],
//                 }}
//                 transition={{
//                   duration: 4 + Math.random() * 3,
//                   repeat: Infinity,
//                   delay: Math.random() * 2,
//                 }}
//               />
//             ))}
//             {Array.from({ length: 20 }).map((_, i) => (
//               <motion.div
//                 key={`v-grid-${i}`}
//                 className="absolute left-0 right-0 h-px bg-white"
//                 style={{ top: `${i * 5}%` }}
//                 animate={{
//                   opacity: [0.3, 0.7, 0.3],
//                 }}
//                 transition={{
//                   duration: 4 + Math.random() * 3,
//                   repeat: Infinity,
//                   delay: Math.random() * 2,
//                 }}
//               />
//             ))}
//           </div>
//         </motion.div>

//         <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen w-full max-w-md lg:max-w-xl mx-auto">
//           {/* Header with User Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className="w-full mb-4 sm:mb-6 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-2 sm:gap-3">
//               <motion.div
//                 className="relative"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                   <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                 </div>
//                 <motion.div
//                   className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-400 rounded-full flex items-center justify-center shadow-md"
//                   animate={{
//                     scale: [1, 1.1, 1],
//                     boxShadow: [
//                       "0 0 0 0 rgba(34, 211, 238, 0.7)",
//                       "0 0 0 6px rgba(34, 211, 238, 0)",
//                       "0 0 0 0 rgba(34, 211, 238, 0)",
//                     ],
//                   }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <span className="text-[10px] sm:text-xs font-bold text-gray-900">
//                     {level}
//                   </span>
//                 </motion.div>
//               </motion.div>
//               <div>
//                 <div className="text-sm font-semibold text-white">
//                   Level {level} Scholar
//                 </div>
//                 <div className="text-xs text-gray-300/80">
//                   {quizData.grade} Level
//                 </div>
//               </div>
//             </div>

//             <motion.button
//               onClick={() => setShowSettings(!showSettings)}
//               className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
//               whileHover={{ rotate: 15 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </motion.button>
//           </motion.div>

//           {/* Settings Panel */}
//           <AnimatePresence>
//             {showSettings && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="w-full bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 mb-4 sm:mb-6 border border-white/10 overflow-hidden"
//               >
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       {soundEnabled ? (
//                         <Volume2 className="w-4 h-4 text-cyan-400" />
//                       ) : (
//                         <VolumeX className="w-4 h-4 text-gray-400" />
//                       )}
//                       <span className="text-sm text-white">Sound Effects</span>
//                     </div>
//                     <motion.button
//                       onClick={() => setSoundEnabled(!soundEnabled)}
//                       className={`w-12 h-6 rounded-full relative transition-all ${
//                         soundEnabled ? "bg-cyan-500" : "bg-gray-600"
//                       }`}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <motion.div
//                         className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
//                           soundEnabled ? "right-0.5" : "left-0.5"
//                         }`}
//                         layout
//                       />
//                     </motion.button>
//                   </div>

//                   <div>
//                     <span className="text-sm text-white mb-2 block">Theme</span>
//                     <div className="grid grid-cols-4 gap-2">
//                       {themes.map((theme) => (
//                         <motion.button
//                           key={`theme-${theme.id}`}
//                           onClick={() => setSelectedTheme(theme.id)}
//                           className={`h-8 rounded-lg ${
//                             theme.accent
//                           } border-2 transition-all ${
//                             selectedTheme === theme.id
//                               ? "border-white scale-105"
//                               : "border-transparent"
//                           }`}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Quiz Header Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="w-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/10 relative overflow-hidden"
//           >
//             <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16" />

//             <div className="relative">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
//                     <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                   </div>
//                   <span className="capitalize text-orange-300 text-xs sm:text-sm font-medium">
//                     {quizData.question_type} Questions
//                   </span>
//                 </div>
//                 <motion.div
//                   className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
//                     difficultyColors[quizData.difficultyLevel]
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   {quizData.difficultyLevel.toUpperCase()}
//                 </motion.div>
//               </div>

//               <motion.h1
//                 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight"
//                 whileHover={{ x: 2 }}
//               >
//                 {capitalize(quizData.quiz_title)}
//               </motion.h1>

//               <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
//                 <motion.div
//                   className="bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-white/5 hover:border-white/10 transition-all"
//                   whileHover={{ y: -2 }}
//                 >
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
//                     <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                   </div>
//                   <div className="text-xs text-gray-300">Questions</div>
//                   <div className="text-base sm:text-lg font-bold text-white">
//                     {totalQuestions}
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   className="bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center border border-white/5 hover:border-white/10 transition-all"
//                   whileHover={{ y: -2 }}
//                 >
//                   <div className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                     <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                   </div>
//                   <div className="text-xs text-gray-300">Duration</div>
//                   <div className="text-base sm:text-lg font-bold text-white">
//                     {quizData.quiz_timer}m
//                   </div>
//                 </motion.div>
//               </div>

//               <div className="flex items-center justify-between text-xs sm:text-sm">
//                 <div className="flex items-center gap-2 sm:gap-4">
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
//                     <span className="text-gray-300">Pass: {passingScore}%</span>
//                   </div>
//                   <div className="flex items-center gap-1 sm:gap-2">
//                     <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
//                     <span className="text-gray-300">Best: {bestScore}%</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-1 sm:gap-2">
//                   <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
//                   <span className="text-gray-300">{totalPoints} XP</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Action Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="w-full space-y-3 sm:space-y-4"
//           >
//             {/* Primary Start Button */}
//             <motion.button
//               onClick={handleStartQuiz}
//               className={`w-full ${currentTheme.accent} text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-xl transition-all relative overflow-hidden group`}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onHoverStart={() => setIsHoveringStart(true)}
//               onHoverEnd={() => setIsHoveringStart(false)}
//             >
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
//                 animate={{
//                   x: isHoveringStart ? "100%" : "-100%",
//                   opacity: isHoveringStart ? 0.2 : 0,
//                 }}
//                 transition={{ duration: 0.6 }}
//               />
//               <div className="relative flex items-center justify-center gap-2 sm:gap-3">
//                 <motion.div
//                   className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center"
//                   animate={{
//                     scale: isHoveringStart ? [1, 1.2, 1] : 1,
//                   }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-current ml-0.5" />
//                 </motion.div>
//                 <span>Start Quiz Challenge</span>
//                 <motion.div
//                   animate={{
//                     rotate: isHoveringStart ? [0, 20, -20, 0] : 0,
//                   }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </motion.div>
//               </div>
//             </motion.button>

//             {/* Secondary Buttons Grid */}
//             <div className="grid grid-cols-2 gap-2 sm:gap-3">
//               <motion.button
//                 className="bg-indigo-600 hover:bg-indigo-600/80 backdrop-blur-md text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all flex items-center justify-center gap-1 sm:gap-2 border border-indigo-500/30"
//                 whileHover={{ y: -1, scale: 1.01 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Users className="w-3 h-3 sm:w-4 sm:h-4" />
//                 <span className="text-sm sm:text-base">Challenge</span>
//               </motion.button>

//               <motion.button
//                 onClick={handleStartPracticeQuiz}
//                 className="bg-purple-600 hover:bg-purple-600/80 cursor-pointer backdrop-blur-md text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all flex items-center justify-center gap-1 sm:gap-2 border border-purple-500/30"
//                 whileHover={{ y: -1, scale: 1.01 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Book className="w-3 h-3 sm:w-4 sm:h-4" />
//                 <span className="text-sm sm:text-base">Practice</span>
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Bottom Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="w-full mt-4 sm:mt-6 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-2 sm:gap-4">
//               <div className="flex items-center gap-1 sm:gap-2">
//                 <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
//                 <span className="text-xs sm:text-sm text-gray-300">
//                   {totalPoints} XP
//                 </span>
//               </div>
//               <div className="flex items-center gap-1 sm:gap-2">
//                 <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
//                 <span className="text-xs sm:text-sm text-gray-300">
//                   {attempts} attempts left
//                 </span>
//               </div>
//             </div>

//             <motion.button
//               className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//               <span className="text-xs text-white">Share</span>
//             </motion.button>
//           </motion.div>

//           {/* Topic Badge */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-3 sm:mt-4"
//           >
//             <motion.div
//               className="inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-blue-400/30"
//               whileHover={{ scale: 1.05 }}
//             >
//               <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
//               <span className="text-xs sm:text-sm text-white font-medium">
//                 {quizData.topic}
//               </span>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Countdown Screen */}
//       <AnimatePresence>
//         {showCountdown && (
//           <CountdownScreen
//             onComplete={handleCountdownComplete}
//             theme={currentTheme}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default QuizStartScreen;
