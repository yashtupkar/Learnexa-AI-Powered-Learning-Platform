const express = require("express");
const newsRouter = express.Router();
const { fetchNewsFromAPI, fetchNewsFromDB, deleteOldNews } = require("../controllers/newsController");

newsRouter.get("/from-api", fetchNewsFromAPI);
newsRouter.get("/fetch-all", fetchNewsFromDB);
newsRouter.delete("/delete-old", deleteOldNews);


module.exports = newsRouter;