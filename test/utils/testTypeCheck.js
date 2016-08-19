/**
 * Created by carlovespa on 21/07/16.
 */
var should = require('should');

var TypeCheck = require('../../utils/typecheck.js');

function TestTypeCheck() {
    describe('isInteger', () => {
        it('should return true for integer values', done => {
            let x = TypeCheck.isInteger(42);

            x.should.equal(true);

            done()
        });

        it('should return false for string inputs', done => {
            let x = TypeCheck.isInteger('string');

            x.should.equal(false);

            done();
        });

        it('should return false for Date inputs', done => {
            let x = TypeCheck.isInteger(new Date());

            x.should.equal(false);

            done();
        });
    });

    describe('isString', () => {
        it('should return true for string values', done => {
            let x = TypeCheck.isString('string');

            x.should.equal(true);

            done()
        });

        it('should return false for integer inputs', done => {
            let x = TypeCheck.isString(42);

            x.should.equal(false);

            done();
        });

        it('should return false for Date inputs', done => {
            let x = TypeCheck.isString(new Date());

            x.should.equal(false);

            done();
        });
    });

    describe('isDate', () => {
        it('should return true for Date values', done => {
            let x = TypeCheck.isDate(new Date());

            x.should.equal(true);

            done()
        });

        it('should return false for integer inputs', done => {
            let x = TypeCheck.isDate(42);

            x.should.equal(false);

            done();
        });

        it('should return false for string inputs', done => {
            let x = TypeCheck.isDate('string');

            x.should.equal(false);

            done();
        });
    });
}

module.exports = TestTypeCheck;
