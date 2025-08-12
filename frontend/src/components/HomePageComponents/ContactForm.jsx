// // // import React, { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   Phone,
// // //   Mail,
// // //   MapPin,
// // //   Send,
// // //   CheckCircle,
// // //   ArrowRight,
// // //   Linkedin,
// // //   Twitter,
// // //   Github,
// // //   PhoneCall,
// // // } from "lucide-react";

// // // export default function ContactForm({ isDark }) {
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     subject: "",
// // //     message: "",
// // //   });

// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [isSubmitted, setIsSubmitted] = useState(false);
// // //   const [focusedField, setFocusedField] = useState(null);

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);

// // //     // Simulate API call
// // //     await new Promise((resolve) => setTimeout(resolve, 2000));

// // //     console.log("Form submitted:", formData);
// // //     setIsSubmitting(false);
// // //     setIsSubmitted(true);

// // //     // Reset form after success message
// // //     setTimeout(() => {
// // //       setIsSubmitted(false);
// // //       setFormData({ name: "", email: "", subject: "", message: "" });
// // //     }, 3000);
// // //   };

// // //   const containerVariants = {
// // //     hidden: { opacity: 0 },
// // //     visible: {
// // //       opacity: 1,
// // //       transition: {
// // //         staggerChildren: 0.15,
// // //         delayChildren: 0.3,
// // //       },
// // //     },
// // //   };

// // //   const itemVariants = {
// // //     hidden: { y: 30, opacity: 0 },
// // //     visible: {
// // //       y: 0,
// // //       opacity: 1,
// // //       transition: {
// // //         type: "spring",
// // //         stiffness: 400,
// // //         damping: 25,
// // //       },
// // //     },
// // //   };

// // //   const cardVariants = {
// // //     hidden: { x: -60, opacity: 0, scale: 0.95 },
// // //     visible: {
// // //       x: 0,
// // //       opacity: 1,
// // //       scale: 1,
// // //       transition: {
// // //         type: "spring",
// // //         stiffness: 300,
// // //         damping: 30,
// // //         delay: 0.2,
// // //       },
// // //     },
// // //   };

// // //   const successVariants = {
// // //     hidden: { scale: 0, opacity: 0 },
// // //     visible: {
// // //       scale: 1,
// // //       opacity: 1,
// // //       transition: {
// // //         type: "spring",
// // //         stiffness: 500,
// // //         damping: 25,
// // //       },
// // //     },
// // //   };

// // //   if (isSubmitted) {
// // //     return (
// // //       <div
// // //         className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-700 ${
// // //           isDark
// // //             ? "bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"
// // //             : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
// // //         }`}
// // //       >
// // //         <motion.div
// // //           variants={successVariants}
// // //           initial="hidden"
// // //           animate="visible"
// // //           className="text-center max-w-md mx-auto"
// // //         >
// // //           <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
// // //             <CheckCircle className="w-12 h-12 text-white" />
// // //           </div>
// // //           <h2
// // //             className={`text-3xl font-bold mb-6 ${
// // //               isDark ? "text-white" : "text-gray-900"
// // //             }`}
// // //           >
// // //             Message Sent Successfully!
// // //           </h2>
// // //           <p
// // //             className={`text-lg mb-8 ${
// // //               isDark ? "text-gray-300" : "text-gray-600"
// // //             }`}
// // //           >
// // //             Thank you for reaching out. We'll get back to you within 24 hours.
// // //           </p>
// // //           <motion.button
// // //             whileHover={{ scale: 1.05 }}
// // //             whileTap={{ scale: 0.95 }}
// // //             onClick={() => setIsSubmitted(false)}
// // //             className={`px-8 py-3 rounded-xl font-medium text-lg ${
// // //               isDark
// // //                 ? "bg-indigo-600 hover:bg-indigo-700 text-white"
// // //                 : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
// // //             } transition-colors duration-300`}
// // //           >
// // //             Back to Form
// // //           </motion.button>
// // //         </motion.div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div
// // //       className={`min-h-screen py-12 md:py-16 px-4 sm:px-6 transition-colors duration-700 bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800  from-indigo-50 to-purple-50`}
// // //     >
// // //       {/* Background Elements */}
// // //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// // //         <div
// // //           className={`absolute top-1/4 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 dark:bg-indigo-500 bg-indigo-300
// // //           `}
// // //         ></div>
// // //         <div
// // //           className={`absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
// // //             isDark ? "bg-purple-500" : "bg-purple-300"
// // //           }`}
// // //         ></div>
// // //       </div>

// // //       <div className="max-w-7xl mx-auto relative z-10">
// // //         {/* Enhanced Header */}
// // //         <motion.div
// // //           initial={{ y: -40, opacity: 0 }}
// // //           animate={{ y: 0, opacity: 1 }}
// // //           transition={{ duration: 0.8, ease: "easeOut" }}
// // //           className="text-center mb-12 md:mb-20"
// // //         >
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.8 }}
// // //             whileInView={{ opacity: 1, scale: 1 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 0.6, delay: 0.2 }}
// // //             className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
// // //           >
// // //             <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4" />
// // //             <span>Contact Us</span>
// // //           </motion.div>

// // //           <h1
// // //             className={`text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 dark:text-white text-gray-900
// // //             `}
// // //           >
// // //             Let's{" "}
// // //             <span className="bg-gradient-to-r from-indigo-600  to-indigo-500 bg-clip-text text-transparent">
// // //               Talk
// // //             </span>
// // //           </h1>

// // //           <p
// // //             className={`text-sm md:text-lg max-w-3xl mx-auto leading-relaxed dark:text-gray-300 text-gray-600
// // //             `}
// // //           >
// // //             Have a project in mind or want to discuss potential collaboration?
// // //             Fill out the form and our team will get back to you promptly.
// // //           </p>
// // //         </motion.div>

