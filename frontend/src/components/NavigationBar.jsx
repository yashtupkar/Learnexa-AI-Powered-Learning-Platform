// // import React, { useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { logout } from "../redux/authSlice"; // adjust path as needed
// // import { AppContext } from "../context/AppContext";
// // import toast from "react-hot-toast";
// // import axios from "axios";
// // import Avatar from 'boring-avatars'
// // import { ThemeToggle } from "./ThemeTogler";

// // const Navbar = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const {backend_URL} = useContext(AppContext)

// //   const { isAuthenticated, user } = useSelector((state) => state.auth);

// //   const handleLogout = async() => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("userId");
// //     localStorage.removeItem("user");
    
 
// //     dispatch(logout());
// //     toast.success('Logout Successfull');
// //         navigate("/");
    

// //   };

// //   return (
// //     <div className="w-full fixed top-0 left-0 bg-white p-4 flex items-center justify-between shadow-md z-50">
// //       <h1
// //         className="text-3xl font-semibold cursor-pointer"
// //         onClick={() => navigate("/")}
// //       >
// //         Quizly AI
// //       </h1>

// //       {isAuthenticated ? (
// //         <div className="flex items-center gap-4">
// //            <ThemeToggle />
// //           <Avatar name={user.name} size={40}  />
// //           <span className="text-gray-700 font-medium">{user?.name}</span>

// //           <button
// //             onClick={handleLogout}
// //             className="px-3 py-2 rounded-full bg-red-500 text-white"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       ) : (
// //           <div className="flex items-center gap-2">
// //              <ThemeToggle />
// //           <button
// //             onClick={() => navigate("/login")}
// //             className="px-3 py-2 rounded-full bg-blue-600 text-white"
// //           >
// //             Login
// //           </button>
// //           <button
// //             onClick={() => navigate("/signup")}
// //             className="px-3 py-2 rounded-full bg-blue-600 text-white"
// //           >
// //             Sign up
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Navbar;
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/authSlice";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import Avatar from "boring-avatars";
// import { ThemeToggle } from "./ThemeTogler";
// import logo from "../assets/learnexa-logo.png";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { backend_URL } = useContext(AppContext);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const handleLogout = async () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("user");
//     dispatch(logout());
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   return (
//     <nav className="w-full fixed top-0 left-0  backdrop-blur-lg  z-50 transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo Section */}
//           <div className="flex gap-2 items-center">
//             <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
//               <img src={logo} alt="Learnexa" className="w-full h-full" />
//             </div>
//             <h1
//               className="text-2xl  text-black dark:text-white cursor-pointer hover:scale-105 transition-transform duration-200 select-none"
//               onClick={() => navigate("/")}
//             >
//               Learnexa
//             </h1>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-3">
//             {isAuthenticated ? (
//               <>
//                 {/* Dashboard Button */}
//                 <button
//                   onClick={() => navigate("/dashboard")}
//                   className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
//                 >
//                   <svg
//                     className="w-4 h-4 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//                     />
//                   </svg>
//                   Dashboard
//                 </button>

//                 {/* Theme Toggle */}

//                 <ThemeToggle />

//                 <div className="hidden lg:flex flex-col items-end mr-2">
//                   <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-32">
//                     {user?.name}
//                   </span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
//                     {user?.email}
//                   </span>
//                 </div>

//                 {/* User Avatar Dropdown */}
//                 <div className="relative group">
//                   <div className="relative">
//                     <Avatar
//                       name={user.name}
//                       size={40}
//                       className="cursor-pointer transition-all duration-200 hover:ring-4 hover:ring-blue-500/20 hover:scale-105 rounded-full"
//                     />
//                     <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
//                   </div>

//                   {/* Dropdown Menu */}
//                   <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-2 transition-all duration-200">
//                     {/* User Info Mobile */}
//                     <div className="lg:hidden px-4 py-3 border-b border-gray-200 dark:border-gray-700">
//                       <div className="font-semibold text-gray-800 dark:text-gray-200 truncate">
//                         {user?.name}
//                       </div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                         {user?.email}
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => navigate("/profile")}
//                       className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
//                     >
//                       <svg
//                         className="w-4 h-4 mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                       Profile
//                     </button>

//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
//                     >
//                       <svg
//                         className="w-4 h-4 mr-3"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                         />
//                       </svg>
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-3">
//                 <ThemeToggle />

//                 {/* Login Button */}
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
//                 >
//                   Login
//                 </button>

//                 {/* Sign Up Button */}
//                 <button
//                   onClick={() => navigate("/signup")}
//                   className="relative px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 overflow-hidden group"
//                 >
//                   <span className="relative z-10">Sign up</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Avatar from "boring-avatars";
import { ThemeToggle } from "./ThemeTogler";
import logo from "../assets/learnexa-logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backend_URL } = useContext(AppContext);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 backdrop-blur-lg bg-white/80 dark:bg-black/80 z-50 transition-all duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
              <img
                src={logo}
                alt="Learnexa"
                className="w-full h-full object-contain"
              />
            </div>
            <h1
              className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white cursor-pointer hover:scale-105 transition-transform duration-200 select-none"
              onClick={() => navigate("/")}
            >
              Learnexa
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Dashboard Button */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Dashboard
                </button>

                <ThemeToggle />

                <div className="hidden lg:flex flex-col items-end mr-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-32">
                    {user?.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
                    {user?.email}
                  </span>
                </div>

                {/* User Avatar Dropdown */}
                <div className="relative group">
                  <div className="relative">
                    <Avatar
                      name={user.name}
                      size={40}
                 
                      className="cursor-pointer transition-all duration-200 hover:ring-4 hover:ring-indigo-500/20 hover:scale-105 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-2 transition-all duration-200">
                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <ThemeToggle />

                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="relative px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 overflow-hidden group"
                >
                  <span className="relative z-10">Sign up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                Dashboard
              </button>

              <div className="px-4 py-3 flex items-center space-x-3">
                <Avatar
                  name={user.name}
                  size={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    {user?.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;