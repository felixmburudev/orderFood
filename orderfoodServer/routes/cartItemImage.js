const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.post('/image', (req, res) => {
    // const item_id = req.params.imgId
    const{item}=req.body
    db.query('SELECT image FROM food WHERE item_id = ?', [item.item_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
      } else {
        if (results.length > 0) {
          const imageBuffer = `data:img/jpeg;base64,${results[0].image.toString('base64')}`; // Get the BLOB data
          res.end(imageBuffer);
        } else {
          res.status(404).send('Image not found');
        }
      }
    });
  });
  module.exports = router;