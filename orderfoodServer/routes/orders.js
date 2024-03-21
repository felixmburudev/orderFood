const express = require('express');
const router = express.Router();
const db = require('../models/db');
const checkAuth = require('../controllers/authController');

router.post('/orderHistory', checkAuth, async (req, res) => {
  try {
    const userEmail = req.user.userEmail;
    const orderHistory = await db.query('SELECT * FROM ordered_history WHERE user_email = ?', [userEmail]);
    res.status(200).json({ orderHistory });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