// // //         {/* Main Content */}
// // //         <div className="grid lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16 items-start">
// // //           {/* Enhanced Contact Information Card */}
// // //           <motion.div
// // //             variants={cardVariants}
// // //             initial="hidden"
// // //             animate="visible"
// // //             className="lg:col-span-2 lg:sticky lg:top-8"
// // //           >
// // //             <div className="relative h-full">
// // //               {/* Glow Effect */}
// // //               <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>

// // //               <div className="relative h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 md:p-10 text-white shadow-2xl overflow-hidden">
// // //                 {/* Enhanced Background Elements */}
// // //                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
// // //                 <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16"></div>
// // //                 <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-14 -translate-x-14"></div>

// // //                 <div className="relative z-10 h-full flex flex-col">
// // //                   <motion.div
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ delay: 0.5 }}
// // //                   >
// // //                     <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
// // //                       Contact Details
// // //                     </h2>
// // //                     <p className="text-indigo-100 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
// // //                       Reach out to us through any of these channels. We're
// // //                       available 24/7 to answer your questions.
// // //                     </p>
// // //                   </motion.div>

// // //                   <div className="space-y-6 md:space-y-8 flex-grow">
// // //                     {[
// // //                       {
// // //                         icon: Phone,
// // //                         primary: "+1 (555) 123-4567",
// // //                         secondary: "+1 (555) 987-6543",
// // //                         description: "Available 24/7 for urgent inquiries",
// // //                       },
// // //                       {
// // //                         icon: Mail,
// // //                         primary: "hello@company.com",
// // //                         secondary: "support@company.com",
// // //                         description: "Typically respond within 24 hours",
// // //                       },
// // //                       {
// // //                         icon: MapPin,
// // //                         primary: "San Francisco, CA",
// // //                         secondary: "New York, NY",
// // //                         description: "Headquarters & Satellite Office",
// // //                       },
// // //                     ].map((item, index) => (
// // //                       <motion.div
// // //                         key={index}
// // //                         initial={{ opacity: 0, x: -20 }}
// // //                         animate={{ opacity: 1, x: 0 }}
// // //                         transition={{ delay: 0.7 + index * 0.1 }}
// // //                         whileHover={{ x: 8, transition: { duration: 0.2 } }}
// // //                         className="flex items-start space-x-4 group cursor-pointer"
// // //                       >
// // //                         <div className="w-12 h-12 flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
// // //                           <item.icon size={20} />
// // //                         </div>
// // //                         <div>
// // //                           <p className="font-semibold text-base md:text-lg">
// // //                             {item.primary}
// // //                           </p>
// // //                           {item.secondary && (
// // //                             <p className="text-indigo-200 text-sm">
// // //                               {item.secondary}
// // //                             </p>
// // //                           )}
// // //                           <p className="text-indigo-100/80 text-xs mt-1">
// // //                             {item.description}
// // //                           </p>
// // //                         </div>
// // //                       </motion.div>
// // //                     ))}
// // //                   </div>

// // //                   {/* Social Links */}
// // //                   <motion.div
// // //                     initial={{ opacity: 0 }}
// // //                     animate={{ opacity: 1 }}
// // //                     transition={{ delay: 1.2 }}
// // //                     className="mt-8 pt-6 border-t border-white/20"
// // //                   >
// // //                     <p className="text-indigo-200 text-sm mb-3 md:mb-4">
// // //                       Follow us on social media
// // //                     </p>
// // //                     <div className="flex space-x-3">
// // //                       {[
// // //                         {
// // //                           icon: Linkedin,
// // //                           color: "bg-blue-500",
// // //                           name: "LinkedIn",
// // //                         },
// // //                         { icon: Twitter, color: "bg-sky-400", name: "Twitter" },
// // //                         { icon: Github, color: "bg-gray-700", name: "GitHub" },
// // //                       ].map((social, i) => (
// // //                         <motion.a
// // //                           key={i}
// // //                           href="#"
// // //                           target="_blank"
// // //                           rel="noopener noreferrer"
// // //                           whileHover={{ y: -4 }}
// // //                           whileTap={{ scale: 0.9 }}
// // //                           className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}
// // //                           aria-label={social.name}
// // //                         >
// // //                           <social.icon className="w-5 h-5 text-white" />
// // //                         </motion.a>
// // //                       ))}
// // //                     </div>
// // //                   </motion.div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </motion.div>

// // //           {/* Enhanced Contact Form */}
// // //           <motion.div
// // //             variants={containerVariants}
// // //             initial="hidden"
// // //             animate="visible"
// // //             className="lg:col-span-3"
// // //           >
// // //             <div
// // //               className={`rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-sm border dark:bg-gray-800/50 border-gray-700/50"
// // //                 bg-white/80 border-white/50
// // //               `}
// // //             >
// // //               <motion.div
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.3 }}
// // //                 className="mb-8"
// // //               >
// // //                 <h2
// // //                   className={`text-2xl md:text-3xl font-bold mb-2 dark:text-white text-gray-900
// // //                   `}
// // //                 >
// // //                   Send us a message
// // //                 </h2>
// // //                 <p
// // //                   className={`text-sm md:text-base dark:text-gray-300 text-gray-600"
// // //                   `}
// // //                 >
// // //                   Fill out the form below and our team will get back to you
// // //                   promptly.
// // //                 </p>
// // //               </motion.div>

