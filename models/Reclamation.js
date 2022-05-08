const mongoose = require('mongoose')

const recSchema = mongoose.Schema({

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
    noteId: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true

    },
})

module.exports = mongoose.model('reclamation', recSchema)