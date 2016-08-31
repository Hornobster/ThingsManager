/**
 * Created by carlovespa on 23/08/16.
 */
var express = require('express');

var Person = require('../../model/person.js');
var PeopleDAO = require('../../db/peopleDAO.js');

function peopleAPI(db) {
    var router = express.Router();

    router.get('/', (req, res) => {
        PeopleDAO.getAll(db)
            .then(people => {
                res.send({
                    status: 200,
                    people: people
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500);
                res.send({
                    status: 500,
                    message: 'Failed to retrieve the list of people'
                });
            });
    });

    router.get('/:id', (req, res) => {
        let id = parseInt(req.params.id);

        PeopleDAO.getId(db, id)
            .then(person => {
                if (person) {
                    res.send({
                        status: 200,
                        person: person
                    });
                } else {
                    res.status(404);
                    res.send({
                        status: 404,
                        message: 'Person ID ' + id + ' not found'
                    });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500);
                res.send({
                    status: 500,
                    message: 'Failed to retrieve the requested person'
                });
            });
    });

    router.post('/', (req, res) => {
        let p = req.body;
        p = new Person(p.firstname, p.lastname, p.birthday,
            p.notes, p.homecity, p.homecountry,
            p.currentaddress, p.currentcity, p.currentcountry);

        PeopleDAO.insertInto(db, p)
            .then(ID => {
                res.send({
                    status: 200,
                    ID: ID
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500);
                res.send({
                    status: 500,
                    message: 'Failed to retrieve the requested person'
                });
            });
    });

    router.put('/:id', (req, res) => {
        let id = parseInt(req.params.id);

        let updates = req.body;
        if (updates.birthday) {
            updates.birthday = new Date(updates.birthday);
        }

        PeopleDAO.update(db, id, updates)
            .then(() => {
                res.send({
                    status: 200
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500);
                res.send({
                    status: 500,
                    message: 'Failed to update the requested person'
                });
            })
    });

    router.delete('/:id', (req, res) => {
        let id = parseInt(req.params.id);

        PeopleDAO.deleteFrom(db, id)
            .then(() => {
                res.send({
                    status: 200
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500);
                res.send({
                    status: 500,
                    message: 'Failed to delete the requested person'
                });
            })
    });

    return router;
}

module.exports = peopleAPI;
