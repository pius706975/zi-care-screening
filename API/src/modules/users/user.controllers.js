const controllers = {}
const models = require('./user.models')
const response = require('../../utils/responses')
const bcrypt = require('bcrypt')
const multer = require('multer')
const formData = multer().none()
const passwordStrong = require('../../utils/password.strength')

controllers.UpdateUser = async (req, res)=>{
    try {
        formData(req, res, async (err)=>{
            if (err) {
                return response(res, 500, err)
            }

            const user = req.userData
            await models.GetProfile({user_id: user.user_id})

            const queries = {
                name: req.body.name,
                email: user.email,
                mobile_phone: req.body.mobile_phone ? req.body.mobile_phone : user.mobile_phone,
                address: req.body.address ? req.body.address : user.address
            }

            const updatedProfile = await models.UpdateProfile(queries)

            return response(res, 200, {
                message: 'Profile updated',
                data: updatedProfile
            })
        })
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.UpdatePassword = async (req, res)=>{
    try {
        const saltRounds = 10
        const hassedPassword = await bcrypt.hashSync(req.body.password, saltRounds)

        if (!passwordStrong(req.body.password)) {
            return response(res, 400, {message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 symbol, and 1 number'})
        }

        const email = req.userData.email
        await models.UpdatePassword({password: hassedPassword, email})

        return response(res, 200, {message: 'Password updated'})
        
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}

controllers.GetProfile = async (req, res)=>{
    try {
        const user = req.userData
        const result = await models.GetProfile({user_id: user.user_id})
        return response(res, 200, result)
    } catch (error) {
        console.log(error)
        return response(res, 500, error.message)
    }
}


module.exports = controllers