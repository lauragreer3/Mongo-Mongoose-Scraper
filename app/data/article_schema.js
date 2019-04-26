var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    headline: String,
    author: String,
    url: String,
    body: String,
    date_published: Date, 
    date_added: { type: Date, default: Date.now },
    notes: [{
        author: String,
        email: String,
        date_added: { type: Date, default: Date.now}
    }]
})