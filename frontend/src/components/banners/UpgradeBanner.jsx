import { useState } from "react";
import { FaCrown } from "react-icons/fa6";
import image from "../../assets/upgradeBannerImg.png";
import { motion } from "framer-motion";
const UpgradeBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg shadow-lg overflow-hidden  w-full max-w-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex flex-col md:flex-row">
        {/* Text Content */}
        <div className="md:w-2/3 lg:w-3/4 pr-4">
          <div className="flex gap-2 items-center mb-2 sm:mb-3">
            <FaCrown className="text-yellow-400 text-2xl sm:text-3xl" />
            <h2 className="text-xl sm:text-2xl font-bold">
              Get more with Premium
            </h2>
          </div>

          <p className="mb-3 text-gray-200 sm:mb-4 text-sm sm:text-base max-w-md">
            Upgrade for more powerful AI, unlimited questions, and support for
            longer documents. Accelerate your learning experience today!
          </p>

          <button className="group relative overflow-hidden bg-white text-blue-600 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-md hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base">
            <span className="relative z-10">Upgrade Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-0 left-0 w-1/3 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700"></span>
          </button>
        </div>

        {/* Image - Hidden on small mobile, positioned differently on larger screens */}
        <motion.img
          src={image}
          alt="Premium upgrade"
          className="absolute -top-3 -right-5 w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 object-cover md:relative md:top-auto md:right-auto md:ml-auto md:-mt-2 md:-mr-2"
          animate={{
            x: ["-100%", "100%"], // Moves from left to right
            y: ["50%", "-50%"], // Moves diagonally (upward)
            rotate: [-15, 15, -15], // Slight wobble for a rocket effect
          }}
          transition={{
            duration: 3, // Animation duration (seconds)
            repeat: Infinity, // Loop forever
            repeatType: "loop", // Smooth loop
            ease: "linear", // Constant speed
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
        />
      </div>
    </div>
  );
};

export default UpgradeBanner;
