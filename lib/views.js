//----------------------------------------------------------------------------------------------------------------------
// Views for Creative Deluge
//
// @module views.js
//----------------------------------------------------------------------------------------------------------------------

var swig = require('omega-wf').utils.swig;
var render = require('omega-wf').utils.render;

swig.init({
    cache: false,
    root: './templates'
});
//----------------------------------------------------------------------------------------------------------------------

function index(request, response)
{
    render(response, 'index.html', {
        'msg': "Hello, World!"
    });
} // end index

function flatpages(request, response)
{
    var url = request.params.wildcard;
    render(response, url + '.html', {});
} // end index

function article(request, response)
{
    var slug = request.params.wildcard;

    //TODO: Lookup article by slug

    render(response, 'article.html', {});
} // end article

function blog(request, response)
{
    var slug = request.params.wildcard;

    //TODO: Lookup article by slug

    render(response, 'blog.html', {});
} // end blog

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    index: index,
    flatpages: flatpages,
    blog: blog,
    article: article
}; // end exports

//----------------------------------------------------------------------------------------------------------------------