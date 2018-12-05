const path = require('path');

const filename = path.resolve(__dirname, '../data/phonebooks.json')

let phonebooks = require(filename)
const helper = require('../helpers/helper.js')

//We have just to return the data array of objects, if array exists.
function getPhonebooks() {
    return new Promise((resolve, reject) => {
        if (phonebooks.length === 0) {
            reject({
                message: 'no phonebooks available',
                status: 202
            })
        }
        resolve(phonebooks)
    })
}

// retrieve the object by number in parameter of the function.
function getPhonebook(number) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(phonebooks, number)
        .then(phonebook => resolve(phonebook))
        .catch(err => reject(err))
    })
}

// Insert new number in phonebook
function insertPhonebook(newPhonebook) {
    return new Promise((resolve, reject) => {
        phonebooks.push(newPhonebook)
        helper.writeJSONFile(filename, phonebooks)
        resolve(newPhonebook)
    })
}

// Update number
function updatePhonebook(number, newPhonebook) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(phonebooks, number)
        .then(phonenumber => {
            const index = phonebooks.findIndex(p => p.number == phonenumber.number)
            number = { number: phonenumber.number }
            phonebooks[index] = { ...newPhonebook }
            helper.writeJSONFile(filename, phonebooks)
            resolve(phonebooks[index])
        })
        .catch(err => reject(err))
    })
}

// Delete a number from phonebook
function deletePhonebook(number) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(phonebooks, number)
        .then(() => {
            phonebooks = phonebooks.filter(p => p.number !== number)
            helper.writeJSONFile(filename, phonebooks)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertPhonebook,
    getPhonebooks,
    getPhonebook, 
    updatePhonebook,
    deletePhonebook
}