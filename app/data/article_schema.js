module.exports = function (mongoose) {

    var articleSchema = new Schema({
        headline: {
            type: String,
            unique: true,
            minlength: 1, 
            trim: true,
        },  
        author: {
            type: String,
            required: false,
            winlength: 1
        },    
        url: {
            type:String,
            required: true,
            validate: {
                validator: function(v) {
                    return true;
                    //@todo test validation
                    // return URIError.IsWellFormedUriString(v, UriKind.RelativeOrAbsolute) && ^((http|ftp|https|www)://)?([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$
                }
            }         
        },      
        body: String,
        date_published: Date,
        date_added: { type: Date, default: Date.now },        
        notes: [{
            author: String,
            email: String,
            notes: String,
            date_added: { type: Date, default: Date.now }
        }]
    });

    var Article = mongoose.model('Article', articleSchema);

    // articleSchema.methods.findDuplicateArticle = function (article, cb) {
    //     //check if the article is already in the database
    //     results = this.model('Article').find({
    //         type: this.type,
    //         headline: article.headline
    //     }, cb);
    //     //if not, save to the database
    // };

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