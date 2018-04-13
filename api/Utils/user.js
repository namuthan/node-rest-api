const mongoose = require('mongoose')
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.newUser = function (req, hashedPassword) {
    return new User({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    })
}

exports.hashedPassword = function (password) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}

exports.comparePass = function (plainPassword, hashedPassword) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

exports.createToken = function (user) {

    return new Promise(function (resolve, reject) {
        jwt.sign(
            {
                email: user.email,
                userId: user._Id
            },
            process.env.JWT_KEY,
            {
                expiresIn: '1h'
            },
            function(err, token) {
                if(err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            }
        )
    })

}

