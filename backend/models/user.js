const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    profilePic: {
        type: String
    },
    bills: [{
        type: Schema.Types.ObjectId,
        ref: 'Bill'
    }]
})

module.exports = mongoose.model('User', userSchema)