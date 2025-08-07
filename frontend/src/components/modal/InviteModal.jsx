import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";

const InviteModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { user } = useSelector((state) => state.auth);
  
  


  const inviteUrl = `https://learnexa.xyz/invitation?ref=${
    user?.username || user?.name || "guest"
  }`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!isOpen) return null;

 return (
   <AnimatePresence>
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.3, ease: "easeInOut" }}
       className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
     >
       <motion.div
         initial={{ scale: 0.95, y: 20, opacity: 0 }}
         animate={{ scale: 1, y: 0, opacity: 1 }}
         exit={{ scale: 0.95, opacity: 0 }}
         transition={{
           type: "spring",
           damping: 20,
           stiffness: 300,
           delay: 0.1,
         }}
         className="relative bg-white dark:bg-gradient-to-l dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden w-full max-w-xl"
       >
         <div className="relative p-4 sm:p-6">
           <button
             onClick={onClose}
             className="absolute cursor-pointer top-3 right-3 sm:top-4 sm:right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
           >
             <X className="w-5 h-5" />
           </button>

           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-center mb-4 sm:mb-6"
           >
             <h3 className="text-2xl sm:text-3xl text-gray-700 dark:text-white mb-2 sm:mb-4">
               Invite your friends
             </h3>
             <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
               Copy the link or share on socials below
             </p>

             <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 justify-center">
               <div className="w-full p-3 sm:p-4 bg-blue-500/10 dark:bg-gray-900 rounded-lg overflow-x-auto">
                 <p className="text-sm sm:text-lg text-indigo-600 dark:text-indigo-400 font-light break-all">
                   {inviteUrl}
                 </p>
               </div>

               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="w-full sm:w-auto"
               >
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={handleCopy}
                   className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center font-light justify-center gap-2 text-sm sm:text-lg transition-colors ${
                     copied
                       ? "bg-green-500 text-white"
                       : "bg-indigo-500 text-white hover:bg-indigo-600"
                   }`}
                 >
                   <Copy className="w-4 h-4" />
                   {copied ? "Copied!" : "Copy"}
                 </motion.button>
               </motion.div>
             </div>

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
           </motion.div>
         </div>
       </motion.div>
     </motion.div>
   </AnimatePresence>
 );
};

export default InviteModal;
