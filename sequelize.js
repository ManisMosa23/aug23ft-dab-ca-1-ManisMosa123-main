const Sequelize = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('adoptiondb', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
