import React, { useState, useRef, useEffect } from "react";
import {

  LogOut,
  User,
 
  CreditCard,
  HelpCircle,

} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Avatar from "boring-avatar";

export function DropdownMenu({ name, email }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  

 

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="relative group">
            <div className="ring-2 ring-transparent group-hover:ring-indigo-500/30 rounded-full transition-all duration-200 p-0.5">
              <Avatar name={name} size={36} variant="bean" />
              
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-950 
                         rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700 
                         overflow-hidden origin-top-right"
            >
              <div className="p-1 space-y-1">
                {/* User Info Section */}

                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <div className="ring-2 ring-transparent group-hover:ring-indigo-500/30 rounded-full transition-all duration-200 p-0.5">
                        <Avatar name={name} size={42} variant="bean" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm capitalize font-medium text-gray-900 dark:text-white">
                        {name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Menu Items */}
                <motion.button
                  whileHover={{ backgroundColor: "rgba(100, 116, 139, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2.5 text-sm 
                             text-gray-700 dark:text-gray-300 rounded-md transition-colors"
                >
                  <User className="h-4 w-4 mr-3" />
                  <span>Profile</span>
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: "rgba(100, 116, 139, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate("/billing");
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2.5 text-sm 
                             text-gray-700 dark:text-gray-300 rounded-md transition-colors"
                >
                  <CreditCard className="h-4 w-4 mr-3" />
                  <span>Billing</span>
                </motion.button>

                <div className="border-t border-gray-200 dark:border-gray-700 mx-3 my-1"></div>

                {/* Help & Sign Out */}
                <motion.button
                  whileHover={{ backgroundColor: "rgba(100, 116, 139, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate("/help");
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2.5 text-sm 
                             text-gray-700 dark:text-gray-300 rounded-md transition-colors"
                >
                  <HelpCircle className="h-4 w-4 mr-3" />
                  <span>Help & Support</span>
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2.5 text-sm 
                             text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 
                             rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  <span>Sign out</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
