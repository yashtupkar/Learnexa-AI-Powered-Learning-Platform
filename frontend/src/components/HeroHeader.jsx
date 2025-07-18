// import React from "react";
// import { Star, Sparkles, Code, Target, Sun } from "lucide-react";
// import { motion } from "framer-motion";

// function HeroHeader() {
//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-white dark:bg-black overflow-hidden"
//     >
//       {/* Main Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12">
//           {/* Left Content */}
//           <motion.div 
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="space-y-8"
//           >
//             <div className="space-y-6">
//               <motion.h1 
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight"
//               >
//                 Ace Your Career with
//                 <motion.span 
//                   whileHover={{ scale: 1.05 }}
//                   className="inline-flex bg-gradient-to-br from-indigo-600 to-indigo-400 bg-clip-text text-transparent items-center gap-2"
//                 >
//                   Learnexa
//                 </motion.span>
//               </motion.h1>

//               <motion.p 
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//                 className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed"
//               >
//                 Master competitive exams and placement preparations with expert-led courses, 
//                 mock tests, and comprehensive study materials
//               </motion.p>
//             </div>

//             {/* CTA Buttons */}
//             <motion.div 
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="flex flex-col sm:flex-row gap-4"
//             >
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl"
//               >
//                 Practice Tests
//               </motion.button>
//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-white border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-gray-400 hover:bg-gray-50"
//               >
//                 Study Materials
//               </motion.button>
//             </motion.div>

//             {/* Rating Section */}
//             <motion.div 
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//               className="flex items-center gap-3 pt-4"
//             >
//               <motion.div 
//                 whileHover={{ scale: 1.1 }}
//                 className="flex items-center gap-1"
//               >
//                 <Star className="w-6 h-6 text-purple-600 fill-current" />
//                 <span className="text-2xl font-bold text-gray-900">4.8/5</span>
//               </motion.div>
//               <span className="text-gray-600">
//                 Ratings from over <span className="font-semibold">2000+</span>{" "}
//                 reviews
//               </span>
//             </motion.div>
//           </motion.div>

//           {/* Right Content - Image with Floating Elements */}
//           <motion.div 
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative"
//           >
//             {/* Main Image Container */}
//             <motion.div 
//               whileHover={{ rotate: 0, scale: 1.02 }}
//               initial={{ rotate: 2 }}
//               className="relative bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-3xl p-6 shadow-2xl"
//             >
//               <div className="bg-white rounded-2xl overflow-hidden">
//                 <img
//                   src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
//                   alt="Team collaborating on learning"
//                   className="w-full h-48 xs:h-64 sm:h-80 lg:h-96 object-cover"
//                 />
//               </div>

//               {/* Bottom Text Overlay */}
//               <motion.div 
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="absolute bottom-8 left-8 right-8 bg-gradient-to-br from-indigo-600 to-indigo-400 bg-opacity-90 backdrop-blur-sm rounded-2xl p-4"
//               >
//                 <div className="flex items-center gap-3">
//                   <motion.div 
//                     whileHover={{ rotate: 180 }}
//                     transition={{ duration: 0.3 }}
//                     className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
//                   >
//                     <Sun className="w-5 h-5 text-purple-600" />
//                   </motion.div>
//                   <p className="text-white text-sm sm:text-base">
//                     Illuminate your future with AI-powered learning at learnexa
//                   </p>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Floating Badges */}
//             <motion.div 
//               animate={{ 
//                 rotate: [12, 6, 12],
//                 y: [-5, 5, -5]
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 duration: 3
//               }}
//               className="absolute -top-4 -right-4 bg-yellow-100 rounded-full px-4 py-2 shadow-lg"
//             >
//               <div className="flex items-center gap-2">
//                 <Sparkles className="w-4 h-4 text-yellow-600" />
//                 <span className="text-sm font-semibold text-gray-700">
//                   Competitive Exams
//                 </span>
//               </div>
//             </motion.div>

//             <motion.div 
//               animate={{ 
//                 rotate: [-6, 0, -6],
//                 x: [-5, 5, -5]
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 duration: 4
//               }}
//               className="absolute top-1/4 -right-8 bg-green-100 rounded-full px-4 py-2 shadow-lg"
//             >
//               <div className="flex items-center gap-2">
//                 <Code className="w-4 h-4 text-green-600" />
//                 <span className="text-sm font-semibold text-gray-700">
//                   Development
//                 </span>
//               </div>
//             </motion.div>

//             <motion.div 
//               animate={{ 
//                 rotate: [12, 6, 12],
//                 x: [-5, 5, -5]
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 duration: 3.5
//               }}
//               className="absolute bottom-1/4 -left-8 bg-pink-100 rounded-full px-4 py-2 shadow-lg"
//             >
//               <div className="flex items-center gap-2">
//                 <Target className="w-4 h-4 text-pink-600" />
//                 <span className="text-sm font-semibold text-gray-700">
//                   Placement Preparation
//                 </span>
//               </div>
//             </motion.div>

//             {/* Decorative Elements */}
//             <motion.div 
//               animate={{ 
//                 scale: [1, 1.2, 1],
//                 opacity: [0.5, 0.8, 0.5]
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 duration: 3
//               }}
//               className="absolute -top-8 left-1/4 w-16 h-16 bg-purple-200 rounded-full"
//             />
//             <motion.div 
//               animate={{ 
//                 scale: [1, 1.2, 1],
//                 opacity: [0.4, 0.7, 0.4]
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 duration: 4
//               }}
//               className="absolute -bottom-6 right-1/4 w-12 h-12 bg-yellow-200 rounded-full"
//             />
//             <motion.div 
//               animate={{ 
//                 scale: [1, 1.2, 1],
//                 opacity: [0.3, 0.6, 0.3]
//               }}
//               transition={{ 
//                 repeat: Infinity,
//                 duration: 3.5
//               }}
//               className="absolute top-1/2 -left-4 w-8 h-8 bg-green-200 rounded-full"
//             />
//           </motion.div>
//         </div>
//       </div>

//       {/* Background Decorative Elements */}
//       <motion.div className="absolute inset-0 pointer-events-none">
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3]
//           }}
//           transition={{ 
//             repeat: Infinity,
//             duration: 5
//           }}
//           className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl"
//         />
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.2, 1],
//             opacity: [0.2, 0.4, 0.2]
//           }}
//           transition={{ 
//             repeat: Infinity,
//             duration: 6
//           }}
//           className="absolute top-3/4 right-1/4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl"
//         />
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.2, 1],
//             opacity: [0.25, 0.45, 0.25]
//           }}
//           transition={{ 
//             repeat: Infinity,
//             duration: 5.5
//           }}
//           className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-green-100 rounded-full mix-blend-multiply filter blur-xl"
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// export default HeroHeader;
import React from "react";
import { Star, Sparkles, Code, Target, Sun } from "lucide-react";
import { motion } from "framer-motion";

function HeroHeader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white pt-16 lg:pt-0 dark:bg-black overflow-hidden"
    >
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  flex-col lg:flex-row lg:gap-12 items-center min-h-[90vh] md:min-h-screen py-12 md:py-16 lg:py-20">
          {/* Left Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:w-1/2 sm:space-y-8 order-2 "
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gray-900 dark:text-white leading-tight"
              >
                Ace Your Career with
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex bg-gradient-to-br from-indigo-600 to-indigo-400 bg-clip-text text-transparent items-center gap-2"
                >
                  Learnexa
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed"
              >
                Master competitive exams and placement preparations with
                expert-led courses, mock tests, and comprehensive study
                materials
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-medium sm:font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl"
              >
                Practice Tests
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full font-medium sm:font-semibold text-sm sm:text-base md:text-lg hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Study Materials
              </motion.button>
            </motion.div>

            {/* Rating Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1"
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 fill-current" />
                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  4.8/5
                </span>
              </motion.div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Ratings from over <span className="font-semibold">2000+</span>{" "}
                reviews
              </span>
            </motion.div>
          </motion.div>

          {/* Right Content - Image with Floating Elements */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
          >
            {/* Main Image Container */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              initial={{ rotate: 2 }}
              className="relative bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl sm:shadow-2xl"
            >
              <div className="bg-white dark:bg-gray-700 rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaborating on learning"
                  className="w-full h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover"
                />
              </div>

              {/* Bottom Text Overlay */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 hidden md:flex m-2 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-gradient-to-br from-indigo-600 to-indigo-400 bg-opacity-90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center"
                  >
                    <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </motion.div>
                  <p className="text-white text-xs sm:text-sm md:text-base">
                    Illuminate your future with AI-powered learning at learnexa
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Badges - Responsive Positioning */}
            <motion.div
              animate={{
                rotate: [12, 6, 12],
                y: [-5, 5, -5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-yellow-100  rounded-full px-3 py-1 sm:px-4 sm:py-2 shadow-lg"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 " />
                <span className="text-xs sm:text-sm font-semibold text-gray-700 ">
                  Competitive Exams
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                rotate: [-6, 0, -6],
                x: [-5, 5, -5],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute top-1/4 -right-4 sm:-right-6 md:-right-8 bg-green-100  rounded-full px-3 py-1 sm:px-4 sm:py-2 shadow-lg"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Code className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 " />
                <span className="text-xs sm:text-sm font-semibold text-gray-700 ">
                  Development
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                rotate: [12, 6, 12],
                x: [-5, 5, -5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
              }}
              className="absolute bottom-1/4 -left-4 sm:-left-6 md:-left-8 bg-pink-100 rounded-full px-3 py-1 sm:px-4 sm:py-2 shadow-lg"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600 " />
                <span className="text-xs sm:text-sm font-semibold text-gray-700 ">
                  Placement Preparation
                </span>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute -top-6 sm:-top-8 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-purple-200  rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -bottom-4 sm:-bottom-6 right-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-yellow-200  rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
              }}
              className="absolute top-1/2 -left-3 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-green-200  rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          className="absolute top-3/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            repeat: Infinity,
            duration: 5.5,
          }}
          className="absolute bottom-1/4 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-green-100 dark:bg-green-900/30 rounded-full mix-blend-multiply filter blur-xl"
        />
      </motion.div>
    </motion.div>
  );
}

export default HeroHeader;