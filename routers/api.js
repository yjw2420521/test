var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Goods = require('../models/Goods');
var Orders = require('../models/Orders')
var Comment = require('../models/Comment');
var Fankui = require('../models/Fankui')

//同一返回格式
var responseData;
router.use(function(req,res,next){
    responseData={
             code:0,
             message: ''
    }
    next();
});
//注册逻辑
router.post('/user/submit',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //
    if(username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空！';
        res.json(responseData);
        return;
    }
    if(password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空！';
        res.json(responseData);
        return;
    }
    //两次输入的密码不一致
    if (password != repassword){
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    }

      User.findOne({
          username:username
      }).then(function(userInfo){
           if(userInfo){
               //数据库中有记录
               responseData.code =4;
               responseData.message = '用户名已经被注册';
               res.json(responseData);
               return;
           }
           var user = new User({
               username: username,
               password: password
           });
           return user.save();
      }).then(function(newUerInfo){
           console.log(newUerInfo)
           responseData.message = '注册成功';
           res.json(responseData);
      });
      
});


router.post('/user/denlu',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    if(username == '' || password == ''){
               responseData.code = 1;
               responseData.message = '用户名和密码不能为空';
               res.json(responseData);
               return;     
    }
    //查询数据库用户名
    User.findOne({
        username : username,
        password : password
    }).then(function(userInfo){
        console.log(userInfo)
        if(!userInfo){
           responseData.code = 2;
           responseData.message = '用户名和密码错误'; 
           res.json(responseData);
           return;
        }
           responseData.message = '登录成功'; 
           responseData.userInfo = {
               _id: userInfo._id,
               username :userInfo.username
           }
           req.cookies.set('userInfo' , JSON.stringify({
               _id: userInfo._id,
               username : userInfo.username
           }));
           res.json(responseData);
    })
})

router.get('/user/tuichu',function(req,res,next){
      req.cookies.set('userInfo',null);
      res.json(responseData);
      next();
})


//订单的提交
router.post('/order/tianjia',function(req,res,next){
    var username = req.userInfo.username;
    var gname = req.body.gname;
    var orderid = req.body.orderid;
    var adress = req.body.adress;
    var pnum = req.body.pnum;
    var qnum = req.body.qnum;
    var totalprice = req.body.totalprice;
    console.log("-----提交订单的内容--")
    console.log(username);
    console.log(orderid);
    console.log(adress);
    console.log(pnum);
    console.log(qnum);
    console.log(totalprice);
    Orders.findOne({
        username : username,
        gname : gname,
        orderid : orderid
    }).then(function(orderInfo){
        console.log()
         if(orderInfo){
           responseData.code = 6;
           responseData.message = '您已经购买过该物品或订单号已经存在'; 
           res.json(responseData);
           return;
         }
        
         var orders = new Orders({ 
             username : username,
             gname : gname,
             orderid : orderid,
             adress : adress,
             pnum : pnum,
             qnum :qnum,
             totalprice : totalprice
           })
          return orders.save();        
     }).then(function(newOrderInfo){
           
           console.log(newOrarInfo)
           responseData.code = 6;
           responseData.message = '您已成功购买';
           res.json(responseData);
          });
    })

//评论的提交
router.post('/goods/comment',function(req,res,next){
               
              var gid = req.body.gid;
              var gname = req.body.gname;
              var gusername = req.userInfo.username;
              console.log(req.userInfo.username);
              var text = req.body.text;
              console.log("-----------获取到的信息-------");
              console.log(gid);
              console.log(gname);
              console.log(gusername);
              console.log(text);
              var comment = new Comment({
                  gid : gid,
                  name :gname,
                  username : gusername,
                  text : text
              });
            return comment.save().then(function(){
                        responseData.code = 10;
                        responseData.message = '评论成功';
                        res.json(responseData);
                        return;  
            });
});
router.post('/user/wss',function(req,res,next){
    console.log(req.body);
    console.log(req.userInfo.username)
 if(!req.userInfo.username){
         responseData.code = 11;
         responseData.message = '请先登录';
         res.json(responseData);
         return;  
    }else if(req.body.pnum == '' || req.body.qnum == '' || req.body.email == '' ){
         responseData.code = 12;
         responseData.message = '输入值不能为空';
         res.json(responseData);
         return;  
    }
    return User.update({
        username : req.userInfo.username
    },{
        pnum : req.body.pnum,
        qnum : req.body.qnum,
        email : req.body.email,
    }).then(function(){
         responseData.code = 13;
         responseData.message = '恭喜修改成功';
         res.json(responseData);
         return;  
    })
    
});
router.post('/user/fankui',function(req,res,next){
    console.log("-------反馈信息---")
    console.log(req.body.orderid);
    if( req.body.orderid == '' || req.body.fankuinr == ''){
         responseData.code = 14;
         responseData.message = '反馈内容不能为空';
         res.json(responseData);
         return;  
    }
      var fankui = new Fankui({
                orderid : req.body.orderid,
                username : req.userInfo.username,
                text : req.body.fankuinr
              });
       return fankui.save().then(function(){
            responseData.code = 15;
            responseData.message = '提交成功，请等待反馈';
            res.json(responseData);
            return;  
       });     
})
module.exports = router;