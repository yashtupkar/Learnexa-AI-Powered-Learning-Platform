// import React, { useState, useEffect } from "react";
// import { useRef } from "react";
// import { motion, useInView, useAnimation } from "framer-motion";
// import {
//   Sun,
//   Moon,
//   Star,
//   Users,
//   BookOpen,
//   Award,
//   Mail,
//   ArrowRight,
//   CheckCircle,
//   Sparkles,
//   Heart,
//   Coffee,
//   Zap,
//   Clock,
//   Bookmark,
//   BookText,
//   GraduationCap,
// } from "lucide-react";

// const AnimatedSection = ({ children, className = "", delay = 0 }) => {
//   const controls = useAnimation();
//   const ref = React.useRef(null);
//   const inView = useInView(ref, {
//     threshold: 0.1,
//     once: true,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   const variants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         delay,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={variants}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const CounterAnimation = ({ end, suffix = "", duration = 2 }) => {
//   const [count, setCount] = useState(0);
//   const controls = useAnimation();
//   const ref = useRef(null);
//   const inView = useInView(ref, {
//     threshold: 0.5,
//     once: true,
//   });

//   useEffect(() => {
//     if (inView) {
//       let startTime = null;
//       const animate = (currentTime) => {
//         if (startTime === null) startTime = currentTime;
//         const progress = Math.min(
//           (currentTime - startTime) / (duration * 1000),
//           1
//         );
//         setCount(Math.floor(progress * end));

//         if (progress < 1) {
//           requestAnimationFrame(animate);
//         }
//       };
//       requestAnimationFrame(animate);
//     }
//   }, [inView, end, duration]);

//   return (
//     <span ref={ref} className="font-bold text-3xl lg:text-4xl">
//       {count.toLocaleString()}
//       {suffix}
//     </span>
//   );
// };

// function AboutUs() {
//   const [isDark, setIsDark] = useState(false);
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDark]);

//   const toggleTheme = () => setIsDark(!isDark);

//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     console.log("Newsletter subscription:", email);
//     setEmail("");
//   };

//   const stats = [
//     { icon: Clock, value: 10, suffix: "+", label: "Hours of Learning" },
//     { icon: Users, value: 2, suffix: "M+", label: "Success Stories" },
//     { icon: BookOpen, value: 2.5, suffix: "K+", label: "Reviews" },
//   ];

//   const features = [
//     {
//       icon: GraduationCap,
//       title: "Expert-Led Courses",
//       description:
//         "Learn from industry professionals with real-world experience",
//     },
//     {
//       icon: BookText,
//       title: "Interactive Resources",
//       description: "Engaging materials that enhance your learning experience",
//     },
//     {
//       icon: Bookmark,
//       title: "Real-World Skills",
//       description:
//         "Practical knowledge you can apply immediately in your career",
//     },
//   ];

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${
//         isDark ? "dark" : ""
//       }`}
//     >
//       <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//         {/* Theme Toggle */}
//         <motion.button
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           onClick={toggleTheme}
//           className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           {isDark ? (
//             <Sun className="w-5 h-5 text-yellow-500" />
//           ) : (
//             <Moon className="w-5 h-5 text-gray-600" />
//           )}
//         </motion.button>

//         {/* Hero Section */}
//         <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 overflow-hidden">
//           <div className="container mx-auto px-6 relative z-10">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//               >
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.2 }}
//                   className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
//                 >
//                   <Sparkles className="w-4 h-4 mr-2" />
//                   About Sparkly
//                 </motion.div>

//                 <motion.h1
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.3 }}
//                   className="text-4xl lg:text-6xl font-bold mb-6"
//                 >
//                   Unlocking Potential Through Learning
//                 </motion.h1>

