const express = require('express')
const app     = express();
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const xpertRoutes = require('./api/routes/xperts')
const instaRoutes = require('./api/routes/instaItems')


const url = 'mongodb://'+ process.env.MONGOOSE_USERNAME +':' + process.env.MONGOOSE_PASS + '@bx-shard-00-00-gciej.mongodb.net:27017,bx-shard-00-01-gciej.mongodb.net:27017,bx-shard-00-02-gciej.mongodb.net:27017/test?ssl=true&replicaSet=BX-shard-0&authSource=admin'

mongoose.connect(url, {})
mongoose.Promise = global.Promise;

// Middlewares

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routes Mapping

app.use('/api/xperts', xpertRoutes)
app.use('/api/instaItems', instaRoutes)



// Error Handling 

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next ) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app