const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('event-ticket', process.env.DB_USER, process.env.DB_PASSWORD, { dialect: 'mysql', host: 'localhost'})

module.exports = sequelize;

