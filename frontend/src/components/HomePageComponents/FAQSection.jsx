// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Plus, Minus, Search } from 'lucide-react';

// const faqs = [
//   {
//     id: 1,
//     question: "Is there a free trial available?",
//     answer: "Yes, you currently get free for 30 days. If you want more, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
//   },
//   {
//     id: 2,
//     question: "Can I change my plan later?",
//     answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences in cost."
//   },
//   {
//     id: 3,
//     question: "What is your cancellation policy?",
//     answer: "You can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle."
//   },
//   {
//     id: 4,
//     question: "Can other info be added to an invoice?",
//     answer: "Yes, you can add custom information to your invoices including company details, tax information, and purchase order numbers. This can be configured in your account settings."
//   },
//   {
//     id: 5,
//     question: "How does billing work?",
//     answer: "We bill monthly or annually depending on your chosen plan. All payments are processed securely, and you'll receive an invoice via email after each successful payment."
//   },
//   {
//     id: 6,
//     question: "How do I change my account email?",
//     answer: "You can update your account email in the account settings section. We'll send a verification email to your new address to confirm the change before it takes effect."
//   }
// ];

// const FAQSection = () => {
//   const [openItems, setOpenItems] = useState([1]); // First item open by default
//   const [searchTerm, setSearchTerm] = useState('');

//   const toggleItem = (id) => {
//     setOpenItems(prev =>
//       prev.includes(id)
//         ? prev.filter(item => item !== id)
//         : [...prev, id]
//     );
//   };

//   const filteredFAQs = faqs.filter(faq =>
//     faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <section className="py-12 md:py-16 lg:py-24 bg-white dark:bg-zinc-900 transition-colors duration-300">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-8 md:mb-12 lg:mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <div className="inline-flex items-center justify-center px-3 py-1 md:px-4 md:py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-4 md:mb-6">
//             <span className="text-xs md:text-sm font-medium text-zinc-600 dark:text-zinc-300 uppercase tracking-wide">
//               FAQs
//             </span>
//           </div>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-3 md:mb-4">
//             Frequently asked questions
//           </h2>
//           <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
//             Have questions? We're here to help.
//           </p>
//         </motion.div>

//         {/* Search Bar */}
//         <motion.div
//           className="relative mb-6 md:mb-8 lg:mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           <div className="relative">
//             <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-zinc-400 dark:text-zinc-500" />
//             <input
//               type="text"
//               placeholder="Search FAQs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg md:rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
//             />
//           </div>
//         </motion.div>

//         {/* FAQ Items */}
//         <div className="space-y-3 md:space-y-4">
//           {filteredFAQs.map((faq, index) => (
//             <motion.div
//               key={faq.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-zinc-50 dark:bg-zinc-800 rounded-lg md:rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden transition-all duration-200 hover:shadow-sm md:hover:shadow-md dark:hover:shadow-lg"
//             >
//               <button
//                 onClick={() => toggleItem(faq.id)}
//                 className="w-full px-4 py-4 md:px-6 md:py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset transition-all duration-200"
//                 aria-expanded={openItems.includes(faq.id)}
//                 aria-controls={`faq-${faq.id}`}
//               >
//                 <span className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white pr-3 md:pr-4 text-left">
//                   {faq.question}
//                 </span>
//                 <motion.div
//                   animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="flex-shrink-0 ml-2"
//                 >
//                   {openItems.includes(faq.id) ? (
//                     <Minus className="w-4 h-4 md:w-5 md:h-5 text-zinc-500 dark:text-zinc-400" />
//                   ) : (
//                     <Plus className="w-4 h-4 md:w-5 md:h-5 text-zinc-500 dark:text-zinc-400" />
//                   )}
//                 </motion.div>
//               </button>
              
//               <AnimatePresence>
//                 {openItems.includes(faq.id) && (
//                   <motion.div
//                     id={`faq-${faq.id}`}
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     className="overflow-hidden"
//                   >
//                     <div className="px-4 pb-4 md:px-6 md:pb-6">
//                       <div className="h-px bg-zinc-200 dark:bg-zinc-700 mb-3 md:mb-4"></div>
//                       <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </div>

//         {/* No Results Message */}
//         {filteredFAQs.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-8 md:py-12"
//           >
//             <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg">
//               No FAQs found matching your search.
//             </p>
//           </motion.div>
//         )}

//         {/* Contact Section */}
//         <motion.div
//           className="mt-12 md:mt-16 lg:mt-20 text-center"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           viewport={{ once: true }}
//         >
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-700 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
//             <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white mb-3 md:mb-4">
//               Still have questions?
//             </h3>
//             <p className="text-zinc-600 dark:text-zinc-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
//               Can't find the answer you're looking for? Please chat to our friendly team.
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg md:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
//             >
//               Get in touch
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FAQSection;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, MessageCircle, BookOpen } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "Is there a free trial available?",
    answer:
      "Yes, you currently get free for 30 days. If you want more, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    id: 2,
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences in cost.",
  },
  {
    id: 3,
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle.",
  },
  {
    id: 4,
    question: "Can other info be added to an invoice?",
    answer:
      "Yes, you can add custom information to your invoices including company details, tax information, and purchase order numbers. This can be configured in your account settings.",
  },
  {
    id: 5,
    question: "How does billing work?",
    answer:
      "We bill monthly or annually depending on your chosen plan. All payments are processed securely, and you'll receive an invoice via email after each successful payment.",
  },
  {
    id: 6,
    question: "How do I change my account email?",
    answer:
      "You can update your account email in the account settings section. We'll send a verification email to your new address to confirm the change before it takes effect.",
  },
];

const FAQSection = () => {
  const [openItems, setOpenItems] = useState([1]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovering, setIsHovering] = useState(null);

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          >
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>FAQ's</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-semibold text-zinc-900 dark:text-white mb-3 md:mb-4 ">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Everything you need to know about our service.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-2 md:space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-700 opacity-0 transition-opacity duration-300 ${
                  isHovering === faq.id ? "opacity-100" : ""
                }`}
              />

              <motion.div
                whileHover={{ scale: 1.005 }}
                className={`relative bg-white dark:bg-zinc-800 rounded-lg md:rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden transition-all duration-200  ${
                  openItems.includes(faq.id) ? "shadow-sm" : ""
                }`}
                onMouseEnter={() => setIsHovering(faq.id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-3 py-2 md:px-6 md:py-6 text-left flex items-center justify-between focus:outline-none transition-all duration-200"
                  aria-expanded={openItems.includes(faq.id)}
                >
                  <span className="text-md md:text-xl font-semibold text-zinc-900 dark:text-white pr-4 text-left">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-2 p-1 rounded-full bg-zinc-100 dark:bg-zinc-700"
                  >
                    {openItems.includes(faq.id) ? (
                      <Minus className="h-3 w-3 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Plus className="h-3 w-3 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700 mb-4" />
                        <p className="text-zinc-600 text-sm md:text-base dark:text-zinc-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Search className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-1">
              No results found
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Try different search terms
            </p>
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl p-8 md:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100 dark:bg-blue-900 opacity-20" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-100 dark:bg-indigo-900 opacity-20" />

            <div className="relative z-10">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                Still have questions?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-6 max-w-2xl mx-auto">
                Our team is happy to answer your questions. Get in touch and
                we'll help you out.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Contact support
                <svg
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;