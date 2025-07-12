// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { Brain, Zap, Target, BarChart3 } from "lucide-react";

// const HeroHeader = () => {
//   const { isAuthenticated, user } = useSelector((state) => state?.auth || {});
//   const [currentFeature, setCurrentFeature] = useState(0);

//   const features = [
//     { text: "AI-Powered", icon: Brain },
//     { text: "Instant", icon: Zap },
//     { text: "Adaptive", icon: Target },
//     { text: "Smart", icon: BarChart3 },
//   ];

//   // Auto-rotate features
//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFeature((prev) => (prev + 1) % features.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   const CurrentIcon = features[currentFeature].icon;

//   return (
//     <div className="min-h-screen flex items-center pt-18 justify-center px-6 py-12 bg-gray-50 dark:bg-gray-950">
      
//       <div className="max-w-5xl mx-auto text-center">
//         {/* AI Badge */}
//         <motion.div
//           className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-full mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//           <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
//             Powered by AI
//           </span>
//         </motion.div>

//         {/* Greeting */}
//         <motion.p
//           className="mb-6 text-lg text-gray-600 dark:text-gray-400"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           {isAuthenticated
//             ? `Welcome back, ${user?.name || "learner"}!`
//             : "Transform any content into quizzes"}
//         </motion.p>

//         {/* Main Headline */}
//         <motion.h1
//           className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900 dark:text-white"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <AnimatePresence mode="wait">
//             <motion.span
//               key={currentFeature}
//               initial={{ opacity: 0, y: 20, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -20, scale: 0.9 }}
//               transition={{ duration: 0.4 }}
//               className="inline-flex items-center gap-4 text-blue-600 dark:text-blue-400"
//             >
//               <CurrentIcon className="w-12 h-12" />
//               {features[currentFeature].text}
//             </motion.span>
//           </AnimatePresence>
//           <br />
//           <span className="text-gray-700 dark:text-gray-300">
//             Quiz Generation
//           </span>
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p
//           className="text-xl mb-12 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           Upload your content, paste text, or describe a topic. Our AI instantly
//           creates personalized quizzes that adapt to your learning style and
//           track your progress.
//         </motion.p>

//         {/* Quick Stats */}
//         <motion.div
//           className="flex justify-center gap-8 mb-12 text-sm text-gray-500 dark:text-gray-500"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//         >
//           <div>⚡ Generate in seconds</div>
//           <div>📚 Any subject</div>
//           <div>🎯 Adaptive difficulty</div>
//           <div>📊 Progress tracking</div>
//         </motion.div>

//         {/* Action Buttons */}
//         <motion.div
//           className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <motion.button
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             <span className="flex items-center gap-2 justify-center">
//               <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//               Generate Quiz Now
//             </span>
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 text-gray-700 dark:text-gray-300"
//           >
//             Try Demo Quiz
//           </motion.button>
//         </motion.div>

//         {/* How it works */}
//         <motion.div
//           className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
//             <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <span className="text-2xl">📝</span>
//             </div>
//             <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
//               1. Upload Content
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Paste text, upload documents, or describe any topic you want to
//               learn
//             </p>
//           </div>

//           <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
//             <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
//             </div>
//             <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
//               2. AI Generates
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Our AI creates personalized questions tailored to your learning
//               level
//             </p>
//           </div>

//           <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
//             <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
//               <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//             </div>
//             <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
//               3. Learn & Track
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Take quizzes, get instant feedback, and monitor your progress
//             </p>
//           </div>
//         </motion.div>

//         {/* Scroll indicator */}
//         <motion.div
//           className="mt-20"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 0.5 }}
//         >
//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//             className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center mx-auto opacity-60"
//           >
//             <motion.div
//               animate={{ y: [0, 6, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
//             />
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroHeader;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  BookOpen,
  Youtube,
  Newspaper,
  Users,
  Target,
  Zap,
  Trophy,
  ChevronRight,
  Sparkles,
  Code,
  MessageCircle,
  BarChart3,
} from "lucide-react";

const HeroHeader = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Quiz Generator",
      description: "Generate personalized quizzes with AI for any topic",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      tags: ["Reliable", "Smart", "Adaptive"],
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: "Study Tube",
      description: "Distraction-free YouTube learning experience",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500/10",
      tags: ["Focused", "Clean", "Efficient"],
    },
    {
      icon: <Newspaper className="w-8 h-8" />,
      title: "Current Affairs",
      description: "Stay updated with latest current affairs & news",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      tags: ["Updated", "Relevant", "Comprehensive"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "HR Interview Prep",
      description: "Master HR interviews with AI-powered practice",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/10",
      tags: ["Interactive", "Realistic", "Effective"],
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Aptitude Training",
      description: "Sharpen quantitative and logical reasoning skills",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-500/10",
      tags: ["Precise", "Challenging", "Progressive"],
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Verbal Reasoning",
      description: "Enhance communication and verbal skills",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-500/10",
      tags: ["Articulate", "Clear", "Confident"],
    },
  ];

  const stats = [
    { number: "10K+", label: "Students" },
    { number: "95%", label: "Success Rate" },
    { number: "500+", label: "Companies" },
    { number: "50K+", label: "Questions" },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto py-16 lg:py-24 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center px-4 sm:px-6 lg:px-8">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 dark:border-blue-400/30"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                  AI-Powered Learning
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                Placement prep has never{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  looked so good
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Master your placement preparation with{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Learnexa
                </span>{" "}
                - The AI-powered platform that transforms how you learn and
                succeed.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning
                <ChevronRight className="inline w-5 h-5 ml-2" />
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Animated Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="relative h-96 lg:h-[500px] perspective-1000"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="w-full max-w-lg mx-auto"
                >
                  <div className="relative">
                    {/* Main Card */}
                    <motion.div
                      className="bg-white/80 h-[60vh] transform rotate-4 translate-x-2 translate-y-2 dark:bg-black backdrop-blur-xl border border-white-300 dark:border-white rounded-2xl p-8 shadow-2xl"
                      whileHover={{
                        y: -10,
                        rotateY: 5,
                        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className={`${features[currentCard].bgColor} rounded-2xl p-6 mb-6`}
                      >
                        <div
                          className={`text-white bg-gradient-to-r ${features[currentCard].color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
                        >
                          {features[currentCard].icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {features[currentCard].title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {features[currentCard].description}
                        </p>
                      </div>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {features[currentCard].tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Progress Indicator */}
                      <div className="flex justify-center space-x-2 mt-6">
                        {features.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentCard
                                ? "bg-blue-500 w-6"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>

                    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl -z-10 transform rotate-6 translate-x-2 translate-y-2" />
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-2xl -z-20 transform rotate-8 translate-x-4 translate-y-4" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Elements
            <motion.div
              className="absolute top-10 right-10 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Trophy className="w-6 h-6 text-white" />
            </motion.div> */}

            {/* <motion.div
              className="absolute bottom-10 left-10 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
              animate={{
                y: [0, -8, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Code className="w-5 h-5 text-white" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
              animate={{
                x: [0, 10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <BarChart3 className="w-4 h-4 text-white" />
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;