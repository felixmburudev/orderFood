const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.get('/items', (req, res)=>{
    const queryItems ='SELECT * FROM food'
    db.query(queryItems, (error, results)=>{
        if(error){ console.log('An error occurred while fetching items from db' + error)}
        else{
            const items =results.map(item =>({
                item_id: item.item_id,
                name: item.name,
                price: item.price,
                item_description: item.item_description,
                image:`data:image/jpeg;base64,${item.image.toString('base64')}`
            }))

            res.json(items)

        }
    })
})
module.exports = router;