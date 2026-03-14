


import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import {
  User,
  CreditCard,
  Palette,
  MoreVertical,
  Trash2,
  Upload,
  Check,
  X,
  Sun,
  Moon,
  Bell,
  Lock,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Avatar from "boring-avatars";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import AvatarUploadPopup from "./modal/AvatarUploadModal";
import { userUpdate } from "../redux/authSlice";

const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "my-account";
  const [profilePicture, setProfilePicture] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { backend_URL } = useContext(AppContext);
  const dispatch = useDispatch();

  // Initialize userData with current user data and track original data
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const [originalUserData, setOriginalUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  const [subscriptionData, setSubscriptionData] = useState({
    plan: "Premium",
    status: "Active",
    nextBillingDate: "2023-11-15",
    paymentMethod: "Visa ending in 4242",
    storageUsed: "45%",
  });

  // Check if user data has changed
  const hasChanges = () => {
    return (
      userData.name !== originalUserData.name ||
      userData.email !== originalUserData.email ||
      userData.username !== originalUserData.username
    );
  };

  // Update original data when user changes
  useEffect(() => {
    if (user) {
      setOriginalUserData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
      });
      setUserData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountSave = async (e) => {
    e.preventDefault();
    if (!hasChanges()) {
      toast.error("No changes to save");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${backend_URL}/api/user/update-profile`,
        {
          name: userData.name,
          email: userData.email,
          username: userData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {

        console.log(response);
        toast.success("Profile updated successfully");
        // Update original data after successful save
        setOriginalUserData({
          name: userData.name,
          email: userData.email,
          username: userData.username,
        });
        // Update Redux store if needed
        dispatch(
          userUpdate(response.data.user)
        );
      } else {
        toast.error("Failed to update account details");
      }
    } catch (error) {
      console.error("Error saving account details:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    setShowDeleteModal(false);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-black py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-8xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto pb-1">
              <button
                onClick={() => handleTabChange("my-account")}
                className={`${activeTab === "my-account"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
              >
                <User className="mr-2 h-4 w-4" />
                My Account
              </button>
              <button
                onClick={() => handleTabChange("subscription")}
                className={`${activeTab === "subscription"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Subscription
              </button>
              <button
                onClick={() => handleTabChange("notifications")}
                className={`${activeTab === "notifications"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </button>

              <button
                onClick={() => handleTabChange("more")}
                className={`${activeTab === "more"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors duration-200`}
              >
                <MoreVertical className="mr-2 h-4 w-4" />
                More
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-zinc-900 shadow rounded-lg overflow-hidden transition-colors duration-300">
            {/* My Account Tab */}
            {activeTab === "my-account" && (
              <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Profile Information
                  </h2>
                </div>

                <div className="p-6">
                  <div className="max-w-2xl mx-auto space-y-8">
                    <div className="flex justify-center">
                      <div className="relative group">
                        <div className="h-32 w-32 rounded-full bg-white dark:bg-zinc-900 overflow-hidden shadow-lg border-4 border-white dark:border-gray-700">
                          {user?.avatar ? (
                            <img
                              src={user?.avatar}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Avatar name="yash Tupkar" size={128} />
                          )}
                        </div>
                        <label
                          onClick={() => setIsAvatarPopupOpen(true)}
                          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 rounded-full cursor-pointer transition-all duration-200"
                        >
                          <Upload className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </label>
                      </div>
                    </div>

                    <AvatarUploadPopup
                      isOpen={isAvatarPopupOpen}
                      onClose={() => setIsAvatarPopupOpen(false)}
                    />

                    <form onSubmit={handleAccountSave} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm bg-white dark:bg-gray-700 transition-colors duration-200"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm bg-white dark:bg-gray-700 transition-colors duration-200"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm bg-white dark:bg-gray-700 transition-colors duration-200"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={!hasChanges() || isLoading}
                          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${!hasChanges() || isLoading
                              ? "opacity-75 cursor-not-allowed"
                              : ""
                            }`}
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === "subscription" && (
              <div>
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subscription Plan
                  </h2>
                </div>

                <div className="px-6 py-5">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {subscriptionData.plan} Plan
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          Status:{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${subscriptionData.status === "Active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                              }`}
                          >
                            {subscriptionData.status}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          Next billing date: {subscriptionData.nextBillingDate}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                          Change Plan
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                          Upgrade
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="border rounded-lg p-4 dark:border-gray-700 transition-colors duration-300">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Basic
                      </h4>
                      <p className="text-2xl font-bold mt-2 dark:text-white">
                        $0
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />{" "}
                          Basic features
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" /> 5GB
                          storage
                        </li>
                        <li className="flex items-center">
                          <X className="h-4 w-4 text-gray-400 mr-2" /> Advanced
                          analytics
                        </li>
                      </ul>
                      <button
                        className={`mt-4 w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 ${subscriptionData.plan === "Basic"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                          }`}
                        disabled={subscriptionData.plan === "Basic"}
                      >
                        {subscriptionData.plan === "Basic"
                          ? "Current Plan"
                          : "Select"}
                      </button>
                    </div>

                    <div className="border border-blue-500 rounded-lg p-4 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 transition-colors duration-300 relative">
                      <div className="absolute top-0 right-0 bg-blue-500 dark:bg-blue-400 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        Popular
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Premium
                      </h4>
                      <p className="text-2xl font-bold mt-2 dark:text-white">
                        $9.99
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" /> All
                          basic features
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" /> 50GB
                          storage
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />{" "}
                          Advanced analytics
                        </li>
                      </ul>
                      <button
                        className={`mt-4 w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 ${subscriptionData.plan === "Premium"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        disabled={subscriptionData.plan === "Premium"}
                      >
                        {subscriptionData.plan === "Premium"
                          ? "Current Plan"
                          : "Upgrade"}
                      </button>
                    </div>

                    <div className="border rounded-lg p-4 dark:border-gray-700 transition-colors duration-300">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Enterprise
                      </h4>
                      <p className="text-2xl font-bold mt-2 dark:text-white">
                        $29.99
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" /> All
                          premium features
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />{" "}
                          Unlimited storage
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />{" "}
                          Priority support
                        </li>
                      </ul>
                      <button
                        className={`mt-4 w-full py-2 rounded-md text-sm font-medium transition-colors duration-200 ${subscriptionData.plan === "Enterprise"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                          }`}
                        disabled={subscriptionData.plan === "Enterprise"}
                      >
                        {subscriptionData.plan === "Enterprise"
                          ? "Current Plan"
                          : "Select"}
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Payment Method
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="flex items-center">
                          <div className="h-8 w-12 bg-gray-200 dark:bg-gray-600 rounded-md mr-3 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="text-sm font-medium dark:text-white">
                              {subscriptionData.paymentMethod}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Expires 12/2024
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200">
                            Update
                          </button>
                          <button className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors duration-200">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Billing History
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              Oct 15, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Premium Plan Subscription
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              $9.99
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                              Paid
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              Sep 15, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Premium Plan Subscription
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              $9.99
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                              Paid
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div>
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notification Preferences
                  </h2>
                </div>

                <div className="px-6 py-5">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Enable Notifications
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive all notifications
                        </p>
                      </div>
                      <button
                        checked={notificationsEnabled}
                        onChange={setNotificationsEnabled}
                        className={`${notificationsEnabled
                            ? "bg-blue-600"
                            : "bg-gray-200 dark:bg-gray-600"
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                      >
                        <span
                          className={`${notificationsEnabled
                              ? "translate-x-6"
                              : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <button
                        checked={emailNotifications}
                        onChange={setEmailNotifications}
                        className={`${emailNotifications
                            ? "bg-blue-600"
                            : "bg-gray-200 dark:bg-gray-600"
                          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                      >
                        <span
                          className={`${emailNotifications
                              ? "translate-x-6"
                              : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                        />
                      </button>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                        Notification Types
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-gray-900 dark:text-white">
                              New Messages
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Notify when you receive new messages
                            </p>
                          </div>
                          <button
                            checked={true}
                            onChange={() => { }}
                            className={`${true
                                ? "bg-blue-600"
                                : "bg-gray-200 dark:bg-gray-600"
                              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                          >
                            <span
                              className={`${true ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-gray-900 dark:text-white">
                              System Updates
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Notify about system updates
                            </p>
                          </div>
                          <button
                            checked={true}
                            onChange={() => { }}
                            className={`${true
                                ? "bg-blue-600"
                                : "bg-gray-200 dark:bg-gray-600"
                              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                          >
                            <span
                              className={`${true ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-gray-900 dark:text-white">
                              Promotional Offers
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Notify about special offers
                            </p>
                          </div>
                          <button
                            checked={false}
                            onChange={() => { }}
                            className={`${false
                                ? "bg-blue-600"
                                : "bg-gray-200 dark:bg-gray-600"
                              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                          >
                            <span
                              className={`${false ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* More Tab */}
            {activeTab === "more" && (
              <div>
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Additional Settings
                  </h2>
                </div>

                <div className="px-6 py-5">
                  <div className="space-y-6">
                    <div className="border border-red-200 dark:border-red-900 rounded-lg p-4 transition-colors duration-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                            Delete Account
                          </h3>
                          <p className="text-sm text-red-600 dark:text-red-500">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs  transition-opacity"
              aria-hidden="true"
              onClick={() => setShowDeleteModal(false)}
            />

            {/* Modal positioning helper */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal panel */}
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white dark:bg-zinc-900 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Delete Account
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-200">
                        Are you sure you want to delete your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteAccount}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPage;