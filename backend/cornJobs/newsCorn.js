const cron = require("node-cron");
const fetchCurrentAffairs = require("../services/CurrentAffairsFetcher");

cron.schedule(
  "0 2 * * *",
  async () => {
    console.log("Running daily current affairs fetch...");
    try {
      await fetchCurrentAffairs();
      console.log("Current affairs fetch completed successfully");
    } catch (error) {
      console.error("Failed to fetch current affairs:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // or your preferred timezone
  }
);
