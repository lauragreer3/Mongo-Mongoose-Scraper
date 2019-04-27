var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var axios = require('axios');
var mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var news_url = "https://gazete.com/news/";
var Articles = require('../data/article_schema');


    var NewsController = express.Router();

    NewsController.use(bodyParser.json());
    NewsController.use(bodyParser.urlencoded({extended: false}));
    NewsController.use(bodyParser.text());
    NewsController.use(bodyParser.json({type: 'application/vpn.api+json'}));

    var Articles = require('../data/article_schema');

    NewsController.get('/', function(req, res) {
        var current_articles = Articles.find({}, limit(10).sort({ date_published: -1}));
    })

    // NewsController.all('', function(req, res) {
    //     res.sendFile(path.join(__dirname, '../views'))
    // })

    NewsController.get('/scrape_news', function(req, res) {
        axios.get(news_url).then((response) => {
            console.log(response.data);
            //get the top 10 headlines
            const $ = cheerio.load(response.data);
            //select the headlines
            var articles = []
            $('section#block-659018 div.card-img-md article').each(function(i, elem) {
                var article = {};
                articles[i].headline = $(this).find('h3.tnt-headline a').text().trim();
                artcicle.summary = $(this).find('p, int-summary').text().trim();
                article.author = $(this).find('tnt-byline').text().trim();
                article.date_published = $(this).find('time.int-date').attr("datetime");
                article.date_published_relative = $(this).find('time-int-date').text().trim();
                article.push(article);
                if (i > 8) return false;

            });
            console.log(articles);
            res.json(articles);
        });
    });
    module.exports = NewsController;
