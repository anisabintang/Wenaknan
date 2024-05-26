const favorite = require('../models/favoriteModel');

const favoriteController = {
    getAllFavorites: async (req, res) => {
        try {
            const favorites = await favorite.findAll();
            res.status(200).json(favorites);
        } catch (error) {
            console.error('Error getting all favorites', error);
            res.status(500).json({ error: error.message });
        }
    },

    addFavorite: async (req, res) => {
        try {
            const { user_id, restaurant_id } = req.body;
            const newFavorite = await favorite.create({
                user_id,
                restaurant_id
            });
            res.status(201).json(newFavorite);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteFavorite: async (req, res) => {
        try {
            const { user_id, restaurant_id } = req.body;
            const deleted = await favorite.destroy({
                where: {
                    user_id: user_id,
                    restaurant_id: restaurant_id
                }
            });
            if (deleted) {
                res.status(204).json({ message: 'Favorite deleted' });
            } else {
                res.status(404).json({ message: 'Favorite not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = favoriteController;