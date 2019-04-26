var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var axios = require('axios');

module.exports = function(mongoose, news_url) {
    var NewsController = express.Router();
    NewsController.get('/scrape_news', function(req, res) {
        axios.get(news_url).then((response) => {
            console.log(response.data);
            //get the top 10 headlines
            const $ = cheerio.load(response.data);
        });
    });
    return NewsController;
};