// // //               <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
// // //                 <div className="grid md:grid-cols-2 gap-6 md:gap-8">
// // //                   {[
// // //                     {
// // //                       name: "name",
// // //                       label: "Full Name",
// // //                       placeholder: "John Doe",
// // //                       type: "text",
// // //                     },
// // //                     {
// // //                       name: "email",
// // //                       label: "Email Address",
// // //                       placeholder: "hello@example.com",
// // //                       type: "email",
// // //                     },
// // //                   ].map((field) => (
// // //                     <motion.div key={field.name} variants={itemVariants}>
// // //                       <label
// // //                         className={`block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700`}
// // //                       >
// // //                         {field.label}
// // //                         <span className="text-red-500 ml-1">*</span>
// // //                       </label>
// // //                       <div className="relative">
// // //                         <input
// // //                           type={field.type}
// // //                           name={field.name}
// // //                           value={formData[field.name]}
// // //                           onChange={handleInputChange}
// // //                           onFocus={() => setFocusedField(field.name)}
// // //                           onBlur={() => setFocusedField(null)}
// // //                           required
// // //                           className={`w-full px-5 py-3.5 rounded-xl border-2 transition-all duration-300 text-base ${
// // //                             focusedField === field.name
// // //                               ? "border-indigo-500 ring-4 ring-indigo-500/20"
// // //                               : isDark
// // //                               ? "dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-700/30"
// // //                               : "border-gray-200 hover:border-gray-300 bg-white"
// // //                           } ${
// // //                             isDark
// // //                               ? "dark:text-white dark:placeholder-gray-400"
// // //                               : "text-gray-900 placeholder-gray-500"
// // //                           }`}
// // //                           placeholder={field.placeholder}
// // //                         />
// // //                       </div>
// // //                     </motion.div>
// // //                   ))}
// // //                 </div>

// // //                 <motion.div variants={itemVariants}>
// // //                   <label
// // //                     className={`block text-sm font-medium mb-2 dark:text-gray-200 text-gray-700
// // //                     `}
// // //                   >
// // //                     Subject
// // //                     <span className="text-red-500 ml-1">*</span>
// // //                   </label>
// // //                   <div className="relative">
// // //                     <input
// // //                       type="text"
// // //                       name="subject"
// // //                       value={formData.subject}
// // //                       onChange={handleInputChange}
// // //                       onFocus={() => setFocusedField("subject")}
// // //                       onBlur={() => setFocusedField(null)}
// // //                       required
// // //                       className={`w-full px-5 py-3.5 rounded-xl border-2 transition-all duration-300 text-base ${
// // //                         focusedField === "subject"
// // //                           ? "border-indigo-500 ring-4 ring-indigo-500/20"
// // //                           : isDark
// // //                           ? "border-gray-600 hover:border-gray-500 bg-gray-700/30"
// // //                           : "border-gray-200 hover:border-gray-300 bg-white"
// // //                       } ${
// // //                         isDark
// // //                           ? "text-white placeholder-gray-400"
// // //                           : "text-gray-900 placeholder-gray-500"
// // //                       }`}
// // //                       placeholder="What's this about?"
// // //                     />
// // //                   </div>
// // //                 </motion.div>

// // //                 <motion.div variants={itemVariants}>
// // //                   <label
// // //                     className={`block text-sm font-medium mb-2 ${
// // //                       isDark ? "text-gray-200" : "text-gray-700"
// // //                     }`}
// // //                   >
// // //                     Your Message
// // //                     <span className="text-red-500 ml-1">*</span>
// // //                   </label>
// // //                   <div className="relative">
// // //                     <textarea
// // //                       name="message"
// // //                       value={formData.message}
// // //                       onChange={handleInputChange}
// // //                       onFocus={() => setFocusedField("message")}
// // //                       onBlur={() => setFocusedField(null)}
// // //                       required
// // //                       rows={5}
// // //                       className={`w-full px-5 py-3.5 rounded-xl border-2 transition-all duration-300 resize-none text-base ${
// // //                         focusedField === "message"
// // //                           ? "border-indigo-500 ring-4 ring-indigo-500/20"
// // //                           : isDark
// // //                           ? "border-gray-600 hover:border-gray-500 bg-gray-700/30"
// // //                           : "border-gray-200 hover:border-gray-300 bg-white"
// // //                       } ${
// // //                         isDark
// // //                           ? "text-white placeholder-gray-400"
// // //                           : "text-gray-900 placeholder-gray-500"
// // //                       }`}
// // //                       placeholder="Tell us about your project, timeline, and budget..."
// // //                     />
// // //                   </div>
// // //                 </motion.div>

// // //                 <motion.div variants={itemVariants} className="pt-2">
// // //                   <motion.button
// // //                     type="submit"
// // //                     disabled={isSubmitting}
// // //                     whileHover={{ scale: 1.02 }}
// // //                     whileTap={{ scale: 0.98 }}
// // //                     className={`group relative w-full px-8 py-4 font-bold text-lg rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${
// // //                       isDark
// // //                         ? "bg-indigo-600 hover:bg-indigo-700 text-white"
// // //                         : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl"
// // //                     }`}
// // //                   >
// // //                     {/* Button Glow Effect */}
// // //                     <div
// // //                       className={`absolute inset-0 ${
// // //                         isDark
// // //                           ? "bg-indigo-500"
// // //                           : "bg-gradient-to-r from-indigo-500 to-purple-500"
// // //                       } opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md`}
// // //                     ></div>

// // //                     <div className="relative flex items-center justify-center space-x-3">
// // //                       {isSubmitting ? (
// // //                         <>
// // //                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// // //                           <span>Processing...</span>
// // //                         </>
// // //                       ) : (
// // //                         <>
// // //                           <Send size={20} />
// // //                           <span>Send Message</span>
// // //                           <ArrowRight
// // //                             size={18}
// // //                             className="group-hover:translate-x-1 transition-transform duration-200"
// // //                           />
// // //                         </>
// // //                       )}
// // //                     </div>
// // //                   </motion.button>
// // //                 </motion.div>
// // //               </form>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import {
// //   Phone,
// //   Mail,
// //   MapPin,
// //   Send,
// //   CheckCircle,
// //   ArrowRight,
// //   Linkedin,
// //   Twitter,
// //   Github,
// //   PhoneCall,
// // } from "lucide-react";

