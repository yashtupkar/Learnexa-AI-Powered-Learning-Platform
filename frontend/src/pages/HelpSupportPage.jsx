import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Book,
  Mail,
  Bug,
  Sun,
  Moon,
  HelpCircle,
} from "lucide-react";
import Layout from "../components/layouts/layout";

// Main App component
const HelpSupportPage = () => {
  // State for managing dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode from localStorage or default to false
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // State for managing open/closed FAQ items
  const [openFAQ, setOpenFAQ] = useState(null); // Stores the index of the open FAQ item

  // Effect to apply/remove 'dark' class to the document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save dark mode preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to toggle FAQ item visibility
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by navigating to the 'Account Settings' page and clicking on 'Forgot Password'. Follow the instructions sent to your registered email address.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also find this information in your 'Order History' section.",
    },
    {
      question: "Can I change my shipping address after placing an order?",
      answer:
        "Unfortunately, we cannot change the shipping address once an order has been placed. Please double-check your address before confirming your purchase.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-black dark:text-zinc-100  p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header and Dark Mode Toggle */}
          <div className="flex  items-center gap-2 mb-8">
            <HelpCircle size={30}/>
            <h1 className="text-4xl  text-gray-800 dark:text-zinc-50">
              Help Center
            </h1>
           
          </div>

          {/* Sections Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FAQ Section */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md col-span-1 md:col-span-2">
              <h2 className="text-2xl  mb-4 flex items-center text-gray-800 dark:text-zinc-100">
                
                FAQ's
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-zinc-700 pb-4"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-700 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                    >
                      {faq.question}
                      {openFAQ === index ? (
                        <ChevronUp
                          size={20}
                          className="text-blue-600 dark:text-blue-400 transition-transform duration-300"
                        />
                      ) : (
                        <ChevronDown
                          size={20}
                          className="text-gray-500 dark:text-zinc-400 transition-transform duration-300"
                        />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFAQ === index
                          ? "max-h-screen opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600 dark:text-zinc-300 pr-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl  mb-4 flex items-center text-gray-800 dark:text-zinc-100">
               
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-zinc-300 mb-4">
                Have a question that's not answered here? Feel free to reach out
                to our support team.
              </p>
              <p className="text-gray-700 dark:text-zinc-200 font-medium">
                Email:{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  learnexa@support.com
                </a>
              </p>
              {/* You could add a contact form here */}
            </div>

            {/* Report a Problem Section */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl  mb-4 flex items-center text-gray-800 dark:text-zinc-100">
              
                Report a Problem
              </h2>
              <p className="text-gray-600 dark:text-zinc-300">
                Encountered a bug or an issue with our service? Please let us
                know so we can fix it.
              </p>
              <p className="text-gray-700 dark:text-zinc-200 font-medium mt-4">
                You can report issues by emailing us or visiting our dedicated
                bug report portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpSupportPage;
