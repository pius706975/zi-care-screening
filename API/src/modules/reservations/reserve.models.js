const models = {}
const { get } = require('http')
const db = require('../../database/db_config/db.config')

models.AddReservation = ({user_id, dr_id, schedule_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            INSERT INTO reservations (user_id, dr_id, schedule_id)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [user_id, dr_id, schedule_id])
        .then((res)=>{
            console.log(res.rows)
            resolve(res.rows)
        }).catch((err)=>{
            console.log(err)
            reject(err)
        })
    })
}

models.GetLastQueueNumber = ({schedule_id})=>{

    return new Promise((resolve ,reject)=>{
        db.query(`
            SELECT queue_number FROM reservations
            WHERE schedule_id = $1
            ORDER BY queue_number DESC
            LIMIT 1`,
            [schedule_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetAllReservations = ()=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT 
                reservations.reserve_id,
                reservations.queue_number,
                users.name as patient_name,
                doctors.doctor_name as doctor, 
                doctors.specialization,
                dr_schedules.day,
                dr_schedules.start_time as schedule,
                reservations.created_at,
                reservations.updated_at
            FROM reservations 
            JOIN users USING (user_id)
            JOIN doctors USING (dr_id)
            JOIN dr_schedules USING (schedule_id)
            ORDER BY reservations.created_at DESC`)
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err) 
        })
    })
}

module.exports = models