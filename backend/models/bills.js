const mongoose = require('mongoose')
const Schema = mongoose.Schema
const billSchema = new Schema({
    billFor: {
        type: String,
        required: true
    },
    senderAddress: {
        street: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },

    },
    recieverName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    recieverAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },

    },
    invoiceDate: {
        type: String,
        required: true
    },
    terms:
    {
        type: Number,
        required: true
    },
    dueDate: {
        type: String
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    }],
    total: {
        type: Number,
    },
    state:
    {
        type: String,
        default: 'Pending'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Bill', billSchema)