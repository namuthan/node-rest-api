const mongoose = require('mongoose')


const instaItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    xpertId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Xpert',
        required: true
    },
    caption: {
        type: String, 
        required: true
    },
    imgUrl: {
        type: String, 
        required: true
    },
    instaUrl: {
        type: String, 
        required: true
    },
    instaUsername: {
        type: String, 
        required: true
    },
    categories: {
        type: [String], 
        required: true
    },
    comments: {
        type: Number, 
        required: true
    },
    likes: {
        type: Number, 
        required: true
    },
    width: Number,
    height: Number,

    createdAt: Date
});

module.exports = mongoose.model('InstaItem', instaItemSchema)