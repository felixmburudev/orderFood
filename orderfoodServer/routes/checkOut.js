const express = require('express');
const checkAuth = require('../controllers/authController');
const db = require('../models/db');
const router = express.Router();

router.post('/checkOut', checkAuth, async function(req, res) {
    console.log('DL')
    const userEmail = req.user.userEmail;
    const cost = req.body.cost;
    try {
        await db.promise().beginTransaction();
        await db.promise().query('INSERT INTO order_history (user_email, order_cost) VALUES(?, ?)', [userEmail, cost]);
        await db.promise().query('DELETE FROM cart WHERE email = ?', [userEmail]);
        await db.promise().commit();
        console.log('success')
        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
