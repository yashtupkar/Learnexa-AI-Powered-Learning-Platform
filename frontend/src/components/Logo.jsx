import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = ({ width = 10, height = 10 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div
      onClick={handleClick}
      className="p-1 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow cursor-pointer"
    >
      <img
        src="/assets/learnexa-logo.png"
        alt="Devplex Logo"
        className={`w-${width} h-${height} rounded-lg`}
      />
    </div>
  );
};

export default Logo;
