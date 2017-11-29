var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Orders = require('../models/Orders')
var Fankui = require('../models/Fankui')
router.get('/',function(req,res,next){
    Orders.find({
        username : req.userInfo.username
    }).then(function(orders){
        console.log("---------订单")
        console.log(orders);
        User.findOne({
            username : req.userInfo.username
        }).then(function(userInfo){
            console.log("-------userinfo");
            console.log(userInfo);
            res.render('gr',{
                    userInfo : userInfo,
                    orders : orders
                });
        })

    })
    //  console.log(req.userInfo);

})


module.exports = router;