// // export default function ContactForm({ isDark = false }) {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [focusedField, setFocusedField] = useState(null);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     // Simulate API call
// //     await new Promise((resolve) => setTimeout(resolve, 2000));

// //     console.log("Form submitted:", formData);
// //     setIsSubmitting(false);
// //     setIsSubmitted(true);

// //     // Reset form after success message
// //     setTimeout(() => {
// //       setIsSubmitted(false);
// //       setFormData({ name: "", email: "", subject: "", message: "" });
// //     }, 3000);
// //   };

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.15,
// //         delayChildren: 0.3,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { y: 30, opacity: 0 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       transition: {
// //         type: "spring",
// //         stiffness: 400,
// //         damping: 25,
// //       },
// //     },
// //   };

// //   const cardVariants = {
// //     hidden: { x: -60, opacity: 0, scale: 0.95 },
// //     visible: {
// //       x: 0,
// //       opacity: 1,
// //       scale: 1,
// //       transition: {
// //         type: "spring",
// //         stiffness: 300,
// //         damping: 30,
// //         delay: 0.2,
// //       },
// //     },
// //   };

// //   const successVariants = {
// //     hidden: { scale: 0, opacity: 0 },
// //     visible: {
// //       scale: 1,
// //       opacity: 1,
// //       transition: {
// //         type: "spring",
// //         stiffness: 500,
// //         damping: 25,
// //       },
// //     },
// //   };

// //   if (isSubmitted) {
// //     return (
// //       <div
// //         className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-700 ${
// //           isDark
// //             ? "bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"
// //             : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
// //         }`}
// //       >
// //         <motion.div
// //           variants={successVariants}
// //           initial="hidden"
// //           animate="visible"
// //           className="text-center max-w-md mx-auto p-6"
// //         >
// //           <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 sm:mb-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
// //             <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
// //           </div>
// //           <h2
// //             className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
// //               isDark ? "text-white" : "text-gray-900"
// //             }`}
// //           >
// //             Message Sent Successfully!
// //           </h2>
// //           <p
// //             className={`text-base sm:text-lg mb-6 sm:mb-8 ${
// //               isDark ? "text-gray-300" : "text-gray-600"
// //             }`}
// //           >
// //             Thank you for reaching out. We'll get back to you within 24 hours.
// //           </p>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={() => setIsSubmitted(false)}
// //             className={`px-6 sm:px-8 py-3 rounded-xl font-medium text-base sm:text-lg ${
// //               isDark
// //                 ? "bg-indigo-600 hover:bg-indigo-700 text-white"
// //                 : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
// //             } transition-colors duration-300`}
// //           >
// //             Back to Form
// //           </motion.button>
// //         </motion.div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       className={`min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6 transition-colors duration-700 ${
// //         isDark
// //           ? "bg-gradient-to-br from-zinc-900 to-zinc-800"
// //           : "bg-gradient-to-br from-indigo-50 to-purple-50"
// //       }`}
// //     >
// //       {/* Background Elements */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div
// //           className={`absolute top-1/4 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 rounded-full blur-3xl opacity-20 ${
// //             isDark ? "bg-indigo-500" : "bg-indigo-300"
// //           }`}
// //         ></div>
// //         <div
// //           className={`absolute bottom-1/4 -right-20 sm:-right-40 w-48 sm:w-96 h-48 sm:h-96 rounded-full blur-3xl opacity-20 ${
// //             isDark ? "bg-purple-500" : "bg-purple-300"
// //           }`}
// //         ></div>
// //       </div>

// //       <div className="max-w-7xl mx-auto relative z-10">
// //         {/* Enhanced Header */}
// //         <motion.div
// //           initial={{ y: -40, opacity: 0 }}
// //           animate={{ y: 0, opacity: 1 }}
// //           transition={{ duration: 0.8, ease: "easeOut" }}
// //           className="text-center mb-8 sm:mb-12 lg:mb-20"
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //             className={`inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 ${
// //               isDark
// //                 ? "bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-800/50 text-indigo-300"
// //                 : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 text-indigo-700"
// //             }`}
// //           >
// //             <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4" />
// //             <span>Contact Us</span>
// //           </motion.div>

// //           <h1
// //             className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 ${
// //               isDark ? "text-white" : "text-gray-900"
// //             }`}
// //           >
// //             Let's{" "}
// //             <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
// //               Talk
// //             </span>
// //           </h1>

// //           <p
// //             className={`text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-4 ${
// //               isDark ? "text-gray-300" : "text-gray-600"
// //             }`}
// //           >
// //             Have a project in mind or want to discuss potential collaboration?
// //             Fill out the form and our team will get back to you promptly.
// //           </p>
// //         </motion.div>

// //         {/* Main Content */}
// //         <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
// //           {/* Enhanced Contact Information Card */}
// //           <motion.div
// //             variants={cardVariants}
// //             initial="hidden"
// //             animate="visible"
// //             className="lg:col-span-2 lg:sticky lg:top-8"
// //           >
// //             <div className="relative h-full">
// //               {/* Glow Effect */}
// //               <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20"></div>

// //               <div className="relative h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl overflow-hidden">
// //                 {/* Enhanced Background Elements */}
// //                 <div className="absolute top-0 right-0 w-20 h-20 sm:w-40 sm:h-40 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-20 translate-x-10 sm:translate-x-20"></div>
// //                 <div className="absolute top-1/2 right-0 w-16 h-16 sm:w-32 sm:h-32 bg-white/5 rounded-full translate-x-8 sm:translate-x-16"></div>
// //                 <div className="absolute bottom-0 left-0 w-14 h-14 sm:w-28 sm:h-28 bg-white/5 rounded-full translate-y-7 sm:translate-y-14 -translate-x-7 sm:-translate-x-14"></div>

