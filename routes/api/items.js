const express = require('express');
// const router = express.Router();
const router = express();

// Item Model
const Item = require('../../models/Item');

router.get('/getF', (req, res) => {
  Data.find({})
    .then(data => {
      console.log(data);
      res.json(data)
    })
    .catch(err=>{
      console.log(err);
    })
})

module.exports = router;

