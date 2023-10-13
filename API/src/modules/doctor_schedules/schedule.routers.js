const express = require('express')
const scheduleRouters = express.Router()
const ctrl = require('./schedule.controllers')
const {Authentication, IsAdmin, IsUser} = require('../../middleware/middle.auth')

scheduleRouters.post('', Authentication, IsAdmin, ctrl.AddSchedule)

scheduleRouters.put('/edit/:schedule_id', Authentication, IsAdmin, ctrl.UpdateData)

scheduleRouters.delete('/:schedule_id', Authentication, IsAdmin, ctrl.DeleteData)

scheduleRouters.get('', ctrl.GetAllSchedules)
scheduleRouters.get('/specialization', ctrl.GetScheduleBySpecialization)
scheduleRouters.get('/id=:schedule_id', ctrl.GetScheduleByID)
scheduleRouters.get('/capacity=:schedule_id', ctrl.GetScheduleCapacity)

module.exports = scheduleRouters