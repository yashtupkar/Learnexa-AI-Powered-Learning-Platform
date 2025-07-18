// import { useContext, useState, useEffect } from "react";
// import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AppContext } from "../context/AppContext";
// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from 'jwt-decode'
// import GoogleAuth from "../components/GoogleAuth";
// import { useDispatch, useSelector } from "react-redux";
// import { loginStart, loginSuccess, loginFailure, logout } from "../redux/authSlice";
// import bgImage from "../assets/bg-signup.jpg";
// import Navbar from "../components/NavigationBar";


// const SignUpPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);
//   const navigate = useNavigate();
//   const { backend_URL } = useContext(AppContext);
//   const [userInfo, setUserInfo] = useState(null);

//   const dispatch = useDispatch();

//   //Password strength indicator
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
//       message =
//         "Your password is too weak and short";
//       isStrong = false;
//     } else if (strengthPoints <= 4) {
//       strength = "Medium";
//       message =
//         "Good! Your password is medium strength. ";
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


//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       axios.defaults.withCredentials = true;
//       const { data } = await axios.post(backend_URL + "/api/auth/register", {
//         email,
//         password,
//         name
//       });

//       if (data.success) {

//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("token", data.token);

//         // Dispatch to redux with the full user object
//         dispatch(loginSuccess(data.user));
//         toast.success(data.message);
       
