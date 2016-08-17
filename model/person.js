/**
 * Created by carlovespa on 20/07/16.
 */
var TypeCheck = require('../utils/typecheck.js');

class Person {
    constructor(firstname, lastname, birthday, notes,
                homecity, homecountry,
                currentaddress, currentcity, currentcountry) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthday = birthday;
        this.notes = notes;
        this.homecity = homecity;
        this.homecountry = homecountry;
        this.currentaddress = currentaddress;
        this.currentcity = currentcity;
        this.currentcountry = currentcountry;
    }

    static getAllFields () {
        return ['firstname', 'lastname', 'birthday', 'notes',
            'homecity', 'homecountry',
            'currentaddress', 'currentcity', 'currentcountry'];
    }

    static checkFields (p) {
        // check types
        if (   p.firstname && !TypeCheck.isString(p.firstname)
            || p.lastname && !TypeCheck.isString(p.lastname)
            || p.notes && !TypeCheck.isString(p.notes)
            || p.homecity && !TypeCheck.isString(p.homecity)
            || p.homecountry && !TypeCheck.isString(p.homecountry)
            || p.currentaddress && !TypeCheck.isString(p.currentaddress)
            || p.currentcity && !TypeCheck.isString(p.currentcity)
            || p.currentcountry && !TypeCheck.isString(p.currentcountry))
        {
            return false;
        }

        // check if birthday is a valid timestamp
        if (p.birthday && !TypeCheck.isDate(new Date(p.birthday)))
        {
            return false;
        }

        // check the length of strings
        if (   (p.firstname && (p.firstname.length < 1 || p.firstname.length > 100))
            || (p.lastname && (p.lastname.length < 1 || p.lastname.length > 100))
            || (p.homecity && p.homecity.length > 100)
            || (p.homecountry && p.homecountry.length != 0 && p.homecountry.length != 2)
            || (p.currentaddress && p.currentaddress.length > 100)
            || (p.currentcity && p.currentcity.length > 100)
            || (p.currentcountry && p.currentcountry.length  != 0 && p.currentcountry.length  != 2))
        {
            return false;
        }

        return true;
    }

    isValid() {
        // check nulls
        if (   this.firstname       === undefined
            || this.firstname       === null
            || this.lastname        === undefined
            || this.lastname        === null
            || this.birthday        === undefined // birthday can be null
            || this.notes           === undefined
            || this.notes           === null
            || this.homecity        === undefined
            || this.homecity        === null
            || this.homecountry     === undefined
            || this.homecountry     === null
            || this.currentaddress  === undefined
            || this.currentaddress  === null
            || this.currentcity     === undefined
            || this.currentcity     === null
            || this.currentcountry  === undefined
            || this.currentcountry  === null)
        {
            return false;
        }

        return Person.checkFields(this);
    }
}

module.exports = Person;
