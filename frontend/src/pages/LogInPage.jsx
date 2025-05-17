import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import GoogleAuth from "../components/GoogleAuth";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";

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
        navigate("/");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Log In</h1>
            <p className="text-gray-600">Welcome Back</p>
          </div>

          {/* Google Login Button */}
          <GoogleAuth/>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                  className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <p
              onClick={() => navigate("/reset-password")}
              className="text-sm text-blue-600 cursor-pointer "
            >
              Forgot Password?
            </p>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Create one
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
