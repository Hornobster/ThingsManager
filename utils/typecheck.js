/**
 * Created by carlovespa on 21/07/16.
 */

function isInteger(x) {
    return (typeof x === 'number') && Math.floor(x) === x;
}

function isString(x) {
    return (typeof x === 'string' || x instanceof String);
}

function isDate(x) {
    return !!x.getTime && !isNaN(x.getTime());
}

const TypeCheck = {
    isInteger: isInteger,
    isString: isString,
    isDate: isDate
};

module.exports = TypeCheck;