
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import quizGeneratingAnimation from "../../assets/quizGeneratingAnimation.json";
import { useNavigate } from "react-router-dom";

// Helper component for an inline SVG Crown Icon
const CrownIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.467 11.343L14.11 3.424a2.334 2.334 0 00-4.22 0L4.533 11.343a2.333 2.333 0 002.11 3.657h10.714a2.333 2.333 0 002.11-3.657zM12 17a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zm-5 2a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zm10 0a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1z" />
  </svg>
);

// Helper component for an inline SVG Arrow Icon for the button
const ArrowIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const UpgradeBanner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const navigate = useNavigate();

  const features = [
    "more powerful AI",
    "unlimited questions",
    "longer documents",
    "faster responses",
  ];

  // Rotate feature text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Generate a list of random particles for the background
  const particles = React.useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        scale: Math.random() * 0.7 + 0.2,
        duration: Math.random() * 5 + 5, // Slower, more subtle
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div
      className="relative w-full p-6 sm:p-8 rounded-2xl shadow-2xl overflow-hidden font-sans"
      style={{
        background:
          "linear-gradient(135deg, #4f46e5 0%, #a855f7 50%, #d946ef 100%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Particle System */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{
            left: p.x,
            top: p.y,
            width: `calc(1rem * ${p.scale})`,
            height: `calc(1rem * ${p.scale})`,
          }}
          animate={{
            y: ["0%", "20%", "-20%", "0%"],
            x: ["0%", "-10%", "10%", "0%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Left Side: Text Content */}
        <div className="text-white text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: isHovered ? [0, -15, 15, -15, 0] : 0 }}
              transition={{ duration: 0.7 }}
            >
              <CrownIcon className="text-yellow-300 text-3xl sm:text-4xl" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Unlock Your Full Potential
            </h2>
          </div>

          <p className="text-gray-200 text-base sm:text-lg max-w-lg mb-6">
            Upgrade to Premium for{" "}
            <span className="relative inline-block h-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  className="text-yellow-300 font-semibold"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {features[currentText]}
                </motion.span>
              </AnimatePresence>
            </span>
            , and accelerate your experience today!
          </p>

          <motion.button
            className="group relative inline-flex items-center justify-center bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.3)",
            }}
            onClick={() => {
              navigate('/plans')
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Upgrade Now{" "}
              <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            {/* Glossy sweep effect on hover */}
            <motion.span
              className="absolute top-0 left-0 w-1/2 h-full bg-white/20 transform -skew-x-20"
              initial={{ x: "-150%" }}
              animate={{ x: isHovered ? "300%" : "-150%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.button>
        </div>

        {/* Right Side: Image */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0">
          <Lottie
            animationData={quizGeneratingAnimation}
            loop
            className="w-52 h-52 sm:w-48 sm:h-48 md:w-68 md:h-68 transition-all duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Progress dots for text rotation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 flex gap-2">
        {features.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentText ? "bg-yellow-300 scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default UpgradeBanner;