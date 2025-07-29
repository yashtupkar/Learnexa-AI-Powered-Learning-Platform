// const cron = require("node-cron");
// const fetchCurrentAffairs = require("../services/CurrentAffairsFetcher");

// cron.schedule(
//   "0 2 * * *",
//   async () => {
//     console.log("Running daily current affairs fetch...");
//     try {
//       await fetchCurrentAffairs();
//       console.log("Current affairs fetch completed successfully");
//     } catch (error) {
//       console.error("Failed to fetch current affairs:", error);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata", // or your preferred timezone
//   }
// );


// const cron = require("node-cron");
// const fs = require("fs").promises;
// const path = require("path");
// const fetchCurrentAffairs = require("../services/CurrentAffairsFetcher");
// const { deleteOldNews } = require("../controllers/newsController");

// // File to persist last execution date across server restarts
// const LAST_RUN_FILE = path.join(__dirname, "../data/last_run_date.txt");

// // Ensure data directory exists
// async function ensureDataDirectory() {
//   const dataDir = path.dirname(LAST_RUN_FILE);
//   try {
//     await fs.mkdir(dataDir, { recursive: true });
//   } catch (error) {
//     if (error.code !== "EEXIST") {
//       console.error("Failed to create data directory:", error);
//     }
//   }
// }

// // Get current IST date and time
// function getISTDateTime() {
//   const now = new Date();
//   // Convert to IST using proper timezone handling
//   const istDate = new Date(
//     now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );
//   return istDate;
// }

// // Get today's date string in IST
// function getTodayIST() {
//   const istDate = getISTDateTime();
//   // Format as YYYY-MM-DD
//   const year = istDate.getFullYear();
//   const month = String(istDate.getMonth() + 1).padStart(2, "0");
//   const day = String(istDate.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }

// // Read last execution date from file
// async function getLastRunDate() {
//   try {
//     const data = await fs.readFile(LAST_RUN_FILE, "utf8");
//     return data.trim();
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       console.log("📝 No previous run date found, this is the first run");
//       return null;
//     }
//     console.error("Error reading last run date:", error);
//     return null;
//   }
// }

// // Save last execution date to file
// async function saveLastRunDate(date) {
//   try {
//     await fs.writeFile(LAST_RUN_FILE, date, "utf8");
//     console.log(`📝 Saved last run date: ${date}`);
//   } catch (error) {
//     console.error("Error saving last run date:", error);
//   }
// }

// // Check if tasks have already run today
// async function hasRunToday() {
//   const today = getTodayIST();
//   const lastRunDate = await getLastRunDate();
//   return lastRunDate === today;
// }

// // 1️⃣ Fetch Current Affairs
// async function fetchDailyCurrentAffairs() {
//   console.log("📰 Fetching current affairs...");
//   try {
//     await fetchCurrentAffairs();
//     console.log("✅ Current affairs fetch completed successfully");
//   } catch (error) {
//     console.error("❌ Failed to fetch current affairs:", error);
//     throw error; // Re-throw to prevent marking as completed
//   }
// }

// // 2️⃣ Delete Old News
// async function deleteOld() {
//   console.log("🗑️ Deleting old news...");
//   try {
//     const response = await deleteOldNews();
//     console.log("✅ Old news deleted successfully", response);
//   } catch (error) {
//     console.error("❌ Failed to delete old news:", error);
//     throw error; // Re-throw to prevent marking as completed
//   }
// }

// // 3️⃣ Combined Daily Task
// async function runDailyTasks() {
//   const today = getTodayIST();
//   const istDateTime = getISTDateTime();

//   console.log(
//     `⏰ Starting daily tasks at ${istDateTime.toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       dateStyle: "short",
//       timeStyle: "medium",
//     })} IST`
//   );

//   // Check if already run today
//   if (await hasRunToday()) {
//     console.log("⏩ Daily tasks already completed today. Skipping...");
//     return;
//   }

//   try {
//     await fetchDailyCurrentAffairs();
//     await deleteOld();

//     // Only mark as completed if both tasks succeeded
//     await saveLastRunDate(today);
//     console.log(
//       `🎉 All daily tasks completed successfully at ${istDateTime.toLocaleString(
//         "en-IN",
//         {
//           timeZone: "Asia/Kolkata",
//           timeStyle: "medium",
//         }
//       )} IST!`
//     );
//   } catch (error) {
//     console.error("❌ Daily tasks failed:", error);
//     // Don't save the date if tasks failed, so they can retry
//   }
// }

// // 4️⃣ Schedule at 2:00 AM IST daily
// cron.schedule(
//   "0 2 * * *", // 02:00 AM IST
//   async () => {
//     const istDateTime = getISTDateTime();
//     console.log(
//       `🕐 Scheduled task triggered at ${istDateTime.toLocaleString("en-IN", {
//         timeZone: "Asia/Kolkata",
//         dateStyle: "short",
//         timeStyle: "medium",
//       })} IST`
//     );
//     await runDailyTasks();
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata",
//   }
// );

// // 5️⃣ Check for missed tasks on server start
// async function checkMissedTasks() {
//   console.log("🚀 Server started - checking for missed daily tasks...");

//   await ensureDataDirectory();

//   const nowIST = new Date(
//     new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );

//   const today = getTodayIST();
//   const currentHour = nowIST.getHours();

//   // If it's after 2 AM today and tasks haven't run yet
//   if (currentHour >= 2 && !(await hasRunToday())) {
//     console.log("🔍 Found missed daily tasks - running now...");
//     await runDailyTasks();
//   } else if (await hasRunToday()) {
//     console.log("✨ Daily tasks already completed today");
//   } else {
//     console.log("⏳ Daily tasks scheduled for 2:00 AM IST");
//   }
// }

// // Initialize on server start
// checkMissedTasks().catch((error) => {
//   console.error("Error during initialization:", error);
// });

// console.log("📅 Daily task scheduler initialized");
// console.log("⏰ Tasks will run at 2:00 AM IST daily");
// console.log("🔄 Missed tasks will be executed on server restart");
// console.log(
//   `🌏 Current IST time: ${getISTDateTime().toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     dateStyle: "full",
//     timeStyle: "long",
//   })}`
// );

// module.exports = {
//   runDailyTasks,
//   checkMissedTasks,
//   hasRunToday,
//   getISTDateTime,
//   getTodayIST,
// };