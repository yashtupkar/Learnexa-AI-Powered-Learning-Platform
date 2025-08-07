import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle, Loader2, Mail, AlertTriangle } from "lucide-react";

const ReportIssueModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    issue: "",
    issueType: "bug", // 'bug' | 'feature' | 'general'
    attachments: null
  });
  
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1 | 2 (multi-step form)

  const issueTypes = [
    { value: "bug", label: "Bug Report", icon: <AlertCircle size={16} /> },
    { value: "feature", label: "Feature Request", icon: <CheckCircle size={16} /> },
    { value: "general", label: "General Question", icon: <Mail size={16} /> }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachments: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    // Final submission validation
    if (!formData.issue.trim()) {
      setSubmitMessage("Please describe your issue");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus("success");
      setSubmitMessage("Thank you! We've received your report and will respond within 24 hours.");
    } catch (error) {
      setStatus("error");
      setSubmitMessage("Submission failed. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      issue: "",
      issueType: "bug",
      attachments: null
    });
    setStatus("idle");
    setSubmitMessage("");
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-lg border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-zinc-700 p-5 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {currentStep === 1
                  ? "What's the issue?"
                  : "Describe it in detail"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {currentStep === 1
                  ? "Select the type of issue"
                  : "Help us understand better"}
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="h-1 bg-gray-100 dark:bg-gray-800">
            <motion.div
              initial={{ width: currentStep === 1 ? "50%" : "100%" }}
              animate={{ width: currentStep === 1 ? "50%" : "100%" }}
              className="h-full bg-gradient-to-br from-indigo-600 to-indigo-400 text-whit transition-all duration-300"
            />
          </div>

          {/* Success state */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 text-center"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Report Submitted
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {submitMessage}
              </p>
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}

          {/* Form content */}
          {status !== "success" && (
            <form onSubmit={handleSubmit} className="p-6">
              {currentStep === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Issue Type
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {issueTypes.map((type) => (
                        <motion.button
                          key={type.value}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              issueType: type.value,
                            }))
                          }
                          className={`p-3 rounded-lg border transition-all ${
                            formData.issueType === type.value
                              ? "border-indigo-400 bg-blue-50 dark:bg-blue-900/30 text-indigo-600 dark:text-blue-400 shadow-sm"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-indigo-500 dark:text-white">
                              {type.icon}
                            </span>
                            <span className="text-sm dark:text-white">
                              {type.label}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="you@example.com"
                        required
                      />
                      <Mail
                        className="absolute right-3 top-2.5 text-gray-400"
                        size={18}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe the issue in detail *
                    </label>
                    <textarea
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Please include steps to reproduce, expected behavior, and actual behavior..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Attach Screenshot (Optional)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formData.attachments
                              ? formData.attachments.name
                              : "PNG, JPG, GIF (MAX. 5MB)"}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg"
                    >
                      <AlertTriangle size={18} />
                      <span>{submitMessage}</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Form actions */}
              <div className="mt-8 flex justify-between">
                {currentStep === 2 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "submitting"}
                  className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                    currentStep === 1
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-400 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  } 
                    disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </>
                  ) : currentStep === 1 ? (
                    "Continue"
                  ) : (
                    "Submit Report"
                  )}
                </motion.button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Need immediate help?{" "}
              <a
                href="#"
                className="text-indigo-400 dark:text-blue-400 hover:underline"
              >
                Contact support
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportIssueModal;