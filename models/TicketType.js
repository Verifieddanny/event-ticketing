const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const TicketType = sequelize.define("ticketType", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false  
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = TicketType;