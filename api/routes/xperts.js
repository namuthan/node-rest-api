const express = require('express')
const router = express.Router()
const Xpert = require('../model/xpert')
const InstaItem = require('../model/instaItem')
const mongoose = require('mongoose')
const instaItemUtils = require('../Utils/instaItem')
const xpertsUtil = require('../Utils/xpert')



// Routes 

router.get('/', (req, res, next) => {

    Xpert
        .find()
        .where('category').equals(req.query.category)
        .select('-__v')
        .exec()
        .then(xperts => {
            res.status(200).json(xpertsUtil.xpertsResponse(xperts))
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.post('/', (req, res, next) => {

    xpertsUtil
        .newXpert(req)
        .save()
        .then(xpert => {
            res.status(201).json(xpertsUtil.xpertCreatedResponse(xpert))
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/:id/previewItems', (req, res, next) => {

    InstaItem
        .find()
        .where('xpertId').equals(req.params.id)
        .select('-__v')
        .limit(3)
        .then(items => {
            res.status(200).json(xpertsUtil.xpertPreviewItemResponse(items))
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/:id', (req, res, next) => {

    const data = {}

    Xpert
        .findById(req.params.id)
        .select('-__v')
        .then(doc => {
            data.user = doc
            return InstaItem
                .find({ xpertId: doc._id })
                .select('-__v')
        })
        .then(items => {
            data.photos = items
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.post('/:xpertId/instaItems', (req, res, next) => {

    Xpert
        .findById(req.params.xpertId)
        .then(xpert => {
            if(!xpert) { 
                return res.status(404).json({
                    message: 'Xpert not found'
                })
            }
            return instaItemUtils.getImageMeta(req.body.imgUrl)
        })
        .then(res => {
            const instaItem = instaItemUtils.newInstaItem(req)
            instaItem.width = res.width
            instaItem.height = res.height
            return instaItem.save()
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.patch('/:xpertId', (req, res, next) => {

    const id = req.params.xpertId;
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    console.log(updateOps)

    Xpert
        .update({
            _id: id
        }, {
                $set: {
                    updateOps
                }
            })
        .then(result => {
            res.status(200).json({
                message: 'Xpert updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/xperts/' + id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:xpertId', (req, res, next) => {

    const id = req.params.xpertId;
    Xpert
        .remove({ _id: id})
        .then(doc => {
            res.status(200).json({
                message: 'Product deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router