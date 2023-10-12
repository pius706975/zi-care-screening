const models = {}
const db = require('../../database/db_config/db.config')

models.UpdateProfile = ({name, email, mobile_phone, address})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            UPDATE users 
            SET name = COALESCE($1, name), 
                email = COALESCE($2, email),
                mobile_phone = COALESCE($3, mobile_phone),
                address = COALESCE($4, address)
            WHERE email = $2 
            RETURNING name, email, mobile_phone, address, created_at, updated_at`, 
            [name, email, mobile_phone, address])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.UpdatePassword = ({password, email})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            UPDATE users 
            SET password = COALESCE($1, password)
            WHERE email = $2`, 
            [password, email])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetProfile = ({user_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT name, email, password, created_at, updated_at 
            FROM users 
            WHERE user_id = $1`, 
            [user_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
} 

module.exports = models