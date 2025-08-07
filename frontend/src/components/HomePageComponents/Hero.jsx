// import React from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Sparkles,
//   Brain,
//   BookOpen,
//   Play,
//   Star,
// } from "lucide-react";

// const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-zinc-50/50 to-indigo-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-indigo-950/20">
//       {/* Animated Background Grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

     
   




//       <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20">
//         <div className="flex flex-col items-center text-center">
//           {/* Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center "
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm"
//             >
//               <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
//               <Sparkles className="w-4 h-4" />
//               <span>AI-Powered Learning Revolution</span>
//             </motion.div>

//             {/* Main Headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 leading-[1.1]"
//             >
//               <span className="text-zinc-900 dark:text-white">Supercharge
              
//                 Your Learning
//               </span>
              
//               <br />
//               <span className="text-zinc-900 dark:text-white">with </span>
//               <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//                 Learnexa
//               </span>
//             </motion.h1>

//             {/* Subtitle */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//               className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-10 max-w-2xl mx-auto  leading-relaxed"
//             >
//               From smart quizzes to distraction-free studying – Learnexa is your
//               personal learning assistant powered by cutting-edge AI technology.
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.7 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center  mb-12"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
//               >
//                 <span className="relative z-10 flex items-center justify-center space-x-2">
//                   <span>Start Learning</span>
//                   <motion.div
//                     animate={{ x: [0, 4, 0] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   >
//                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
//                   </motion.div>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.02, y: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group px-8 py-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
//               >
//                 <Play className="w-5 h-5" />
//                 <span>Watch Demo</span>
//               </motion.button>
//             </motion.div>

//             {/* Social Proof */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.9 }}
//               className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
//             >
//               <div className="flex items-center space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className="w-5 h-5 text-yellow-400 fill-current"
//                   />
//                 ))}
//                 <span className="ml-2 text-zinc-600 dark:text-zinc-400 font-medium">
//                   4.9/5 from 10k+ users
//                 </span>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white text-xs font-bold"
//                     >
//                       {i}
//                     </div>
//                   ))}
//                 </div>
//                 <span className="text-zinc-600 dark:text-zinc-400 font-medium">
//                   Join 50k+ learners
//                 </span>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Hero Visual */}
       
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Brain,
  BookOpen,
  Play,
  Star,
  Zap,
  Users,
  Target,
  Trophy,
  LayoutPanelLeft,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);  

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    { icon: Brain, text: "AI-Powered", color: "from-blue-500 to-cyan-500" },
    {
      icon: Zap,
      text: "Lightning Fast",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      text: "Personalized",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      text: "Results Driven",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-zinc-50/50 to-indigo-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-indigo-950/20"
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Interactive Background Orbs */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full"
          >
       
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>AI Powered Larning</span>
        </motion.div>

            {/* Main Headline with Responsive Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold mb-6 sm:mb-8 leading-[1.1] px-2"
            >
              <motion.span
                className="text-zinc-900 dark:text-white inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Supercharge Your Learning
              </motion.span>
              <br className="hidden sm:block" />
              <span className="text-zinc-900 dark:text-white"> with </span>
              <motion.span
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent inline-block"
                whileHover={{ scale: 1.05 }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Learnexa
              </motion.span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 mb-8 sm:mb-10 max-w-xs sm:max-w-2xl mx-auto leading-relaxed px-4"
            >
              From smart quizzes to distraction-free studying – Learnexa is your
              personal learning assistant powered by cutting-edge AI technology.
            </motion.p>

            {/* Feature Pills - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 sm:flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 px-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r ${feature.color} text-white text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm cursor-pointer`}
                >
                  <feature.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 px-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => navigate(user ? "/dashboard" : "/login")}
                className="group relative px-6 py-3 sm:px-8 cursor-pointer sm:py-4 bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "100%" : "-100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {user ? (
                    <span>Start Learning</span>
                  ) : (
                    <span>Get Started</span>
                  )}

                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.div>
                </span>
              </motion.button>

              {user && (
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/dashboard")}
                  className="group px-6 py-3 sm:px-8 sm:py-4 cursor-pointer bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-600 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LayoutPanelLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  <span>Dashboard</span>
                </motion.button>
              )}
            </motion.div>

            {/* Enhanced Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 px-4"
            >
              <motion.div
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <span className="ml-2 text-zinc-600 dark:text-zinc-400 font-medium text-sm sm:text-base">
                  4.9/5 from 10k+ users
                </span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white text-xs font-bold cursor-pointer"
                    >
                      {i}
                    </motion.div>
                  ))}
                </div>
                <span className="text-zinc-600 dark:text-zinc-400 font-medium text-sm sm:text-base">
                  Join 50k+ learners
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;