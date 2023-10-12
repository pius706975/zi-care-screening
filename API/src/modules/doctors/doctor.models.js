const models = {}
const db = require('../../database/db_config/db.config')

models.AddDoctor = ({name, specialization, mobile_phone})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM doctors 
            WHERE name ILIKE $1`,
            [`%${name}%`])
        .then((res)=>{
            if (res.rowCount > 0) {
                reject(new Error('Doctor data already exists'))
            } else {
                db.query(`
                    INSERT INTO doctors (name, specialization, mobile_phone)
                    VALUES ($1, $2, $3)
                    RETURNING *`,
                    [name, specialization, mobile_phone])
                .then((res)=>{
                    resolve(res.rows)
                }).catch((err)=>{
                    reject(err)
                })
            }
        })
    })
}

models.UpdateData = ({name, specialization, mobile_phone, dr_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            UPDATE doctors
            SET name = COALESCE($1, name),
                specialization = COALESCE($2, specialization),
                mobile_phone = COALESCE($3, mobile_phone)
            WHERE dr_id = $4
            RETURNING *`,
            [name, specialization, mobile_phone, dr_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })      
    })
}

models.DeleteData = ({dr_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            DELETE FROM doctors
            WHERE dr_id = $1`,
            [dr_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.DoctorExists = ({name})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM doctors   
            WHERE name ILIKE $1`,
            [`%${name}%`])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetAllDoctors = ({limit, offset})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM doctors
            ORDER BY created_at DESC
            LIMIT $1 OFFSET $2`, 
            [limit, offset])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetDoctorByID = ({dr_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM doctors
            WHERE dr_id = $1`,
            [dr_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetDoctorBySpecialization = ({specialization})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM doctors
            WHERE specialization ILIKE $1
            ORDER BY name ASC`,
            [`%${specialization}%`])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetTotalDoctors = ()=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT COUNT(*) FROM doctors`)
        .then((res)=>{
            resolve(res.rows[0].count)
        }).catch((err)=>{
            reject(err)
        })
    })
}


module.exports = models