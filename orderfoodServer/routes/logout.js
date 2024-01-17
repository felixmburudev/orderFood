const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    // Clear auth cookie
    res.clearCookie('authCookie', { httpOnly: true });
  console.log("Logout successful")
    res.json({ message: 'Logout successful' });
  })
  module.exports = router;