//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.5 }}
//                   className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
//                 >
//                   Sparkly is an innovative learning platform designed to empower
//                   individuals with expert-led courses, interactive resources,
//                   and real-world skills.
//                 </motion.p>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.7 }}
//                   className="flex flex-col sm:flex-row gap-4"
//                 >
//                   <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center font-semibold">
//                     Explore courses
//                     <ArrowRight className="w-5 h-5 ml-2" />
//                   </button>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: 0.9 }}
//                   className="mt-8 flex items-center text-gray-500 dark:text-gray-400"
//                 >
//                   <div className="flex -space-x-2 mr-4">
//                     {[1, 2, 3].map((i) => (
//                       <img
//                         key={i}
//                         src={`https://randomuser.me/api/portraits/${
//                           i % 2 === 0 ? "women" : "men"
//                         }/${i + 20}.jpg`}
//                         alt="User"
//                         className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
//                       />
//                     ))}
//                   </div>
//                   <div>
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map((i) => (
//                         <Star
//                           key={i}
//                           className="w-4 h-4 text-yellow-400 fill-current"
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm">From 2.5K Reviews</span>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 1, delay: 0.4 }}
//                 className="relative"
//               >
//                 <div className="relative rounded-2xl overflow-hidden shadow-xl">
//                   <img
//                     src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//                     alt="Students learning"
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-16 bg-white dark:bg-gray-900">
//           <div className="container mx-auto px-6">
//             <AnimatedSection className="text-center mb-12">
//               <h2 className="text-3xl lg:text-4xl font-bold mb-6">
//                 Transform Knowledge
//               </h2>
//               <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//                 At Sparkly, we are committed to delivering top-notch education
//                 that motivates, empowers, and helps you realize your full
//                 potential.
//               </p>
//             </AnimatedSection>

//             <div className="grid md:grid-cols-3 gap-8">
//               {features.map((feature, index) => (
//                 <AnimatedSection key={index} delay={index * 0.2}>
//                   <motion.div
//                     whileHover={{ y: -5 }}
//                     className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl"
//                   >
//                     <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
//                       <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       {feature.description}
//                     </p>
//                   </motion.div>
//                 </AnimatedSection>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="py-16 bg-gray-50 dark:bg-gray-800">
//           <div className="container mx-auto px-6">
//             <div className="grid md:grid-cols-3 gap-8">
//               {stats.map((stat, index) => (
//                 <AnimatedSection key={index} delay={index * 0.2}>
//                   <div className="text-center p-6">
//                     <div className="flex justify-center mb-4">
//                       <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <div className="text-3xl font-bold mb-2">
//                       <CounterAnimation end={stat.value} suffix={stat.suffix} />
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       {stat.label}
//                     </p>
//                   </div>
//                 </AnimatedSection>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Newsletter Section */}
//         <section className="py-16 bg-white dark:bg-gray-900">
//           <div className="container mx-auto px-6">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12">
//               <div className="grid lg:grid-cols-2 gap-8 items-center">
//                 <AnimatedSection>
//                   <div className="text-white">
//                     <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//                       Subscribe to our newsletter for updates
//                     </h2>
//                     <p className="text-blue-100 mb-6">
//                       Stay informed with the latest news, insights, and updates
//                       delivered straight to your inbox
//                     </p>

//                     <form
//                       onSubmit={handleNewsletterSubmit}
//                       className="flex flex-col sm:flex-row gap-3"
//                     >
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email address"
//                         className="flex-1 px-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
//                         required
//                       />
//                       <button
//                         type="submit"
//                         className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold flex items-center justify-center"
//                       >
//                         Submit
//                       </button>
//                     </form>
//                   </div>
//                 </AnimatedSection>

//                 <AnimatedSection delay={0.3}>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-white/10 p-4 rounded-lg text-center">
//                       <div className="text-2xl font-bold mb-1">2.5M+</div>
//                       <div className="text-sm text-blue-100">
//                         Engaged Learners
//                       </div>
//                     </div>
//                     <div className="bg-white/10 p-4 rounded-lg text-center">
//                       <div className="text-2xl font-bold mb-1">5K+</div>
//                       <div className="text-sm text-blue-100">
//                         Courses Available
//                       </div>
//                     </div>
//                     <div className="bg-white/10 p-4 rounded-lg text-center">
//                       <div className="text-2xl font-bold mb-1">800+</div>
//                       <div className="text-sm text-blue-100">
//                         Expert Mentors
//                       </div>
//                     </div>
//                     <div className="bg-white/10 p-4 rounded-lg text-center">
//                       <div className="text-2xl font-bold mb-1">2.5K+</div>
//                       <div className="text-sm text-blue-100">
//                         Subject Categories
//                       </div>
//                     </div>
//                   </div>
//                 </AnimatedSection>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="py-12 bg-gray-900 dark:bg-black text-white">
//           <div className="container mx-auto px-6">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="flex items-center space-x-2 mb-4 md:mb-0">
//                 <div className="p-2 bg-blue-600 rounded-lg">
//                   <Sparkles className="w-6 h-6" />
//                 </div>
//                 <span className="text-xl font-bold">Sparkly</span>
//               </div>
//               <div className="flex items-center space-x-6">
//                 <Coffee className="w-5 h-5" />
//                 <span className="text-gray-400">Made with passion</span>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default AboutUs;
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Users,
  Globe,
  Award,
  Clock,
  ChevronDown,
  Linkedin,
} from "lucide-react";
import Layout from "../components/layouts/layout";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

// Components
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-md"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function TeamMemberCard({ name, role, image, socialLinks }) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-64 w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm mb-4">{role}</p>

        <div className="flex justify-center gap-3">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              <Linkedin size={18} />
              <span>Connect</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AboutUs() {
  const philosophySteps = [
    {
      title: "Vision",
      description:
        "To democratize education through accessible, high-quality learning experiences for everyone, everywhere.",
      icon: Globe,
    },
    {
      title: "Mission",
      description:
        "To empower learners and educators with innovative tools that make teaching and learning more effective and engaging.",
      icon: Award,
    },
  ];

  const metrics = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Learners",
    },
    {
      icon: BookOpen,
      value: "500+",
      label: "Courses",
    },
    {
      icon: GraduationCap,
      value: "95%",
      label: "Completion Rate",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Access",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description:
        "Access to a wide range of courses across multiple disciplines.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals and academic experts.",
    },
    {
      icon: GraduationCap,
      title: "Certification",
      description: "Earn recognized certificates upon course completion.",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with learners from around the world.",
    },
  ];

  const teamMembers = [
    {
      name: "Jane Smith",
      role: "Founder & CEO",
      image: "/assets/team1.jpg",
      socialLinks: [{ url: "https://linkedin.com" }],
    },
    {
      name: "John Doe",
      role: "CTO",
      image: "/assets/team2.jpg",
      socialLinks: [{ url: "https://linkedin.com" }],
    },
    {
      name: "Sarah Johnson",
      role: "Head of Education",
      image: "/assets/team3.jpg",
      socialLinks: [{ url: "https://linkedin.com" }],
    },
    {
      name: "Michael Brown",
      role: "Product Manager",
      image: "/assets/team4.jpg",
      socialLinks: [{ url: "https://linkedin.com" }],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Transforming Education Through Innovation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              At Learnexa, we're committed to making quality education
              accessible to everyone.
            </p>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Philosophy
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {philosophySteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-semibold ml-4">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Team
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  socialLinks={member.socialLinks}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {metrics.map((item, index) => (
                <div key={index} className="p-6">
                  <item.icon className="w-10 h-10 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{item.value}</div>
                  <div className="text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Learnexa?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Start Learning Today
            </h3>
            <a
              href="/signup"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              Join Now
            </a>
          </div>
        </section>

     
      </div>
    </Layout>
  );
}

export default AboutUs;