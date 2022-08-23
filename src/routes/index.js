var express = require('express');
var router = express.Router();
let { connectDB } = require("./../helper/connect")

/* GET home page. */
router.get('/', function (req, res, next) {
  connectDB().then(client => {
  console.log("hihi")

    client.collection("users").find({}).toArray( (err, result) => {
      console.log(result)
      res.status(200).json({
        message: "Hello Stupid!",
        result: result
      })
    })

  }).catch(next)


});



module.exports = router;
