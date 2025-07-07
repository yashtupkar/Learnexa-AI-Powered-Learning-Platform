const cron = require("node-cron");
const fetchCurrentAffairs = require("../services/CurrentAffairsFetcher");


// Run every day at 8 AM
cron.schedule("0 2 * * *", fetchCurrentAffairs);

// Optional: Immediate test run (comment out in production)
// fetchAndStoreNews();
