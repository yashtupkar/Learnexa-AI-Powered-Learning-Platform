
// import React, { useContext, useState, useRef, useEffect } from "react";
// import { Mail, Clock } from "lucide-react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const EmailVerify = () => {
//   const [otp, setOtp] = useState("");
//   const [otpValues, setOtpValues] = useState(Array(6).fill(""));
//   const [isResendDisabled, setIsResendDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const navigate = useNavigate();
//   const inputRefs = useRef([]);

//   const { backend_URL } = useContext(AppContext);

//   // Update combined OTP whenever individual digits change
//   useEffect(() => {
//     setOtp(otpValues.join(""));
//   }, [otpValues]);

//   const handleInput = (e, index) => {
//     const value = e.target.value;

//     // Only allow numeric input
//     if (!/^[0-9]*$/.test(value)) return;

//     // Update the specific OTP digit
//     const newOtpValues = [...otpValues];
//     newOtpValues[index] = value;
//     setOtpValues(newOtpValues);

//     // Auto-focus next input if a digit was entered
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otpValues[index] && index > 0) {
//       // Move focus to previous input on backspace if current is empty
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text/plain");
//     const pasteDigits = pasteData.replace(/\D/g, "").split("").slice(0, 6);

//     if (pasteDigits.length === 6) {
//       const newOtpValues = [...otpValues];
//       pasteDigits.forEach((digit, i) => {
//         newOtpValues[i] = digit;
//         if (inputRefs.current[i]) {
//           inputRefs.current[i].value = digit;
//         }
//       });
//       setOtpValues(newOtpValues);
//       inputRefs.current[5].focus();
//     }
//   };

//   const handleResendOtp = () => {
//     setIsResendDisabled(true);
//     let timer = 30;

//     const interval = setInterval(() => {
//       timer -= 1;
//       setCountdown(timer);

//       if (timer <= 0) {
//         clearInterval(interval);
//         setIsResendDisabled(false);
//         setCountdown(30);
//       }
//     }, 1000);

//     console.log("Resending OTP...");
//   };

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       const user = JSON.parse(localStorage.getItem("user"));
//       const userId = user?._id;
//       const { data } = await axios.post(
//         backend_URL + "/api/auth/verify-account",
//         {
//           userId,
//           otp,
//         }
//       );

//       if (data.success) {
//         toast.success("Email Verified successfull.");
//         navigate("/");
//       } else {
//         toast.error(data.messsage);
//       }
//     } catch (error) {
//       toast.error(error.messsage);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
//         <div className="p-8">
//           <div className="text-center mb-8">
//             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
//               <Mail className="h-6 w-6 text-blue-600" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">
//               Verify Your Email
//             </h1>
//             <p className="text-gray-600">
//               We've sent a 6-digit OTP to your email address
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
          
//               <div
//                 className="flex justify-center space-x-3"
//                 onPaste={handlePaste}
//               >
//                 {[...Array(6)].map((_, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     maxLength={1}
//                     value={otpValues[index]}
//                     onChange={(e) => handleInput(e, index)}
//                     onKeyDown={(e) => handleKeyDown(e, index)}
//                     ref={(el) => (inputRefs.current[index] = el)}
//                     className="w-12 h-12 text-center text-2xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     autoFocus={index === 0}
//                   />
//                 ))}
//               </div>
//               <p className="mt-2 text-sm text-gray-500 text-center">
//                 {otp.length}/6 digits entered
//               </p>
//             </div>

//             <button
//               type="submit"
//               disabled={otp.length !== 6}
//               className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-md transition-all duration-200 ${
//                 otp.length === 6
//                   ? "bg-blue-600 hover:bg-blue-700 text-white"
//                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               Verify Account
//             </button>

//             <div className="text-center text-sm text-gray-600">
//               <p className="flex items-center justify-center gap-1">
//                 <Clock className="h-4 w-4" />
//                 Didn't receive code?{" "}
//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={isResendDisabled}
//                   className={`font-medium ${
//                     isResendDisabled
//                       ? "text-gray-400"
//                       : "text-blue-600 hover:text-blue-800"
//                   }`}
//                 >
//                   {isResendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
//                 </button>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailVerify;

import React, { useContext, useState, useRef, useEffect } from "react";
import { Mail, Clock } from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const [otp, setOtp] = useState("");
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const { backend_URL } = useContext(AppContext);

  // Update combined OTP whenever individual digits change
  useEffect(() => {
    setOtp(otpValues.join(""));
  }, [otpValues]);

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (isResendDisabled && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
      setCountdown(30);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, countdown]);

  const handleInput = (e, index) => {
    const value = e.target.value;

    // Only allow numeric input
    if (!/^[0-9]*$/.test(value)) return;

    // Update the specific OTP digit
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      // Move focus to previous input on backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain");
    const pasteDigits = pasteData.replace(/\D/g, "").split("").slice(0, 6);

    if (pasteDigits.length === 6) {
      const newOtpValues = [...otpValues];
      pasteDigits.forEach((digit, i) => {
        newOtpValues[i] = digit;
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      setOtpValues(newOtpValues);
      inputRefs.current[5].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendDisabled(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(
        backend_URL + "/api/auth/resend-verification-otp",
        { userId: user._id }
      );
      toast.success(data.message || "OTP resent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(
        backend_URL + "/api/auth/verify-account",
        {
          userId: user?._id,
          otp,
        }
      );

      if (data.success) {
        toast.success("Email verified successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center p-2 sm:p-6">
      <div className="sm:bg-white sm:dark:bg-zinc-800 rounded-xl sm:rounded-2xl sm:shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-2 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-gray-800 dark:text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600 font-light dark:text-gray-300 text-sm sm:text-base">
              We've sent a 6-digit OTP to your email address
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div
                className="flex justify-center space-x-2 sm:space-x-3"
                onPaste={handlePaste}
              >
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={otpValues[index]}
                    onChange={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-light border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500 font-light dark:text-gray-400 text-center">
                {otp.length}/6 digits entered
              </p>
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6 || isLoading}
              className={`w-full flex items-center  justify-center py-3 px-4 rounded-lg shadow-md transition-all duration-200 font-light ${
                otp.length === 6 && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>

            <div className="text-center text-sm font-light text-gray-600 dark:text-gray-400">
              <p className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  className={`font-light ${
                    isResendDisabled
                      ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  }`}
                >
                  {isResendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;