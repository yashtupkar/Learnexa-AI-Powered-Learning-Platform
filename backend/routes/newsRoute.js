const express = require("express");
const newsRouter = express.Router();
const { fetchNewsFromAPI, fetchNewsFromDB } = require("../controllers/newsController");

newsRouter.get("/from-api", fetchNewsFromAPI);
newsRouter.get("/fetch-all", fetchNewsFromDB);


module.exports = newsRouter;