// //                 <div className="relative z-10 h-full flex flex-col">
// //                   <motion.div
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: 0.5 }}
// //                   >
// //                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6">
// //                       Contact Details
// //                     </h2>
// //                     <p className="text-indigo-100 mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base lg:text-lg leading-relaxed">
// //                       Reach out to us through any of these channels. We're
// //                       available 24/7 to answer your questions.
// //                     </p>
// //                   </motion.div>

// //                   <div className="space-y-4 sm:space-y-6 lg:space-y-8 flex-grow">
// //                     {[
// //                       {
// //                         icon: Phone,
// //                         primary: "+1 (555) 123-4567",
// //                         secondary: "+1 (555) 987-6543",
// //                         description: "Available 24/7 for urgent inquiries",
// //                       },
// //                       {
// //                         icon: Mail,
// //                         primary: "hello@company.com",
// //                         secondary: "support@company.com",
// //                         description: "Typically respond within 24 hours",
// //                       },
// //                       {
// //                         icon: MapPin,
// //                         primary: "San Francisco, CA",
// //                         secondary: "New York, NY",
// //                         description: "Headquarters & Satellite Office",
// //                       },
// //                     ].map((item, index) => (
// //                       <motion.div
// //                         key={index}
// //                         initial={{ opacity: 0, x: -20 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         transition={{ delay: 0.7 + index * 0.1 }}
// //                         whileHover={{ x: 8, transition: { duration: 0.2 } }}
// //                         className="flex items-start space-x-3 sm:space-x-4 group cursor-pointer"
// //                       >
// //                         <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
// //                           <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
// //                         </div>
// //                         <div className="min-w-0 flex-1">
// //                           <p className="font-semibold text-sm sm:text-base lg:text-lg break-words">
// //                             {item.primary}
// //                           </p>
// //                           {item.secondary && (
// //                             <p className="text-indigo-200 text-xs sm:text-sm break-words">
// //                               {item.secondary}
// //                             </p>
// //                           )}
// //                           <p className="text-indigo-100/80 text-xs mt-1">
// //                             {item.description}
// //                           </p>
// //                         </div>
// //                       </motion.div>
// //                     ))}
// //                   </div>

// //                   {/* Social Links */}
// //                   <motion.div
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     transition={{ delay: 1.2 }}
// //                     className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20"
// //                   >
// //                     <p className="text-indigo-200 text-xs sm:text-sm mb-3 sm:mb-4">
// //                       Follow us on social media
// //                     </p>
// //                     <div className="flex space-x-2 sm:space-x-3">
// //                       {[
// //                         {
// //                           icon: Linkedin,
// //                           color: "bg-blue-500",
// //                           name: "LinkedIn",
// //                         },
// //                         { icon: Twitter, color: "bg-sky-400", name: "Twitter" },
// //                         { icon: Github, color: "bg-gray-700", name: "GitHub" },
// //                       ].map((social, i) => (
// //                         <motion.a
// //                           key={i}
// //                           href="#"
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           whileHover={{ y: -4 }}
// //                           whileTap={{ scale: 0.9 }}
// //                           className={`w-8 h-8 sm:w-10 sm:h-10 ${social.color} rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}
// //                           aria-label={social.name}
// //                         >
// //                           <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
// //                         </motion.a>
// //                       ))}
// //                     </div>
// //                   </motion.div>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Enhanced Contact Form */}
// //           <motion.div
// //             variants={containerVariants}
// //             initial="hidden"
// //             animate="visible"
// //             className="lg:col-span-3"
// //           >
// //             <div
// //               className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm border ${
// //                 isDark
// //                   ? "bg-gray-800/50 border-gray-700/50"
// //                   : "bg-white/80 border-white/50"
// //               }`}
// //             >
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.3 }}
// //                 className="mb-6 sm:mb-8"
// //               >
// //                 <h2
// //                   className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${
// //                     isDark ? "text-white" : "text-gray-900"
// //                   }`}
// //                 >
// //                   Send us a message
// //                 </h2>
// //                 <p
// //                   className={`text-sm sm:text-base ${
// //                     isDark ? "text-gray-300" : "text-gray-600"
// //                   }`}
// //                 >
// //                   Fill out the form below and our team will get back to you
// //                   promptly.
// //                 </p>
// //               </motion.div>

// //               <form
// //                 onSubmit={handleSubmit}
// //                 className="space-y-4 sm:space-y-6 lg:space-y-8"
// //               >
// //                 <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
// //                   {[
// //                     {
// //                       name: "name",
// //                       label: "Full Name",
// //                       placeholder: "John Doe",
// //                       type: "text",
// //                     },
// //                     {
// //                       name: "email",
// //                       label: "Email Address",
// //                       placeholder: "hello@example.com",
// //                       type: "email",
// //                     },
// //                   ].map((field) => (
// //                     <motion.div key={field.name} variants={itemVariants}>
// //                       <label
// //                         className={`block text-sm font-medium mb-2 ${
// //                           isDark ? "text-gray-200" : "text-gray-700"
// //                         }`}
// //                       >
// //                         {field.label}
// //                         <span className="text-red-500 ml-1">*</span>
// //                       </label>
// //                       <div className="relative">
// //                         <input
// //                           type={field.type}
// //                           name={field.name}
// //                           value={formData[field.name]}
// //                           onChange={handleInputChange}
// //                           onFocus={() => setFocusedField(field.name)}
// //                           onBlur={() => setFocusedField(null)}
// //                           required
// //                           className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
// //                             focusedField === field.name
// //                               ? "border-indigo-500 ring-4 ring-indigo-500/20"
// //                               : isDark
// //                               ? "border-gray-600 hover:border-gray-500 bg-gray-700/30"
// //                               : "border-gray-200 hover:border-gray-300 bg-white"
// //                           } ${
// //                             isDark
// //                               ? "text-white placeholder-gray-400"
// //                               : "text-gray-900 placeholder-gray-500"
// //                           }`}
// //                           placeholder={field.placeholder}
// //                         />
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </div>

