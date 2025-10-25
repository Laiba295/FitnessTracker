const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// Correct path to db.js (agar db.js controllers me use ho raha hai)
const db = require('../config/db'); // ✅ is tarah se correct path likho

router.get('/', workoutController.getAllWorkouts);
router.post('/', workoutController.createWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router;
