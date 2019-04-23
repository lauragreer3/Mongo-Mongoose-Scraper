//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect(MONGODB_URI);