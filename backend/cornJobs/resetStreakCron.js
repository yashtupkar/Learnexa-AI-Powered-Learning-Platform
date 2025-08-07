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
// const cron = require("node-cron");
// const userModel = require("../models/userModel");
// const { getCurrentIndianDate } = require("../utils/dateUtils");

// // Function to check and reset streaks
// async function checkAndResetStreaks() {
//   console.log("⏰ Running daily streak check...");
//   const todayIST = getCurrentIndianDate();
//   const yesterdayIST = new Date(todayIST);
//   yesterdayIST.setDate(todayIST.getDate() - 1);

//   try {
//     const users = await userModel.find();

//     for (const user of users) {
//       const wasActiveYesterday = user.activeDates.some((d) => {
//         const date = getCurrentIndianDate(new Date(d));
//         return (
//           date.getDate() === yesterdayIST.getDate() &&
//           date.getMonth() === yesterdayIST.getMonth() &&
//           date.getFullYear() === yesterdayIST.getFullYear()
//         );
//       });

//       if (!wasActiveYesterday && user.currentStreak > 0) {
//         if (user.currentStreak > 1) {
//           const streakEnd = new Date(user.lastActivityDate);
//           const streakStart = new Date(
//             streakEnd.setDate(streakEnd.getDate() - user.currentStreak + 1)
//           );
//           user.streakHistory.push({
//             startDate: streakStart,
//             endDate: yesterdayIST,
//             length: user.currentStreak,
//           });
//         }

//         user.currentStreak = 0;
//         await user.save();
//         console.log(`🔁 Streak reset for ${user.name}`);
//       }
//     }

//     console.log("✅ Streak check completed at", todayIST);
//   } catch (err) {
//     console.error("❌ Error in streak reset:", err);
//   }
// }

// // 1️⃣ Schedule daily at 12:01 AM IST
// cron.schedule(
//   "1 0 * * *", // 00:01 (12:01 AM) IST
//   checkAndResetStreaks,
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata", // Force IST timezone
//   }
// );

// // 2️⃣ Run immediately on server start (if needed)
// let isFirstRun = true;

// async function checkIfPendingStreakReset() {
//   if (!isFirstRun) return;
//   isFirstRun = false;

//   const todayIST = getCurrentIndianDate();
//   const lastMidnightIST = new Date(todayIST);
//   lastMidnightIST.setHours(0, 1, 0, 0); // 12:01 AM today

//   // If server started AFTER 12:01 AM, but cron didn't run
//   if (todayIST > lastMidnightIST) {
//     console.log("🔍 Checking for missed streak reset...");
//     await checkAndResetStreaks();
//   }
// }

// // Run check when the server starts
// checkIfPendingStreakReset();




//gemini
const cron = require("node-cron");
const userModel = require("../models/userModel"); // Adjust the path if needed

const { getCurrentIndianDate } = require("../utils/dateUtils");

// Function to check and process streaks
async function processStreaks() {
  const todayIST = getCurrentIndianDate();
  const yesterdayIST = new Date(todayIST);
  yesterdayIST.setDate(todayIST.getDate() - 1);

  try {
    const users = await userModel.find();

    for (const user of users) {
      // Ensure activeDates are Date objects and normalized to IST for comparison
      const wasActiveYesterday = user.activeDates.some((d) => {
        const activityDateIST = getCurrentIndianDate(new Date(d));
        return (
          activityDateIST.getFullYear() === yesterdayIST.getFullYear() &&
          activityDateIST.getMonth() === yesterdayIST.getMonth() &&
          activityDateIST.getDate() === yesterdayIST.getDate()
        );
      });

      // If user was not active yesterday and has a current streak, reset it
      if (!wasActiveYesterday && user.currentStreak > 0) {
        if (user.currentStreak > 1) {
          const streakEnd = getCurrentIndianDate(
            new Date(user.lastActivityDate)
          );
          const streakStart = getCurrentIndianDate(new Date(streakEnd));
          streakStart.setDate(streakEnd.getDate() - user.currentStreak + 1);

          user.streakHistory.push({
            startDate: streakStart,
            endDate: yesterdayIST,
            length: user.currentStreak,
          });
        }

        user.currentStreak = 0;
        user.lastActivityDate = null; // Reset last activity date when streak is broken
        await user.save();
        console.log(`🔁 Streak reset for user ID: ${user._id}`); // Log user ID for better identification
      }
    }
    console.log("✅ Streak check and processing completed.");
  } catch (err) {
    console.error("❌ Error in daily streak processing:", err);
  }
}

