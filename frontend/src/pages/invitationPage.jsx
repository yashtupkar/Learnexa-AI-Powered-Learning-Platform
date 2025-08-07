import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import waveAnimation from "../assets/waveCartoon.json";
import Logo from '../components/Logo';
import Navbar from '../components/NavigationBar';
import Testimonial from '../components/HomePageComponents/Testimonial';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';


export default function InvitationLanding() {
  const [referrer, setReferrer] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();



  useEffect(() => {
    // Extract referrer from URL
    const queryParams = new URLSearchParams(window.location.search);
    const refParam = queryParams.get('ref');
    
    if (refParam) {
      // Format the name (replace underscores with spaces)
      const formattedName = refParam.replace(/_/g, ' ');
      setReferrer(formattedName);
    }
    
    // Animation delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 from-blue-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center dark:from-zinc-900 dark:to-zinc-800 from-blue-50 to-purple-50">
          <div className="container flex flex-col justify-center items-center mx-auto px-4 py-12">
            <Lottie
              animationData={waveAnimation}
              loop
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-58 md:h-58 transition-all duration-300 mb-8 group-hover:scale-110"
            />
            {/* Welcome Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-6xl  text-gray-800 dark:text-white mb-4">
                Welcome to <span className="text-indigo-500"> Learnexa</span>!
              </h1>

              {referrer ? (
                <motion.p
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-200 mb-8"
                >
                  You've been invited by{" "}
                  <span className="font-bold text-green-500">{referrer}</span>
                </motion.p>
              ) : (
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Discover a better way to learn
                </p>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                navigate("/signup")
                            }}
                className="inline-block cursor-pointer bg-gradient-to-br from-indigo-600 to-indigo-500 text-white px-8 py-3 rounded-lg font-medium shadow-lg"
              >
                Claim Your Welcome Gift 🎁
              </motion.div>
            </motion.section>

          
                </div>
                


            </div>
          
      </>
    );
}