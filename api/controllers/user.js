const User = require('../model/user')
const userUtils = require('../Utils/user')

exports.get_all = (req, res, next) => {
    User
        .find()
        .select('-__v -password')
        .exec()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}


exports.signup = (req, res, next) => {

    userUtils
        .hashedPassword(req.body.password)
        .then(hashedPassword => {
            return userUtils.newUser(req, hashedPassword).save()
        })
        .then(user => {
            res.status(201).json({
                message: 'Message created.',
                user: user
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.login = (req, res, next) => {
    let foundUser = null 

    User
        .findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            foundUser = user
            return userUtils.comparePass(req.body.password, user.password)
        })
        .then(isValidUser => {
            
            if (!isValidUser) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            return userUtils.createToken(foundUser)
        })
        .then( token => {
            return res.status(200).json({
                message: 'Auth Successful',
                token
            })
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
}