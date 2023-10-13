const express = require('express')
const authRouters = require('../modules/users/auth/auth.routers')
const userRouters = require('../modules/users/user.routers')
const doctorRouters = require('../modules/doctors/doctor.routers')
const scheduleRouters = require('../modules/doctor_schedules/schedule.routers')
const reservationRouters = require('../modules/reservations/reserve.routers')
const router = express.Router()

router.use('/auth', authRouters)
router.use('/user', userRouters)
router.use('/doctor', doctorRouters)
router.use('/schedule', scheduleRouters)
router.use('/reservation', reservationRouters)

module.exports = router