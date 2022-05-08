const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    codeMd: {
        type: String,
        required: true
    },
    noteTd: {
        type: String,

    },
    noteTp: {
        type: String,

    },
    noteCtl: {
        type: Float,
        required: true

    },
    moyen: {
        type: Float,
        required: true
    }

})

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    notes: {
        type: noteSchema,
        required: true

    },

})


module.exports = mongoose.model('Blog', studentSchema)