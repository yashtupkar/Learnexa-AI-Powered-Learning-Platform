import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";

const HeroHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state?.auth || {});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [brainPulse, setBrainPulse] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const aiFeatures = [
    { text: "Adaptive", color: "from-cyan-400 to-purple-400" },
    { text: "Intelligent", color: "from-purple-400 to-pink-400" },
    { text: "Personalized", color: "from-pink-400 to-indigo-400" },
    { text: "Smart", color: "from-indigo-400 to-cyan-400" }
  ];


 

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % aiFeatures.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setBrainPulse(true);
      setTimeout(() => setBrainPulse(false), 1000);
    }, 3000);
    return () => clearInterval(pulseInterval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleQuizHover = (index) => {
    setActiveQuiz(index);
  };

  const AIBrainIcon = () => (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-cyan-300 transition-all duration-1000 ${brainPulse ? 'scale-110 text-cyan-200' : ''}`}
      animate={{
        rotate: [0, 5, -5, 0],
        y: [0, -10, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path
        d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M12 15.5C11.2 15.5 10.5 16.2 10.5 17S11.2 18.5 12 18.5 13.5 17.8 13.5 17 12.8 15.5 12 15.5ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10S9.79 14 12 14 16 12.21 16 10 14.21 6 12 6Z"
        fill="currentColor"
      />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </motion.svg>
  );

  const QuizIcon = () => (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-purple-300"
    >
      <path
        d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"
        fill="currentColor"
      />
    </motion.svg>
  );

  const FloatingQuizCard = ({ delay, question, answers, position, index }) => (
    <motion.div
      className={`absolute ${position} w-64 p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white border-opacity-20 text-sm cursor-pointer`}
      initial={{ opacity: 0, y: 20, rotate: -5 }}
      animate={{ 
        opacity: [0.7, 1, 0.7], 
        y: [0, -10, 0],
        rotate: [-5, 0, -5]
      }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onMouseEnter={() => handleQuizHover(index)}
      onMouseLeave={() => handleQuizHover(null)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <QuizIcon />
        <span className="font-semibold text-cyan-300">AI Quiz</span>
      </div>
      <p className="text-white mb-3">{question}</p>
      <div className="space-y-1">
        {answers.map((answer, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className={`text-purple-200 text-xs ${activeQuiz === index && i === floatingQuizzes[index].correct ? 'font-bold text-green-300' : ''}`}>
              {answer}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const NeuralNetwork = () => (
    <div className="absolute inset-0 opacity-20">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Neural network connections */}
        {[...Array(15)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${20 + (i * 7) % 60}%`}
            y1={`${15 + (i * 13) % 70}%`}
            x2={`${30 + (i * 11) % 50}%`}
            y2={`${25 + (i * 17) % 60}%`}
            stroke="cyan"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
        {/* Neural nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={`${25 + (i * 12) % 50}%`}
            cy={`${20 + (i * 15) % 60}%`}
            r="3"
            fill="cyan"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1, 1.2, 1, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-cyan-900 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      {/* Neural Network Background */}
      <NeuralNetwork />

      {/* Interactive Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

     

      {/* AI Cursor Glow */}
      <motion.div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.2 : 1
        }}
      >
        <div className="w-48 h-48 rounded-full bg-gradient-radial from-cyan-400 to-transparent blur-xl" />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* AI Brain Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <AIBrainIcon />
        </motion.div>

        {/* Greeting */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <motion.span 
            className="text-lg md:text-xl text-cyan-300 font-light tracking-wide"
            whileHover={{ scale: 1.05 }}
          >
            {isAuthenticated ? `Welcome back, ${user?.name || 'Learner'}!` : 'Welcome to the Future of Learning'}
          </motion.span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-r ${aiFeatures[currentFeature].color} bg-clip-text text-transparent`}
            >
              {aiFeatures[currentFeature].text}
            </motion.span>
          </AnimatePresence>{" "}
          AI-Powered
          <br />
          <motion.span 
            className="text-white"
            whileHover={{ 
              textShadow: "0 0 10px rgba(255,255,255,0.5)"
            }}
          >
            Quiz Platform
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          Experience learning like never before. Our AI creates personalized quizzes that adapt to your knowledge level and learning style in real-time.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-cyan-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
               Start AI Quiz
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold text-lg rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              View Analytics
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>



      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

   
    </div>
  );
};

export default HeroHeader;