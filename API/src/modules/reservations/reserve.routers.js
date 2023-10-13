const express = require('express')
const reservationRouters = express.Router()
const ctrl = require('./reserve.controllers')
const {Authentication, IsUser, IsAdmin} = require('../../middleware/middle.auth')

reservationRouters.post('', Authentication, IsUser, ctrl.AddReservation)

reservationRouters.get('/', ctrl.GetAllReservations)

module.exports = reservationRouters