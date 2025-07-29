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
const deleteOldNews = async (req, res) => {
    try {
        const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);
        
        const oldNews = await newsModel.find({ publishedAt: { $lt: twentyDaysAgo } });
        
        if(oldNews.length === 0) {
            return res.json({ message: "No old news articles found to delete" });
        }
        const deletedCount = oldNews.length;
        oldNews.forEach(news => {
            console.log(`Deleted: "${news.title}" published on ${news.publishedAt}`);
        });

        await newsModel.deleteMany({ publishedAt: { $lt: twentyDaysAgo } });
        res.json({ 
            message: "Old news deleted successfully", 
            deletedCount: deletedCount 
        });
        console.log(`${deletedCount} old news articles deleted successfully`);
    } catch (error) {
        console.error("Error deleting old news:", error);
        res.json({ message: error.message });
    }
}



module.exports = {
    fetchNewsFromAPI,
    fetchNewsFromDB,
    deleteOldNews
}