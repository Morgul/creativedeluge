// ---------------------------------------------------------------------------------------------------------------------
// Main creativedeluge module.
//
// @module server.js
// ---------------------------------------------------------------------------------------------------------------------

var path = require('path');
var app = require('omega-wf').app;

// Views
var views = require('./lib/views');

// Models
require('./lib/models');

// ---------------------------------------------------------------------------------------------------------------------

app.router.add(
    {
        url: '/static/*',
        path: path.join(__dirname, 'static')
    },
    {
        url: '/vendor/*',
        path: path.join(__dirname, 'vendor')
    },
    {
        url:'/',
        get: views.index
    },
    {
        url:'/article/{slug}/{page}?',
        get: views.article
    },
    {
        url:'/blog/{slug}',
        get: views.blog
    },
    {
        url: /^\/(?!admin\/|omega\/)(.*)/,
        get: views.flatpages
    }
);

// Set the application's name
app.setName('creativedeluge');

// Start the omega-wf app.
app.listen();

// ---------------------------------------------------------------------------------------------------------------------
