import { useState, useEffect } from "react";
import DashboardNav from "../DashboardNav";
import Sidebar from "../SideBar";
import { useLocation } from "react-router-dom";


const Layout = ({ children }) => {
  const location = useLocation();

  // Initialize state with value from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar");
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  const routeTitles = {
    "/dashboard": "Dashboard",
    "/create-quiz": "Create Quiz",
    "/my-quizzes": "My Quizzes",
    "/analytics": "Analytics",
  
  };

  const pageTitle = routeTitles[location.pathname] || "Page";
  

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar", JSON.stringify(newState));
  };

  return (
    <div className="app-container flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="content-wrapper flex-1 flex flex-col overflow-hidden">
        <DashboardNav pageTitle={pageTitle} />
        <main className="main-content scrollbar-custom dark:bg-black flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
