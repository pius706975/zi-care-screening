const express = require('express')
const scheduleRouters = express.Router()
const ctrl = require('./schedule.controllers')
const {Authentication, IsAdmin, IsUser} = require('../../middleware/middle.auth')

scheduleRouters.post('', Authentication, IsAdmin, ctrl.AddSchedule)

scheduleRouters.get('', ctrl.GetAllSchedules)
scheduleRouters.get('/specialization', ctrl.GetScheduleBySpecialization)

module.exports = scheduleRouters