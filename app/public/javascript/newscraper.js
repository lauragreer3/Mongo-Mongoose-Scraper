$(document).ready(function() {

//Content Container References
var article_container = $('div.article-list');
var scrape_buton = $('a.scrape-new-button');
var clear_button = $('a.clear-articles-button');
var saved_articles_button = $('a.saved-articles-button');

function init_newscraper() {
    scrape_button.click(handleScrapeNewArticles);
    saved_articles_button.click(handleFetchSavedArticles);
    clear-article-button.click(handleClearArticles);

}

function hide_no_article_warning() {
    $('no-article-warning').hide();
}

function handleScrapeNewArticles() {
    var article =[];
    return articles;
}

function handleSaveArticle() {
    
}

});