// //                 <motion.div variants={itemVariants}>
// //                   <label
// //                     className={`block text-sm font-medium mb-2 ${
// //                       isDark ? "text-gray-200" : "text-gray-700"
// //                     }`}
// //                   >
// //                     Subject
// //                     <span className="text-red-500 ml-1">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <input
// //                       type="text"
// //                       name="subject"
// //                       value={formData.subject}
// //                       onChange={handleInputChange}
// //                       onFocus={() => setFocusedField("subject")}
// //                       onBlur={() => setFocusedField(null)}
// //                       required
// //                       className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
// //                         focusedField === "subject"
// //                           ? "border-indigo-500 ring-4 ring-indigo-500/20"
// //                           : isDark
// //                           ? "border-gray-600 hover:border-gray-500 bg-gray-700/30"
// //                           : "border-gray-200 hover:border-gray-300 bg-white"
// //                       } ${
// //                         isDark
// //                           ? "text-white placeholder-gray-400"
// //                           : "text-gray-900 placeholder-gray-500"
// //                       }`}
// //                       placeholder="What's this about?"
// //                     />
// //                   </div>
// //                 </motion.div>

// //                 <motion.div variants={itemVariants}>
// //                   <label
// //                     className={`block text-sm font-medium mb-2 ${
// //                       isDark ? "text-gray-200" : "text-gray-700"
// //                     }`}
// //                   >
// //                     Your Message
// //                     <span className="text-red-500 ml-1">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <textarea
// //                       name="message"
// //                       value={formData.message}
// //                       onChange={handleInputChange}
// //                       onFocus={() => setFocusedField("message")}
// //                       onBlur={() => setFocusedField(null)}
// //                       required
// //                       rows={4}
// //                       className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 resize-none text-sm sm:text-base ${
// //                         focusedField === "message"
// //                           ? "border-indigo-500 ring-4 ring-indigo-500/20"
// //                           : isDark
// //                           ? "border-gray-600 hover:border-gray-500 bg-gray-700/30"
// //                           : "border-gray-200 hover:border-gray-300 bg-white"
// //                       } ${
// //                         isDark
// //                           ? "text-white placeholder-gray-400"
// //                           : "text-gray-900 placeholder-gray-500"
// //                       }`}
// //                       placeholder="Tell us about your project, timeline, and budget..."
// //                     />
// //                   </div>
// //                 </motion.div>

// //                 <motion.div variants={itemVariants} className="pt-2">
// //                   <motion.button
// //                     type="submit"
// //                     disabled={isSubmitting}
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className={`group relative w-full px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${
// //                       isDark
// //                         ? "bg-indigo-600 hover:bg-indigo-700 text-white"
// //                         : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl"
// //                     }`}
// //                   >
// //                     {/* Button Glow Effect */}
// //                     <div
// //                       className={`absolute inset-0 ${
// //                         isDark
// //                           ? "bg-indigo-500"
// //                           : "bg-gradient-to-r from-indigo-500 to-purple-500"
// //                       } opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md`}
// //                     ></div>

// //                     <div className="relative flex items-center justify-center space-x-2 sm:space-x-3">
// //                       {isSubmitting ? (
// //                         <>
// //                           <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                           <span>Processing...</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Send className="w-4 h-4 sm:w-5 sm:h-5" />
// //                           <span>Send Message</span>
// //                           <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
// //                         </>
// //                       )}
// //                     </div>
// //                   </motion.button>
// //                 </motion.div>
// //               </form>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Send,
//   CheckCircle,
//   ArrowRight,
//   Linkedin,
//   Twitter,
//   Github,
//   PhoneCall,
//   MessageSquare,
//   Clock,
//   Globe,
// } from "lucide-react";

// export default function ContactForm({ isDark = false }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     console.log("Form submitted:", formData);
//     setIsSubmitting(false);
//     setIsSubmitted(true);
//     // Reset form after success message
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({ name: "", email: "", subject: "", message: "" });
//     }, 3000);
//   };

//   const contactMethods = [
//     {
//       icon: Phone,
//       title: "Phone Support",
//       primary: "+1 (555) 123-4567",
//       secondary: "+1 (555) 987-6543",
//       description: "Available 24/7 for urgent inquiries",
//       highlight: "Instant Response",
//     },
//     {
//       icon: Mail,
//       title: "Email Support",
//       primary: "hello@company.com",
//       secondary: "support@company.com",
//       description: "Typically respond within 24 hours",
//       highlight: "Professional Support",
//     },
//     {
//       icon: MapPin,
//       title: "Office Locations",
//       primary: "San Francisco, CA",
//       secondary: "New York, NY",
//       description: "Headquarters & Satellite Office",
//       highlight: "Global Presence",
//     },
//   ];

