// components/GlobalLoader.jsx
import { useEffect, useState } from "react";
import quizGeneratingAnimation from "../assets/quizGeneratingAnimation.json";
import Lottie from "lottie-react";


const GlobalLoader = () => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/40 bg-opacity-70 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Lottie
          
            animationData={quizGeneratingAnimation}
            loop
            className={`w-56 h-56 md:w-44 md:h-44 `}
     
          />
        </div>

       
        <p className=" text-black text-lg dark:text-white font-medium">Loading...</p>

        {/* Optional progress bar */}
        <div className="mt-2 w-48 bg-zinc-200 dark:bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full animate-pulse"
            style={{ width: "45%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;

