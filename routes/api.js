/**
 * Created by carlovespa on 23/08/16.
 */

var express = require('express');

var people = require('./api/peopleAPI.js');

function apiRoutes(db) {
    var router = express.Router();

    router.use('/people', people(db));

    return router;
}

module.exports = apiRoutes;
