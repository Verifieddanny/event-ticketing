const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || process.env.MYSQLDATABASE || 'event-ticket';
const DB_USER = process.env.DB_USER || process.env.MYSQLUSER || 'root';
const DB_PASS = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '';
const DB_HOST = process.env.DB_HOST || process.env.MYSQLHOST || '127.0.0.1';
const DB_PORT = parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306', 10);


const DATABASE_URL = process.env.DATABASE_URL;

const common = { dialect: 'mysql', logging: false };

const sequelize = DATABASE_URL 
    ? new Sequelize(DATABASE_URL, common)
    : new Sequelize(DB_NAME, DB_USER, DB_PASS, { ...common, host: DB_HOST, port: DB_PORT });

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { dialect: 'mysql', host: 'localhost'})

module.exports = sequelize;

