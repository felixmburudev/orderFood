const express = require('express')
const db = require('../models/db')
// Middleware to check authentication
const checkAuth = (req, res, next) => {
  const authCookie = req.cookies.authCookie

  if (!authCookie) {
    return res.status(401).json({ message: 'Access denied' })
  }

  const userEmail = authCookie
  req.user = { userEmail }

  next()
}
module.exports = checkAuth