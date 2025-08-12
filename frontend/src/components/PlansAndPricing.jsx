import React, { useState } from "react";
import {
  Check,
  Zap,
  Star,
  Gem,
  Crown,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../components/layouts/layout";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/NavigationBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PlansAndPricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Student Starter",
      icon: (
        <BookOpen className="w-5 h-5 text-indigo-400 dark:text-indigo-400" />
      ),
      description: "Begin your learning journey with essential tools",
      price: 0,
      features: [
        " Access to core Learning Material",
        " 5 AI-Quizzes generation",
        " Community support (48hr response)",
        " Basic StudyTube access",
        " 1 personalized learning path",
        " Daily current affairs digest",
        " Basic streak tracking",
      ],
      buttonText: user ? "Active" : "Sign up for free",
      primary: false,
      highlight: "Great for beginners",
    },
    {
      name: "Pro Learner",
      icon: <Zap className="w-5 h-5 text-indigo-400 dark:text-indigo-400" />,
      description: "Maximize your learning potential with advanced tools",
      price: 299,
      features: [
        " Unlimited Learning Material access",
        " 20 AI-Quizzes generation",
        " Personalized learning plans",
        "5 customizable learning paths",
        " 5 Coding challenges generation",
        "Priority support (24hr response)",
        " Downloadable resources & PDFs",
        " Progress reminders",
        " Achievement badges",
        "Study planner",
      ],
      buttonText: user ? "Get Started" : "Start 7-day free trial",
      primary: true,
      offer: "87% of learners choose this",
      highlight: "Best for serious students",
      popularBadge: true,
    },
    {
      name: "Premium Power",
      icon: <Star className="w-5 h-5 text-indigo-400 dark:text-indigo-400" />,
      description: "Ultimate learning experience for top performers",
      price: 499,
      features: [
        "Everything in Pro Learner",
        "Unlimited AI-generated quizzes",
        "Unlimited learning paths",
        "20 coding challenges",
        " Early access to new features",
        "Premium StudyTube content",
        "Curated current affairs + analysis",
        " Premium study material library",
        " Priority support (12hr response)",
        " All resources downloadable",
        " Personalized coaching tips",
        " Mock test series",
        " Exclusive badges & rewards",
      ],
      buttonText: user ? "Upgrade to Premium" : "Start 7-day free trial",
      primary: false,
      offer: "Save ₹600/year vs monthly",
      highlight: "Ideal for competitive exams",
      bestValue: true,
    },
  ];

  const handleButtonClick = (plan) => {
    if (!user) {
      // Redirect to signup for non-logged in users
      navigate("/signup");
    } else {
      // Handle plan selection for logged in users
      if (plan.name === "Student Starter") {
        // Already active, do nothing or show message
      } else {
        // Redirect to payment or plan activation
        navigate("/checkout", { state: { plan: plan.name } });
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-6 backdrop-blur-sm"
            >
              <span className="text-sm bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Invest in Your Growth
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r from-gray-900 dark:from-white to-indigo-600 dark:to-indigo-400 bg-clip-text text-transparent">
              Plans and Pricing
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the perfect plan that matches your learning goals. Our
              AI-powered platform adapts to your pace and style for maximum
              knowledge retention.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl p-6 transition-all duration-300 border ${
                  plan.primary
                    ? "border-indigo-500/30 dark:border-indigo-500/30 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-900 shadow-lg shadow-indigo-500/10 dark:shadow-indigo-500/10 transform scale-[1.02]"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                {plan.popularBadge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                {plan.bestValue && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Best Value
                  </div>
                )}

                <div className="flex items-center mb-4">
                  {plan.icon}
                  <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-end">
                    {plan.price === 0 ? (
                      <span className="text-3xl font-bold">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">
                          ₹
                          {isAnnual
                            ? Math.floor(plan.price * 12 * 0.75)
                            : plan.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          {isAnnual ? "/year" : "/month"}
                        </span>
                      </>
                    )}
                  </div>
                  {plan.highlight && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {plan.highlight}
                    </div>
                  )}
                  {plan.offer && (
                    <div className=" bg-gradient-to-r mt-2 w-fit from-indigo-600 to-indigo-400 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                      {plan.offer}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleButtonClick(plan)}
                  className={`w-full py-3 cursor-pointer rounded-lg font-medium transition-all duration-300 mb-6 ${
                    plan.primary
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 shadow-lg shadow-indigo-500/30 text-white"
                      : plan.name === "Student Starter" && user
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-default"
                      : "border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-900 dark:text-white"
                  }`}
                  disabled={plan.name === "Student Starter" && user}
                >
                  {plan.buttonText}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                    >
                      <Check className="flex-shrink-0 w-4 h-4 mt-0.5 text-indigo-500" />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm"
          >
        

            <p className="mt-8">
              Need help deciding? Take our{" "}
              <a
                href="#"
                className="text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                learning assessment
              </a>{" "}
              or{" "}
              <a
                href="#"
                className="text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                chat with our advisors
              </a>{" "}
              to find your ideal learning path.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default PlansAndPricing;
