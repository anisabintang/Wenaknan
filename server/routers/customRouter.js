const express = require('express');
const router = express.Router();
const customController = require('../controllers/customController');

// Get all categories
router.get('/recommend', customController.getRecommendation);

module.exports = router;