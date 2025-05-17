import React from "react";
import { useSelector } from "react-redux";

const HeroHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-20 py-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white">
      {/* Text Section */}
      <div className=" flex flex-col justify-center items-center">
        {isAuthenticated ? (
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hello, {user?.name}
          </h1>
        ) : (
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hello, User
          </h1>
        )}
        <p className="text-lg md:text-xl mb-6">
          We hope you're having a great day. Let's build something amazing
          together.
        </p>
        <button className="bg-white w-fit text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-purple-100 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroHeader;
