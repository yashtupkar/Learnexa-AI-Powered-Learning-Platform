import { useContext, useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode'
import GoogleAuth from "../components/GoogleAuth";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, logout } from "../redux/authSlice";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { backend_URL } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState(null);

  const dispatch = useDispatch();

  //Password strength indicator
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
      message =
        "Your password is too weak and short";
      isStrong = false;
    } else if (strengthPoints <= 4) {
      strength = "Medium";
      message =
        "Good! Your password is medium strength. ";
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
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backend_URL + "/api/auth/register", {
        email,
        password,
        name
      });

      if (data.success) {

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Dispatch to redux with the full user object
        dispatch(loginSuccess(data.user));
        toast.success(data.message);
       
        navigate("/verify-account");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userData = res.data;
       
        console.log(res.data);

        const { data } = await axios.post(
          backend_URL + "/api/auth/google-login",
          {
            sub: userData.sub,
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
          }
        );
        if (data.success) {
          setIsGoogleLoading(false);
          toast.success(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join us today and get started</p>
          </div>

          <GoogleAuth />

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
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-gray-400 h-5 w-5" />
                </div>
                <input
                  type="name"
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="Full Name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
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

              {/* Password strength indicator */}
              {password && (
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

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up <ArrowRight className="h-5 w-5" />
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
