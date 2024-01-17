const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.put('/cart/update',  (req, res)=>{
    const userEmail = req.user.userEmail;
    const {item_id, updatedQuantity} = req.body
    const query ='UPDATE cart SET quantity = ? WHERE email =? AND item_id = ?'
    db.query(query,[updatedQuantity, userEmail, item_id],(error, results)=>{
        if(error){
            console.log('error while updating, ' + error)
        }
        else{
            console.log('item updated')
            res.status(200)
        }
    })
})

module.exports = router;