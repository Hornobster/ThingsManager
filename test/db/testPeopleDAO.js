/**
 * Created by carlovespa on 21/07/16.
 */
var should = require('should');

var Person = require('../../model/person.js');
var PeopleDAO = require('../../db/peopleDAO.js');

var InMemoryDb = require('../../utils/createDbConnection.js').InMemoryDb;

function getDefaultValidPerson() {
    return new Person(
        'Name', 'Surname', new Date('1990-01-01'),
        'Some notes', 'Hometown', 'XY',
        'Address', 'City', 'YZ'
    );
}

function TestPeopleDAO() {
    describe('insertInto, getAll and getId', () => {
        it('should return list of people insertInto\'d DB', done => {
            let db = InMemoryDb();

            let p = getDefaultValidPerson();

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(() => PeopleDAO.getAll(db))
                .then(people => {
                    people.length.should.equal(1);

                    if (people[0]) {
                        people[0].firstname.should.equal(p.firstname);
                        people[0].lastname.should.equal(p.lastname);
                        people[0].birthday.should.equal(p.birthday.getTime());
                        people[0].notes.should.equal(p.notes);
                        people[0].homecity.should.equal(p.homecity);
                        people[0].homecountry.should.equal(p.homecountry);
                        people[0].currentaddress.should.equal(p.currentaddress);
                        people[0].currentcity.should.equal(p.currentcity);
                        people[0].currentcountry.should.equal(p.currentcountry);
                    }
                })
                .catch(err => err) // if there's an error pass it to the final function
                .then(err => {
                    db.close();
                    done(err);
                });
        });

        it('should return the person insertInto\'d DB', done => {
            let db = InMemoryDb();

            let p = getDefaultValidPerson();

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
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
                let db = InMemoryDb();

                let p = getDefaultValidPerson();

                let updated_p = {};
                updated_p[field] = 'up';

                let insertID;

                PeopleDAO.createSchema(db)
                    .then(() => PeopleDAO.insertInto(db, p))
                    .then(ID => PeopleDAO.update(db, insertID = ID, updated_p)) // ugly "global" access, but alternative is uglier
                    .then(() => PeopleDAO.getId(db, insertID))
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

        it('should update single field birthday in the DB', done => {
            let db = InMemoryDb();

            let p = getDefaultValidPerson();

            let updated_p = {};
            updated_p.birthday = new Date();

            let insertID;

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(ID => PeopleDAO.update(db, insertID = ID, updated_p))
                .then(() => PeopleDAO.getId(db, insertID))
                .then(person => {
                    person.birthday.should.equal(updated_p.birthday.getTime());
                })
                .catch(err => err)
                .then(err => {
                    db.close();
                    done(err);
                });
        });

        it('should update multiple fields birthday, currentaddress, currentcity in the DB', done => {
            let db = InMemoryDb();

            let p = getDefaultValidPerson();

            let updated_p = {};
            updated_p.birthday = new Date();
            updated_p.currentaddress = 'new address';
            updated_p.currentcity = 'new city';

            let insertID;

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(ID => PeopleDAO.update(db, insertID = ID, updated_p))
                .then(() => PeopleDAO.getId(db, insertID))
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
            let db = InMemoryDb();

            let p = getDefaultValidPerson();

            PeopleDAO.createSchema(db)
                .then(() => PeopleDAO.insertInto(db, p))
                .then(ID => PeopleDAO.deleteFrom(db, ID))
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

module.exports = TestPeopleDAO;
