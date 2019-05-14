$(document).ready(function() {

    //Content Container References
    var article_container = $('div.article-list');
    var scrape_button = $('a.scrape-new-button');
    var clear_article_button = $('a.clear-articles-button');
    var saved_articles_button = $('a.saved-articles-button');

    function init_newscraper() {
        scrape_button.click(handleScrapeNewArticles);
        saved_articles_button.click(handleFetchSavedArticles);
        clear_article_button.click(handleClearArticles);

    }

    function hide_no_article_warning() {
        $('no-article-warning').hide();
    }

    function handleScrapeNewArticles() {
        var articles = [];
        var scraper_url = "/scrape_news"
        var jpxhr = $.get(scraper_url, function(data) {
                console.log(data);
                articles = data;
                $('div.no-article-warning').hide();
                var article_list = $('div.article-list');
                articles.forEach(article => {
                    article_list.append('<div class="card"> \
                    <div class="card-header text-center">\
                        <h3>' + article.headline + '</h3>\
                    </div>\
                    <div class="card-body">\
                    ' + article.summary + '\
                    </div>\
                    </div>');
                });
            });
            

            return articles;
    }
    function handleFetchSavedArticles() {
        var articles = [];
        return articles;
    }

    function handleSaveArticle() {
        
    }
    function handleClearArticles() {

    }
    init_newscraper();
});