// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, Sparkles, Check, Zap, Clock } from "lucide-react";

// const CallToAction = () => {
//   const benefits = [
//     "AI-powered personalized learning paths",
//     "Unlimited quiz generation & practice tests",
//     "Distraction-free study environment",
//     "Advanced progress analytics & insights",
//   ];

//   return (
//     <section className="py-32 relative overflow-hidden">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900"></div>

//       {/* Animated Background Pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,119,198,0.2),transparent_50%)]"></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 opacity-20">
//         <motion.div
//           animate={{
//             y: [0, -20, 0],
//             rotate: [0, 5, 0],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         >
//           <Sparkles className="w-8 h-8 text-white" />
//         </motion.div>
//       </div>

//       <div className="absolute bottom-20 right-16 opacity-20">
//         <motion.div
//           animate={{
//             y: [0, 15, 0],
//             rotate: [0, -5, 0],
//             scale: [1, 0.9, 1],
//           }}
//           transition={{
//             duration: 6,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1,
//           }}
//         >
//           <Zap className="w-6 h-6 text-white" />
//         </motion.div>
//       </div>

//       <div className="absolute top-1/2 left-1/4 opacity-10">
//         <motion.div
//           animate={{
//             y: [0, -10, 0],
//             rotate: [0, 10, 0],
//           }}
//           transition={{
//             duration: 7,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2,
//           }}
//         >
//           <Clock className="w-5 h-5 text-white" />
//         </motion.div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="text-center">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8"
//           >
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <Sparkles className="w-4 h-4" />
//             <span>Limited Time - Free Premium Access</span>
//           </motion.div>

//           {/* Main Heading */}
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.1 }}
//             className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
//           >
//             Ready to{" "}
//             <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
//               Level Up
//             </span>
//             <br />
//             Your Learning?
//           </motion.h2>

//           {/* Description */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-4xl mx-auto leading-relaxed"
//           >
//             Join over 50,000 students and professionals who have transformed
//             their learning experience with Learnexa's revolutionary AI-powered
//             platform.
//           </motion.p>

//           {/* Benefits Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12"
//           >
//             {benefits.map((benefit, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
//                 className="flex items-center space-x-4 text-left bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
//                   <Check className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-indigo-100 font-medium">{benefit}</span>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
//           >
//             <motion.button
//               whileHover={{ scale: 1.02, y: -3 }}
//               whileTap={{ scale: 0.98 }}
//               className="group relative px-10 py-5 bg-white text-indigo-900 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-64"
//             >
//               <span className="relative z-10 flex items-center justify-center space-x-3">
//                 <span>Start Learning Now</span>
//                 <motion.div
//                   animate={{ x: [0, 4, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 >
//                   <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
//                 </motion.div>
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.02, y: -3 }}
//               whileTap={{ scale: 0.98 }}
//               className="px-10 py-5 border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl font-bold text-xl backdrop-blur-sm transition-all duration-300 min-w-64"
//             >
//               Watch Demo Video
//             </motion.button>
//           </motion.div>

//           {/* Trust Indicators */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.7 }}
//             className="border-t border-white/20 pt-12"
//           >
//             <p className="text-indigo-200 text-lg mb-8 font-medium">
//               Trusted by students from top universities worldwide
//             </p>

//             <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 mb-8">
//               {[
//                 "Harvard",
//                 "MIT",
//                 "Stanford",
//                 "Oxford",
//                 "Cambridge",
//                 "Yale",
//               ].map((university, index) => (
//                 <motion.div
//                   key={university}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
//                   className="text-white/60 text-lg font-semibold hover:text-white/80 transition-colors duration-200"
//                 >
//                   {university}
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Urgency Message */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.9 }}
//             className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-200 px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm"
//           >
//             <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
//             <Clock className="w-4 h-4" />
//             <span>Only 24 hours left for free premium access!</span>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CallToAction;
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, Zap, Clock } from "lucide-react";

const CallToAction = () => {
  const benefits = [
    "AI-powered personalized learning paths",
    "Unlimited quiz generation & practice tests",
    "Distraction-free study environment",
    "Advanced progress analytics & insights",
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900"></div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,119,198,0.2),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 sm:mb-7 md:mb-8 leading-tight"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Level Up
            </span>
            Your Learning?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-indigo-100 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            Join over 50,000 students and professionals who have transformed
            their learning experience with Learnexa's revolutionary AI-powered
            platform.
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex items-center space-x-3 sm:space-x-4 text-left bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-indigo-100 font-medium text-sm sm:text-base">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-indigo-900 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Start Learning Now</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="border-t border-white/20 pt-8 sm:pt-10 md:pt-12"
          >
            <p className="text-indigo-200 text-base sm:text-lg mb-6 sm:mb-8 font-medium">
              Trusted by students from top universities worldwide
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 opacity-60 mb-0">
              {[
                "Harvard",
                "MIT",
                "Stanford",
                "Oxford",
                "Cambridge",
                "Yale",
              ].map((university, index) => (
                <motion.div
                  key={university}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-white/60 text-sm sm:text-base md:text-lg font-semibold hover:text-white/80 transition-colors duration-200"
                >
                  {university}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;