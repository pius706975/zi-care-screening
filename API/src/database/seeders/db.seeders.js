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
    }], {})
    
    await queryInterface.bulkInsert('doctors', [{
      dr_id: 1,
      name: 'Dr. Vina Mulyana',
      specialization: 'Family Doctor',
      mobile_phone: '082143569876'
    },
    
    {
      dr_id: 2,
      name: 'Dr. Silvania Tan, S.Kg',
      specialization: 'Dentist',
      mobile_phone: '087809236547'
    },
    
    {
      dr_id: 3,
      name: 'Dr. Steve Roger, S.Kg',
      specialization: 'Dentist',
      mobile_phone: '087809389347'
    }], {})
  }
};
