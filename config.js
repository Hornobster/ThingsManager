/**
 * Created by carlovespa on 21/07/16.
 */
var path = require('path');

const config = {
    rootUrl: 'http://localhost:3000',
    dbFile: path.join(__dirname, 'app.db'),
    testDbFile: path.join(__dirname, 'test.db')
};

module.exports = config;