// import { useState, useEffect } from "react";
// import DashboardNav from "../DashboardNav";
// import Sidebar from "../SideBar";
// import { useLocation } from "react-router-dom";


// const Layout = ({ children }) => {
//   const location = useLocation();

//   // Initialize state with value from localStorage or default to false
//   const [isCollapsed, setIsCollapsed] = useState(() => {
//     if (typeof window !== "undefined") {
//       const savedState = localStorage.getItem("sidebar");
//       return savedState ? JSON.parse(savedState) : false;
//     }
//     return false;
//   });

//   const routeTitles = {
//     "/dashboard": "Dashboard",
//     "/create-quiz": "Create Quiz",
//     "/my-quizzes": "My Quizzes",
//     "/current-affairs": "Current Affairs",
//     "/study-plan": "Study Plan",
//   };

//   const pageTitle = routeTitles[location.pathname] || "Page";
  

//   const toggleSidebar = () => {
//     const newState = !isCollapsed;
//     setIsCollapsed(newState);
//     localStorage.setItem("sidebar", JSON.stringify(newState));
//   };

//   return (
//     <div className="app-container flex h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
//       <div className="content-wrapper flex-1 flex flex-col overflow-hidden">
//         <DashboardNav pageTitle={pageTitle} />
//         <main className="main-content scrollbar-custom dark:bg-black flex-1 overflow-y-auto ">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
// import { useState, useEffect } from "react";
// import DashboardNav from "../DashboardNav";
// import Sidebar from "../SideBar";
// import { useLocation } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const isMobile = useMediaQuery({ maxWidth: 1024 }); // lg breakpoint
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const isMobileView = useMediaQuery({ maxWidth: 1024 });

//   // Initialize state with value from localStorage or default to false
//   // const [isCollapsed, setIsCollapsed] = useState(() => {
//   //   if (typeof window !== "undefined") {
//   //     const savedState = localStorage.getItem("sidebar");
//   //     return savedState ? JSON.parse(savedState) : false;
//   //   }
//   //   return false;
//   // });
// const [isCollapsed, setIsCollapsed] = useState(() => {
//   // On mobile devices, always return false (not collapsed)
//   if (isMobileView) return false;

//   // On desktop, check localStorage
//   if (typeof window !== "undefined") {
//     const savedState = localStorage.getItem("sidebar");
//     return savedState ? JSON.parse(savedState) : false;
//   }
//   return false;
// });
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

//   const pageTitle = routeTitles[location.pathname] || "Page";

//   const toggleSidebar = () => {
//     const newState = !isCollapsed;
//     setIsCollapsed(newState);
//     localStorage.setItem("sidebar", JSON.stringify(newState));
//   };

//   // Close mobile sidebar when route changes
//   useEffect(() => {
//     setMobileSidebarOpen(false);
//   }, [location.pathname]);

//  return (
//    <div className="app-container flex h-screen bg-gray-50 dark:bg-gray-900">
//      <Sidebar
//        isCollapsed={isCollapsed}
//        toggleSidebar={toggleSidebar}
//        mobileSidebarOpen={mobileSidebarOpen}
//        setMobileSidebarOpen={setMobileSidebarOpen}
//        isMobile={isMobile}
//      />
//      <div className="content-wrapper flex-1 flex flex-col overflow-hidden">
//        <DashboardNav
//          pageTitle={pageTitle}
//          toggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} // Fixed this
//          isMobile={isMobile}
//        />
//        <main className="main-content scrollbar-custom dark:bg-black flex-1 overflow-y-auto">
//          {children}
//        </main>
//      </div>
//    </div>
//  );
// };

// export default Layout;

// import { useState, useEffect } from "react";
// import DashboardNav from "../DashboardNav";
// import Sidebar from "../SideBar";
// import { useLocation } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const isMobile = useMediaQuery({ maxWidth: 1024 }); // lg breakpoint
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const isMobileView = useMediaQuery({ maxWidth: 1024 });

//   // Initialize state with value from localStorage or default to false
//   const [isCollapsed, setIsCollapsed] = useState(() => {
//     // On mobile devices, always return false (not collapsed)
//     if (isMobileView) return false;
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

//   const pageTitle = routeTitles[location.pathname] || "Page";

//   // Desktop sidebar toggle function
//   const toggleDesktopSidebar = () => {
//     const newState = !isCollapsed;
//     setIsCollapsed(newState);
//     localStorage.setItem("sidebar", JSON.stringify(newState));
//   };

//   // Mobile sidebar toggle function
//   const toggleMobileSidebar = () => {
//     setMobileSidebarOpen(!mobileSidebarOpen);
//   };

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
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import { useState, useEffect } from "react";
import DashboardNav from "../DashboardNav";
import Sidebar from "../SideBar";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Layout = ({ children }) => {
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 1024 }); // lg breakpoint
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isMobileView = useMediaQuery({ maxWidth: 1024 });

  // Initialize state with value from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // On mobile devices, always return false (not collapsed)
    if (typeof window !== "undefined" && window.innerWidth <= 1024)
      return false;
    // On desktop, check localStorage
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar");
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  const routeTitles = {
    "/dashboard": "Dashboard",
    "/create": "Create Quiz",
    "/my-quizzes": "My Quizzes",
    "/current-affairs": "Current Affairs",
    "/study-tube": "Studytube",
    "/aptitude": "Aptitude",
    "/logical-reasoning": "Logical Reasoning",
    "/verbal-reasoning": "Verbal Reasoning",
  };

  const pageTitle = routeTitles[location.pathname] || "Page";

  // Desktop sidebar toggle function
  const toggleDesktopSidebar = () => {
    // Only allow desktop sidebar toggle on desktop screens
    if (!isMobile) {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar", JSON.stringify(newState));
      }
    }
  };

  // Mobile sidebar toggle function
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

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
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;