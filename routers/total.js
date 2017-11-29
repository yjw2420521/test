var express = require('express');
var router = express.Router();
var Car = require('../models/Car');
router.use(function(req,res,next){
     if(req.userInfo.isAdmin){
          res.send('只有用户才能进入购物车');
          return;
     }
     next();
});
router.get('/',function(req,res,next){
    console.log(req.userInfo.username);
    Car.find({
        username: req.userInfo.username
    }).then(function(carInfo){
        console.log("------查询购物车的内容")
        console.log(carInfo);
     if(carInfo){
           res.render('total',{
           username : req.userInfo.username,
           carInfo : carInfo
     });
     }else{
         res.render('total');
     }
    })
    
})
router.get('/car/del',function(req,res){
    var username = req.query.username;
    var gname = req.query.gname;
    console.log(gname);
    Car.remove({
        username : username,
        gname : gname
    }).then(function(){
        res.render('success',{
            message : "恭喜你删除成功",
            url : '/total'
        });
    })
})

module.exports = router;