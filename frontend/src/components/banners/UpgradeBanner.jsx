// import React from "react";

// const UpgradeBanner = () => {
//   return (
//     <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-3">Generate more with Premium</h2>
//         <p className="mb-4">
//           Upgrade for more powerful AI, unlimited questions, and support for
//           longer documents. Accelerate your learning experience today!
//         </p>

//         <ul className="flex flex-wrap gap-4 mb-4">
//           <li className="flex items-center">
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             Updates
//           </li>
//           <li className="flex items-center">
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             AI
//           </li>
//           <li className="flex items-center">
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             Remove advertising
//           </li>
//         </ul>

//         <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 transition-colors">
//           Upgrade Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpgradeBanner;
import { Crown, CrownIcon } from "lucide-react";
import React, { useState } from "react";
import { FaCrown } from "react-icons/fa6";
import image from "../../assets/upgradeBannerImg.png"


const UpgradeBanner = () => {




  return (
    <div
      className="relative bg-gradient-to-r max-w-2xl from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative elements */}

      <div className="relative max-w-4xl mx-auto z-10 ">
        
        <div className="flex gap-2 items-center mb-3">
          <FaCrown className="text-yellow-400 text-3xl" />
          <h2 className="text-2xl font-bold">Get more with Premium</h2>
        </div>

        <p className="mb-4 max-w-120">
          Upgrade for more powerful AI, unlimited questions, and support for
          longer documents. Accelerate your learning experience today!
        </p>

        <button className="group relative overflow-hidden bg-white text-blue-600 font-semibold py-3 px-8 rounded-md hover:bg-blue-50 transition-all duration-300">
          <span className="relative z-10">Upgrade Now</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

          {/* Button shine effect */}

          <span className="absolute top-0 left-0 w-1/3 h-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700"></span>
        </button>
        <img src={image} alt="" className="absolute -top-5 -right-10 w-65 object-cover" />
      </div>
    </div>
  );
};

export default UpgradeBanner;
