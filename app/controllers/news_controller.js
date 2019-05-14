var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var axios = require('axios');
var mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var news_url = "https://gazette.com/news/";
var Article = require('../data/article_schema');


    var NewsController = express.Router();

    NewsController.use(bodyParser.json());
    NewsController.use(bodyParser.urlencoded({extended: false}));
    NewsController.use(bodyParser.text());
    NewsController.use(bodyParser.json({type: 'application/vpn.api+json'}));


    NewsController.get('/', function(req, res, next) {
        // var current_articles = Articles.find({}, limit(10).sort({ date_published: -1})).then(function());
        res.render('index', {
            msg: 'testing',
            articles: [],
        });
    });

    NewsController.all('', function(req, res) {
        res.sendFile(path.join(__dirname, '../views'));
    });

    NewsController.get('/scrape_news', function(req, res) {
        axios.get(news_url).then((response) => {
            console.log(response.data);
            //get the top 10 headlines
            const $ = cheerio.load(response.data);
            //select the headlines
            var articles = [];
            $('section#block-659018 div.card-img-md article').each(function(i, elem) {
                var article = {};
                article.headline = $(this).find('h3.tnt-headline a').text().trim();
                article.url = news_url + $(this).find ('h3.tnt-headline a').attr('href');
                article.summary = $(this).find('p, int-summary').text().trim();
                article.author = $(this).find('.tnt-byline').text().trim();
                article.date_published = $(this).find('time.tnt-date').attr("datetime");
                article.date_published_relative = $(this).find('time.tnt-date').text().trim();
                articles.push(article);
                if (i > 8) return false;

            });
            console.log(articles);
            res.json(articles);
        });
    });

    NewsController.post('/save_article', function(req, res) {
        article_to_save = req.body;
        console.log(req.body);
        console.log('headline: ' + article_to_save.headline);
        var new_article = new Article({
            headline : article_to_save.headline,
            url: article_to_save.url,
            summary: article_to_save.summary,
            author: article_to_save.author,
            date_published: article_to_save.date_published
        });
        new_article.save().then(() => {
            console.log('article saved');
        });
        // console.log(new_article);
    });

    module.exports = NewsController;
