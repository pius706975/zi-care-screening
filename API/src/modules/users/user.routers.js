const express = require('express')
const userRouters = express.Router()
const ctrl = require('./user.controllers')
const {Authentication} = require('../../middleware/middle.auth')

userRouters.put('/edit-profile', Authentication, ctrl.UpdateUser)
userRouters.put('/edit-password', Authentication, ctrl.UpdatePassword)

userRouters.get('/profile', Authentication, ctrl.GetProfile)

module.exports = userRouters