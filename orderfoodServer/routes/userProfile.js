const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.get('/user-profile', (req, res) => {
    const userEmail = req.user.userEmail;
    db.query('SELECT * FROM users WHERE email = ?', [userEmail], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = results[0];
      res.json({ user });
    });
  });

  module.exports = router;