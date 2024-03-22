const express = require('express');
const router = express.Router();
const db = require('../models/db');
const checkAuth = require('../controllers/authController');

router.get('/userOrders', checkAuth, async (req, res) => {
  try {
    const userEmail = req.user.userEmail;
    console.log(userEmail+ "jdjdjdj");
    const [orderHistoryRows, orderHistoryFields] = await db.promise().query('SELECT * FROM order_history WHERE user_email = ?', [userEmail]);
    const orderHistory = orderHistoryRows;
       console.log(JSON.stringify(orderHistory));
    res.status(200).json({ orderHistory });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
