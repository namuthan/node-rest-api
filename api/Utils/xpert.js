const mongoose = require('mongoose')
const Xpert = require('../model/xpert')


exports.xpertsResponse = function (xperts) {

    return {
        count: xperts.length,
        xperts: xperts.map(xpert => {
            return {
                ...xpert._doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/xperts/' + xpert._id
                }
            }
        })
    }
}

exports.xpertCreatedResponse = function(xpert) {

    return {
        message: "Creaated Xpert",
        createdXpert: {
            ...xpert._doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/api/xperts/' + xpert._id
            }
        }
    }

}

exports.xpertPreviewItemResponse = function(instaItems) {
    return {
        previewItems: instaItems,
        count: instaItems.length
    }
}

exports.newXpert = function(req) {

    return new Xpert({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        email: req.body.email,
        category: req.body.category,
        instaUsername: req.body.instaUsername,
        score: req.body.score,
        about: req.body.about,
        expertise: req.body.expertise,
        pricing: req.body.pricing,
        specialized: req.body.specialized,
        numberOfInstaItems: req.body.numberOfInstaItems,
        profileImageUrl: req.body.profileImageUrl,
        phone: req.body.phone,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng
    })

}