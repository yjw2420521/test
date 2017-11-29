var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Goods = require('../models/Goods');
var Orders = require('../models/Orders')
var Comment = require('../models/Comment');
var Fankui = require('../models/Fankui')

router.use(function(req,res,next){
    if(!req.userInfo.isAdmin){
            res.send('对不起只有管理员才能进入！')
    }
    next();
});

router.get('/',function(req,res,next){
    res.render('admin/admin',{
        userInfo : req.userInfo 
    });
});

//用户管理

router.get('/user',function(req,res){
     User.find().then(function(users){
            // console.log(users);
            res.render('admin/user_index',{
                    userInfo : req.userInfo,
                    users : users,
                });
     })
})
router.get('/goods',function(req,res){
     Goods.find().then(function(goods){
            // console.log(goods);
            res.render('admin/goods_index',{
                    userInfo : req.userInfo,
                    goods : goods,
                });
     })
     
});
router.get('/goods/add',function(req,res){
     res.render('admin/goods_add')
});

router.post('/goods/add',function(req,res){
    var name = req.body.name || '';
    var price = req.body.price || '';
    var num = req.body.num || '';
    // console.log(req.body);
    // console.log(price);
    // console.log(num);
     if(name == '' || price == ''||num == ''){
         res.render('admin/err',{
             message:"内容不能为空"
         })
           }
      var goods = new Goods({
          name : name,
          num : num,
          price : price
      })
     return goods.save(Goods).then(function(){
             res.render('admin/suc')
          })
     });
router.get('/orders',function(req,res){
     Orders.find().then(function(orders){
            // console.log(orders);
            res.render('admin/orders_index',{
                    userInfo : req.userInfo,
                    orders : orders,
                });
     })
     
})
//商品的评论管理
router.get('/comment',function(req,res){
     Comment.find().then(function(commentInfo){
            console.log(commentInfo);
            res.render('admin/comment_index',{
                    userInfo : req.userInfo,
                    commentInfo : commentInfo,
                });
     })
     
})
router.get('/comment/del',function(req,res){
    //获取要修改的分类的信息
    var id = req.query.id;
    Comment.remove({
        _id : id 
    }).then(function(){
        res.render('admin/suc',{
                    userInfo: req.userInfo,
                    message : "删除成功",
                    url : 'admin/comment_index'
          })
    })
})
//分类修改
router.get('/goods/xiugai',function(req,res){
    //获取要修改的分类的信息
    var id = req.query.id;
    Goods.findOne({
        _id : id
    }).then(function(goods){
               console.log(goods);
               console.log( req.userInfo);
               res.render('admin/goods_edit',{
               userInfo : req.userInfo,
               name : goods.name,
               price : goods.price,
               num : goods.num
         });
    })
})
//商品的修改保存
router.post('/goods/xiugai',function(req,res){
     var id = req.query.id;
     var name = req.body.name ||'';
     var price = req.body.price || '';
     var num = req.body.num || '';
     console.log(name);
     console.log(price);
     console.log(num);
     console.log(id);
     Goods.findOne({
         _id : id
     }).then(function(goods){
        console.log(goods);
        if(!goods){
             res.render('admin/err',{
             userInfo: req.userInfo,
             message : "商品信息不存在"
         }) 
             return Promise.reject();
        }else{
              if(name == goods.name && price == goods.price && num == goods.num){
                   res.render('admin/suc',{
                    userInfo: req.userInfo,
                    message : "修改成功,内容没有变化",
                    url : '/amdin/goods_add'
             }) 
              return Promise.reject();
              }else{
                  return Goods.findOne({
                      _id : {$ne: id},
                      name :name
                  })
              }
        }
     }).then(function(samGoods){
         if(samGoods){
             
             res.render('admin/err',{
                    userInfo: req.userInfo,
                    message : "数据库已有同名的商品",
                    url : '/amdin/goods_add'
             });
            return Promise.reject();
            }else{
               return Goods.update({
                    _id : id 
                },{
                    name : name,
                    price : price,
                    num : num 
                });
            }  
     }).then(function(){
          res.render('admin/suc',{
                    userInfo: req.userInfo,
                    message : "修改成功",
                    url : '/amdin/goods_add'
          })
     })
})

router.get('/goods/del',function(req,res){
    var id = req.query.id;
    Goods.remove({
        _id : id 
    }).then(function(){
        res.render('admin/suc',{
                    userInfo: req.userInfo,
                    message : "删除成功",
                    url : '/amdin/goods_add'
          })
    })
})
//售后
router.get('/shouhougl',function(req,res){
  Fankui.find().then(function(fankuis){
      console.log('从数据库获取的反馈信息')
      console.log(fankuis);
      console.log(req.userInfo);
      res.render('admin/fankui_index',{
                fankuis : fankuis
      })
  })
})
//退货管理
router.get('/fankui/del',function(req,res){
    var orderid = req.query.id;
    Fankui.remove({
        orderid : orderid
    }).then(function(){
        Orders.remove({
            orderid : orderid
        }).then(function(){
            res.render('admin/suc',{
                message : '你已经同意买家退回订单'
            })
        })
    })
})


module.exports = router;