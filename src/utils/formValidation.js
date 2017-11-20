const Validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const moment = require('moment');
const _ = require('lodash');

console.log(moment('02-12-2000', 'DD-MM-YYYY').date());
console.log(moment('02-01-2000', 'DD-MM-YYYY').month());
console.log(moment('02-12-2000', 'DD-MM-YYYY').year());

const alphanumeric = [
    'username',
    'postalCode',
    'address',
    'apartment',
];

const alpha = [
    'firstName',
    'lastName',
    'countryOfBirth',
    'countryOfResidence',
    'cityOfResidence',
    'gender',

];

const numeric = [
    'phoneCode',
    'phoneNumber',
    'radiusOfSearch',
];

const blacklist = [' áéíóúñ'];

function validateInput(data, allowEmpty=false) {
    let errors = {};

    let keys = Object.keys(data);

    keys.map(k => {

        if (k === 'email') {
            if (!Validator.isEmail(data[k])) {
                errors[k] = 'Email is invalid';
            }
        }

        if (k === 'repeatPassword') {
            if (!Validator.equals(data.password, data.repeatPassword)) {
                errors[k] = 'Passwords must match'
            }
        }

        if (k === 'dateOfBirth') {
            const pattern =/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
            if (!pattern.test(data[k])) {
                errors[k] = 'Invalid format.'
            }
            else {
                console.log('asd')
            }
        }

        if (_.includes(alphanumeric, k)) {
            if (!Validator.isAlphanumeric(Validator.blacklist(data[k], blacklist))) {
                errors[k] = 'Value can only include letters and numbers'
            }
        }

        if (_.includes(alpha, k)) {
            if (!Validator.isAlpha(Validator.blacklist(data[k], blacklist))) {
                errors[k] = 'Value can only include letters'
            }
        }

        if (_.includes(numeric, k)) {
            if (!Validator.isNumeric(Validator.blacklist(data[k], blacklist))) {
                errors[k] = 'Value can only include numbers'
            }
        }

        if (allowEmpty === false) {
            if (Validator.isEmpty(data[k])) {
                errors[k] = k + ' is required';
            }
        }

        return null

    });

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

module.exports = validateInput;