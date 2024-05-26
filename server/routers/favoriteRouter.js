const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

// Get all favorites
router.get('/', favoriteController.getAllFavorites);

// Add a new favorite
router.post('/add', favoriteController.addFavorite);

// Delete a favorite
router.delete('/', favoriteController.deleteFavorite);

module.exports = router;