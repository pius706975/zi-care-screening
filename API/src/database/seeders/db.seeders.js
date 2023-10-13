'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '$2b$10$llEqHAoPff0AkU2j5Ikmk.1CfYUF6KTGPkZPTiSTE2F00zr68Vjeu', // password : User@7777
      mobile_phone: '082123459811',
      address: 'Goa Hantu Street',
      role: 'admin',
      is_verified: true
    },
    {
      name: 'Patient',
      email: 'user@gmail.com',
      password: '$2b$10$llEqHAoPff0AkU2j5Ikmk.1CfYUF6KTGPkZPTiSTE2F00zr68Vjeu', // password : User@7777
      mobile_phone: '082127896354',
      address: 'Krakatoa Street',
      role: 'user',
      is_verified: true
    }], {})
    
    await queryInterface.bulkInsert('doctors', [{
      dr_id: 1,
      doctor_name: 'Dr. Vina Mulyana',
      specialization: 'Family Doctor',
      mobile_phone: '082143569876'
    },
    
    {
      dr_id: 2,
      doctor_name: 'Dr. Silvania Tan, S.Kg',
      specialization: 'Dentist',
      mobile_phone: '087809236547'
    },
    
    {
      dr_id: 3,
      doctor_name: 'Dr. Steve Roger, S.Kg',
      specialization: 'Dentist',
      mobile_phone: '087809389347'
    }], {})

    await queryInterface.bulkInsert('dr_schedules', [{
      dr_id: 1,
      day: 'Wednesday',
      start_time: "10:00:00",
      end_time: "11:00:00",
      capacity: 3
    }, 
    
    {
      dr_id: 1,
      day: "Monday",
      start_time: "09:00:00",
      end_time: "10:30:00",
      capacity: 5
    }, 
    
    {
      dr_id: 1,
      day: "Friday",
      start_time: "08:00:00",
      end_time: "09:00:00",
      capacity: 3
    }, 
    
    {
      dr_id: 3,
      day: "Saturday",
      start_time: "08:00:00",
      end_time: "09:00:00",
      capacity: 2
    }, 
    
    {
      dr_id: 3,
      day: "Friday",
      start_time: "10:00:00",
      end_time: "11:00:00",
      capacity: 2
    }, 
    
    {
      dr_id: 3,
      day: "Tuesday",
      start_time: "09:00:00",
      end_time: "10:30:00",
      capacity: 4
    }, 
    
    {
      dr_id: 2,
      day: "Tuesday",
      start_time: "09:00:00",
      end_time: "10:30:00",
      capacity: 4
    }, 
    
    {
      dr_id: 3,
      day: "Wednesday",
      start_time: "09:00:00",
      end_time: "10:00:00",
      capacity: 2
    }, 
    
    {
      dr_id: 3,
      day: "Thursday",
      start_time: "08:00:00",
      end_time: "10:00:00",
      capacity: 5
    }], {})
  }
};
