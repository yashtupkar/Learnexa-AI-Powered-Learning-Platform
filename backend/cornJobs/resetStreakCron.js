const cron = require("node-cron");
const userModel = require("../models/userModel"); // Adjust the path if needed

const {
  getCurrentIndianDate,
} = require("../utils/dateUtils");

let lastCheckTime = null;

// Run every minute to check and process streaks if needed
cron.schedule("* * * * *", async () => {
  const todayIST = getCurrentIndianDate();
  
  // Only process if we haven't checked today
  if (lastCheckTime === null || !isSameDay(lastCheckTime, todayIST)) {
    const yesterdayIST = new Date(todayIST);
    yesterdayIST.setDate(todayIST.getDate() - 1);

    try {
      const users = await userModel.find();

      for (const user of users) {
        const wasActiveYesterday = user.activeDates.some((d) => {
          const date = getCurrentIndianDate(new Date(d));
          return date.getTime() === yesterdayIST.getTime();
        });

        if (!wasActiveYesterday && user.currentStreak > 0) {
          if (user.currentStreak > 1) {
            const streakEnd = new Date(user.lastActivityDate);
            const streakStart = new Date(
              streakEnd.setDate(streakEnd.getDate() - user.currentStreak + 1)
            );
            user.streakHistory.push({
              startDate: streakStart,
              endDate: yesterdayIST,
              length: user.currentStreak,
            });
          }

          user.currentStreak = 0;
          await user.save();
          console.log(`🔁 Streak reset for ${user.name}`);
        }
      }

      lastCheckTime = todayIST;
      console.log("✅ Streak check completed.");
    } catch (err) {
      console.error("❌ Error in daily streak reset cron:", err);
    }
  }
});

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}
