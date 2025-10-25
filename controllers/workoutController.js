// const Workout = require('../models/workoutModel');

// exports.getAllWorkouts = (req, res) => Workout.getAll((err, results) => err ? res.status(500).json({ error: err.message }) : res.json(results));
// exports.createWorkout = (req, res) => {
//   const { name, duration, calories } = req.body;
//   Workout.create(name, duration, calories, (err, result) => err ? res.status(500).json({ error: err.message }) : res.json({ message: 'Workout added!', id: result.insertId }));
// };
// exports.updateWorkout = (req, res) => {
//   const { id } = req.params;
//   const { name, duration, calories } = req.body;
//   Workout.update(id, name, duration, calories, (err, result) => err ? res.status(500).json({ error: err.message }) : res.json({ message: 'Workout updated!' }));
// };
// exports.deleteWorkout = (req, res) => {
//   const { id } = req.params;
//   Workout.delete(id, (err, result) => err ? res.status(500).json({ error: err.message }) : res.json({ message: 'Workout deleted!' }));
// };
