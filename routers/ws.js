var express = require('express');
var router = express.Router();
// var User = require('../models/User');

router.get('/',function(req,res,next){

 res.render('ws',{
         userInfo : req.userInfo,
     });
    //  console.log(req.userInfo);
    // next();
})

module.exports = router;