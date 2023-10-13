'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id BIGSERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        mobile_phone VARCHAR,
        address TEXT,
        role VARCHAR DEFAULT 'user',
        refresh_token VARCHAR,
        token_verify VARCHAR,
        token_expire TIMESTAMP,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS doctors (
        dr_id BIGSERIAL PRIMARY KEY,
        doctor_name VARCHAR NOT NULL,
        specialization VARCHAR NOT NULL,
        mobile_phone VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS dr_schedules (
        schedule_id BIGSERIAL PRIMARY KEY,
        dr_id INTEGER NOT NULL,
        day VARCHAR NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        capacity INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_doctors
          FOREIGN KEY(dr_id)
            REFERENCES doctors(dr_id)
            ON DELETE CASCADE
      )
    `)

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        reserve_id BIGSERIAL PRIMARY KEY,
        queue_number INTEGER,
        user_id INTEGER NOT NULL,
        dr_id INTEGER NOT NULL,
        schedule_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_users
          FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_doctors
          FOREIGN KEY(dr_id)
            REFERENCES doctors(dr_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_dr_schedules
          FOREIGN KEY(schedule_id)
            REFERENCES dr_schedules(schedule_id)
            ON DELETE CASCADE
      )
    `)

    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS blacklist_token (
        blacklist_id BIGSERIAL PRIMARY KEY,
        blacklist_token VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
  },
  
  async down(queryInterface) {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS reservations`)
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS dr_schedules`)
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS doctors`)
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS users`)
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS blacklist_token`)
  }
};