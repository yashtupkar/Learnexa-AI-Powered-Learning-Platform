
// import { useState, useEffect } from "react";
// import DashboardNav from "../DashboardNav";
// import Sidebar from "../SideBar";
// import { useLocation } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
// import Footer from "../footer";
// import StudyTimerModal from "../modal/StudytimerModal";

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const isMobile = useMediaQuery({ maxWidth: 1024 }); // lg breakpoint
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const isMobileView = useMediaQuery({ maxWidth: 1024 });

//   // Initialize state with value from localStorage or default to false
//   const [isCollapsed, setIsCollapsed] = useState(() => {
//     // On mobile devices, always return false (not collapsed)
//     if (typeof window !== "undefined" && window.innerWidth <= 1024)
//       return false;
//     // On desktop, check localStorage
//     if (typeof window !== "undefined") {
//       const savedState = localStorage.getItem("sidebar");
//       return savedState ? JSON.parse(savedState) : false;
//     }
//     return false;
//   });

//   const routeTitles = {
//     "/dashboard": "Dashboard",
//     "/create": "Create Quiz",
//     "/my-quizzes": "My Quizzes",
//     "/current-affairs": "Current Affairs",
//     "/study-tube": "Studytube",
//     "/aptitude": "Aptitude",
//     "/logical-reasoning": "Logical Reasoning",
//     "/verbal-reasoning": "Verbal Reasoning",
//   };

//   const pageTitle = routeTitles[location.pathname] || "Learnexa";

//   // Desktop sidebar toggle function
//   const toggleDesktopSidebar = () => {
//     // Only allow desktop sidebar toggle on desktop screens
//     if (!isMobile) {
//       const newState = !isCollapsed;
//       setIsCollapsed(newState);
//       if (typeof window !== "undefined") {
//         localStorage.setItem("sidebar", JSON.stringify(newState));
//       }
//     }
//   };

//   // Mobile sidebar toggle function
//   const toggleMobileSidebar = () => {
//     setMobileSidebarOpen(!mobileSidebarOpen);
//   };

//   // Reset sidebar state when screen size changes
//   useEffect(() => {
//     if (isMobile) {
//       setIsCollapsed(false); // Always expanded on mobile
//     }
//   }, [isMobile]);

//   // Close mobile sidebar when route changes
//   useEffect(() => {
//     setMobileSidebarOpen(false);
//   }, [location.pathname]);

//   return (
//     <div className="app-container flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar
//         isCollapsed={isCollapsed}
//         toggleSidebar={toggleDesktopSidebar}
//         mobileSidebarOpen={mobileSidebarOpen}
//         setMobileSidebarOpen={setMobileSidebarOpen}
//         isMobile={isMobile}
//       />
//       <div className="content-wrapper flex-1 flex flex-col overflow-hidden">
//         <DashboardNav
//           pageTitle={pageTitle}
//           toggleMobileSidebar={toggleMobileSidebar}
//           toggleDesktopSidebar={toggleDesktopSidebar}
//           isMobile={isMobile}
//         />
//         <main className="main-content scrollbar-custom dark:bg-black flex-1 overflow-y-auto">
//           <StudyTimerModal/>
//           {children}
//           <Footer />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import DashboardNav from "../DashboardNav";
import Sidebar from "../SideBar";
import Footer from "../footer";
import StudyTimerModal from "../modal/StudytimerModal";
import { Cross, X } from "lucide-react";

const Layout = ({ children }) => {
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  
  // State management
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [hideOfferBanner, setHideOfferBanner] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // On mobile devices, always return false (not collapsed)
    if (typeof window !== "undefined" && window.innerWidth <= 1024) return false;
    // On desktop, check localStorage
    const savedState = localStorage.getItem("sidebar");
    return savedState ? JSON.parse(savedState) : false;
  });

  // Route titles mapping
  const routeTitles = useMemo(() => ({
    "/dashboard": "Dashboard",
    "/create": "Create Quiz",
    "/my-quizzes": "My Quizzes",
    "/current-affairs": "Current Affairs",
    "/study-tube": "Studytube",
    "/aptitude": "Aptitude",
    "/logical-reasoning": "Logical Reasoning",
    "/verbal-reasoning": "Verbal Reasoning",
  }), []);

  // Get current page title
  const pageTitle = useMemo(
    () => routeTitles[location.pathname] || "Learnexa",
    [location.pathname, routeTitles]
  );

  // Desktop sidebar toggle function
  const toggleDesktopSidebar = useCallback(() => {
    if (!isMobile) {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      localStorage.setItem("sidebar", JSON.stringify(newState));
    }
  }, [isCollapsed, isMobile]);

  // Mobile sidebar toggle function
  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(prev => !prev);
  }, []);

  // Reset sidebar state when screen size changes
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false); // Always expanded on mobile
    }
  }, [isMobile]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Offer header with sliding text */}
      <div className="hidden">
        {!hideOfferBanner && (
          <div className="w-full   p-1 md:p-2 sticky top-0 z-50 bg-gradient-to-br from-indigo-600 to-indigo-400 text-white shadow-sm flex items-center justify-between">
            {/* Sliding text container - takes full available width */}
            <div className="flex-1 items-center overflow-hidden relative h-6">
              <div className="absolute w-[200%] text-xs sm:text-sm ms:test-base animate-marquee whitespace-nowrap flex items-center">
                <span className="mx-8">
                  🔥 Sale Live Now on Learnexa! Up to 30% Off
                </span>
                <span className="mx-8">
                  🚀 Limited Time Offer - Grab It Now!
                </span>
                <span className="mx-8">🎉 Special Discounts on All Plans</span>
                {/* Duplicate for seamless looping */}
                <span className="mx-8">
                  🔥 Sale Live Now on Learnexa! Up to 50% Off
                </span>
                <span className="mx-8">
                  🚀 Limited Time Offer - Grab It Now!
                </span>
                <span className="mx-8">🎉 Special Discounts on All Plans</span>
              </div>
            </div>

            {/* Buttons container */}
            <div className="flex items-center ml-4">
              {/* Get Offer button */}
              <button className="px-4 py-1 text-xs sm:text-sm ms:test-base bg-white text-indigo-600 rounded-md font-medium hover:bg-indigo-50 transition-colors whitespace-nowrap">
                Get Offer
              </button>

              {/* Close button */}
              <button
                onClick={() => {
                  setHideOfferBanner(true);
                }}
                className="ml-2 p-1  rounded-full hover:bg-indigo-500 transition-colors"
              >
                <X size={16} mdSize={40} />
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>

      <div className="app-container flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar
          isCollapsed={isCollapsed}
          toggleSidebar={toggleDesktopSidebar}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          isMobile={isMobile}
        />

        <div className="content-wrapper flex-1 flex flex-col overflow-hidden">
          <DashboardNav
            pageTitle={pageTitle}
            toggleMobileSidebar={toggleMobileSidebar}
            toggleDesktopSidebar={toggleDesktopSidebar}
            isMobile={isMobile}
          />

          <main className="main-content scrollbar-custom dark:bg-black flex-1 overflow-y-auto">
            <StudyTimerModal />
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;