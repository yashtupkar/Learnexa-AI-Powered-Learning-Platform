// const cron = require("node-cron");
// const userModel = require("../models/userModel"); // Adjust the path if needed

// const {
//   getCurrentIndianDate,
// } = require("../utils/dateUtils");

// let lastCheckTime = null;

// // Run every minute to check and process streaks if needed
// cron.schedule("* * * * *", async () => {
//   const todayIST = getCurrentIndianDate();
  
//   // Only process if we haven't checked today
//   if (lastCheckTime === null || !isSameDay(lastCheckTime, todayIST)) {
//     const yesterdayIST = new Date(todayIST);
//     yesterdayIST.setDate(todayIST.getDate() - 1);

//     try {
//       const users = await userModel.find();

//       for (const user of users) {
//         const wasActiveYesterday = user.activeDates.some((d) => {
//           const date = getCurrentIndianDate(new Date(d));
//           return date.getTime() === yesterdayIST.getTime();
//         });

//         if (!wasActiveYesterday && user.currentStreak > 0) {
//           if (user.currentStreak > 1) {
//             const streakEnd = new Date(user.lastActivityDate);
//             const streakStart = new Date(
//               streakEnd.setDate(streakEnd.getDate() - user.currentStreak + 1)
//             );
//             user.streakHistory.push({
//               startDate: streakStart,
//               endDate: yesterdayIST,
//               length: user.currentStreak,
//             });
//           }

//           user.currentStreak = 0;
//           await user.save();
//           console.log(`🔁 Streak reset for ${user.name}`);
//         }
//       }

//       lastCheckTime = todayIST;
//       console.log("✅ Streak check completed.");
//     } catch (err) {
//       console.error("❌ Error in daily streak reset cron:", err);
//     }
//   }
// });

// // Helper function to check if two dates are the same day
// function isSameDay(date1, date2) {
//   return date1.getFullYear() === date2.getFullYear() &&
//          date1.getMonth() === date2.getMonth() &&
//          date1.getDate() === date2.getDate();
// }
const cron = require("node-cron");
const userModel = require("../models/userModel");
const { getCurrentIndianDate } = require("../utils/dateUtils");

// Function to check and reset streaks
async function checkAndResetStreaks() {
  console.log("⏰ Running daily streak check...");
  const todayIST = getCurrentIndianDate();
  const yesterdayIST = new Date(todayIST);
  yesterdayIST.setDate(todayIST.getDate() - 1);

  try {
    const users = await userModel.find();

    for (const user of users) {
      const wasActiveYesterday = user.activeDates.some((d) => {
        const date = getCurrentIndianDate(new Date(d));
        return (
          date.getDate() === yesterdayIST.getDate() &&
          date.getMonth() === yesterdayIST.getMonth() &&
          date.getFullYear() === yesterdayIST.getFullYear()
        );
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

    console.log("✅ Streak check completed at", todayIST);
  } catch (err) {
    console.error("❌ Error in streak reset:", err);
  }
}

// 1️⃣ Schedule daily at 12:01 AM IST
cron.schedule(
  "1 0 * * *", // 00:01 (12:01 AM) IST
  checkAndResetStreaks,
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Force IST timezone
  }
);

// 2️⃣ Run immediately on server start (if needed)
let isFirstRun = true;

async function checkIfPendingStreakReset() {
  if (!isFirstRun) return;
  isFirstRun = false;

  const todayIST = getCurrentIndianDate();
  const lastMidnightIST = new Date(todayIST);
  lastMidnightIST.setHours(0, 1, 0, 0); // 12:01 AM today

  // If server started AFTER 12:01 AM, but cron didn't run
  if (todayIST > lastMidnightIST) {
    console.log("🔍 Checking for missed streak reset...");
    await checkAndResetStreaks();
  }
}

// Run check when the server starts
checkIfPendingStreakReset();