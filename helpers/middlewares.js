// Check wether id is integer
function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

// Check fields coming from post
function checkFieldsPhonebook(req, res, next) {
    const { name, type, number } = req.body
    if (name && type && number) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsPhonebook
}