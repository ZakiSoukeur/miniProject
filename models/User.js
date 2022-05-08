const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    slug: { type: String, slug: ["firstName", "lastName"], unique: true, slug_padding_size: 2 }

})
module.exports = mongoose.model('user', userSchema)