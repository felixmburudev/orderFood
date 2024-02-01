const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.post('/login', (req, res) => {
    const { email, password } = req.body
  
    db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (err, results) => {
        if (err) {
          console.error('MySQL error:', err)
          return res.status(500).json({ message: 'Internal server error' })
        }
  
        if (results.length === 0) {
          return res.status(401).json({ message: 'Invalid credentials' })
        }
  
        // Set a cookie
        const userEmail = results[0].email
        res.cookie('authCookie', userEmail, )
        res.json({ message: 'Login successful' })
      }
    )
  })
  module.exports = router;