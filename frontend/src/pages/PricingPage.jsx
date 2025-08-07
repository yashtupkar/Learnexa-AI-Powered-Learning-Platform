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

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Student",
      icon: (
        <BookOpen className="w-5 h-5 text-indigo-400 dark:text-indigo-400" />
      ),
      description: "Perfect for individual learners and students.",
      price: 0,
      features: [
        "Access to basic courses",
        "5 AI-generated quizzes/month",
        "Community support",
        "1 learning path",
        "Basic progress tracking",
      ],
      buttonText: "Active",
      primary: false,
    },
    {
      name: "Pro Learner",
      icon: <Zap className="w-5 h-5 text-indigo-400 dark:text-indigo-400" />,
      description: "For serious learners and professionals upskilling.",
      price: 299,
      features: [
        "Unlimited course access",
        "20 AI-generated quizzes/month",
        "Personalized learning plans",
        "5 learning paths",
        "Advanced analytics",
        "Priority support",
        "Downloadable resources",
      ],
      buttonText: "Get Started",
      primary: true,
      offer: "Most Popular",
    },
    {
      name: "Enterprise",
      icon: (
        <GraduationCap className="w-5 h-5 text-indigo-400 dark:text-indigo-400" />
      ),
      description: "For teams and organizations.",
      price: "Custom",
      features: [
        "Everything in Pro Learner",
        "Unlimited team members",
        "Custom learning paths",
        "Dedicated account manager",
        "API access",
        "SCORM compliance",
        "White-label options",
        "Advanced reporting",
      ],
      buttonText: "Contact Sales",
      primary: false,
    },
  ];

  return (
      <Layout>
           <Helmet>
                  <title>Plans | Learnexa</title>
                </Helmet>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
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
              <span className="text-sm  bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Smart Learning, Smarter Pricing
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 dark:from-white to-indigo-600 dark:to-indigo-400 bg-clip-text text-transparent">
              Learn Smarter with <br className="" />
              Learnexa
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Accelerate your learning journey with our adaptive AI platform.
              Start for free, upgrade as you grow.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center mt-8 mb-12">
              <span
                className={`mr-4 font-medium ${
                  !isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-800 focus:outline-none"
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ${
                    isAnnual
                      ? "bg-indigo-500 left-7"
                      : "bg-gray-500 dark:bg-gray-600 left-1"
                  }`}
                />
              </button>
              <span
                className={`ml-4 font-medium ${
                  isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500"
                }`}
              >
                Annual{" "}
                <span className="text-sm text-indigo-500 dark:text-indigo-400">
                  (Save 25%)
                </span>
              </span>
            </div>
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
                {plan.offer && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {plan.offer}
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
                    {plan.price === "Custom" ? (
                      <span className="text-3xl font-bold">Custom</span>
                    ) : (
                      <>
                        {plan.price === 0 ? (
                          <span className="text-gray-600 text-3xl font-bold dark:text-white">
                            Free
                          </span>
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
                      </>
                    )}
                  </div>
                  {plan.name === "Pro Learner" && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="font-semibold">Includes:</span> 20 AI
                      tutor sessions/month
                    </div>
                  )}
                  <div
                    className={`text-xs mt-1 ${
                      plan.primary
                        ? "text-indigo-500 dark:text-indigo-300"
                        : "text-gray-500"
                    }`}
                  >
                    {plan.name === "Pro Learner" ? "Best Value" : ""}
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 mb-6 ${
                    plan.primary
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 shadow-lg shadow-indigo-500/30 text-white"
                      : "border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-900 dark:text-white"
                  }`}
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
              Not sure which plan is right for you? Try our{" "}
              <a
                href="#"
                className="text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                free plan
              </a>{" "}
              or{" "}
              <a
                href="#"
                className="text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                contact our team
              </a>{" "}
              for personalized recommendations.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default Pricing;