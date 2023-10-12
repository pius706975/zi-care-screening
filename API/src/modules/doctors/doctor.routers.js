const express = require('express')
const doctorRouters = express.Router()
const ctrl = require('./doctor.controllers')
const {Authentication, IsAdmin} = require('../../middleware/middle.auth')

doctorRouters.post('', Authentication, IsAdmin, ctrl.AddDoctor)

doctorRouters.put('/edit/:dr_id', Authentication, IsAdmin, ctrl.UpdateData)

doctorRouters.delete('/:dr_id', Authentication, IsAdmin, ctrl.DeleteData)

doctorRouters.get('', ctrl.GetAllDoctors)
doctorRouters.get('/id=:dr_id', ctrl.GetDoctorByID)
doctorRouters.get('/specialization', ctrl.GetDoctorBySpecialization)

module.exports = doctorRouters