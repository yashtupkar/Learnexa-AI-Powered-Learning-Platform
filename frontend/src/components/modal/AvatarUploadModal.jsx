
import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { userUpdate } from "../../redux/authSlice";
import Avatar from "boring-avatars";

const AvatarUploadPopup = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { backend_URL } = useContext(AppContext);
  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show instant preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    // 2. Upload to Cloudinary (or your server)
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await axios.post(
        `${backend_URL}/upload`,
        formData
      );
      const { url } = uploadResponse.data;

      setUploadedUrl(url);
      URL.revokeObjectURL(localUrl); // Clean up
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!uploadedUrl) return;

    try {
     const response =  await axios.patch(
        `${backend_URL}/api/user/update-avatar`,
        {
          avatar: uploadedUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data)
      dispatch(userUpdate(response.data));
      onClose();
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Failed to save profile");
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/60 dark:bg-black/70 h-screen backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              delay: 0.1,
            }}
            className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
          >
            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute cursor-pointer top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl  text-center mb-4 dark:text-white">
                Set Your Avatar
              </h2>

              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 mb-6 overflow-hidden border-4 border-gray-100 dark:border-gray-700">
                 {previewUrl || user.avatar ?  <img
                    src={previewUrl || user.avatar }
                    className="w-full h-full object-cover"
                    alt="Preview"
                  /> : 
                    <Avatar name={ user.name} />
                  }
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current.click()}
                  disabled={isUploading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? "Uploading..." : "Choose Image"}
                </motion.button>
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={!uploadedUrl || isUploading}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Changes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarUploadPopup;