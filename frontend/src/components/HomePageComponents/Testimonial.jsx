// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     quote:
//       "Production Online has helped me become a better musician and producer than I ever thought possible.",
//     name: "Kyle Weznick",
//     title: "Media Director, Turn Around Music Group",
//     avatar:
//       "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 2,
//     quote:
//       "The community and resources here are absolutely incredible. I've learned more in 6 months than I did in years of self-teaching.",
//     name: "Sarah Chen",
//     title: "Sound Engineer, Harmony Studios",
//     avatar:
//       "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 3,
//     quote:
//       "From beginner to professional level - this platform has everything you need to master music production.",
//     name: "Marcus Johnson",
//     title: "Independent Producer & Artist",
//     avatar:
//       "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 4,
//     quote:
//       "The tutorials are comprehensive and the community support is unmatched. Highly recommend to anyone serious about music production.",
//     name: "Emily Rodriguez",
//     title: "Audio Engineer, Creative Sound Labs",
//     avatar:
//       "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 5,
//     quote:
//       "This platform transformed my approach to music production. The quality of content and mentorship is exceptional.",
//     name: "David Park",
//     title: "Music Director, Indie Wave Records",
//     avatar:
//       "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
// ];

// const Testimonial = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0); // Track animation direction

//   const nextTestimonial = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setDirection(-1);
//     setCurrentIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   const goToTestimonial = (index) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 300 : -300,
//       opacity: 0,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 300 : -300,
//       opacity: 0,
//     }),
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   return (
//     <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left Column - Header */}
//           <motion.div
//             className="space-y-6"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="space-y-4">
//               <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
//                 From our <span className="block">community.</span>
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
//                 Here's what other subscribers had to say about Production
//                 Online.
//               </p>
//             </div>

//             {/* Navigation Controls */}
//             <div className="flex space-x-4">
//               <motion.button
//                 onClick={prevTestimonial}
//                 className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 group"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Previous testimonial"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
//               </motion.button>
//               <motion.button
//                 onClick={nextTestimonial}
//                 className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 group"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Next testimonial"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
//               </motion.button>
//             </div>

//             {/* Indicators */}
//             <div className="flex space-x-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToTestimonial(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                     index === currentIndex
//                       ? "bg-blue-600 dark:bg-blue-400 w-8"
//                       : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Column - Testimonial */}
//           <div className="relative h-96 lg:h-auto">
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 },
//                 }}
//                 drag="x"
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={1}
//                 onDragEnd={(e, { offset, velocity }) => {
//                   const swipe = swipePower(offset.x, velocity.x);

//                   if (swipe < -swipeConfidenceThreshold) {
//                     nextTestimonial();
//                   } else if (swipe > swipeConfidenceThreshold) {
//                     prevTestimonial();
//                   }
//                 }}
//                 className="absolute inset-0 flex flex-col justify-center space-y-8 cursor-grab active:cursor-grabbing"
//               >
//                 {/* Quote Icon */}
//                 <motion.div
//                   className="text-blue-600 dark:text-blue-400"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//                 >
//                   <Quote
//                     className="w-12 h-12 lg:w-16 lg:h-16"
//                     fill="currentColor"
//                   />
//                 </motion.div>

//                 {/* Testimonial Text */}
//                 <motion.blockquote
//                   className="text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-900 dark:text-white leading-relaxed"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3, duration: 0.5 }}
//                 >
//                   "{testimonials[currentIndex].quote}"
//                 </motion.blockquote>

//                 {/* Author Info */}
//                 <motion.div
//                   className="flex items-center space-x-4"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4, duration: 0.5 }}
//                 >
//                   <div className="relative">
//                     <img
//                       src={testimonials[currentIndex].avatar}
//                       alt={testimonials[currentIndex].name}
//                       className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
//                       loading="lazy"
//                       width="80"
//                       height="80"
//                     />
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/20 dark:to-gray-900/20"></div>
//                   </div>
//                   <div className="space-y-1">
//                     <h4 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
//                       {testimonials[currentIndex].name}
//                     </h4>
//                     <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300">
//                       {testimonials[currentIndex].title}
//                     </p>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     quote:
//       "Production Online has helped me become a better musician and producer than I ever thought possible.",
//     name: "Kyle Weznick",
//     title: "Media Director, Turn Around Music Group",
//     avatar:
//       "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 2,
//     quote:
//       "The community and resources here are absolutely incredible. I've learned more in 6 months than I did in years of self-teaching.",
//     name: "Sarah Chen",
//     title: "Sound Engineer, Harmony Studios",
//     avatar:
//       "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 3,
//     quote:
//       "From beginner to professional level - this platform has everything you need to master music production.",
//     name: "Marcus Johnson",
//     title: "Independent Producer & Artist",
//     avatar:
//       "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 4,
//     quote:
//       "The tutorials are comprehensive and the community support is unmatched. Highly recommend to anyone serious about music production.",
//     name: "Emily Rodriguez",
//     title: "Audio Engineer, Creative Sound Labs",
//     avatar:
//       "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
//   {
//     id: 5,
//     quote:
//       "This platform transformed my approach to music production. The quality of content and mentorship is exceptional.",
//     name: "David Park",
//     title: "Music Director, Indie Wave Records",
//     avatar:
//       "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
//   },
// ];

// const Testimonial = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [autoSlide, setAutoSlide] = useState(true);
//   const [pauseAutoSlide, setPauseAutoSlide] = useState(false);
//   const autoSlideInterval = 3000; // 5 seconds

//   const nextTestimonial = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     resetAutoSlideTimer();
//   };

//   const prevTestimonial = () => {
//     setDirection(-1);
//     setCurrentIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//     resetAutoSlideTimer();
//   };

//   const goToTestimonial = (index) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//     resetAutoSlideTimer();
//   };

//   const resetAutoSlideTimer = () => {
//     setAutoSlide(false);
//     setTimeout(() => setAutoSlide(true), autoSlideInterval);
//   };

//   useEffect(() => {
//     if (!autoSlide || pauseAutoSlide) return;

//     const timer = setTimeout(() => {
//       nextTestimonial();
//     }, autoSlideInterval);

//     return () => clearTimeout(timer);
//   }, [currentIndex, autoSlide, pauseAutoSlide]);

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 300 : -300,
//       opacity: 0,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 300 : -300,
//       opacity: 0,
//     }),
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   return (
//     <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
//           {/* Left Column - Header */}
//           <motion.div
//             className="flex flex-col md:flex-row md:gap-6 gap-3 items-center justify-center"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="flex flex-col md:flex-row md:gap-6 gap-3 items-center justify-center">
//               <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
//                 From our <span className="block">community.</span>
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
//                 Here's what other subscribers had to say about Production
//                 Online.
//               </p>
//             </div>

//             {/* Navigation Controls */}
//             <div className="flex space-x-4">
//               <motion.button
//                 onClick={prevTestimonial}
//                 className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 group"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Previous testimonial"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
//               </motion.button>
//               <motion.button
//                 onClick={nextTestimonial}
//                 className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 group"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Next testimonial"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
//               </motion.button>
//             </div>

//             {/* Indicators */}
//             <div className="flex space-x-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToTestimonial(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                     index === currentIndex
//                       ? "bg-blue-600 dark:bg-blue-400 w-8"
//                       : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Column - Testimonial */}
//           <div
//             className="relative h-96 lg:h-auto"
//             onMouseEnter={() => setPauseAutoSlide(true)}
//             onMouseLeave={() => setPauseAutoSlide(false)}
//             onTouchStart={() => setPauseAutoSlide(true)}
//             onTouchEnd={() => setPauseAutoSlide(false)}
//           >
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 },
//                 }}
//                 drag="x"
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={1}
//                 onDragEnd={(e, { offset, velocity }) => {
//                   const swipe = swipePower(offset.x, velocity.x);

//                   if (swipe < -swipeConfidenceThreshold) {
//                     nextTestimonial();
//                   } else if (swipe > swipeConfidenceThreshold) {
//                     prevTestimonial();
//                   }
//                 }}
//                 className="absolute inset-0 flex flex-col justify-center space-y-8 cursor-grab active:cursor-grabbing"
//               >
//                 {/* Quote Icon */}
//                 <motion.div
//                   className="text-indigo-400 dark:text-indigo-400"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//                 >
//                   <Quote
//                     className="w-10 h-10 lg:w-12 lg:h-12"
//                     fill="currentColor"
//                   />
//                 </motion.div>

//                 {/* Testimonial Text */}
//                 <motion.blockquote
//                   className="text-lg lg:text-xl xl:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3, duration: 0.5 }}
//                 >
//                   "{testimonials[currentIndex].quote}"
//                 </motion.blockquote>

//                 {/* Author Info */}
//                 <motion.div
//                   className="flex items-center space-x-4"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4, duration: 0.5 }}
//                 >
//                   <div className="relative">
//                     <img
//                       src={testimonials[currentIndex].avatar}
//                       alt={testimonials[currentIndex].name}
//                       className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/20 dark:to-gray-900/20"></div>
//                   </div>
//                   <div className="space-y-1">
//                     <h4 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
//                       {testimonials[currentIndex].name}
//                     </h4>
//                     <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300">
//                       {testimonials[currentIndex].title}
//                     </p>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Users } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Production Online has helped me become a better musician and producer than I ever thought possible.",
    name: "Kyle Weznick",
    title: "Media Director, Turn Around Music Group",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
  {
    id: 2,
    quote:
      "The community and resources here are absolutely incredible. I've learned more in 6 months than I did in years of self-teaching.",
    name: "Sarah Chen",
    title: "Sound Engineer, Harmony Studios",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
  {
    id: 3,
    quote:
      "From beginner to professional level - this platform has everything you need to master music production.",
    name: "Marcus Johnson",
    title: "Independent Producer & Artist",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
  {
    id: 4,
    quote:
      "The tutorials are comprehensive and the community support is unmatched. Highly recommend to anyone serious about music production.",
    name: "Emily Rodriguez",
    title: "Audio Engineer, Creative Sound Labs",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
  {
    id: 5,
    quote:
      "This platform transformed my approach to music production. The quality of content and mentorship is exceptional.",
    name: "David Park",
    title: "Music Director, Indie Wave Records",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [pauseAutoSlide, setPauseAutoSlide] = useState(false);
  const autoSlideInterval = 3000;

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetAutoSlideTimer();
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    resetAutoSlideTimer();
  };

  const goToTestimonial = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetAutoSlideTimer();
  };

  const resetAutoSlideTimer = () => {
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), autoSlideInterval);
  };

  useEffect(() => {
    if (!autoSlide || pauseAutoSlide) return;

    const timer = setTimeout(() => {
      nextTestimonial();
    }, autoSlideInterval);

    return () => clearTimeout(timer);
  }, [currentIndex, autoSlide, pauseAutoSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 flex flex-col items-center lg:py-18 xl:py-20  dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center space-x-2  bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
      >
        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
        <span>Testimonials</span>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Header Section */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Title and Description */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold text-gray-900 dark:text-white leading-tight">
                From our{" "}
                <span className="block lg:inline bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  community.
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
                Here's what other subscribers had to say about Production
                Online.
              </p>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 md:space-x-6">
              <motion.button
                onClick={prevTestimonial}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </motion.button>

              <motion.button
                onClick={nextTestimonial}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </motion.button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center lg:justify-start space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-blue-600 dark:bg-blue-400 w-6 sm:w-8"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Testimonial Content */}
          <div
            className="relative w-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[480px] order-1 lg:order-2"
            onMouseEnter={() => setPauseAutoSlide(true)}
            onMouseLeave={() => setPauseAutoSlide(false)}
            onTouchStart={() => setPauseAutoSlide(true)}
            onTouchEnd={() => setPauseAutoSlide(false)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    nextTestimonial();
                  } else if (swipe > swipeConfidenceThreshold) {
                    prevTestimonial();
                  }
                }}
                className="absolute inset-0 flex flex-col justify-center space-y-6 sm:space-y-8 cursor-grab active:cursor-grabbing px-2 sm:px-4 lg:px-0"
              >
                {/* Quote Icon */}
                <motion.div
                  className="text-indigo-500 dark:text-indigo-500 flex justify-center lg:justify-start"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Quote
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                    fill="currentColor"
                  />
                </motion.div>

                {/* Testimonial Text */}
                <motion.blockquote
                  className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed text-center lg:text-left px-2 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  "{testimonials[currentIndex].quote}"
                </motion.blockquote>

                {/* Author Info */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/20 dark:to-gray-900/20"></div>
                  </div>
                  <div className="flex flex-col space-y-1 text-center sm:text-left">
                    <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-none">
                      {testimonials[currentIndex].title}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;