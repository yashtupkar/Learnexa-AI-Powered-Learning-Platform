

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Avatar from "boring-avatars";
import { ThemeToggle } from "./ThemeTogler";
import logo from "../assets/learnexa-logo.png";
import { LayoutPanelLeft, Menu, X } from "lucide-react";
import { DropdownMenu } from "./ProfileDropDown";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backend_URL } = useContext(AppContext); // This seems unused in the component directly, but kept for context.
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
    setMobileMenuOpen(false); // Close mobile menu on logout
  };

  return (
    <nav className="w-full fixed top-0 left-0 backdrop-blur-lg bg-white dark:bg-black shadow-md z-50 transition-all duration-300 border-b border-white/50 dark:border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
              <img
                src={logo}
                alt="Learnexa logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1
              className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white cursor-pointer hover:scale-105 transition-transform duration-200 select-none"
              onClick={() => navigate("/")}
              aria-label="Go to Learnexa homepage"
            >
              Learnexa
            </h1>
            <nav className="ml-10 hidden md:flex font-light">
              <ul className="flex items-center space-x-3">
                <li>
                  <button
                    onClick={() => navigate("/about-us")}
                    className="text-sm  text-gray-700 cursor-pointer dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact-us")}
                    className="text-sm  text-gray-700 dark:text-gray-200 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/plans")}
                    className="text-sm  text-gray-700 dark:text-gray-200 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/terms")}
                    className="text-sm  text-gray-700 dark:text-gray-200 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    Terms
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Dashboard Button */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex cursor-pointer gap-1 items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  aria-label="Go to Dashboard"
                >
                  <LayoutPanelLeft size={16} />
                  Dashboard
                </button>

                <ThemeToggle aria-label="Toggle theme" />

                {/* User Avatar Dropdown */}
                <div className="relative group">
                  <div className="relative">
                    <DropdownMenu
                      name={user?.name}
                      email={user?.email}
                      avatar={user.avatar}
                      onLogout={handleLogout}
                    />
                    {/* Online indicator */}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <ThemeToggle aria-label="Toggle theme" />

                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  aria-label="Go to Login page"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="relative px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 overflow-hidden group"
                  aria-label="Go to Sign up page"
                >
                  <span className="relative z-10">Sign up</span>
                  {/* Subtle shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle aria-label="Toggle theme" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
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
                aria-label="Go to Dashboard"
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

              {user?.name && user?.email && (
                <div className="px-4 py-3 flex items-center space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar name={user.name} size={38} variant="bean" />
                  )}
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Go to Profile"
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
                aria-label="Log out"
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
                aria-label="Go to Login page"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow transition-colors"
                aria-label="Go to Sign up page"
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