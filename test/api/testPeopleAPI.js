/**
 * Created by carlovespa on 21/07/16.
 */
var should = require('should');
var request = require('supertest');

var PermanentDb = require('../../utils/createDbConnection.js').PermanentDb;
var config = require('../../config.js');

var Person = require('../../model/person.js');
var PeopleDAO = require('../../db/peopleDAO.js');

function getDefaultValidPerson() {
    return new Person(
        'Name', 'Surname', new Date('1990-01-01'),
        'Some notes', 'Hometown', 'XY',
        'Address', 'City', 'YZ'
    );
}

function TestPeopleAPI() {
    describe('getAll', () => {
        it('should return list of people insertInto\'d DB', done => {
            let db = PermanentDb(config.testDbFile);

            let p = getDefaultValidPerson();

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(() => new Promise((resolve, reject) => {
                        request(config.rootUrl)
                            .get('/api/people/')
                            .expect(200)
                            .end((err, res) => {
                                if (!err) {
                                    res.body.status.should.equal(200);
                                    res.body.people.length.should.equal(1);

                                    resolve();
                                } else {
                                    reject(err);
                                }
                            });
                    }))
                .catch(err => err)
                .then(err => {
                    db.close();
                    done(err);
                });
        });
    });

    describe('getId', () => {
        it('should return the person insertInto\'d DB', done => {
            let db = PermanentDb(config.testDbFile);

            let p = getDefaultValidPerson();

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(ID => new Promise((resolve, reject) => {
                    request(config.rootUrl)
                        .get('/api/people/' + ID)
                        .expect(200)
                        .end((err, res) => {
                            if (!err) {
                                res.body.status.should.equal(200);
                                should.exist(res.body.person);

                                resolve();
                            } else {
                                reject(err);
                            }
                        });
                }))
                .catch(err => err)
                .then(err => {
                    db.close();
                    done(err);
                });
        });

        it('should return 404 if the ID is not found', done => {
            let db = PermanentDb(config.testDbFile);

            let fakeID = 42;

            PeopleDAO.createSchema(db)
                .then(() => new Promise((resolve, reject) => {
                    request(config.rootUrl)
                        .get('/api/people/' + fakeID)
                        .expect(404)
                        .end((err, res) => {
                            if (!err) {
                                res.body.status.should.equal(404);

                                resolve();
                            } else {
                                reject(err);
                            }
                        });
                }))
                .catch(err => err)
                .then(err => {
                    db.close();
                    done(err);
                });
        });
    });

    describe('insertInto', () => {
        it('should add new person to DB', done => {
            let db = PermanentDb(config.testDbFile);

            let p = getDefaultValidPerson();

            PeopleDAO.createSchema(db)
                .then(() => new Promise((resolve, reject) => {
                    request(config.rootUrl)
                        .post('/api/people/')
                        .send(p)
                        .expect(200)
                        .end((err, res) => {
                            if (!err) {
                                res.body.status.should.equal(200);
                                should.exist(res.body.ID);

                                resolve(res.body.ID);
                            } else {
                                reject(err);
                            }
                        });
                }))
                .then(ID => PeopleDAO.getId(db, ID))
                .then(person => {
                    person.firstname.should.equal(p.firstname);
                    person.lastname.should.equal(p.lastname);
                    person.birthday.should.equal(p.birthday.getTime());
                    person.notes.should.equal(p.notes);
                    person.homecity.should.equal(p.homecity);
                    person.homecountry.should.equal(p.homecountry);
                    person.currentaddress.should.equal(p.currentaddress);
                    person.currentcity.should.equal(p.currentcity);
                    person.currentcountry.should.equal(p.currentcountry);
                })
                .catch(err => err)
                .then(err => {
                    db.close();
                    done(err);
                });
        });
    });

    describe('update', () => {
        let fields = ['firstname', 'lastname', 'notes', 'homecity', 'homecountry', 'currentaddress', 'currentcity', 'currentcountry'];
        for (let field of fields) {
            it('should update single field ' + field + ' in the DB', done => {
                let db = PermanentDb(config.testDbFile);

                let p = getDefaultValidPerson();

                let updated_p = {};
                updated_p[field] = 'up';

                PeopleDAO.createSchema(db)
                    .then(() => PeopleDAO.insertInto(db, p))
                    .then(ID => new Promise((resolve, reject) => {
                        request(config.rootUrl)
                            .put('/api/people/' + ID)
                            .send(updated_p)
                            .expect(200)
                            .end((err, res) => {
                                if (!err) {
                                    res.body.status.should.equal(200);

                                    resolve(ID);
                                } else {
                                    reject(err);
                                }
                            });
                    }))
                    .then(ID => PeopleDAO.getId(db, ID))
                    .then(person => {
                        person[field].should.equal(updated_p[field]);
                    })
                    .catch(err => err)
                    .then(err => {
                        db.close();
                        done(err);
                    });
            });
        }

        it('should update multiple fields birthday, currentaddress, currentcity in the DB', done => {
            let db = PermanentDb(config.testDbFile);

            let p = getDefaultValidPerson();

            let updated_p = {};
            updated_p.birthday = new Date();
            updated_p.currentaddress = 'new address';
            updated_p.currentcity = 'new city';

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(ID => new Promise((resolve, reject) => {
                    request(config.rootUrl)
                        .put('/api/people/' + ID)
                        .send(updated_p)
                        .expect(200)
                        .end((err, res) => {
                            if (!err) {
                                res.body.status.should.equal(200);

                                resolve(ID);
                            } else {
                                reject(err);
                            }
                        });
                }))
                .then(ID => PeopleDAO.getId(db, ID))
                .then(person => {
                    person.birthday.should.equal(updated_p.birthday.getTime());
                    person.currentaddress.should.equal(updated_p.currentaddress);
                    person.currentcity.should.equal(updated_p.currentcity);
                })
                .catch(err => err)
                .then(err => {
                    db.close();
                    done(err);
                });
        });
    });

    describe('deleteFrom', () => {
        it('should remove the insertInto\'d person', done => {
            let db = PermanentDb(config.testDbFile);

            let p = getDefaultValidPerson();

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(ID => new Promise((resolve, reject) => {
                    request(config.rootUrl)
                        .delete('/api/people/' + ID)
                        .expect(200)
                        .end((err, res) => {
                            if (!err) {
                                res.body.status.should.equal(200);

                                resolve();
                            } else {
                                reject(err);
                            }
                        });
                }))
                .then(() => PeopleDAO.getAll(db))
                .then(people => {
                    people.length.should.equal(0);
                })
                .catch(err => err)
                .then(err => {
                    db.close();
                    done(err);
                });
        });
    })
}

module.exports = TestPeopleAPI;
