const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Booking = sequelize.define("booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    buyerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Booking;