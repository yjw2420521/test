var express = require('express');
var router = express.Router();
var Goods = require('../models/Goods');
var Car = require('../models/Car');
var Comment = require('../models/Comment');
var responseData;
router.use(function(req,res,next){
    responseData={
             code:0,
             message: ''
    }
    next();
});

// router.post('/goods/tejia',function(req,res,next){
         
//          var gid = req.body.gid;
//          console.log(gid);
//          Goods.findOne({
//              gid : gid
//          }).then(function(goodsInfo){
//             // console.log(goodsInfo);
//             res.json(goodsInfo);    
//          })

// })
//加入购物车
router.post('/goods/tianjia',function(req,res,next){
        
         var gname = req.body.gname;
         var gnum = req.body.gnum;
         var gusername = req.userInfo.username;
         var gprice = req.body.gprice;
         console.log('-------加入购物车的商品信息--------')
         console.log(gname);
         console.log(gnum);
         console.log(gusername);
         console.log(gprice);
         Car.findOne({
             username : gusername,
             gname : gname
         }).then(function(carInfo){  
             if(carInfo){
               responseData.code = 4;
               responseData.message = '您已经添加过这个商品';
               console.log(responseData);
               res.json(responseData);
               return;
             }
             var car = new Car({
                 username : gusername,
                 gname : gname,
                 price : gprice,
                 num : gnum,
             });
             return car.save();
         }).then(function(newCarInfo){
           console.log(newCarInfo)
           responseData.code = 3;
           responseData.message = '您已成功加入购物车';
           res.json(responseData);
          });
})


router.get('/',function(req,res,next){
    var gid = req.query.gid;
    Goods.findOne({
        gid : gid 
    }).then(function(goodsInfo){ 
        Comment.find({
              gid : gid,
          }).then(function(CommentInfo){
              console.log("----数据库获取的tupian信息");
              console.log(goodsInfo);
              console.log("----数据库获取的评论信息");
              console.log(CommentInfo);
              res.render('main/goods',{
              userInfo : req.userInfo,
              goodsInfo: goodsInfo,
              commentInfo : CommentInfo
             });
          }) ;
    });
});
module.exports = router;