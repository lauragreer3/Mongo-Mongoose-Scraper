module.exports = function (mongoose) {

    var articleSchema = new Schema({
        headline: String,
        author: String,
        url: String,
        body: String,
        date_published: Date,
        date_added: {
            type: Date,
            default: Date.now
        },
        notes: [{
            author: String,
            email: String,
            date_added: {
                type: Date,
                default: Date.now
            }
        }]
    });

    var Article = mongoose.model('Article', articleSchema);

    articleSchema.methods.findDuplicateArticle = function (article, cb) {
        //check if the article is already in the database
        results = this.model('Article').find({
            type: this.type,
            headline: article.headline
        }, cb);
        //if not, save to the database
    };

    articleSchema.methods.saveArticle = function (article, cb) {
        var NewArticle = new Article({
            headline: article.headline
            author: article.author,
            url: article.url,
            body: article.body,
            date_published: article.date_published
        });
        NewArticle.save(function (err) {
            if (err) {
                console.log('Error');
                console.log(err);
            } else {
                console.log('Article Saved');
                conslog.log(NewArticle);
            }
        })
    };
    var models = {
        Articles: mongoose.model('Articles', Article)
    };
    return models;
}