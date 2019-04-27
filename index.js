var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.connect(MONGODB_URI);
var Articles = require(path.join(__dirname, 'app/data/article_schema'));
var newsController = require(path.join(__dirname, 'app/controllers/news_controller'));

var hbs = exphbs.create({
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', newsController);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
//heroku stuff to set port number
app.listen(port, function () {
    console.log('Started NewScraping Server at port ' + port);
});
module.exports = app;