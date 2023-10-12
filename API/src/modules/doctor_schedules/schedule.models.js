const models = {}
const db = require('../../database/db_config/db.config')

models.AddSchedule = ({dr_id, day, start_time, end_time, capacity})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            INSERT INTO dr_schedules (dr_id, day, start_time, end_time, capacity)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [dr_id, day, start_time, end_time, capacity])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.UpdateData = ({dr_id, day, start_time, end_time, capacity, schedule_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            UPDATE dr_schedules
            SET dr_id = COALESCE($1, dr_id),
                day = COALESCE($2, day),
                start_time = COALESCE($3, start_time),
                end_time = COALESCE($4, end_time),
                capacity = COALESCE($5, capacity)
            WHERE schedule_id = $6
            RETURNING *`,
            [dr_id, day, start_time, end_time, capacity, schedule_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.DeleteData = ({schedule_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            DELETE FROM dr_schedules 
            WHERE schedule_id = $1`,
            [schedule_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetAllSchedules = ()=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT schedule_id, name, specialization, day, start_time, end_time, mobile_phone FROM dr_schedules
            LEFT JOIN doctors USING (dr_id)
            ORDER BY 
                CASE 
                    WHEN LOWER(day) = 'monday' THEN 1
                    WHEN LOWER(day) = 'tuesday' THEN 2
                    WHEN LOWER(day) = 'wednesday' THEN 3
                    WHEN LOWER(day) = 'thursday' THEN 4
                    WHEN LOWER(day) = 'friday' THEN 5
                    WHEN LOWER(day) = 'saturday' THEN 6
                    ELSE 7
                END`)
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetScheduleBySpecialization = ({specialization})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT schedule_id, name, specialization, day, start_time, end_time, capacity, mobile_phone FROM dr_schedules
            LEFT JOIN doctors USING (dr_id)
            WHERE specialization ILIKE $1
            ORDER BY 
                CASE
                    WHEN LOWER(day) = 'monday' THEN 1
                    WHEN LOWER(day) = 'tuesday' THEN 2
                    WHEN LOWER(day) = 'wednesday' THEN 3
                    WHEN LOWER(day) = 'thursday' THEN 4
                    WHEN LOWER(day) = 'friday' THEN 5
                    WHEN LOWER(day) = 'saturday' THEN 6
                    ELSE 7
                END`,
            [`%${specialization}%`])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetScheduleByID = ({schedule_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT schedule_id, name, specialization, day, start_time, end_time, capacity, mobile_phone FROM dr_schedules
            LEFT JOIN doctors USING (dr_id)
            WHERE schedule_id = $1`,
            [schedule_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetDoctorExists = ({dr_id})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM dr_schedules 
            RIGHT JOIN doctors USING (dr_id)
            WHERE dr_id = $1`,
            [dr_id])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.GetScheduleExists = ({schedule_id, day, start_time})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM dr_schedules
            WHERE schedule_id = $1 AND day = $2 AND start_time = $3`,
            [schedule_id, day, start_time])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

module.exports = models