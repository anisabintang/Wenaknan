const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const category = sequelize.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'category',
    timestamps: false,
});

module.exports = category;