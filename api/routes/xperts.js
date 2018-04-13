const express = require('express')
const router = express.Router()
const chechAuth = require('../middleware/checkAuth')
const xpertController = require('../controllers/Xpert')


// Routes 

router.get('/', xpertController.getAllForCategory)

router.post('/', chechAuth, xpertController.createXpert)

router.get('/:id/previewItems', xpertController.getPreviewItemsForXpert)

router.get('/:id', xpertController.getXpert)

router.post('/:xpertId/instaItems', chechAuth, xpertController.appendNewInstaItemToAnXpert)

router.patch('/:xpertId', chechAuth, xpertController.updateXpert)

router.delete('/:xpertId', chechAuth, xpertController.deleteXpert)


module.exports = router