// import React, { useContext, useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpValues, setOtpValues] = useState(Array(6).fill(""));
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isEmailSent, setIsEmailSent] = useState(false);
//   const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [otpResendTime, setOtpResendTime] = useState(0);
//   const navigate = useNavigate();
//   const { backend_URL } = useContext(AppContext);
//   const inputRefs = useRef([]);
//   const [showPassword, setShowPassword] = useEffect(false);
//   const [passwordStrength, setPasswordStrength] = useState({
//     strength: "",
//     message: "",
//     isStrong: false,
//   });

//   // Password strength checker
//   useEffect(() => {
//     if (password.length === 0) {
//       setPasswordStrength({
//         strength: "",
//         message: "",
//         isStrong: false,
//       });
//       return;
//     }

//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const isLongEnough = password.length >= 8;

//     const strengthPoints = [
//       hasUpperCase,
//       hasLowerCase,
//       hasNumber,
//       hasSpecialChar,
//       isLongEnough,
//     ].filter(Boolean).length;

//     let strength, message, isStrong;

//     if (strengthPoints <= 2) {
//       strength = "Weak";
//       message = "Your password is too weak and short";
//       isStrong = false;
//     } else if (strengthPoints <= 4) {
//       strength = "Medium";
//       message = "Good! Your password is medium strength. ";
//       isStrong = false;
//     } else {
//       strength = "Strong";
//       message = "Excellent! Your password is strong and secure.";
//       isStrong = true;
//     }

//     setPasswordStrength({
//       strength,
//       message,
//       isStrong,
//     });
//   }, [password]);

//   // Update combined OTP whenever individual digits change
//   useEffect(() => {
//     setOtp(otpValues.join(""));
//   }, [otpValues]);

