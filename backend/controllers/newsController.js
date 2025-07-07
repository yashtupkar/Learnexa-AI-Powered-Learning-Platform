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



module.exports = {
    fetchNewsFromAPI,
    fetchNewsFromDB,
}