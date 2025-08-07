// src/components/Legal/PrivacyPolicy.jsx
import React from "react";
import LegalDocumentLayout from "./legalLayout";

const PrivacyPolicy = () => {
  const lastUpdated = "Aug 1, 2025";

  return (
    <LegalDocumentLayout title="Privacy Policy" lastUpdated={lastUpdated}>
      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          1. Introduction
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          At Learnexa, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website or use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl  dark:text-white font-semibold mb-4">
          2. Information We Collect
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          We may collect the following types of information:
        </p>
        <ul className="list-disc text-gray-500 dark:text-gray-400 pl-6 mt-2 space-y-1">
          <li>
            Personal identification information (Name, email address, etc.)
          </li>
          <li>Usage data and analytics</li>
          <li>Cookies and tracking technologies</li>
          <li>Payment information for premium services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          We use the information we collect for various purposes:
        </p>
        <ul className="list-disc text-gray-500 dark:text-gray-400 pl-6 mt-2 space-y-1">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To allow you to participate in interactive features</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          4. Data Security
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          We implement appropriate technical and organizational measures to
          maintain the safety of your personal information. However, no
          electronic transmission over the internet or information storage
          technology can be guaranteed to be 100% secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          5. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the "Last Updated" date.
        </p>
      </section>
    </LegalDocumentLayout>
  );
};

export default PrivacyPolicy;
