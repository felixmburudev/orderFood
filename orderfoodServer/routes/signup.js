const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.post('/signup', (req, res) => {
    const { name, email, password, phone } = req.body;
  
    // Check if exist
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length > 0) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      // Insert a new user
      db.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?,?)', [name, email, password, phone], (err) => {
        if (err) {
          console.error('MySQL error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  });

  module.exports = router;