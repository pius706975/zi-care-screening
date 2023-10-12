const models = {}
const db = require('../../../database/db_config/db.config')

models.Register = ({name, email, password, role, token_verify, token_expire, is_verified})=>{

    return new Promise((resolve, reject)=>{

        db.query(`
        SELECT * FROM users 
        WHERE email ILIKE $1`, 
        [`%${email}%`])
        .then((res)=>{
            if (res.rowCount > 0) {
                reject(new Error('Email already exists'))
            } else {
                db.query(`
                    INSERT INTO users (name, email, password, role, token_verify, token_expire, is_verified) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) 
                    RETURNING *`, 
                    [name, email, password, role, token_verify, token_expire, is_verified])
                .then((res)=>{
                    resolve(res.rows)
                }).catch((err)=>{
                    reject(err)
                })
            }
        })
    })
}

models.Login = ({email})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM users
            WHERE email = $1`,
            [email])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.TokenVerify = ({token_verify})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM users
            WHERE token_verify = $1`,
            [token_verify])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.VerifyEmail = ({is_verified, name})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            UPDATE users SET is_verified = $1 
            WHERE name = $2 
            RETURNING email, name`, 
            [is_verified, name])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.ResendVerification = ({token_verify, token_expire, email})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            UPDATE users 
            SET token_verify = $1, token_expire = $2 
            WHERE email = $3 
            RETURNING email, name, token_verify`, 
            [token_verify, token_expire, email])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.RefreshToken = ({refresh_token, email})=>{
    
    return new Promise((resolve, reject)=>{
        db.query(`
            UPDATE users 
            SET refresh_token = $1 
            WHERE email = $2 
            RETURNING *`, 
            [refresh_token, email])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.RefreshTokenCheck = ({refresh_token})=>{
    
    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM users 
            WHERE refresh_token = $1`, 
            [refresh_token])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.AddBlacklist = ({blacklist_token})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            INSERT INTO blacklist_token (blacklist_token) 
            VALUES ($1)`, 
            [blacklist_token])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.BlacklistCheck = ({blacklist_token})=>{

    return new Promise((resolve, reject)=>{
        db.query(`
            SELECT * FROM blacklist_token 
            WHERE blacklist_token = $1`, 
            [blacklist_token])
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

models.autoRemoveBlacklistToken = ()=>{
    
    return new Promise((resolve, reject)=>{
        db.query(`
            DELETE FROM blacklist_token 
            WHERE created_at < now() - INTERVAL '3 hours'`)
        .then((res)=>{
            resolve(res.rows)
        }).catch((err)=>{
            reject(err)
        })
    })
}

module.exports = models