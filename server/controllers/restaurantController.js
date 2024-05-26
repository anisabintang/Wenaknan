const restaurant = require('../models/restaurantModel');
const upload = require('../middleware/multerConfig');
const favorite = require('../models/favoriteModel');
const sequelize = require('../config/db');

const restaurantController = {
    getAllRestaurants: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 2;

            const offset = (page - 1) * pageSize;

            const restaurants = await restaurant.findAll({
                limit: pageSize,
                offset: offset
            });
            res.status(200).json(restaurants);
        } catch (error) {
            console.error('Error getting all restaurants', error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllRestaurantsStatus: async (req, res) => {
        const userId = req.query.user_id; // Get the active user ID from query parameters

        const query = `
                SELECT 
                    r.*, 
                    c.category_name as category,
                    CASE 
                        WHEN f.user_id IS NOT NULL THEN TRUE 
                        ELSE FALSE 
                    END AS is_liked
                FROM 
                    restaurant r
                LEFT JOIN 
                    favorite f
                    ON r.restaurant_id = f.restaurant_id AND f.user_id = :userId
                LEFT JOIN 
                    category c
                    ON r.category_id = c.category_id;
        `;

        try {
            const restaurants = await sequelize.query(query, {
                replacements: { userId: userId },
                type: sequelize.QueryTypes.SELECT
            });

            res.json(restaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            res.status(500).json({ error: 'An error occurred while fetching restaurants.' });
        }
    },

    getRestaurantByIdStatus: async (req, res) => {
        const userId = req.query.user_id; // Get the active user ID from query parameters
        const restaurantId = req.params.id;

        const query = `SELECT 
                r.*, 
                c.category_name as category,
                CASE 
                    WHEN f.user_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS is_liked
            FROM 
                restaurant r
            LEFT JOIN 
                favorite f
            ON 
                r.restaurant_id = f.restaurant_id AND f.user_id = :userId
            LEFT JOIN 
                category c
                ON r.category_id = c.category_id
            WHERE 
                r.restaurant_id = :restaurantId;
        `;

        try {
            const restaurants = await sequelize.query(query, {
                replacements: { userId: userId, restaurantId: restaurantId },
                type: sequelize.QueryTypes.SELECT
            });

            res.json(restaurants[0]);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            res.status(500).json({ error: 'An error occurred while fetching restaurants.' });
        }
    },

    getRestaurantById: async (req, res) => {
        try {
            const { id } = req.params;

            const foundRestaurant = await restaurant.findByPk(id);
            if (!foundRestaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }

            res.status(200).json(foundRestaurant);
        } catch (error) {
            console.error('Error getting restaurant by ID', error);
            res.status(500).json({ error: error.message });
        }
    },

    addRestaurant: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Please upload an image' });
            }

            const { restaurant_name, restaurant_location, restaurant_description, restaurant_rating, category_id, restaurant_address } = req.body;
            const restaurant_photo_path = req.file.path;

            const newRestaurant = await restaurant.create({
                restaurant_name,
                restaurant_location,
                restaurant_description,
                restaurant_rating,
                restaurant_photo_path,
                category_id,
                restaurant_address
            });
            res.status(201).json(newRestaurant);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteRestaurant: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await restaurant.destroy({
                where: {
                    restaurant_id: id
                }
            });
            if (deleted) {
                res.status(204).json({ message: 'Restaurant deleted' });
            } else {
                res.status(404).json({ message: 'Restaurant not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = restaurantController;