/**
 * Created by carlovespa on 22/07/16.
 */
var sqlite3 = require('sqlite3');

function createInMemoryDb() {
    return new sqlite3.Database(':memory:');
}

function openPermanentDb(filename) {
    return new sqlite3.Database(filename);
}

var createDbConnection = {
    InMemoryDb: createInMemoryDb,
    PermanentDb: openPermanentDb
};

module.exports = createDbConnection;
