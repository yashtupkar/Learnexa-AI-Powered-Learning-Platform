// import { useContext, useState } from "react";
// import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AppContext } from "../context/AppContext";
// import GoogleAuth from "../components/GoogleAuth";
// import { useDispatch } from "react-redux";
// import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
// import Navbar from "../components/NavigationBar";
// import bgImage from "../assets/bg-signup.jpg";

// const LogInPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { backend_URL } = useContext(AppContext);

//   // const handleSubmit = async (e) => {
//   //   try {
//   //     e.preventDefault();

//   //     axios.defaults.withCredentials = true;

//   //     const { data } = await axios.post(backend_URL + 
//   //       "/api/auth/login",
//   //       {
//   //         email,
//   //         password,
//   //       }
//   //     );

//   //     if (data.success) {
//   //       toast.success("Login successfully!");
//   //       navigate("/");
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     toast.error(error.message);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(loginStart());

//     try {
//       axios.defaults.withCredentials = true;

//       const { data } = await axios.post(backend_URL + "/api/auth/login", {
//         email,
//         password,
//       });

//       if (data.success) {
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("token", data.token);
//          toast.success(data.message)
//         dispatch(loginSuccess(data.user));
//         navigate("/dashboard");
//       } else {
//         dispatch(loginFailure(data.message));
//         toast.error(data.message);
//       }
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
      
//       <div className="min-h-screen  bg-gray-50 dark:bg-black flex flex-col lg:flex-row items-center justify-center p-2 md:p-4 md:gap-8">
//         <div className="flex md:mt-5 bg-white dark:bg-zinc-900 md:rounded-2xl md:shadow-lg">
//           <div className="hidden h-full lg:block lg:w-[500px]">
//             <img
//               src={bgImage}
//               alt="Log in background"
//               className="w-full h-[80vh] object-cover rounded-xl shadow-lg"
//             />
//           </div>
//           <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl md:shadow-lg p-4 md:p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
//                 Log In
//               </h1>
//               <p className="text-gray-600 text-sm dark:text-gray-300">
//                 Welcome Back
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
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//                     {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Forgot Password */}
//               <div className="text-right">
//                 <p
//                   onClick={() => navigate("/reset-password")}
//                   className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
//                 >
//                   Forgot Password?
//                 </p>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
//               >
//                 Log In <ArrowRight className="h-5 w-5" />
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="mt-6 text-center">
//               <p className="text-gray-600 dark:text-gray-300">
//                 Don't have an account?{" "}
//                 <span
//                   onClick={() => navigate("/signup")}
//                   className="text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
//                 >
//                   Create one
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LogInPage;
import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import GoogleAuth from "../components/GoogleAuth";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import bgImage from "../assets/bg-signup.jpg";
import logo from "../assets/learnexa-logo.png";


const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { backend_URL } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());

    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backend_URL + "/api/auth/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        dispatch(loginSuccess(data.user));
        navigate("/dashboard");
      } else {
        dispatch(loginFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col lg:flex-row items-center justify-center p-4 md:p-8">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 h-full items-center justify-center p-8">
        <div className="relative w-full h-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={bgImage}
            alt="Welcome background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end p-8">
            <div>
              <div className="w-12 h-12 mb-2 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow">
                <img
                  src={logo}
                  alt="Learnexa"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-200 text-lg">
                Sign in to access your personalized dashboard and continue your
                journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full max-w-md lg:max-w-md sm:bg-white sm:dark:bg-zinc-800 rounded-2xl md:shadow-lg p-2 sm:p-8 md:p-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-75"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-150"></div>
            </div>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
              Authenticating<span className="animate-pulse">...</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Please wait while we verify your credentials
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div
                onClick={() => navigate("/")}
                className="w-10 h-10 mb-4 mx-auto lg:hidden rounded-md bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center md:shadow"
              >
                <img
                  src={logo}
                  alt="Learnexa"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-light  text-gray-800 dark:text-white mb-2">
                Welcome to{" "}
                <span className="bg-gradient-to-br from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                  Learnexa
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 font-light text-sm sm:text-base">
                Sign in to your account to continue
              </p>
            </div>

            <GoogleAuth setIsLoading={setIsLoading} />

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-gray-500 font-light dark:text-gray-400 text-sm">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-light  text-gray-700 dark:text-gray-300 mb-1"
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
                    className={`pl-10 w-full font-light px-4 py-3 text-sm rounded-lg border ${
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
                  className="block text-sm font-medium  text-gray-700 dark:text-gray-300 mb-1"
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
                    className={`pl-10 w-full font-light px-4 py-3 text-sm rounded-lg border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900 text-gray-900 dark:text-white`}
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 font-light right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 h-5 w-5" />
                    ) : (
                      <Eye className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 font-light dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/reset-password")}
                  className="text-sm bg-gradient-to-br from-indigo-600 to-indigo-400 bg-clip-text text-transparent font-light hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 flex items-center justify-center gap-2 font-light bg-gradient-to-br from-indigo-600 to-indigo-400  text-white  py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-light dark:text-gray-300 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200 focus:outline-none"
                >
                  Create one
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LogInPage;