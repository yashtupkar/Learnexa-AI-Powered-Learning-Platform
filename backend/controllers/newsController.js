const newsModel = require("../models/newsModel");
const fetchCurrentAffairs = require("../services/CurrentAffairsFetcher");




// Get all news articles
const fetchNewsFromAPI = async (req, res) => {
  try {
   
      const news = fetchCurrentAffairs();
      console.log(news);
      
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetch from database
const fetchNewsFromDB = async (req, res) => {
    try {
        const news = await newsModel.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete new which are older than 20 days
const deleteOldNews = async () => {
  // No req, res parameters for cron job usage
  try {
    const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);

    const oldNews = await newsModel.find({
      publishedAt: { $lt: twentyDaysAgo },
    });

    if (oldNews.length === 0) {
      console.log("No old news articles found to delete.");
      return {
        message: "No old news articles found to delete",
        deletedCount: 0,
      }; // Return an object
    }

    const deletedCount = oldNews.length;
    oldNews.forEach((news) => {
      console.log(`Deleted: "${news.title}" published on ${news.publishedAt}`);
    });

    await newsModel.deleteMany({ publishedAt: { $lt: twentyDaysAgo } });
    console.log(`${deletedCount} old news articles deleted successfully`);

    return {
      // Return an object with status and data
      message: "Old news deleted successfully",
      deletedCount: deletedCount,
    };
  } catch (error) {
    console.error("Error deleting old news:", error);
    throw new Error("Failed to delete old news: " + error.message); // Re-throw or return an error object
  }
};


module.exports = {
    fetchNewsFromAPI,
    fetchNewsFromDB,
    deleteOldNews
}