//         navigate("/verify-account");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

  

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const res = await axios.get(
//           "https://www.googleapis.com/oauth2/v3/userinfo",
//           {
//             headers: {
//               Authorization: `Bearer ${tokenResponse.access_token}`,
//             },
//           }
//         );
//         const userData = res.data;
       
//         console.log(res.data);

//         const { data } = await axios.post(
//           backend_URL + "/api/auth/google-login",
//           {
//             sub: userData.sub,
//             email: userData.email,
//             name: userData.name,
//             picture: userData.picture,
//           }
//         );
//         if (data.success) {
//           setIsGoogleLoading(false);
//           toast.success(data.message);
//         }
//       } catch (err) {
//         console.error("Failed to fetch user info", err);
//       }
//     },
//     onError: () => console.log("Login Failed"),
//   });

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen  bg-gray-50 dark:bg-black flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
//         <div className="flex md:mt-5 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
//           <div className="hidden h-full lg:block lg:w-[500px]">
//             <img
//               src={bgImage}
//               alt="Sign up background"
//               className="w-full h-[80vh] object-cover rounded-xl shadow-lg"
//             />
//           </div>
//           <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
//                 Create Account
//               </h1>
//               <p className="text-gray-600 text-sm dark:text-gray-300">
//                 Join us today and get started
//               </p>
//             </div>

//             <GoogleAuth />

//             <div className="flex items-center my-2">
//               <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
//               <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
//               <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-3">
//               {/* Full Name */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="text-gray-400 h-5 w-5" />
//                   </div>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     onChange={(e) => setName(e.target.value)}
//                     value={name}
//                     className={`pl-10 w-full px-4 py-3 text-sm rounded-lg border ${
//                       errors.name
//                         ? "border-red-500"
//                         : "border-gray-300 dark:border-gray-800"
//                     } focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-white`}
//                     placeholder="Full Name"
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="text-gray-400 h-5 w-5" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     onChange={(e) => setEmail(e.target.value)}
//                     value={email}
//                     className={`pl-10 w-full px-4 py-3 text-sm rounded-lg border ${
//                       errors.email
//                         ? "border-red-500"
//                         : "border-gray-300 dark:border-gray-800"
//                     } focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-white`}
//                     placeholder="your@email.com"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="text-gray-400 h-5 w-5" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     value={password}
//                     className={`pl-10 w-full px-4 py-3 text-sm rounded-lg border ${
//                       errors.password
//                         ? "border-red-500"
//                         : "border-gray-300 dark:border-gray-800"
//                     } focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-white`}
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 h-5 w-5" />
//                     ) : (
//                       <Eye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 h-5 w-5" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Password Strength */}
//                 {password && (
//                   <div className="flex flex-col items-center justify-center gap-2">
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
//                             : "bg-gray-200 dark:bg-gray-600"
//                         }`}
//                       ></div>
//                       <div
//                         className={`h-2 rounded-full ${
//                           passwordStrength.strength === "Strong"
//                             ? "bg-green-500"
//                             : "bg-gray-200 dark:bg-gray-600"
//                         }`}
//                       ></div>
//                     </div>
//                     <span
//                       className={`text-sm ${
//                         passwordStrength.strength === "Weak"
//                           ? "text-red-600 dark:text-red-400"
//                           : passwordStrength.strength === "Medium"
//                           ? "text-yellow-600 dark:text-yellow-400"
//                           : "text-green-600 dark:text-green-400"
//                       }`}
//                     >
//                       {passwordStrength.message}
//                     </span>
//                   </div>
//                 )}

//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                     {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
//               >
//                 Create Account <ArrowRight className="h-5 w-5" />
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-6 text-center">
//               <p className="text-gray-600 dark:text-gray-300">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => navigate("/login")}
//                   className="text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
//                 >
//                   Log in
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUpPage;
import { useContext, useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import GoogleAuth from "../components/GoogleAuth";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import bgImage from "../assets/bg-signup.jpg";
import Navbar from "../components/NavigationBar";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { backend_URL } = useContext(AppContext);

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    message: "",
    isStrong: false,
  });

  // Password strength checker
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength({
        strength: "",
        message: "",
        isStrong: false,
      });
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

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
      message = "Good! Your password is medium strength.";
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
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backend_URL + "/api/auth/register", {
        email,
        password,
        name,
      });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        dispatch(loginSuccess(data.user));
        toast.success(data.message);
        navigate("/verify-account");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-white dark:bg-zinc-900">
        {/* Background image only for large screens */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 h-full items-center justify-center p-8">
          <div className="relative w-full h-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={bgImage}
              alt="Welcome background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end p-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Join Our Community
                </h2>
                <p className="text-gray-200 text-lg">
                  Join to access your personalized dashboard and continue your
                  journey with us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form container - full width on small screens, half on large */}
        <div className="w-full max-w-md lg:max-w-md  sm:bg-white sm:dark:bg-zinc-800 rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg p-2 sm:p-8 lg:p-10">
          {isLoading || isGoogleLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-150"></div>
              </div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                Creating Account<span className="animate-pulse">...</span>
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Please wait while we set up your account
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-light text-gray-800 dark:text-white mb-2">
                  Join <span className="text-blue-600">Learnexa</span>
                </h1>
                <p className="text-gray-600 font-light dark:text-gray-300 text-sm sm:text-base">
                  Create your account to get started
                </p>
              </div>

              <GoogleAuth setIsLoading={setIsGoogleLoading} />

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="mx-4 text-gray-500 font-light dark:text-gray-400 text-xs sm:text-sm">
                  OR SIGN UP WITH EMAIL
                </span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-light  text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="text-gray-400 h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className={`pl-10 w-full px-4 font-light py-2.5 text-sm rounded-lg border ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900 text-gray-900 dark:text-white`}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm font-light text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-light text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="text-gray-400 h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className={`pl-10 w-full font-light px-4 py-2.5 text-sm rounded-lg border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900 text-gray-900 dark:text-white`}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm font-light text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-light text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-gray-400 h-5 w-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className={`pl-10 w-full px-4 font-light py-2.5 text-sm rounded-lg border ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900 text-gray-900 dark:text-white`}
                      placeholder="••••••••"
                      required
                      minLength="8"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 h-5 w-5" />
                      ) : (
                        <Eye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="w-full grid grid-cols-3 gap-2 mb-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full ${
                              i === 1
                                ? passwordStrength.strength === "Weak"
                                  ? "bg-red-500"
                                  : passwordStrength.strength === "Medium"
                                  ? "bg-yellow-500"
                                  : passwordStrength.strength === "Strong"
                                  ? "bg-green-500"
                                  : "bg-gray-200 dark:bg-gray-600"
                                : i === 2
                                ? passwordStrength.strength === "Medium"
                                  ? "bg-yellow-500"
                                  : passwordStrength.strength === "Strong"
                                  ? "bg-green-500"
                                  : "bg-gray-200 dark:bg-gray-600"
                                : passwordStrength.strength === "Strong"
                                ? "bg-green-500"
                                : "bg-gray-200 dark:bg-gray-600"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p
                        className={`text-xs ${
                          passwordStrength.strength === "Weak"
                            ? "text-red-600 dark:text-red-400"
                            : passwordStrength.strength === "Medium"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {passwordStrength.message}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1 text-sm font-light text-red-600 dark:text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 flex font-light items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white  py-2.5 px-4 rounded-lg shadow transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 dark:text-blue-400 font-light hover:text-blue-800 dark:hover:text-blue-300  transition-colors duration-200 focus:outline-none"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUpPage;