import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice"; // ⬅️ adjust path if needed


const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Redux dispatch
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { backend_URL } = useContext(AppContext);
 

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
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);


          // Dispatch to redux with the full user object
          dispatch(loginSuccess(data.user));

          setIsGoogleLoading(false);
          toast.success(data.message);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch user info", err);
        toast.error("Google login failed.");
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
      setIsGoogleLoading(false);
    },
  });

  return (
    <button
      onClick={() => {
        setIsGoogleLoading(true);
        login();
      }}
      disabled={isGoogleLoading}
      className={`w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-lg shadow-sm transition-colors duration-200 mb-6
    ${
      isGoogleLoading
        ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
        : "hover:bg-gray-50 dark:hover:bg-gray-700"
    }
    border-gray-300 dark:border-gray-600`}
    >
      {isGoogleLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-300" />
      ) : (
        <>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-gray-700 text-sm dark:text-gray-200 font-medium">
            Continue with Google
          </span>
        </>
      )}
    </button>
  );
};

export default GoogleAuth;
