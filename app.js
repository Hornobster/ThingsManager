var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');

var config = require('./config.js');
var PermanentDb = require('./utils/createDbConnection.js').PermanentDb;

var apiRoutes = require('./routes/api.js');

// if we are testing
var db;
if (process.env.TEST === 'true') {
    db = PermanentDb(config.testDbFile);
} else {
    db = PermanentDb(config.dbFile);
}

// this function runs when the server is shutting down
require('./utils/cleanup.js').Cleanup(() => {
    console.log('Closing DB connection...');
    db.close();
});

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main routes
app.use('/api', apiRoutes(db));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;