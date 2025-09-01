const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Event = sequelize.define("event", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
})

module.exports = Event;