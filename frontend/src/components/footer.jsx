import React from "react";
import {
  Phone,
  MapPin,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  BookOpen,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Headphones,
  Plane,
  Send,
} from "lucide-react";
import logo from "../assets/learnexa-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";


const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(
      `Thank you for subscribing with ${email}! We'll keep you updated on new courses.`
    );
    e.target.reset();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="w-10 h-10 mb-2 mx-auto rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
            <img
              src={logo}
              alt="Learnexa"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Start Learning With Learnexa AI
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners who are transforming their skills with
            our AI-powered personalized learning platform.
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center cursor-pointer justify-center bg-[#25D366] text-white hover:bg-[#128C7E] hover:shadow-lg transition-all duration-300`}
            >
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center cursor-pointer justify-center bg-[#1877F2] text-white hover:bg-[#166FE5] hover:shadow-lg transition-all duration-300`}
            >
              <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center cursor-pointer justify-center bg-[#0A66C2] text-white hover:bg-[#004182] hover:shadow-lg transition-all duration-300`}
            >
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center cursor-pointer justify-center bg-[#E4405F] text-white hover:bg-[#D93147] hover:shadow-lg transition-all duration-300`}
            >
              <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  MP Nagar, <br /> Bhopal, Madhya Pradesh
                </span>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:support@learnexa.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Learnexa@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about-us" },
                { name: "Pricing", href: "/plans" },
                { name: "Contact Us", href: "/contact-us" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Learning Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Aptitude", href: "/practice/aptitude" },

                { name: "Verbal Ability", href: "/practice/verbal-ability" },

                {
                  name: "Logical Reasoning",
                  href: "/practice/logical-reasoning",
                },
                {
                  name: "Verbal Reasoning",
                  href: "/practice/verbal-reasoning",
                },
                {
                  name: "Non Verbal Reasoning",
                  href: "/practice/non-verbal-reasoning",
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Features
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Ai Quiz generation", href: "/create?tab=quiz" },
                { name: "PDF to Quiz", href: "/create?tab=pdf" },
                { name: "Coding challenges", href: "/create?tab=coding" },
                { name: "Study Tube", href: "/studytube" },


                { name: "Current Affairs", href: "/current-affairs" },

              
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to our newsletter for the latest courses and learning
              tips.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className=" flex gap-2 items-center"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
              <button
                type="submit"
                className=" px-4 py-2 w-fit bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()}{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Learnexa
              </a>
              . All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