//   if (isSubmitted) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-700 ${
//           isDark ? "bg-black" : "bg-white"
//         }`}
//       >
//         <motion.div
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ type: "spring", stiffness: 500, damping: 25 }}
//           className="text-center max-w-md mx-auto p-6"
//         >
//           <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
//             <CheckCircle className="w-10 h-10 text-white" />
//           </div>
//           <h2
//             className={`text-3xl font-semibold mb-6 ${
//               isDark ? "text-white" : "text-gray-900"
//             }`}
//           >
//             Message Sent Successfully!
//           </h2>
//           <p
//             className={`text-lg mb-8 ${
//               isDark ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             Thank you for reaching out. We'll get back to you within 24 hours.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsSubmitted(false)}
//             className="bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
//           >
//             Back to Form
//           </motion.button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${
//         isDark ? "bg-black text-white" : "bg-white text-gray-900"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0.9 }}
//             whileInView={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className={`inline-flex items-center justify-center px-4 py-2 rounded-full mb-6 backdrop-blur-sm ${
//               isDark
//                 ? "bg-white/5 border border-white/10"
//                 : "bg-gray-100 border border-gray-200"
//             }`}
//           >
//             <PhoneCall className="w-4 h-4 mr-2 text-indigo-500" />
//             <span
//               className={`text-sm bg-gradient-to-r ${
//                 isDark
//                   ? "from-indigo-400 to-indigo-300"
//                   : "from-indigo-500 to-indigo-400"
//               } bg-clip-text text-transparent`}
//             >
//               Get in Touch
//             </span>
//           </motion.div>
//           <h1
//             className={`text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r ${
//               isDark
//                 ? "from-white to-indigo-400"
//                 : "from-gray-900 to-indigo-600"
//             } bg-clip-text text-transparent`}
//           >
//             Contact Us
//           </h1>
//           <p
//             className={`text-lg max-w-3xl mx-auto ${
//               isDark ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             Have a project in mind or want to discuss potential collaboration?
//             We're here to help you turn your ideas into reality.
//           </p>
//         </motion.div>

//         {/* Contact Methods Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//           {contactMethods.map((method, index) => (
//             <motion.div
//               key={method.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className={`relative rounded-2xl p-6 transition-all duration-300 border ${
//                 isDark
//                   ? "border-gray-800 bg-gray-950 hover:border-gray-700"
//                   : "border-gray-200 bg-white hover:border-gray-300"
//               }`}
//             >
//               <div className="flex items-center mb-4">
//                 <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-lg flex items-center justify-center mr-3">
//                   <method.icon className="w-5 h-5 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold">{method.title}</h3>
//               </div>

//               <div className="mb-4">
//                 <p className="font-semibold text-lg break-words">
//                   {method.primary}
//                 </p>
//                 {method.secondary && (
//                   <p
//                     className={`text-sm mt-1 ${
//                       isDark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     {method.secondary}
//                   </p>
//                 )}
//               </div>

//               <p
//                 className={`text-sm mb-4 ${
//                   isDark ? "text-gray-400" : "text-gray-600"
//                 }`}
//               >
//                 {method.description}
//               </p>

//               <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full w-fit">
//                 {method.highlight}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Main Contact Form */}
//         <div className="grid lg:grid-cols-5 gap-8 items-start">
//           {/* Social Links Card */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="lg:col-span-2"
//           >
//             <div
//               className={`rounded-2xl p-8 border ${
//                 isDark
//                   ? "border-gray-800 bg-gray-950"
//                   : "border-gray-200 bg-white"
//               }`}
//             >
//               <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
//               <p
//                 className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}
//               >
//                 Follow us on social media for updates, tips, and
//                 behind-the-scenes content.
//               </p>

//               <div className="space-y-4">
//                 {[
//                   {
//                     icon: Linkedin,
//                     name: "LinkedIn",
//                     color: "bg-blue-600",
//                     handle: "@company",
//                   },
//                   {
//                     icon: Twitter,
//                     name: "Twitter",
//                     color: "bg-sky-500",
//                     handle: "@company",
//                   },
//                   {
//                     icon: Github,
//                     name: "GitHub",
//                     color: "bg-gray-800",
//                     handle: "@company",
//                   },
//                 ].map((social, i) => (
//                   <motion.a
//                     key={i}
//                     href="#"
//                     whileHover={{ x: 8 }}
//                     className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 group"
//                   >
//                     <div
//                       className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center`}
//                     >
//                       <social.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-medium">{social.name}</p>
//                       <p
//                         className={`text-sm ${
//                           isDark ? "text-gray-400" : "text-gray-600"
//                         }`}
//                       >
//                         {social.handle}
//                       </p>
//                     </div>
//                     <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-200" />
//                   </motion.a>
//                 ))}
//               </div>

