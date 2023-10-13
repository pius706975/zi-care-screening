const controllers = {}
const models = require('./reserve.models')
const response = require('../../utils/responses')
const scheduleModels = require('../doctor_schedules/schedule.models')
const doctorModels = require('../doctors/doctor.models')

controllers.AddReservation = async (req, res) => {
    try {
        const user = req.userData
        if (!user) {
            return response(res, 401, { message: 'You need to login first' })
        }

        const schedule_id = req.body.schedule_id
        const scheduleExists = await scheduleModels.GetScheduleByID({ schedule_id })
        if (scheduleExists.length <= 0) {
            return response(res, 404, { message: 'Schedule is not available' })
        }

        const dr_id = req.body.dr_id
        const doctorExists = await doctorModels.GetDoctorByID({ dr_id })
        if (doctorExists.length <= 0) {
            return response(res, 404, { message: 'Doctor does not exists' })
        }


        const getScheduleCapacity = await scheduleModels.GetScheduleCapacity({schedule_id})
        const getAvailableCapacity = getScheduleCapacity[0].capacity

        const getLastQueueNumber = await models.GetLastQueueNumber({schedule_id})
        const lastQueueNumber = (getLastQueueNumber.length > 0) ? getLastQueueNumber[0].queue_number : 0

        if (lastQueueNumber >= getAvailableCapacity) {
            return response(res, 400, {message: 'The queue is full'})
        }

        const queue_number = lastQueueNumber + 1

        const queries = {
            queue_number: queue_number,
            user_id: user.user_id,
            dr_id: dr_id,
            schedule_id: schedule_id,
        }

        const result = await models.AddReservation(queries)

        return response(res, 200, {
            message: 'Reservation created',
            result: result
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetAllReservations = async (req, res)=>{
    try {
        const result = await models.GetAllReservations()
        if (result.length <= 0) {
            return response(res, 404, {message: 'Reservation data not found'})
        }

        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

module.exports = controllers