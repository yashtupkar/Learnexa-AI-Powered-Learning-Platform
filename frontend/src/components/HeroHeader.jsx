import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Target, BarChart3 } from "lucide-react";

const HeroHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state?.auth || {});
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { text: "AI-Powered", icon: Brain },
    { text: "Instant", icon: Zap },
    { text: "Adaptive", icon: Target },
    { text: "Smart", icon: BarChart3 },
  ];

  // Auto-rotate features
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = features[currentFeature].icon;

  return (
    <div className="min-h-screen flex items-center pt-18 justify-center px-6 py-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto text-center">
        {/* AI Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Powered by AI
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          className="mb-6 text-lg text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isAuthenticated
            ? `Welcome back, ${user?.name || "learner"}!`
            : "Transform any content into quizzes"}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentFeature}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-4 text-blue-600 dark:text-blue-400"
            >
              <CurrentIcon className="w-12 h-12" />
              {features[currentFeature].text}
            </motion.span>
          </AnimatePresence>
          <br />
          <span className="text-gray-700 dark:text-gray-300">
            Quiz Generation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl mb-12 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Upload your content, paste text, or describe a topic. Our AI instantly
          creates personalized quizzes that adapt to your learning style and
          track your progress.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          className="flex justify-center gap-8 mb-12 text-sm text-gray-500 dark:text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>⚡ Generate in seconds</div>
          <div>📚 Any subject</div>
          <div>🎯 Adaptive difficulty</div>
          <div>📊 Progress tracking</div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center gap-2 justify-center">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Generate Quiz Now
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 text-gray-700 dark:text-gray-300"
          >
            Try Demo Quiz
          </motion.button>
        </motion.div>

        {/* How it works */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              1. Upload Content
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Paste text, upload documents, or describe any topic you want to
              learn
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              2. AI Generates
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our AI creates personalized questions tailored to your learning
              level
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              3. Learn & Track
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Take quizzes, get instant feedback, and monitor your progress
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center mx-auto opacity-60"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroHeader;