// Schedule the cron job to run every day at 12:01 AM IST
cron.schedule(
  "1 0 * * *",
  async () => {
    // "1 0 * * *" means 1 minute past 0th hour (12 AM)
    console.log("⏰ Running daily streak cron job...");
    await processStreaks();
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to IST (Indian Standard Time)
  }
);

// Logic to handle server restarts and missed cron runs
// This function will be called once when the server starts.
async function initializeStreakCheckOnStartup() {
  console.log("🚀 Server starting up. Checking for missed streak runs...");
  const todayIST = getCurrentIndianDate();

  try {
    // Find all users and check their last activity date against today
    const users = await userModel.find({ currentStreak: { $gt: 0 } }); // Only check users with active streaks

    for (const user of users) {
      if (!user.lastActivityDate) {
        // If lastActivityDate is null and currentStreak is > 0, it's an inconsistent state
        // This might happen if a streak was reset but lastActivityDate wasn't cleared
        console.warn(
          `⚠️ User ${user._id} has currentStreak > 0 but no lastActivityDate. Resetting streak.`
        );
        user.currentStreak = 0;
        await user.save();
        continue;
      }

      const lastActivityIST = getCurrentIndianDate(
        new Date(user.lastActivityDate)
      );

      // Calculate the difference in days between last activity and today
      const diffTime = Math.abs(todayIST.getTime() - lastActivityIST.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // If the last activity was more than 1 day ago (i.e., not yesterday or today),
      // it means the streak might have been broken while the server was off.
      // We check if diffDays > 1 because if it's 1, it means they were active yesterday,
      // and the cron job would handle it normally at 12:01 AM.
      if (diffDays > 1) {
        console.log(
          `🔍 Server was off. Checking streak for user ID: ${
            user._id
          }. Last activity: ${lastActivityIST.toDateString()}`
        );

        // Simulate the daily checks that would have happened
        // We need to find the day before today to see if they were active then
        const dayBeforeToday = new Date(todayIST);
        dayBeforeToday.setDate(todayIST.getDate() - 1);

        const wasActiveYesterdayServerOff = user.activeDates.some((d) => {
          const activityDateIST = getCurrentIndianDate(new Date(d));
          return (
            activityDateIST.getFullYear() === dayBeforeToday.getFullYear() &&
            activityDateIST.getMonth() === dayBeforeToday.getMonth() &&
            activityDateIST.getDate() === dayBeforeToday.getDate()
          );
        });

        if (!wasActiveYesterdayServerOff && user.currentStreak > 0) {
          // Streak was broken during the server's downtime
          if (user.currentStreak > 1) {
            const streakEnd = getCurrentIndianDate(
              new Date(user.lastActivityDate)
            );
            const streakStart = getCurrentIndianDate(new Date(streakEnd));
            streakStart.setDate(streakEnd.getDate() - user.currentStreak + 1);

            // The endDate for this history entry should be the day before the break was detected
            const actualBreakDate = new Date(lastActivityIST);
            actualBreakDate.setDate(lastActivityIST.getDate() + 1); // The day after last activity

            user.streakHistory.push({
              startDate: streakStart,
              endDate: getCurrentIndianDate(new Date(actualBreakDate)), // The day the streak actually ended
              length: user.currentStreak,
            });
          }
          user.currentStreak = 0;
          user.lastActivityDate = null;
          await user.save();
          console.log(
            `💔 Streak reset due to server downtime for user ID: ${user._id}`
          );
        }
      }
    }
  } catch (err) {
    console.error("❌ Error during startup streak check:", err);
  }
}

// Call the initialization function when the server starts
initializeStreakCheckOnStartup();

// It's good practice to export the cron job or a way to start it if it's part of a module
module.exports = cron;