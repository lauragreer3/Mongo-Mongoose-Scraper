var scraped_articles = [];

function handleSaveArticle(article_id) {
    var article_to_save = scraped_articles[article_id];
    console.log(article_to_save);
    $.post('/save_article', article_to_save, function(data) {
        console.log('saved');
        console.log(data);
    });        
}

function handleFetchSavedArticles() {
    var articles = [];
    return articles;
}

function handleClearArticles() {

}

$(document).ready(function() {

    //Content Container References
    var article_container = $('div.article-list');
    var scrape_button = $('a.scrape-new-button');
    var clear_button = $('a.clear-articles-button');
    var saved_articles_button = $('a.saved-articles-button');
    

    function init_newscraper() {
        scrape_button.click(handleScrapeNewArticles);
        saved_articles_button.click(handleFetchSavedArticles);
        clear_button.click(handleClearArticles);

    }

    function hide_no_article_warning() {
        $('no-article-warning').hide();
    }

    function handleScrapeNewArticles() {
        var scraper_url = "/scrape_news"
        var jpxhr = $.get(scraper_url, function(data) {
                // console.log(data);
                scraped_articles = data;
                $('div.no-article-warning').hide();
                var article_list = $('div.article-list');
                var counter = 0;
                scraped_articles.forEach(article => {
                    article_list.append('<div class="card"> \
                    <div class="card-header text-center">\
                        <a target="_blank" href="' + article.url + '"><h3>' + article.headline + '</h3></a>\
                        <div class="btn-toolbar mb-2 mb-md-0">\
                            <div class="btn-group mr-2">\
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="handleSaveArticle(' + counter + ')">Save</button>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="card-body">\
                    <b> ' + article.author + '</b>\
                    <div class="published">' + article.date_published_relative + '</div>\
                    ' + article.summary + '\
                    </div>\
                    </div>');
                });
                counter++;
            });
    }
    
    init_newscraper();
});
