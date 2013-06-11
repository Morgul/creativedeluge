//----------------------------------------------------------------------------------------------------------------------
// Settings for the creativedeluge application.
//
// @module settings.js
//----------------------------------------------------------------------------------------------------------------------

var connect = require('connect');

//----------------------------------------------------------------------------------------------------------------------

// Enables omega-wf debugging helpers. Disable this for production!
DEBUG = true;

// Omega will send email to the following addresses whenever an error occurs.
admins = [
    //["Your Name", "your.name@example.com"]
    ["Christopher S. Case", "chris.case@g33xnexus.com"]
];

// Server settings
listenAddress = "0.0.0.0";
listenPort = 8080;

// Uncomment this line to control the url that omega serves it's static files at.
//omegaStaticUrl = '/omega';

// Used for secure sessions. This should be unique per omega-wf application.
secret = "1b275be1dcd650ee26fb4c1882e7ae8b1e7443c65909ee4e71c812f7721ff7b0ab44b7bd1b01b0a5c5d4e69ce320c10b";

// Uncomment to setup/configure databases
databases = {
    default: {
        engine: 'sqlite',
        database: './creativedeluge.db'
    }
};

// Uncomment to enable the admin section
//omegaAdminUrl = '/admin';
useOmegaAdmin = true;

// Connect Middleware
middleware = [
    // Standard connect middleware
    connect.query()
];

//----------------------------------------------------------------------------------------------------------------------
