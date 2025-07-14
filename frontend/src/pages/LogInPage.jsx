import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import GoogleAuth from "../components/GoogleAuth";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import Navbar from "../components/NavigationBar";
import bgImage from "../assets/bg-signup.jpg";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { backend_URL } = useContext(AppContext);

  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();

  //     axios.defaults.withCredentials = true;

  //     const { data } = await axios.post(backend_URL + 
  //       "/api/auth/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );

  //     if (data.success) {
  //       toast.success("Login successfully!");
  //       navigate("/");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
         toast.success(data.message)
        dispatch(loginSuccess(data.user));
        navigate("/dashboard");
      } else {
        dispatch(loginFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <>
      
      <div className="min-h-screen  bg-gray-50 dark:bg-black flex flex-col lg:flex-row items-center justify-center p-2 md:p-4 md:gap-8">
        <div className="flex md:mt-5 bg-white dark:bg-zinc-900 md:rounded-2xl md:shadow-lg">
          <div className="hidden h-full lg:block lg:w-[500px]">
            <img
              src={bgImage}
              alt="Log in background"
              className="w-full h-[80vh] object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl md:shadow-lg p-4 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Log In
              </h1>
              <p className="text-gray-600 text-sm dark:text-gray-300">
                Welcome Back
              </p>
            </div>

            <GoogleAuth />

            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                    className={`pl-10 w-full px-4 py-3 text-sm rounded-lg border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-800"
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-white`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                    className={`pl-10 w-full px-4 py-3 text-sm rounded-lg border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-800"
                    } focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-white`}
                    placeholder="••••••••"
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <p
                  onClick={() => navigate("/reset-password")}
                  className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Forgot Password?
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Log In <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Create one
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
