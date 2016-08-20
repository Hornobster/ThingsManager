/**
 * Created by carlovespa on 22/07/16.
 */
var sqlite3 = require('sqlite3');

function createInMemoryDb() {
    return new sqlite3.Database(':memory:');
}

module.exports = createInMemoryDb;
