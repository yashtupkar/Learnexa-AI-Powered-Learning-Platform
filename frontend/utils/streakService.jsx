// utils/streakUtils.js
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../src/context/AppContext";

const backend_URL = import.meta.env.VITE_BACKEND_URL;

export const StreakUpdate = async (activity) => {
  try {
    const response = await axios.post(
      `${backend_URL}/api/user/track-activity`,
      { activity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.updated) {
      toast.success("Streak updated successfully");
    }
  } catch (error) {
    console.error("Streak update failed:", error);
    toast.error("Failed to update streak");
  }
};
