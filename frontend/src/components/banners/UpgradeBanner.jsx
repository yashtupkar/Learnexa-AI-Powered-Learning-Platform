// import { useState } from "react";
// import { FaCrown } from "react-icons/fa6";
// import image from "../../assets/upgradeBannerImg.png";
// import { motion } from "framer-motion";
// const UpgradeBanner = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg shadow-lg overflow-hidden  w-full max-w-3xl"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative z-10 flex flex-col md:flex-row">
//         {/* Text Content */}
//         <div className="md:w-2/3 lg:w-3/4 pr-4">
//           <div className="flex gap-2 items-center mb-2 sm:mb-3">
//             <FaCrown className="text-yellow-400 text-2xl sm:text-3xl" />
//             <h2 className="text-xl sm:text-2xl font-bold">
//               Get more with Premium
//             </h2>
//           </div>

//           <p className="mb-3 text-gray-200 sm:mb-4 text-sm sm:text-base max-w-md">
//             Upgrade for more powerful AI, unlimited questions, and support for
//             longer documents. Accelerate your learning experience today!
//           </p>

//           <button className="group relative overflow-hidden bg-white text-blue-600 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-md hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base">
//             <span className="relative z-10">Upgrade Now</span>
//             <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//             <span className="absolute top-0 left-0 w-1/3 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700"></span>
//           </button>
//         </div>

//         {/* Image - Hidden on small mobile, positioned differently on larger screens */}
//         <motion.img
//           src={image}
//           alt="Premium upgrade"
//           className="absolute -top-3 -right-5 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 object-cover md:relative md:top-auto md:right-auto md:ml-auto md:-mt-2 md:-mr-2"
//           animate={{
//             x: ["-100%", "100%"], // Moves from left to right
//             y: ["50%", "-50%"], // Moves diagonally (upward)
//             rotate: [-15, 15, -15], // Slight wobble for a rocket effect
//           }}
//           transition={{
//             duration: 3, // Animation duration (seconds)
//             repeat: Infinity, // Loop forever
//             repeatType: "loop", // Smooth loop
//             ease: "linear", // Constant speed
//           }}
//           whileHover={{
//             scale: 1.1,
//             transition: { duration: 0.2 },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default UpgradeBanner;
import { useState, useEffect } from "react";
import { FaCrown } from "react-icons/fa6";
import image from "../../assets/upgradeBannerImg.png";
import { motion } from "framer-motion";

const UpgradeBanner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [currentText, setCurrentText] = useState(0);

  const features = [
    "more powerful AI",
    "unlimited questions",
    "longer documents",
    "faster responses",
  ];

  // Generate sparkle effects
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate feature text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg shadow-lg overflow-hidden w-full max-w-3xl transition-all duration-500 ${
        isHovered ? "shadow-2xl shadow-purple-500/25 scale-[1.02]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background sweep */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
            isHovered ? "translate-x-full" : "-translate-x-full"
          }`}
        />
      </div>

      {/* Sparkle particles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col md:flex-row">
        {/* Text Content */}
        <div className="md:w-2/3 lg:w-3/4 pr-4">
          <div className="flex gap-2 items-center mb-2 sm:mb-3">
            <motion.div
              animate={{
                rotate: isHovered ? [0, -10, 10, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <FaCrown className="text-yellow-400 text-2xl sm:text-3xl" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Get more with Premium
            </h2>
          </div>

          <p className="mb-3 text-gray-200 sm:mb-4 text-sm sm:text-base max-w-md">
            Upgrade for{" "}
            <motion.span
              key={currentText}
              className="text-yellow-300 font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {features[currentText]}
            </motion.span>
            , and support for enhanced learning. Accelerate your experience
            today!
          </p>

          <motion.button
            className="group relative overflow-hidden bg-white text-blue-600 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-md hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Upgrade Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <motion.span
              className="absolute top-0 left-0 w-1/3 h-full bg-white/30 transform -skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "400%" : "-100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-md"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Enhanced Image with more dynamic animations */}
        <motion.img
          src={image}
          alt="Premium upgrade"
          className="absolute -top-3 -right-5 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 object-cover md:relative md:top-auto md:right-auto md:ml-auto md:-mt-2 md:-mr-2"
          animate={{
            x: ["-20%", "20%", "-20%"],
            y: ["10%", "-10%", "10%"],
            rotate: [-8, 8, -8],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.15,
            rotate: 0,
            transition: { duration: 0.3 },
          }}
        />

        {/* Floating elements around image */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/60 rounded-full hidden md:block"
            style={{
              right: `${15 + i * 20}%`,
              top: `${20 + i * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Progress dots for text rotation */}
      <div className="absolute bottom-2 right-4 flex gap-1">
        {features.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentText ? "bg-yellow-400 scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default UpgradeBanner;