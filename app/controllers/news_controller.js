var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var axios = require('axios');

module.exports = function(mongoose, news_url) {
    var NewsController = express.Router();

    NewsController.use(bodyParserjson());
    NewsController.use(bodyParser.urlencoded({extended: false}));
    NewsController.use(bodyParser.text());
    NewsController.use(bodyParser.json({type: 'application/vpn.api+json'}));

    var models = require('../data/article_schema')(mongoose);

    NewsController.get('/', function(req, res) {
        var current_articles = models.Articles.find({}, limit(10).sort({ date_published: -1}));
    })

    NewsController.all('', function(req, res) {
        res.sendFile(path.join(__dirname, '../views'))
    })

    NewsController.get('/scrape_news', function(req, res) {
        axios.get(news_url).then((response) => {
            console.log(response.data);
            //get the top 10 headlines
            const $ = cheerio.load(response.data);
            //select the headlines
            var headlines = $('div.article-info header a').attr("title");
            console.log(headlines);
            res.json(headlines);
        });
    });
    return NewsController;
};