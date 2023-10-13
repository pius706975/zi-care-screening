const controllers = {}
const models = require('./schedule.models')
const response = require('../../utils/responses')

controllers.AddSchedule = async (req, res)=>{
    try {
        const user = req.userData
        if (!user) {
            return response(res, 401, {message: 'You need to login first'})
        }

        const queries = {
            dr_id: req.body.dr_id,
            day: req.body.day,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            capacity: req.body.capacity,
            schedule_id: req.params.schedule_id
        }

        const doctorExists = await models.GetDoctorExists(queries)
        const scheduleExists = await models.GetScheduleExists(queries)

        if (doctorExists <= 0) {
            return response(res, 404, {message: 'Doctor not found'})
        } else if (!req.body.dr_id) {
            return response(res, 400, {message: 'Doctor ID is required'})
        } else if (!req.body.day) {
            return response(res, 400, {message: 'Day is required'})
        } else if (!req.body.start_time) {
            return response(res, 400, {message: 'Start time is required'})
        } else if (!req.body.end_time) {
            return response(res, 400, {message: 'End time is required'})
        } else if (!req.body.capacity) {
            return response(res, 400, {message: 'Capacity is required'})
        } else if (scheduleExists.length >= 1) {
            return response(res, 400, {message: 'Schedule already exists'})
        }

        const result = await models.AddSchedule(queries)

        return response(res, 200, {
            message: 'Doctor schedule added',
            result: result
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.UpdateData = async (req, res)=>{
    try {
        const user = req.userData
        if (!user) {
            return response(res, 401, {message: 'You need to login first'})
        }

        const queries = {
            dr_id: req.body.dr_id,
            day: req.body.day,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            capacity: req.body.capacity,
            schedule_id: req.params.schedule_id
        }

        const scheduleExists = await models.GetScheduleByID(queries)
        if (scheduleExists.length <= 0) {
            return response(res, 404, {message: 'Data not found'})
        }

        if (req.body.dr_id) {
            const doctorExists = await models.GetDoctorExists(queries)
            if (doctorExists.length <= 0) {
                return response(res, 404, {message: 'Doctor not found'})
            }
        }

        const result = await models.UpdateData(queries)

        return response(res, 200, {
            message: 'Data updated',
            result: result

        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.DeleteData = async (req, res)=>{
    try {
        const schedule_id = req.params.schedule_id
        const user = req.userData
        if (!user) {
            return response(res, 401, {message: 'You need to login first'})
        }

        const dataExists = await models.GetScheduleByID({schedule_id})
        if (dataExists.length <= 0) {
            return response(res, 404, {message: 'Data not found'})
        }
        
        await models.DeleteData({schedule_id})

        return response(res, 200, {
            message: 'Schedule has been deleted',
            data: dataExists
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetAllSchedules = async (req, res)=>{
    try {
        const result = await models.GetAllSchedules()
        if (result.length <= 0) {
            return response(res, 404, {message: 'Schedule not found'})
        }

        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetScheduleBySpecialization = async (req, res)=>{
    try {
        const specialization = req.query.specialization

        const result = await models.GetScheduleBySpecialization({specialization: specialization})

        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetScheduleByID = async (req, res)=>{
    try {
        const schedule_id = req.params.schedule_id
        const result = await models.GetScheduleByID({schedule_id})
        if (result.length <= 0) {
            return response(res, 404, {message: 'Data not found'})
        }

        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetScheduleCapacity = async (req, res)=>{
    try {
        const schedule_id = req.params.schedule_id
        const result = await models.GetScheduleCapacity({schedule_id})
        const capacity = result[0].capacity
        if (capacity === 0) {
            return response(res, 404, {message: 'Reservation is not available'})
        }

        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

module.exports = controllers