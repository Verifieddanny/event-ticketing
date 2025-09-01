require('dotenv').config();
const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('event-ticket', process.env.USERNAME, process.env.PASSWORD, { dialect: 'mysql', host: 'localhost'})

module.exports = sequelize;

