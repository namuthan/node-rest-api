const express = require('express')
const router = express.Router()
const InstaItem = require('../model/instaItem')
const instaItemUtils = require('../Utils/instaItem')


router.get('/', (req, res, next) => {

    InstaItem
        .find({ categories: req.query.category })
        .select('-__v')
        .exec()
        .then(items => {
            res.status(200).json(instaItemUtils.instaItemsResponse(items))
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/:instaId', (req, res, next) => {

    InstaItem
        .findById(req.params.instaId)
        .select('-__v')
        .exec()
        .then(instaItem => {
            if(!instaItem) {
                return res.status(404).json({
                    message: 'InstaItem not found'
                })
            }
            res.status(200).json({
                instaItem: instaItem
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})


router.delete('/:instaId', (req, res, next) => {

    InstaItem
        .remove({ _id: req.params.instaId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'InstaItem deleted'
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

module.exports = router;