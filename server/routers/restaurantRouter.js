const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const upload = require('../middleware/multerConfig');

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);

// Get all restaurants with favorite status
router.get('/status', restaurantController.getAllRestaurantsStatus);

// Get a restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);

// Get a restaurant by ID with favorite status
router.get('/status/:id', restaurantController.getRestaurantByIdStatus);

// Add a new restaurant
router.post('/add', upload.single('file'), restaurantController.addRestaurant);

// Delete a restaurant
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;