//               <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
//                 <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
//                   <Clock className="w-4 h-4" />
//                   <span>Response time: 24 hours</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="lg:col-span-3"
//           >
//             <div
//               className={`rounded-2xl p-8 border ${
//                 isDark
//                   ? "border-gray-800 bg-gray-950"
//                   : "border-gray-200 bg-white"
//               }`}
//             >
//               <div className="mb-8">
//                 <h2 className="text-2xl font-semibold mb-2">
//                   Send us a message
//                 </h2>
//                 <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
//                   Fill out the form below and our team will get back to you
//                   promptly.
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   {[
//                     {
//                       name: "name",
//                       label: "Full Name",
//                       placeholder: "John Doe",
//                       type: "text",
//                     },
//                     {
//                       name: "email",
//                       label: "Email Address",
//                       placeholder: "hello@example.com",
//                       type: "email",
//                     },
//                   ].map((field) => (
//                     <div key={field.name}>
//                       <label
//                         className={`block text-sm font-medium mb-2 ${
//                           isDark ? "text-gray-200" : "text-gray-700"
//                         }`}
//                       >
//                         {field.label}
//                         <span className="text-red-500 ml-1">*</span>
//                       </label>
//                       <input
//                         type={field.type}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleInputChange}
//                         onFocus={() => setFocusedField(field.name)}
//                         onBlur={() => setFocusedField(null)}
//                         required
//                         className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
//                           focusedField === field.name
//                             ? "border-indigo-500 ring-4 ring-indigo-500/20"
//                             : isDark
//                             ? "border-gray-700 hover:border-gray-600 bg-gray-800"
//                             : "border-gray-300 hover:border-gray-400 bg-white"
//                         } ${
//                           isDark
//                             ? "text-white placeholder-gray-400"
//                             : "text-gray-900 placeholder-gray-500"
//                         }`}
//                         placeholder={field.placeholder}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div>
//                   <label
//                     className={`block text-sm font-medium mb-2 ${
//                       isDark ? "text-gray-200" : "text-gray-700"
//                     }`}
//                   >
//                     Subject
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleInputChange}
//                     onFocus={() => setFocusedField("subject")}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
//                       focusedField === "subject"
//                         ? "border-indigo-500 ring-4 ring-indigo-500/20"
//                         : isDark
//                         ? "border-gray-700 hover:border-gray-600 bg-gray-800"
//                         : "border-gray-300 hover:border-gray-400 bg-white"
//                     } ${
//                       isDark
//                         ? "text-white placeholder-gray-400"
//                         : "text-gray-900 placeholder-gray-500"
//                     }`}
//                     placeholder="What's this about?"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     className={`block text-sm font-medium mb-2 ${
//                       isDark ? "text-gray-200" : "text-gray-700"
//                     }`}
//                   >
//                     Your Message
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     onFocus={() => setFocusedField("message")}
//                     onBlur={() => setFocusedField(null)}
//                     required
//                     rows={4}
//                     className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none ${
//                       focusedField === "message"
//                         ? "border-indigo-500 ring-4 ring-indigo-500/20"
//                         : isDark
//                         ? "border-gray-700 hover:border-gray-600 bg-gray-800"
//                         : "border-gray-300 hover:border-gray-400 bg-white"
//                     } ${
//                       isDark
//                         ? "text-white placeholder-gray-400"
//                         : "text-gray-900 placeholder-gray-500"
//                     }`}
//                     placeholder="Tell us about your project, timeline, and budget..."
//                   />
//                 </div>

//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 text-white px-8 py-4 font-semibold rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       <span>Processing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-5 h-5" />
//                       <span>Send Message</span>
//                       <ArrowRight className="w-5 h-5" />
//                     </>
//                   )}
//                 </motion.button>
//               </form>
//             </div>
//           </motion.div>
//         </div>

//         {/* Additional Info */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className={`mt-16 text-center text-sm ${
//             isDark ? "text-gray-400" : "text-gray-500"
//           }`}
//         >
//           <p>
//             Need immediate assistance? Call us at{" "}
//             <a
//               href="tel:+15551234567"
//               className="text-indigo-500 dark:text-indigo-400 hover:underline"
//             >
//               +1 (555) 123-4567
//             </a>{" "}
//             or email{" "}
//             <a
//               href="mailto:hello@company.com"
//               className="text-indigo-500 dark:text-indigo-400 hover:underline"
//             >
//               hello@company.com
//             </a>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  PhoneCall,
  MessageSquare,
  Clock,
  Globe,
} from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      primary: "+1 (555) 123-4567",
      secondary: "+1 (555) 987-6543",
      description: "Available 24/7 for urgent inquiries",
      highlight: "Instant Response",
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "hello@company.com",
      secondary: "support@company.com",
      description: "Typically respond within 24 hours",
      highlight: "Professional Support",
    },
    {
      icon: MapPin,
      title: "Office Locations",
      primary: "San Francisco, CA",
      secondary: "New York, NY",
      description: "Headquarters & Satellite Office",
      highlight: "Global Presence",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-700 bg-white dark:bg-black">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="text-center max-w-md mx-auto p-6"
        >
          <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Message Sent Successfully!
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Back to Form
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8  bg-white dark:bg-black text-gray-900 dark:text-white">
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
            className="inline-flex items-center justify-center px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
          >
            <PhoneCall className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm bg-gradient-to-r from-indigo-500 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 bg-gradient-to-r from-gray-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Have a project in mind or want to discuss potential collaboration?
            We're here to help you turn your ideas into reality.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative rounded-2xl p-6 transition-all duration-300 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-lg flex items-center justify-center mr-3">
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{method.title}</h3>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-lg break-words">
                  {method.primary}
                </p>
                {method.secondary && (
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                    {method.secondary}
                  </p>
                )}
              </div>

              <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
                {method.description}
              </p>

              <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full w-fit">
                {method.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Contact Form */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl p-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                Follow us on social media for updates, tips, and
                behind-the-scenes content.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Linkedin,
                    name: "LinkedIn",
                    color: "bg-blue-600",
                    handle: "@company",
                  },
                  {
                    icon: Twitter,
                    name: "Twitter",
                    color: "bg-sky-500",
                    handle: "@company",
                  },
                  {
                    icon: Github,
                    name: "GitHub",
                    color: "bg-gray-800",
                    handle: "@company",
                  },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ x: 8 }}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 group"
                  >
                    <div
                      className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center`}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{social.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {social.handle}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Response time: 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl p-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and our team will get back to you
                  promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      name: "name",
                      label: "Full Name",
                      placeholder: "John Doe",
                      type: "text",
                    },
                    {
                      name: "email",
                      label: "Email Address",
                      placeholder: "hello@example.com",
                      type: "email",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                        {field.label}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          focusedField === field.name
                            ? "border-indigo-500 ring-4 ring-indigo-500/20"
                            : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                        }`}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                    Subject
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      focusedField === "subject"
                        ? "border-indigo-500 ring-4 ring-indigo-500/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                    Your Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      focusedField === "message"
                        ? "border-indigo-500 ring-4 ring-indigo-500/20"
                        : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                    }`}
                    placeholder="Tell us about your project, timeline, and budget..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 text-white px-8 py-4 font-semibold rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            Need immediate assistance? Call us at{" "}
            <a
              href="tel:+15551234567"
              className="text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              +1 (555) 123-4567
            </a>{" "}
            or email{" "}
            <a
              href="mailto:hello@company.com"
              className="text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              hello@company.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
