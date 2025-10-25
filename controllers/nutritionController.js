const Nutrition = require('../models/nutritionModel');

exports.getAllNutrition = (req, res) => {
    Nutrition.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createNutrition = (req, res) => {
    const { item, calories, protein } = req.body;
    Nutrition.create(item, calories, protein, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Nutrition item added!', id: result.insertId });
    });
};

exports.updateNutrition = (req, res) => {
    const { id } = req.params;
    const { item, calories, protein } = req.body;
    Nutrition.update(id, item, calories, protein, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Nutrition updated!' });
    });
};

exports.deleteNutrition = (req, res) => {
    const { id } = req.params;
    Nutrition.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Nutrition deleted!' });
    });
};
