const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({

    teacherId: {
        type: String,
        required: true
    },
    teacherSlug: {
        type: String,
        required: true
    },
    codeMd: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('teacher', teacherSchema)