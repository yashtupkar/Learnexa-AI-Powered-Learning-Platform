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
      if (response.data.isNewStreak) {
        toast.success(`Streak increased! You're on a ${response.data.currentStreak} day streak! 🔥`, {
          duration: 4000,
          icon: '🔥',
        });
      } else {
        toast.success("Activity recorded! Streak maintained. ✅");
      }
    }
  } catch (error) {
    console.error("Streak update failed:", error);
    toast.error("Could not update streak. Please try again.");
  }
};
