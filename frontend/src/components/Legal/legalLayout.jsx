import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../NavigationBar";
import Footer from "../footer";

const LegalDocumentLayout = ({ title, children, lastUpdated }) => {
  return (
    <>
      <Navbar />
      <Helmet>
        <title>{title} | Learnexa</title>
      </Helmet>
      <div className="bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto p-6 py-24 ">
          <div className="mb-8">
            <h1 className="text-2xl md:text-5xl  font-bold text-gray-800 dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none ">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalDocumentLayout;
