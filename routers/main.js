var express = require('express');
var router = express.Router();
var Goods = require('../models/Goods');

router.get('/',function(req,res,next){
    
    //  console.log(req.userInfo);

     res.render('lianxi',{
         userInfo : req.userInfo,
     });
})
router.post('/',function(req,res,next){
    var name = req.body.name.toString();
    //  console.log(req.userInfo);
     console.log(typeof name);
     Goods.find({
         name : name
     }).then(function(goodsInfo){
        console.log(name);
         console.log(goodsInfo);
       if(!goodsInfo){
         res.render('main/sousuo_index.html',{
         userInfo : req.userInfo,
         message: "对不起没有找到相关的商品"
               });
       }
        res.render('main/sousuo_index.html',{
         userInfo : req.userInfo,
         goodsInfo : goodsInfo
     })
})

})


module.exports = router;