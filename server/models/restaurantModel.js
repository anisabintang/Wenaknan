const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const category = require('./categoryModel');


const restaurant = sequelize.define('restaurant', {
    restaurant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    restaurant_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restaurant_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restaurant_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: category,
            key: 'category_id',
          },
        allowNull: false,
    },
    restaurant_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    restaurant_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    restaurant_photo_path: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'restaurant',
    timestamps: false,
});

restaurant.belongsTo(category, { foreignKey: 'category_id' });

module.exports = restaurant;