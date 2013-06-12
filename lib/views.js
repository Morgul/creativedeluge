//----------------------------------------------------------------------------------------------------------------------
// Views for Creative Deluge
//
// @module views.js
//----------------------------------------------------------------------------------------------------------------------

var brucedown = require('brucedown');

var swig = require('omega-wf').utils.swig;
var render = require('omega-wf').utils.render;
var db = require('omega-wf').db;
var Paginator = require('omega-wf').utils.Paginator;
var logging = require('omega-wf').logging;

swig.init({
    cache: false,
    autoescape: false,
    root: './templates'
});

var logger = logging.loggerFor(module);

//----------------------------------------------------------------------------------------------------------------------

function index(request, response)
{
    render(response, 'index.html', {
        'msg': "Hello, World!"
    });
} // end index

function flatpages(request, response)
{
    var url = request.params[1];
    render(response, url + '.html', {});
} // end index

function article(request, response)
{
    var slug = request.params.slug;

    //TODO: Don't filter out drafts if we're logged in.

    // Lookup article by slug
    db.model('Article').find({ where: {isBlog: false, isDraft: false, slug: slug}}).success(function(article)
    {
        if(!article)
        {
            render(response, 'not_found.html', {
                slug: slug
            });
            return;
        } // end if

        var page = request.params.page || 1;

        // Paginate the article. We split on "~~~~~" in the markup.
        var pages = article.content.split(/^~{3,}$/m);

        var paginator = new Paginator(pages, 1);
        var page = paginator.page(page);

        brucedown(page.contents, function(err, html)
        {
            if(err)
            {
                logger.error('Error generating markdown:\n', err);

                render(response, 'error.html', {
                    slug: slug
                });
            } // end if

            page.contents = html;

            render(response, 'article.html', {
                article: article,
                page: page
            });
        });
    });
} // end article

function blog(request, response)
{
    var slug = request.params.slug;

    //TODO: Don't filter out drafts if we're logged in.

    // Lookup article by slug
    db.model('Article').find({ where: {isBlog: true, isDraft: false, slug: slug}}).success(function(blog)
    {
        if(!blog)
        {
            render(response, 'not_found.html', {
                slug: slug
            });
        } // end if

        brucedown(blog.content, function(err, html)
        {
            if(err)
            {
                logger.error('Error generating markdown:\n', err);

                render(response, 'error.html', {
                    slug: slug
                });
            } // end if

            blog.content = html;

            render(response, 'blog.html', {
                blog: blog
            });
        });
    });
} // end blog

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    index: index,
    flatpages: flatpages,
    blog: blog,
    article: article
}; // end exports

//----------------------------------------------------------------------------------------------------------------------