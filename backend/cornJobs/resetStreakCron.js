const cron = require("node-cron");
const userModel = require("../models/userModel"); // Adjust the path if needed

const {
  getCurrentIndianDate,
} = require("../utils/dateUtils");

cron.schedule("31 18 * * *", async () => {
  const todayIST = getCurrentIndianDate();
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

    console.log("✅ Streak check completed.");
  } catch (err) {
    console.error("❌ Error in daily streak reset cron:", err);
  }
});
