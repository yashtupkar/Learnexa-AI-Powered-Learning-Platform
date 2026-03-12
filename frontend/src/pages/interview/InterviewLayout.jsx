import React from "react";
import { Outlet } from "react-router-dom";
import { InterviewProvider } from "./InterviewContext";

const InterviewLayout = () => {
    return (
        <InterviewProvider>
            <Outlet />
        </InterviewProvider>
    );
};

export default InterviewLayout;
