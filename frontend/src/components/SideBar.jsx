// import React, { useContext, useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   BookOpen,
//   Users,
//   PanelLeftOpen,
//   PanelLeftClose,
//   Globe,
//   Youtube,
//   ChartPie,
//   ChartSpline,
//   BookA,
//   Zap,
//   X,
// } from "lucide-react";
// import { ThemeToggle } from "./ThemeTogler";
// import Avatar from "boring-avatars";
// import { useSelector } from "react-redux";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import logo from "../assets/learnexa-logo.png";

// export function SidebarItem({ icon, label, to, collapsed, badge, isNew }) {
//   const [showContent, setShowContent] = useState(false);

//   useEffect(() => {
//     if (!collapsed) {
//       const timer = setTimeout(() => {
//         setShowContent(true);
//       }, 200);
//       return () => clearTimeout(timer);
//     } else {
//       setShowContent(false);
//     }
//   }, [collapsed]);

//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `w-full flex items-center space-x-3 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-300 ${
//           isActive
//             ? "bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-400 text-indigo-600 dark:text-indigo-100 shadow-sm"
//             : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
//         } ${collapsed ? "justify-center" : ""}`
//       }
//     >
//       <div className="relative">
//         {React.cloneElement(icon, {
//           className: "transition-colors duration-200",
//           size: 20,
//           strokeWidth: 1.5,
//         })}
//         {badge && !collapsed && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
//             {badge}
//           </span>
//         )}
//       </div>
//       {showContent && (
//         <div className="flex-1 flex items-center justify-between overflow-hidden">
//           <span className="text-sm font-medium transition-all duration-200">
//             {label}
//           </span>
//           {isNew && (
//             <span className="bg-green-500/20 dark:bg-green-600/30 text-green-600 dark:text-green-500 text-xs px-2 py-0.5 rounded-full">
//               New
//             </span>
//           )}
//         </div>
//       )}
//     </NavLink>
//   );
// }

// export default function Sidebar({
//   isCollapsed,
//   toggleSidebar,
//   isMobileOpen,
//   closeMobileSidebar,
//   setMobileSidebarOpen,
// }) {
//   const [showContent, setShowContent] = useState(false);
//   const [generatedQuizzes, setGeneratedQuizzes] = useState([]);

//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const userId = user?._id;
//   const { backend_URL } = useContext(AppContext);

//   const fetchGeneratedQuizzes = async () => {
//     try {
//       const response = await axios.get(
//         `${backend_URL}/api/quiz/get-user-generated-quiz/${userId}`
//       );
//       setGeneratedQuizzes(
//         response.data.map((item) => ({
//           ...item.quiz,
//           _id: item._id,
//           type: "generated",
//           createdAt: item.createdAt,
//           status: "generated",
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching generated quizzes:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchGeneratedQuizzes();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (!isCollapsed) {
//       const timer = setTimeout(() => {
//         setShowContent(true);
//       }, 200);
//       return () => clearTimeout(timer);
//     } else {
//       setShowContent(false);
//     }
//   }, [isCollapsed]);

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-10 lg:hidden"
//           onClick={closeMobileSidebar}
//         />
//       )}

//       <div
//         className={`
//         fixed lg:relative
//         bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-gray-700/50
//         h-[100vh] z-20 transition-all duration-300 ease-in-out shadow-sm
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//         ${isCollapsed ? "w-[70px]" : "w-64"}
//       `}
//       >
//         {/* Close button for mobile */}
//         <button
//           className="lg:hidden absolute right-2 top-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
//           onClick={closeMobileSidebar}
//         >
//           <X size={20} />
//         </button>

//         <div className="h-full flex flex-col">
//           {/* Header */}
//           <div
//             className={`p-4 ${
//               isCollapsed ? "flex-col gap-2" : "flex-row"
//             } border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center`}
//           >
//             {!isCollapsed ? (
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
//                   <img src={logo} alt="" className="w-full h-full" />
//                 </div>
//                 <h1 className="font-bold text-lg text-gray-800 dark:text-gray-100">
//                   Learnexa
//                 </h1>
//               </div>
//             ) : (
//               <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow mx-auto">
//                 <img src={logo} alt="" className="w-full h-full" />
//               </div>
//             )}
//             <button
//               onClick={toggleSidebar}
//               className="hidden lg:block text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               {isCollapsed ? (
//                 <PanelLeftOpen size={20} />
//               ) : (
//                 <PanelLeftClose size={20} />
//               )}
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 overflow-y-auto">
//             <div className="space-y-1.5">
//               <SidebarItem
//                 icon={<Home />}
//                 label="Dashboard"
//                 to="/dashboard"
//                 collapsed={isCollapsed}
//               />
//               <SidebarItem
//                 icon={<Youtube />}
//                 label="StudyTube"
//                 to="/study-tube"
//                 collapsed={isCollapsed}
//               />
//               <SidebarItem
//                 icon={<Globe />}
//                 label="Current Affairs"
//                 to="/current-affairs"
//                 collapsed={isCollapsed}
//               />
//               <SidebarItem
//                 icon={<Zap />}
//                 label="Create Quiz"
//                 to="/create?tab=quiz"
//                 collapsed={isCollapsed}
//               />
//               <SidebarItem
//                 icon={<BookOpen />}
//                 label="My Quizzes"
//                 to="/my-quizzes"
//                 collapsed={isCollapsed}
//               />
//               <hr className="text-gray-200 dark:text-gray-700" />
//               <SidebarItem
//                 icon={<ChartSpline />}
//                 label="Aptitude"
//                 to="/aptitude"
//                 collapsed={isCollapsed}
//                 isNew={true}
//               />
//               <SidebarItem
//                 icon={<ChartPie />}
//                 label="Logical Reasoning"
//                 to="/logical-reasoning"
//                 collapsed={isCollapsed}
//                 isNew={true}
//               />
//               <SidebarItem
//                 icon={<BookA />}
//                 label="Verbal Reasoning"
//                 to="/verbal-reasoning"
//                 collapsed={isCollapsed}
//                 isNew={true}
//               />
//               <hr className="text-gray-200 dark:text-gray-700" />
//               <SidebarItem
//                 icon={<Users />}
//                 label="HR Interview"
//                 to="/interview"
//                 collapsed={isCollapsed}
//               />
//               <SidebarItem
//                 icon={<Users />}
//                 label="Technical Interview"
//                 to="/interview"
//                 collapsed={isCollapsed}
//               />
//             </div>
//           </nav>

//           {/* Footer */}
//           <div
//             className={`p-4 border-t border-gray-100 dark:border-gray-700/50 ${
//               isCollapsed ? "flex justify-center" : ""
//             }`}
//           >
//             {!isCollapsed ? (
//               <div className="flex items-center space-x-3">
//                 <Avatar name={user?.name} size={40} variant="bean" />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
//                     {user?.name}
//                   </p>
//                   <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
//                     Pro Plan
//                   </p>
//                 </div>
//                 <ThemeToggle />
//               </div>
//             ) : (
//               <Avatar name={user?.name} size={40} variant="bean" />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  PanelLeftOpen,
  PanelLeftClose,
  Globe,
  Youtube,
  ChartPie,
  ChartSpline,
  BookA,
  Zap,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./ThemeTogler";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import logo from "../assets/learnexa-logo.png";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";

export function SidebarItem({
  icon,
  label,
  to,
  collapsed,
  badge,
  isNew,
  subItems,
}) {
  const [showContent, setShowContent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!collapsed) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [collapsed]);

  const hasSubItems = subItems && subItems.length > 0;
  const isActive =
    location.pathname === to ||
    (hasSubItems && subItems.some((item) => location.pathname === item.to));

  if (hasSubItems) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-400 text-indigo-600 dark:text-indigo-100 shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <div className="relative">
            {React.cloneElement(icon, {
              className: "transition-colors duration-200",
              size: 20,
              strokeWidth: 1.5,
            })}
            {badge && !collapsed && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {badge}
              </span>
            )}
          </div>
          {showContent && (
            <div className="flex-1 flex items-center justify-between overflow-hidden">
              <span className="text-sm font-medium transition-all duration-200">
                {label}
              </span>
              <div className="flex items-center">
                {isNew && (
                  <span className="bg-green-500/20 dark:bg-green-600/30 text-green-600 dark:text-green-500 text-xs px-2 py-0.5 rounded-full mr-2">
                    New
                  </span>
                )}
                {isExpanded ? (
                  <ChevronDown size={16} className="ml-1" />
                ) : (
                  <ChevronRight size={16} className="ml-1" />
                )}
              </div>
            </div>
          )}
        </button>

        <AnimatePresence>
          {isExpanded && !collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-8 mt-1 space-y-1"
            >
              {subItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-indigo-50/50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/30"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center space-x-3 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-400 text-indigo-600 dark:text-indigo-100 shadow-sm"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
        } ${collapsed ? "justify-center" : ""}`
      }
    >
      <div className="relative">
        {React.cloneElement(icon, {
          className: "transition-colors duration-200",
          size: 20,
          strokeWidth: 1.5,
        })}
        {badge && !collapsed && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
            {badge}
          </span>
        )}
      </div>
      {showContent && (
        <div className="flex-1 flex items-center justify-between overflow-hidden">
          <span className="text-sm  transition-all duration-200">{label}</span>
          {isNew && (
            <span className="bg-green-500/20 dark:bg-green-600/30 text-green-600 dark:text-green-500 text-xs px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}

export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  isMobileOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) {
  const [showContent, setShowContent] = useState(false);
  const [generatedQuizzes, setGeneratedQuizzes] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const { backend_URL } = useContext(AppContext);

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  useEffect(() => {
    if (!isCollapsed) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isCollapsed]);

 

  return (
    <>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
        />
      )}

      <motion.div
        initial={false}
        animate={{
          width: isCollapsed ? "70px" : "256px",
          x: mobileSidebarOpen ? 0 : isMobile ? "-100%" : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed lg:relative
          bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-gray-700/50
          h-[100vh] z-50 md:z-20 shadow-sm
          ${isCollapsed ? "w-[70px]" : "w-64"}
        `}
      >
        {/* Close button for mobile */}
        {/* {isMobile && (
          <button
            className="lg:hidden absolute right-2 top-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 z-30"
            onClick={closeMobileSidebar}
          >
            <X size={20} />
          </button>
        )} */}

        <div className="h-full flex flex-col">
          {/* Header */}
          <div
            className={`p-4 ${
              isCollapsed ? "flex-col gap-2" : "flex-row"
            } border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center`}
          >
            {!isCollapsed ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
                  <img src={logo} alt="Learnexa" className="w-full h-full" />
                </div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className=" text-lg text-gray-800 dark:text-gray-100"
                >
                  Learnexa
                </motion.h1>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow mx-auto">
                <img src={logo} alt="Learnexa" className="w-full h-full" />
              </div>
            )}
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className={`text-gray-400 ${
                  isCollapsed && "hidden"
                }  dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800`}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <PanelLeftOpen size={20} />
                ) : (
                  <PanelLeftClose size={20} />
                )}
              </button>
            )}
            {isMobile && (
              <button
                onClick={closeMobileSidebar}
                className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <PanelLeftClose size={20} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1.5">
              <SidebarItem
                icon={<Home />}
                label="Dashboard"
                to="/dashboard"
                collapsed={isCollapsed}
              />
              <SidebarItem
                icon={<Youtube />}
                label="StudyTube"
                to="/study-tube"
                collapsed={isCollapsed}
              />
              <SidebarItem
                icon={<Globe />}
                label="Current Affairs"
                to="/current-affairs"
                collapsed={isCollapsed}
              />
              <SidebarItem
                icon={<Sparkles />}
                label="Create Quiz"
                to="/create?tab=quiz"
                collapsed={isCollapsed}
              />
              <SidebarItem
                icon={<BookOpen />}
                label="My Quizzes"
                to="/my-quizzes"
                collapsed={isCollapsed}
              />
              <hr className="border-gray-200 dark:border-gray-700/50 my-2" />
              <SidebarItem
                icon={<ChartSpline />}
                label="Aptitude"
                to="/aptitude"
                collapsed={isCollapsed}
                isNew={true}
              />
              <SidebarItem
                icon={<ChartPie />}
                label="Logical Reasoning"
                to="/logical-reasoning"
                collapsed={isCollapsed}
                isNew={true}
              />
              <SidebarItem
                icon={<BookA />}
                label="Verbal Reasoning"
                to="/verbal-reasoning"
                collapsed={isCollapsed}
                isNew={true}
              />
              <hr className="border-gray-200 dark:border-gray-700/50 my-2" />
              <SidebarItem
                icon={<Users />}
                label="Interview Prep"
                to="/interview"
                collapsed={isCollapsed}
              />
            </div>
          </nav>

          {/* Footer */}
          <div
            className={`p-4 border-t border-gray-100 dark:border-gray-700/50 ${
              isCollapsed ? "flex justify-center" : ""
            }`}
          >
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 object-cover rounded-full "
                  />
                ) : (
                  <Avatar name={user?.name} size={40} variant="bean" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    Pro Plan
                  </p>
                </div>
                <ThemeToggle />
              </div>
            ) : (
              <>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 object-cover rounded-full "
                  />
                ) : (
                  <Avatar name={user?.name} size={40} variant="bean" />
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