//   // Countdown timer for OTP resend
//   useEffect(() => {
//     let timer;
//     if (otpResendTime > 0) {
//       timer = setTimeout(() => setOtpResendTime(otpResendTime - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [otpResendTime]);

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

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const { data } = await axios.post(
//         backend_URL + "/api/auth/send-reset-otp",
//         {
//           email,
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setIsEmailSent(true);
//         setOtpResendTime(30); // 30 seconds countdown
//         // Clear any existing OTP values
//         setOtpValues(Array(6).fill(""));
//         inputRefs.current[0]?.focus();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (otp.length !== 6) return;

//     setIsLoading(true);
//     setError("");

//     try {
 
//       setOtp(otp);
//       setIsOtpSubmitted(true);
//       setSuccess("OTP verification step completed");
//       setIsLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       return setError("Passwords don't match");
//     }
//     if (newPassword.length < 8) {
//       return setError("Password must be at least 8 characters");
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       const { data } = await axios.post(
//         backend_URL + "/api/auth/reset-password",
//         {
//           email,
//           otp,
//           newPassword,
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         toast.error(data.message);
//         setError(data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Email Form */}
//         {!isEmailSent ? (
//           <form onSubmit={handleSendOtp} className="p-8 space-y-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">
//                 Reset Password
//               </h1>
//               <p className="text-gray-600 text-sm">
//                 Enter your registered email address
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="your@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>

//             {error && (
//               <p className="text-red-500 text-sm text-center">{error}</p>
//             )}
//             {success && (
//               <p className="text-green-500 text-sm text-center">{success}</p>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading || !email}
//               className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
//                 !isLoading && email
//                   ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
//                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Sending...
//                 </span>
//               ) : (
//                 "Send OTP"
//               )}
//             </button>

//             <div className="text-center pt-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/login")}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//               >
//                 Back to Login
//               </button>
//             </div>
//           </form>
//         ) : /* OTP Form */
//         !isOtpSubmitted ? (
//           <form onSubmit={handleVerifyOtp} className="p-8 space-y-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">
//                 Verify OTP
//               </h1>
//               <p className="text-gray-600 text-sm">
//                 Enter the 6-digit code sent to {email}
//               </p>
//             </div>

//             <div className="space-y-4">
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

//             {error && (
//               <p className="text-red-500 text-sm text-center">{error}</p>
//             )}
//             {success && (
//               <p className="text-green-500 text-sm text-center">{success}</p>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading || otp.length !== 6}
//               className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
//                 !isLoading && otp.length === 6
//                   ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
//                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Verifying...
//                 </span>
//               ) : (
//                 "Verify OTP"
//               )}
//             </button>

//             <div className="flex justify-between pt-2">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsEmailSent(false);
//                   setOtpValues(Array(6).fill(""));
//                 }}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//               >
//                 Use different email
//               </button>
//               <button
//                 type="button"
//                 onClick={otpResendTime === 0 ? handleSendOtp : undefined}
//                 disabled={otpResendTime > 0}
//                 className={`text-sm font-medium transition-colors ${
//                   otpResendTime > 0
//                     ? "text-gray-400 cursor-not-allowed"
//                     : "text-blue-600 hover:text-blue-800"
//                 }`}
//               >
//                 {otpResendTime > 0
//                   ? `Resend OTP in ${otpResendTime}s`
//                   : "Resend OTP"}
//               </button>
//             </div>
//           </form>
//         ) : (
//           /* Password Reset Form */
//           <form onSubmit={handleResetPassword} className="p-8 space-y-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">
//                 New Password
//               </h1>
//               <p className="text-gray-600 text-sm">
//                 Set a new password for your account
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="text-gray-400 h-5 w-5" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     value={newPassword}
//                     className={`pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="text-gray-400 hover:text-gray-600 h-5 w-5" />
//                     ) : (
//                       <Eye className="text-gray-400 hover:text-gray-600 h-5 w-5" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Password strength indicator */}
//                 {password && (
//                   <div className="flex flex-col items-center justify-center gap-2 ">
//                     <div className="mt-2 w-full grid grid-cols-3 gap-2 items-center">
//                       <div
//                         className={`h-2 rounded-full ${
//                           passwordStrength.strength === "Weak"
//                             ? "bg-red-500"
//                             : passwordStrength.strength === "Medium"
//                             ? "bg-yellow-500"
//                             : "bg-green-500"
//                         }`}
//                       ></div>

//                       <div
//                         className={`h-2 rounded-full ${
//                           passwordStrength.strength === "Medium"
//                             ? "bg-yellow-500"
//                             : passwordStrength.strength === "Strong"
//                             ? "bg-green-500"
//                             : "bg-gray-200"
//                         }`}
//                       ></div>
//                       <div
//                         className={`h-2 rounded-full ${
//                           passwordStrength.strength === "Strong"
//                             ? "bg-green-500"
//                             : "bg-gray-200"
//                         }`}
//                       ></div>
//                     </div>
//                     <span
//                       className={` text-sm text-center w-full ${
//                         passwordStrength.strength === "Weak"
//                           ? "text-red-600"
//                           : passwordStrength.strength === "Medium"
//                           ? "text-yellow-600"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {passwordStrength.message}
//                     </span>
//                   </div>
//                 )}

                
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   placeholder="Confirm your password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   minLength="8"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {error && (
//               <p className="text-red-500 text-sm text-center">{error}</p>
//             )}
//             {success && (
//               <p className="text-green-500 text-sm text-center">{success}</p>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading || !newPassword || !confirmPassword}
//               className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
//                 !isLoading && newPassword && confirmPassword
//                   ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
//                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Resetting...
//                 </span>
//               ) : (
//                 "Reset Password"
//               )}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Eye, EyeOff, Lock } from "lucide-react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpResendTime, setOtpResendTime] = useState(0);
  const navigate = useNavigate();
  const { backend_URL } = useContext(AppContext);
  const inputRefs = useRef([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    message: "",
    isStrong: false,
  });

  // Password strength checker
  useEffect(() => {
    if (newPassword.length === 0) {
      setPasswordStrength({
        strength: "",
        message: "",
        isStrong: false,
      });
      return;
    }

    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isLongEnough = newPassword.length >= 8;

    const strengthPoints = [
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isLongEnough,
    ].filter(Boolean).length;

    let strength, message, isStrong;

    if (strengthPoints <= 2) {
      strength = "Weak";
      message = "Your password is too weak and short";
      isStrong = false;
    } else if (strengthPoints <= 4) {
      strength = "Medium";
      message = "Good! Your password is medium strength. ";
      isStrong = false;
    } else {
      strength = "Strong";
      message = "Excellent! Your password is strong and secure.";
      isStrong = true;
    }

    setPasswordStrength({
      strength,
      message,
      isStrong,
    });
  }, [newPassword]);

  // Update combined OTP whenever individual digits change
  useEffect(() => {
    setOtp(otpValues.join(""));
  }, [otpValues]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (otpResendTime > 0) {
      timer = setTimeout(() => setOtpResendTime(otpResendTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpResendTime]);

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        backend_URL + "/api/auth/send-reset-otp",
        {
          email,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
        setOtpResendTime(30); // 30 seconds countdown
        // Clear any existing OTP values
        setOtpValues(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError("");

    try {
      setOtp(otp);
      setIsOtpSubmitted(true);
      setSuccess("OTP verification step completed");
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError("Passwords don't match");
    }
    if (newPassword.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        backend_URL + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message);
        setError(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Email Form */}
        {!isEmailSent ? (
          <form onSubmit={handleSendOtp} className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Reset Password
              </h1>
              <p className="text-gray-600 text-sm">
                Enter your registered email address
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !email}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isLoading && email
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
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
                  Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : /* OTP Form */
        !isOtpSubmitted ? (
          <form onSubmit={handleVerifyOtp} className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Verify OTP
              </h1>
              <p className="text-gray-600 text-sm">
                Enter the 6-digit code sent to {email}
              </p>
            </div>

            <div className="space-y-4">
              <div
                className="flex justify-center space-x-3"
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
                    className="w-12 h-12 text-center text-2xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500 text-center">
                {otp.length}/6 digits entered
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isLoading && otp.length === 6
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
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
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsEmailSent(false);
                  setOtpValues(Array(6).fill(""));
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Use different email
              </button>
              <button
                type="button"
                onClick={otpResendTime === 0 ? handleSendOtp : undefined}
                disabled={otpResendTime > 0}
                className={`text-sm font-medium transition-colors ${
                  otpResendTime > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                {otpResendTime > 0
                  ? `Resend OTP in ${otpResendTime}s`
                  : "Resend OTP"}
              </button>
            </div>
          </form>
        ) : (
          /* Password Reset Form */
          <form onSubmit={handleResetPassword} className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                New Password
              </h1>
              <p className="text-gray-600 text-sm">
                Set a new password for your account
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400 h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className={`pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-400 hover:text-gray-600 h-5 w-5" />
                    ) : (
                      <Eye className="text-gray-400 hover:text-gray-600 h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password strength indicator */}
                {newPassword && (
                  <div className="flex flex-col items-center justify-center gap-2 ">
                    <div className="mt-2 w-full grid grid-cols-3 gap-2 items-center">
                      <div
                        className={`h-2 rounded-full ${
                          passwordStrength.strength === "Weak"
                            ? "bg-red-500"
                            : passwordStrength.strength === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>

                      <div
                        className={`h-2 rounded-full ${
                          passwordStrength.strength === "Medium"
                            ? "bg-yellow-500"
                            : passwordStrength.strength === "Strong"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                      <div
                        className={`h-2 rounded-full ${
                          passwordStrength.strength === "Strong"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    </div>
                    <span
                      className={` text-sm text-center w-full ${
                        passwordStrength.strength === "Weak"
                          ? "text-red-600"
                          : passwordStrength.strength === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {passwordStrength.message}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !newPassword || !confirmPassword}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                !isLoading && newPassword && confirmPassword
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
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
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;