import { motion, AnimatePresence } from "framer-motion";
import { Gem, X, Zap, Check } from "lucide-react";
import { FaCrown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UpgradeModal = ({ isOpen, onClose }) => {
  const features = [
    "Unlimited access",
    "Premium features",
    "Advanced analytics",
    "Priority support",
  ];

  const navigate = useNavigate();
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
          className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
        >
          {/* Glow effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.4 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3) 0%, rgba(0,0,0,0) 60%)",
            }}
          />

          <div className="relative p-8">
            <button
              onClick={onClose}
              className="absolute cursor-pointer top-5 right-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                delay: 0.2,
                stiffness: 300,
                damping: 15,
              }}
              className="flex justify-center mb-3"
            >
              <div className="p-2 border bg-yellow-100 dark:bg-yellow-500/20 border-yellow-200 dark:border-yellow-300 rounded-xl shadow-lg">
                <FaCrown
                  size={50}
                  className="text-yellow-500 dark:text-yellow-400"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <span className="inline-block bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-blue-400 text-xs font-medium px-3 py-1 rounded-full mb-3">
                PREMIUM ACCESS
              </span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Unlock Premium Features
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upgrade your experience with powerful tools
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="space-y-3">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <div className="p-1 bg-indigo-100 dark:bg-indigo-500/10 rounded-full">
                      <Check className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/pricing")}
                className="w-full cursor-pointer py-3.5 px-6 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/30 transition-all"
              >
                <Zap className="w-5 h-5 fill-white/20 stroke-white" />
                <span>Upgrade Now</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  <span className="inline-block mx-1">7-day free trial</span>
                  <span className="inline-block mx-1">•</span>
                  <span className="inline-block mx-1">Cancel anytime</span>
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0.5,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.5, 1, 0.5],
                y: [0, Math.random() * 40 - 20],
              }}
              transition={{
                delay: 1.2 + i * 0.2,
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute w-2 h-2 bg-indigo-400 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                filter: "blur(1px)",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpgradeModal;
