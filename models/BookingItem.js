const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const BookingItem = sequelize.define("bookingItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = BookingItem