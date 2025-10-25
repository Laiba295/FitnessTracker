
const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // correct path

// Signup without hashing (plain password)
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  pool.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User registered (plain)!', id: result.insertId });
  });
});

// Login (compare plain password directly)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  pool.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    // Direct comparison without bcrypt
    if (password !== results[0].password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful!', user: results[0] });
  });
});

module.exports = router;
