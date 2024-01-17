const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.get('/cart/user', (req, res)=>{
    const userEmail = req.user.userEmail;
      const query ='SELECT * FROM cart WHERE email = ?'
      db.query(query, userEmail, (error, results)=>{
          if(error){
              console.log("error retriving cartitems "+ error)
          } else{
              res.status(200).json(results)
          }
      })
      // res.status(200).json(items)
  })

  module.exports = router;