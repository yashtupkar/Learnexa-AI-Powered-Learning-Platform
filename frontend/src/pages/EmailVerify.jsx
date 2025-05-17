// import React, { useContext, useState } from "react";
// import { Mail, Clock } from "lucide-react";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const EmailVerify = () => {
//   const [otp, setOtp] = useState("");
//   const [isResendDisabled, setIsResendDisabled] = useState(false);
//     const [countdown, setCountdown] = useState(30);
//     const navigate = useNavigate();
    
//     const { backend_URL } = useContext(AppContext);

//   const handleOtpChange = (e) => {
//     const value = e.target.value;
//     // Only allow numbers and limit to 6 digits
//     if (/^\d*$/.test(value) && value.length <= 6) {
//       setOtp(value);
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

//     const handleSubmit = async(e) => {
//       try {
//           e.preventDefault();
//           const userId = localStorage.getItem('userId');
//           const { data } = await axios.post(backend_URL + "/api/auth/verify-account", {
//               userId, otp
//           })

//           if (data.success) {
//               toast.success("Email Verified successfull.");
//               navigate('/');
//           } else {
//               toast.error(data.messsage)
//           }


//       } catch (error) {
//         toast.error(error.messsage)
//       }
   
   
 
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
//             <p className="text-gray-600 font-medium mt-1">example@email.com</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="otp"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Enter OTP Code
//               </label>
//               <div className="flex justify-center">
//                 <input
//                   type="text"
//                   id="otp"
//                   value={otp}
//                   onChange={handleOtpChange}
//                   maxLength={6}
//                   inputMode="numeric"
//                   pattern="\d*"
//                   className="w-full max-w-xs text-center text-2xl font-medium tracking-widest px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="------"
//                   autoComplete="one-time-code"
//                   autoFocus
//                 />
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
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const { backend_URL } = useContext(AppContext);

  // Update combined OTP whenever individual digits change
  useEffect(() => {
    setOtp(otpValues.join(""));
  }, [otpValues]);

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

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    let timer = 30;

    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer <= 0) {
        clearInterval(interval);
        setIsResendDisabled(false);
        setCountdown(30);
      }
    }, 1000);

    console.log("Resending OTP...");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;
      const { data } = await axios.post(
        backend_URL + "/api/auth/verify-account",
        {
          userId,
          otp,
        }
      );

      if (data.success) {
        toast.success("Email Verified successfull.");
        navigate("/");
      } else {
        toast.error(data.messsage);
      }
    } catch (error) {
      toast.error(error.messsage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600">
              We've sent a 6-digit OTP to your email address
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
          
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

            <button
              type="submit"
              disabled={otp.length !== 6}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-md transition-all duration-200 ${
                otp.length === 6
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Verify Account
            </button>

            <div className="text-center text-sm text-gray-600">
              <p className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  className={`font-medium ${
                    isResendDisabled
                      ? "text-gray-400"
                      : "text-blue-600 hover:text-blue-800"
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