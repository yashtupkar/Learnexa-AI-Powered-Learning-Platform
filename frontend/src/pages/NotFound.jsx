import Lottie from "lottie-react";
import React from "react";
import PageNotFound from "../assets/404-page-not-found.json";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black p-4">
      <div className="text-center max-w-md">
        <Lottie
          animationData={PageNotFound}
          loop={true}
          className="w-full max-w-[400px] mx-auto"
        />

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-6 mb-2">
          Page Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 cursor-pointer bg-gradient-to-br from-indigo-500 to-indigo-400 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Go back to Home
        </button>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Error code: 404</p>
        </div>
      </div>
    </div>
  );
}
