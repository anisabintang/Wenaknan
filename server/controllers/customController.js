const category = require('../models/categoryModel');
const restaurant = require('../models/restaurantModel');
const favorite = require('../models/favoriteModel');
const sequelize = require('../config/db');
const axios = require('axios');


const customController = {
    getRecommendation: async (req, res) => {
        const userId = req.query.userId;
        console.log('userId', userId)

        try {
            // Fetch all restaurants with their categories
            const restaurants = await sequelize.query(
                `SELECT 
                    r.restaurant_id,
                    r.restaurant_name,
                    c.category_name as category
                FROM 
                    restaurant r
                LEFT JOIN 
                    category c
                ON 
                    r.category_id = c.category_id`,
                {
                    type: sequelize.QueryTypes.SELECT
                }
            );

            // Fetch the liked restaurants for the given userId
            const likedRestaurants = await favorite.findAll({
                where: { user_id: userId },
                attributes: ['restaurant_id']
            });

            // Extract liked restaurant IDs
            const likedRestaurantIds = likedRestaurants.map(favorite => favorite.restaurant_id);
            
            // Prepare the response data
            const DataInput = {
                restaurants,
                liked_restaurant_ids: likedRestaurantIds
            };

            // Make a POST request to http://localhost:8000/process_data with the response as the body
            const processedDataInput = await axios.post('http://localhost:8000/process_data', DataInput);
            

            const restaurantIds = processedDataInput.data.map(restaurant => restaurant.restaurant_id);

            const restaurantsStatus = await axios.get('http://localhost:8080/restaurant/status/', {
                params: {
                    user_id: userId // Replace with the actual active user ID
                }
            });

            const filteredRestaurants = restaurantsStatus.data.filter(restaurant => restaurantIds.includes(restaurant.restaurant_id));

            // Send the response from http://localhost:8000/process_data as the response of this function
            res.status(200).json(filteredRestaurants);
        } catch (error) {
            console.error('Error getting recommendation', error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = customController;