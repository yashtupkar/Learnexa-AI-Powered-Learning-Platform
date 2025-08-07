// components/ApiKeySetup.jsx
import { useContext, useState } from "react";
import { Key, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { userUpdate } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

const ApiKeySetup = () => {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Go to Google Cloud Console",
      description:
        "Visit the Google Cloud Console to create a new project or select existing one",
      link: "https://console.cloud.google.com/",
      action: "Open Google Cloud Console",
    },
    {
      title: "Enable YouTube Data API v3",
      description:
        "Navigate to APIs & Services > Library and search for 'YouTube Data API v3'",
      link: "https://console.cloud.google.com/apis/library/youtube.googleapis.com",
      action: "Enable YouTube API",
    },
    {
      title: "Create API Key",
      description:
        "Go to APIs & Services > Credentials and click 'Create Credentials' > 'API Key'",
      link: "https://console.cloud.google.com/apis/credentials",
      action: "Create Credentials",
    },
    {
      title: "Restrict Your API Key (Recommended)",
      description:
        "Click on your API key, then restrict it to YouTube Data API v3 for security",
      link: null,
      action: "Secure Your Key",
    },
    ];
    
    const { backend_URL } = useContext(AppContext);
    const dispatch = useDispatch();

  const validateApiKey = async (key) => {

    if (!key.startsWith("AIza") || key.length < 30) {
      throw new Error(
        "Invalid key format. YouTube API keys typically start with 'AIza'"
      );
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=test&key=${key}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        // Handle specific YouTube API errors
        if (errorData.error?.errors?.[0]?.reason === "keyInvalid") {
          throw new Error("The provided API key is invalid");
        }
        if (errorData.error?.errors?.[0]?.reason === "keyExpired") {
          throw new Error("This API key has expired");
        }
        if (errorData.error?.errors?.[0]?.reason === "accessNotConfigured") {
          throw new Error("YouTube Data API v3 is not enabled for this key");
        }
        throw new Error(errorData.error?.message || "API request failed");
        }
        if (response.ok) {
            toast.success("Api Key setup done successfully");
        }

      return true;
    } catch (error) {
      // Handle network errors
      if (error.message.includes("Failed to fetch")) {
        throw new Error("Network error. Please check your internet connection");
      }
      throw error; // Re-throw other errors
    }
  };

  const handleApiKeySubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError("Please enter your API key");
      return;
    }

    setIsValidating(true);
    setError("");

    try {
      await validateApiKey(apiKey);
        const response = await axios.post(
          `${backend_URL}/api/user/youtube-api-setup`,
          {
            youtubeApiKey: apiKey,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

       
        

        dispatch(userUpdate(response.data.user));

            toast.success("Setup completed!")
      
    
    } catch (error) {
      setError(
        error.message || "Failed to validate API key. Please try again."
      );
    } finally {
      setIsValidating(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center px-2 py-10 sm:px-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 px-2">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Key className="text-white" size={26} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Setup StudyTube API Key
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            To use StudyTube, you need to provide a YouTube Data API v3 key.
            Follow these simple steps to get started.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 mb-8">
          {/* Steps */}
          <div className="space-y-4 px-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              How to get your API Key:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border transition-all ${
                    currentStep === index
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        currentStep > index
                          ? "bg-green-500"
                          : currentStep === index
                          ? "bg-red-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      {currentStep > index ? (
                        <CheckCircle className="text-white" size={16} />
                      ) : (
                        <span className="text-white font-bold text-xs sm:text-sm">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {step.description}
                      </p>
                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-red-500 hover:text-red-600 text-xs sm:text-sm transition-colors"
                          onClick={() =>
                            setCurrentStep(Math.max(currentStep, index + 1))
                          }
                        >
                          <span>{step.action}</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Key Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Enter Your API Key
            </h2>
            {error && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                <AlertCircle className="text-red-500" size={16} />
                <span className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                  {error}
                </span>
              </div>
            )}
            <label
              htmlFor="apikey"
              className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              YouTube Data API v3 Key
            </label>
            <form
              onSubmit={handleApiKeySubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <div className="flex-1">
                <input
                  type="text"
                  id="apikey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isValidating || !apiKey.trim()}
                className={`py-2 sm:py-3 px-4 rounded-lg font-medium transition-all ${
                  isValidating || !apiKey.trim()
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transform hover:scale-105 shadow-lg"
                } text-sm sm:text-base`}
              >
                {isValidating ? "Validating..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;
