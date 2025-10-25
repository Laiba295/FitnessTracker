const db = require('../config/db'); // correct path

exports.getAll = (callback) => {
    db.query('SELECT * FROM workouts', callback);
};

exports.create = (name, duration, calories, callback) => {
    db.query('INSERT INTO workouts (name, duration, calories) VALUES (?, ?, ?)', [name, duration, calories], callback);
};

exports.update = (id, name, duration, calories, callback) => {
    db.query('UPDATE workouts SET name=?, duration=?, calories=? WHERE id=?', [name, duration, calories, id], callback);
};

exports.delete = (id, callback) => {
    db.query('DELETE FROM workouts WHERE id=?', [id], callback);
};
