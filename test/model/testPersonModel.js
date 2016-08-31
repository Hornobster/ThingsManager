/**
 * Created by carlovespa on 21/07/16.
 */
var should = require('should');

var Person = require('../../model/person.js');

function getDefaultValidPerson() {
    return new Person(
        'Name', 'Surname', new Date('1990-01-01'),
        'Some notes', 'Hometown', 'XY',
        'Address', 'City', 'YZ'
    );
}

function TestPersonModel() {
    describe('isValid', () => {
        it('should return true with a valid Person instance', done => {
            let p = getDefaultValidPerson();

            let x = p.isValid();

            x.should.equal(true);

            done();
        });

        {
            let fields = ['firstname', 'lastname', 'notes', 'homecity', 'homecountry', 'currentaddress', 'currentcity', 'currentcountry'];
            for (let field of fields) {
                it('should return false if ' + field + ' is a number', done => {
                    let p = getDefaultValidPerson();

                    p[field] = 42;

                    let x = p.isValid();

                    x.should.equal(false);

                    done();
                });
            }
        }

        it('should return false if birthday is not a valid date', done => {
            let p = getDefaultValidPerson();

            p.birthday = 'this is not a date';

            let x = p.isValid();

            x.should.equal(false);

            done();
        });

        /*
            test string length checks
         */
        {
            let fields = ['firstname', 'lastname', 'homecity', 'currentaddress', 'currentcity'];
            for (let field of fields) {
                it('should return false if ' + field + ' is longer than 100 chars', done => {
                    let p = getDefaultValidPerson();

                    // 101 chars string
                    p[field] = 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';

                    let x = p.isValid();

                    x.should.equal(false);

                    done();
                });
            }
        }

        {
            let fields = ['homecountry', 'currentcountry'];
            for (let field of fields) {
                it('should return false if ' + field + ' is not long 0 or 2 chars', done => {
                    let p = getDefaultValidPerson();

                    p[field] = 's';

                    let x = p.isValid();

                    x.should.equal(false);

                    done();
                });
            }
        }
    });
}

module.exports = TestPersonModel;
