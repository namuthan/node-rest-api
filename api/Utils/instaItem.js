const probe = require('probe-image-size');
const mongoose = require('mongoose')
const InstaItem = require('../model/instaItem')

exports.getImageMeta = function (imgUrl) {
    return probe(imgUrl)
}

exports.newInstaItem = function(req) {

    return new InstaItem({
        _id: new mongoose.Types.ObjectId(),
        xpertId: req.params.xpertId,
        caption: req.body.caption,
        comments: req.body.comments,
        imgUrl: req.body.imgUrl,
        instaUrl: req.body.instaUrl,
        instaUsername: req.body.instaUsername,
        likes: req.body.likes,
        categories: req.body.categories,
        createdAt: Date.now()
    })

}

exports.instaItemsResponse = function (items) {

    return {
        count: items.length,
        instaItems: items.map(item => {
            return {
                ...item._doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/instaItems/' + item._id
                }
            }
        })
    }
}