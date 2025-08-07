import React from "react";
import Layout from "../layouts/layout";
import { Helmet } from "react-helmet-async";

const LegalDocumentLayout = ({ title, children, lastUpdated }) => {
  return (
    <Layout>
      <Helmet>
        <title>{title} | Learnexa</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-6 py-12">
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
    </Layout>
  );
};

export default LegalDocumentLayout;
