const controllers = {}
const models = require('./doctor.models')
const response = require('../../utils/responses')
const multer = require('multer')
const formData = multer().none()

controllers.AddDoctor = async (req, res)=>{
    try {
        formData(req, res, async (err)=>{
            if (err) {
                return response(res, 500, err)
            }

            const user = req.userData
            if (!user) {
                return response(res, 401, {message: 'You need to login first!'})
            }

            const queries = {
                doctor_name: req.body.doctor_name,
                specialization: req.body.specialization,
                mobile_phone: req.body.mobile_phone
            }

            const doctorExists = await models.DoctorExists(queries)
            if (!req.body.doctor_name) {
                return response(res, 400, {message: 'Doctor name cannot be empty'})
            } else if (!req.body.specialization) {
                return response(res, 400, {message: 'Specialization cannot be empty'})
            } else if (!req.body.mobile_phone) {
                return response(res, 400, {message: 'Mobile phone cannot be empty'})
            } else if (doctorExists.length >= 1) {
                return response(res, 400, {message: 'Doctor data already exists'})
            }

            const result = await models.AddDoctor(queries)

            return response(res, 200, {
                message: 'Doctor added',
                result: result
            })
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.UpdateData = async (req, res)=>{
    try {
        formData(req, res, async (err)=>{
            if (err) {
                return response(res, 500, err)
            }

            const user = req.userData
            if (!user) {
                return response(res, 401, {message: 'You need to login first'})
            }

            const queries = {
                doctor_name: req.body.doctor_name,
                specialization: req.body.specialization,
                mobile_phone: req.body.mobile_phone,
                dr_id: req.params.dr_id
            }

            const dataExists = await models.GetDoctorByID(queries)
            const nameCheck = await models.DoctorExists(queries)
            if (dataExists.length <= 0) {
                return response(res, 404, {message: 'Data not found'})
            } else if (nameCheck.length >= 1) {
                return response(res, 400, {message: 'Data already exists'})
            }

            const result = await models.UpdateData(queries)

            return response(res, 200, {
                message: 'Data updated',
                result: result
            })
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.DeleteData = async (req, res)=>{
    try {
        const dr_id = req.params.dr_id
        const user = req.userData
        if (!user) {
            return response(res, 401, {message: 'You need to login first!'})
        }

        const dataExists = await models.GetDoctorByID({dr_id})
        if (dataExists.length <= 0) {
            return response(res, 404, {message: 'Data not found'})
        }

        await models.DeleteData({dr_id})

        return response(res, 200, {
            message: 'Data has been deleted',
            data: dataExists
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetAllDoctors = async (req, res)=>{
    try {
        const {page, limit} = req.query
        const pagination = page ? parseInt(page) : 1
        const limitation = limit ? parseInt(limit) : 5
        const offset = pagination === 1 ? 0 : limitation * (pagination - 1)
        const totalDoctors = await models.GetTotalDoctors()

        const result = await models.GetAllDoctors({limit: limitation, offset})

        const totalPages = Math.ceil(totalDoctors / limitation)

        return response(res, 200, {
            result: result,
            totalRows: totalDoctors,
            totalPages: totalPages
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetDoctorByID = async (req, res)=>{
    try {
        const dr_id = req.params.dr_id
        const result = await models.GetDoctorByID({dr_id})
        if (result.length <= 0) {
            return response(res, 404, {message: 'Data not found'})
        }

        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetDoctorBySpecialization = async (req, res)=>{
    try {
        const specialization = req.query.specialization
        const result = await models.GetDoctorBySpecialization({specialization: specialization})
        if (result.length <= 0) {
            return response(res, 404, {message: 'Data not found'})
        }

        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

module.exports = controllers