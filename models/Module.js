const mongoose = require('mongoose')

const moduleSchema = mongoose.Schema({

    codeMd: {
        type: String,
        required: true
    },
    nameMd: {
        type: String,

    },
    coef: {
        type: Number,
        required: true
    }



})
module.exports = mongoose.model('module', moduleSchema)
