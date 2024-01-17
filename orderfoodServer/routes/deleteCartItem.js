const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.put('/cart/delete',  (req, res)=>{
    const userEmail = req.user.userEmail;
    const {item_id} = req.body
    const deletQuery = 'DELETE FROM cart WHERE item_id = ? AND email = ?'
    db.query(deletQuery, [item_id, userEmail],(error, results)=>{
        if(error){console.log('error while deleting '+ error)}
        else{console.log("item deleted")}
    })
})
module.exports = router;