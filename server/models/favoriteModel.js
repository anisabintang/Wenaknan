const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const restaurant = require('./restaurantModel');
const user = require('./userModel');

const favorite = sequelize.define('favorite', {
    favorite_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user, // Adjust if you have a different model for User
            key: 'user_id',
          },
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: restaurant,
            key: 'restaurant_id'
          },
    },
}, {
    tableName: 'favorite',
    timestamps: false,
});

favorite.belongsTo(restaurant, { foreignKey: 'restaurant_id' });
favorite.belongsTo(user, { foreignKey: 'user_id' });

module.exports = favorite;