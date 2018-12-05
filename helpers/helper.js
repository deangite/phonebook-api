const fs = require('fs')

function mustBeInArray(array, number) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.number == number)
        if (!row) {
            reject({
                message: 'number is not good',
                status: 404
            })
        }
        resolve(row)
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content, null, 4), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    mustBeInArray,
    writeJSONFile
}