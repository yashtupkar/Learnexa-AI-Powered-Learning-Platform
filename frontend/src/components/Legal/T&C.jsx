// src/components/Legal/TermsAndConditions.jsx
import React from "react";
import LegalDocumentLayout from "./legalLayout";

const TermsAndConditions = () => {
  const lastUpdated = "Aug 1, 2025";

  return (
    <LegalDocumentLayout title="Terms and Conditions" lastUpdated={lastUpdated}>
      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          1. Introduction
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          These Terms and Conditions govern your use of Learnexa's website and
          services. By accessing or using our service, you agree to be bound by
          these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          2. Accounts
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          When you create an account with us, you must provide accurate and
          complete information. You are responsible for maintaining the
          confidentiality of your account and password.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          3. Intellectual Property
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of Learnexa and its licensors.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          4. Payments and Subscriptions
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Premium features require payment. We use third-party payment
          processors and do not store your payment details. Subscriptions
          automatically renew unless canceled.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          5. Limitation of Liability
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          In no event shall Learnexa be liable for any indirect, incidental,
          special, consequential or punitive damages resulting from your use of
          the service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl dark:text-white font-semibold mb-4">
          6. Changes to Terms
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          We reserve the right to modify these terms at any time. Your continued
          use of the Service after any such changes constitutes your acceptance
          of the new Terms.
        </p>
      </section>
    </LegalDocumentLayout>
  );
};

export default TermsAndConditions;
