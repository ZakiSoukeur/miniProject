const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({

    codeMd: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true

    },
    studentSlug: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true,

    },
})

module.exports = mongoose.model('note', noteSchema)