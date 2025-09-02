const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || process.env.MYSQLDATABASE || 'event-ticket';
const DB_USER = process.env.DB_USER || process.env.MYSQLUSER || 'root';
const DB_PASS = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '';
const DB_HOST = process.env.DB_HOST || process.env.MYSQLHOST || '127.0.0.1';
const DB_PORT = parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306', 10);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
