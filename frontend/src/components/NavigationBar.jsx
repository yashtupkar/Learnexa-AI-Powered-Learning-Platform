import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // adjust path as needed
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import Avatar from 'boring-avatars'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {backend_URL} = useContext(AppContext)

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    
 
    dispatch(logout());
    toast.success('Logout Successfull');
        navigate("/");
    

  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white p-4 flex items-center justify-between shadow-md z-50">
      <h1
        className="text-3xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Quizly AI
      </h1>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size={40}  />
          <span className="text-gray-700 font-medium">{user?.name}</span>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-full bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-2 rounded-full bg-blue-600 text-white"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-3 py-2 rounded-full bg-blue-600 text-white"
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
