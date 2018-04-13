const express = require('express')
const router = express.Router()
const chechAuth = require('../middleware/checkAuth')
const instaItemController = require('../controllers/instaItems')


// Routes

router.get('/', instaItemController.getAllForCategory)

router.get('/:instaId', instaItemController.getOneWithId)

router.delete('/:instaId', chechAuth, instaItemController.deleteOneWithId)


module.exports = router;