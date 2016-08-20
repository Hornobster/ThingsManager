/**
 * Created by carlovespa on 17/08/16.
 */
var fs = require('fs');
var Person = require('../model/person.js');
var TypeCheck = require('../utils/typecheck.js');

function createSchema(db) {
    return new Promise((resolve, reject) => {
        fs.readFile('./sql/createPeopleSchema.sql', 'utf-8', (err, sql) => {
            if (!err) {
                db.exec(sql, (err) => {
                    if (!err) {
                        resolve();
                    } else {
                        reject(err);
                    }
                });
            } else {
                reject(err);
            }
        });
    });
}

function getAll(db) {
    return new Promise((resolve, reject) => {
        db.all('select * from people', (err, rows) => {
            if (!err) {
                resolve(rows);
            } else {
                reject(err);
            }
        });
    });
}

function getId(db, person_id) {
    return new Promise((resolve, reject) => {
        if (TypeCheck.isInteger(person_id)) {
            db.get('select * from people where id=?', [person_id], (err, row) => {
                if (!err) {
                    resolve(row);
                } else {
                    reject(err);
                }
            });
        } else {
            reject(new Error('person id should be an integer', 400));
        }
    });
}

function insertInto(db, person) {
    return new Promise((resolve, reject) => {
        if (person.isValid()) {
            db.run('insert into people ' +
                '(firstname, lastname, birthday, notes, homecity, homecountry, currentaddress, currentcity, currentcountry) ' +
                'values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    person.firstname,
                    person.lastname,
                    person.birthday,
                    person.notes,
                    person.homecity,
                    person.homecountry,
                    person.currentaddress,
                    person.currentcity,
                    person.currentcountry
                ],
                function (err) { // the this object doesn't bind correctly with arrow functions
                    if (!err) {
                        resolve(this.lastID);
                    } else {
                        reject(err);
                    }
                }
            );
        } else {
            reject(new Error('updates should contain valid fields', 400));
        }
    });
}

function update(db, person_id, updates) {
    return new Promise((resolve, reject) => {
        if (Person.checkFields(updates)) {
            // generate sql string
            let fields = [];
            let params = [];
            for (let field in updates) {
                if (updates.hasOwnProperty(field) && Person.getAllFields().indexOf(field) > -1) {
                    fields.push(field + '=?');
                    params.push(updates[field]);
                }
            }
            params.push(person_id);

            let sql = 'update people set ' + fields.join(', ') + ' where id=?';
            db.run(sql, params, (err) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        } else {
            reject(new Error('updates should contain valid fields', 400));
        }
    });
}

function deleteFrom(db, person_id) {
    return new Promise((resolve, reject) => {
        db.run('delete from people where id=?', [person_id], (err) => {
            if (!err) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

const PeopleDAO = {
    createSchema: createSchema,
    getAll: getAll,
    getId: getId,
    insertInto: insertInto,
    update: update,
    deleteFrom: deleteFrom
};

module.exports = PeopleDAO;
