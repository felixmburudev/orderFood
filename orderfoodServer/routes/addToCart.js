const express = require('express');
const router = express.Router();
const db = require('../models/db')
const checkAuth = require('../controllers/authController');

router.post('/cart/add', checkAuth, (req, res)=>{  
    const userEmail = req.user.userEmail;
    const {name, item_id, price }= req.body
    const quantity = 1
    const cart_id = `${userEmail}`+`${item_id}`
    const query = "INSERT INTO cart (email, cart_id, item_id, name, price,quantity) VALUES(?,?,?,?,?,?)"
    db.query(query, [userEmail, cart_id, item_id, name,price,quantity], (error, results)=>{
        if(error){console.log("the cart insertion failed due to " + error)}
        else{
            console.log("cart insertion success")
            res.status(200)
        }
    })
})
module.exports = router;