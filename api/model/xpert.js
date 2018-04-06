const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const xpertSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    category: {
        type: String, 
        required: true
    },
    instaUsername: {
        type: String, 
        required: true,
        unique: true
    },
    about: {
        type: String, 
        default: 'Not specified'
    },
    expertise:  {
        type: String, 
        default: 'Not specified'
    },
    specialized: {
        type: String, 
        default: 'Not specified'
    },
    profileImageUrl: {
        type: String, 
        default: 'Not specified'
    },
    phone:  {
        type: String, 
        default: 'Not specified'
    },
    address:  {
        type: String, 
        default: 'Not specified'
    },
    score: Number,
    pricing: Number,
    lat: Number,
    lng: Number,
    numberOfInstaItems: Number

})
xpertSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Xpert', xpertSchema)