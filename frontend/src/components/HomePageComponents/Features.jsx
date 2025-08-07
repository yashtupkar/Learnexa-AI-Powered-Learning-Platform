// import React from "react";
// import { motion } from "framer-motion";
// import {
//   BookOpen,
//   Youtube,
//   Brain,
//   BarChart3,
//   Settings,
//   Zap,
//   ArrowUpRight,
//   Globe,
// } from "lucide-react";

// const Features = () => {
//   const features = [
//     {
//       icon: BookOpen,
//       title: "AI Quiz Generator",
//       description:
//         "Generate dynamic quizzes instantly with our AI engine that adapts to your subject matter and preferred challenge level.",
//       gradient: "from-blue-500 to-cyan-500",
//       bgGradient:
//         "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
//       delay: 0,
//     },
//     {
//       icon: Youtube,
//       title: "Distraction-Free YouTube",
//       description:
//         "Transform YouTube into a focused learning environment by removing distracting elements and enhancing educational content.",
//       gradient: "from-red-500 to-pink-500",
//       bgGradient:
//         "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
//       delay: 0.1,
//     },
//     {
//       icon: Brain,
//       title: "Aptitude & Reasoning Tests",
//       description:
//         "Enhance your problem-solving abilities with our carefully curated collection of aptitude and logical reasoning challenges.",
//       gradient: "from-purple-500 to-indigo-500",
//       bgGradient:
//         "from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20",
//       delay: 0.2,
//     },
//     {
//       icon: Globe,
//       title: "Current Affairs",
//       description:
//         "Stay informed with curated current affairs content, making it easier to prepare for competitive exams and knowledge tests.",
//       gradient: "from-green-500 to-emerald-500",
//       bgGradient:
//         "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
//       delay: 0.3,
//     },
//     {
//       icon: Settings,
//       title: "Personalized Learning",
//       description:
//         "Experience learning tailored just for you, with customized paths that evolve based on your progress and learning style.",
//       gradient: "from-orange-500 to-amber-500",
//       bgGradient:
//         "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
//       delay: 0.4,
//     },
//     {
//       icon: Zap,
//       title: "Smart Study Sessions",
//       description:
//         "Optimize your learning with intelligent study schedules that use proven memory retention techniques and timely revisions.",
//       gradient: "from-indigo-500 to-purple-500",
//       bgGradient:
//         "from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
//       delay: 0.5,
//     },
//   ];

//   return (
//     <section
//       id="features"
//       className="py-32 bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900 relative overflow-hidden"
//     >
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:20px_20px] opacity-20"></div>

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-20"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6"
//           >
//             <Zap className="w-4 h-4" />
//             <span>Powerful Features</span>
//           </motion.div>

//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
//             Everything You Need for{" "}
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
//               Smart Learning
//             </span>
//           </h2>
//           <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
//             Discover the comprehensive suite of AI-powered tools designed to
//             revolutionize your learning experience and accelerate your
//             educational journey.
//           </p>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: feature.delay }}
//               whileHover={{
//                 y: -8,
//                 transition: { duration: 0.3 },
//               }}
//               className="group relative"
//             >
//               {/* Card */}
//               <div
//                 className={`relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 h-full border border-white/20 dark:border-zinc-800/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-zinc-900/10 dark:group-hover:shadow-zinc-900/30`}
//               >
//                 {/* Icon */}
//                 <div className="relative mb-6">
//                   <div
//                     className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-zinc-900/10 group-hover:scale-110 transition-all duration-300`}
//                   >
//                     <feature.icon className="w-8 h-8 text-white" />
//                   </div>
                 
//                 </div>

//                 {/* Content */}
//                 <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-700 dark:group-hover:from-white dark:group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300">
//                   {feature.title}
//                 </h3>

//                 <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
//                   {feature.description}
//                 </p>

//                 {/* Learn More Link */}
//                 <div className="flex items-center text-sm font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
//                   <span>Learn more</span>
//                   <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
//                 </div>

//                 {/* Hover Gradient Border */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
//                 ></div>
//               </div>

//               {/* Background Glow */}
//               <div
//                 className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
//               ></div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="text-center mt-20"
//         >
//           <motion.button
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
//           >
//             <span className="relative z-10">Explore All Features</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
//           </motion.button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Features;
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Youtube,
  Brain,
  BarChart3,
  Settings,
  Zap,
  ArrowUpRight,
  Globe,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "AI Quiz Generator",
      description:
        "Generate dynamic quizzes instantly with our AI engine that adapts to your subject matter and preferred challenge level.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient:
        "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      delay: 0,
    },
    {
      icon: Youtube,
      title: "Distraction-Free YouTube",
      description:
        "Transform YouTube into a focused learning environment by removing distracting elements and enhancing educational content.",
      gradient: "from-red-500 to-pink-500",
      bgGradient:
        "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
      delay: 0.1,
    },
    {
      icon: Brain,
      title: "Aptitude & Reasoning Tests",
      description:
        "Enhance your problem-solving abilities with our carefully curated collection of aptitude and logical reasoning challenges.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient:
        "from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20",
      delay: 0.2,
    },
    {
      icon: Globe,
      title: "Current Affairs",
      description:
        "Stay informed with curated current affairs content, making it easier to prepare for competitive exams and knowledge tests.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient:
        "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      delay: 0.3,
    },
    {
      icon: Settings,
      title: "Personalized Learning",
      description:
        "Experience learning tailored just for you, with customized paths that evolve based on your progress and learning style.",
      gradient: "from-orange-500 to-amber-500",
      bgGradient:
        "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
      delay: 0.4,
    },
    {
      icon: Zap,
      title: "Smart Study Sessions",
      description:
        "Optimize your learning with intelligent study schedules that use proven memory retention techniques and timely revisions.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient:
        "from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
      delay: 0.5,
    },
  ];

  return (
    <section
      id="features"
      className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-zinc-50/50 to-white dark:from-zinc-900/50 dark:to-zinc-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:20px_20px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Powerful Features</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-500  bg-clip-text text-transparent">
              Smart Learning
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover the comprehensive suite of AI-powered tools designed to
            revolutionize your learning experience and accelerate your
            educational journey.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 px-2 sm:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              {/* Card */}
              <div
                className={`relative bg-gradient-to-br ${feature.bgGradient} rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 h-full border border-white/20 dark:border-zinc-800/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-lg sm:group-hover:shadow-xl group-hover:shadow-zinc-900/10 dark:group-hover:shadow-zinc-900/30`}
              >
                {/* Icon */}
                <div className="relative mb-4 sm:mb-5 md:mb-6">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-zinc-900/10 group-hover:scale-105 sm:group-hover:scale-110 transition-all duration-300`}
                  >
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-700 dark:group-hover:from-white dark:group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="flex items-center text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>

                {/* Hover Gradient Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                ></div>
              </div>

              {/* Background Glow */}
              <div
                className={`absolute -inset-0.5 sm:-inset-1 bg-gradient-to-br ${feature.gradient} rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-15 sm:group-hover:opacity-20 transition-opacity duration-500 -z-10`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;