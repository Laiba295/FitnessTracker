const db = require('../config/db');

exports.getAll = (callback) => {
    db.query('SELECT * FROM nutrition', callback);
};

exports.create = (item, calories, protein, callback) => {
    const sql = 'INSERT INTO nutrition (item, calories, protein) VALUES (?, ?, ?)';
    db.query(sql, [item, calories, protein], callback);
};

exports.update = (id, item, calories, protein, callback) => {
    const sql = 'UPDATE nutrition SET item=?, calories=?, protein=? WHERE id=?';
    db.query(sql, [item, calories, protein, id], callback);
};

exports.delete = (id, callback) => {
    const sql = 'DELETE FROM nutrition WHERE id=?';
    db.query(sql, [id], callback);
};
