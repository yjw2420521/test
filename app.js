// 创建应用文件程序启动入口
var express = require('express');
var app = express();
//加载模板处理模块
var swig = require('swig');
//加载body-parser用来处理post提交过来的数据
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//加载cookie模块
var Cookies = require('cookies');

var User = require('./models/User');

//引入art-template模板
// var template = require('art-template');
//指定模板引擎
// template.config('cache',false);

//模板的配置
//定义当前应用所使用的模板引擎
//第一个参数是模板引擎的名称也是模板文件的后缀,第二个参数是表示解析处理模板文件的方法
app.engine('html',swig.renderFile);
//设置模板文件的存放的目录第一个必须是veiws,第二个是目录
app.set('views','./views')
//第一个固定是view engine 第二个和上面的第一个对应
app.set('view engine','html');
//在开发中清除缓存,不需要重启应用
swig.setDefaults({cache:false});
//设置静态文件托管
//当用户访问的URl是以/public开始
app.use('/public',express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

//设置cookie
app.use(function(req, res, next){
  req.cookies = new Cookies(req,res);
  // console.log(typeof req.cookies.get('userInfo'));
  //解析登录用户的cookie信息
  req.userInfo = {};
  if(req.cookies.get('userInfo')){
    try{
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));

      User.findById(req.userInfo._id).then(function(userInfo){
          req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
          next();
      })
      //获取当前登录用户的类型
    }catch(e){ next();}

    }else{
      
    next();
  }
  
});

//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/goods',require('./routers/goods'));
app.use('/',require('./routers/main'));
app.use('/total',require('./routers/total'));
app.use('/gr',require('./routers/gr'));
app.use('/ws',require('./routers/ws'));

//req 是request的函数
//res
// app.get('/',function(req,res,nex){
    
//     res.render('lianxi');
// })

//创建监听
mongoose.connect('mongodb://localhost:27017/main',function(err){
  if(err){
      console.log('连接失败！');
  } else {
       console.log('连接成功！');
       app.listen(8080);
  }
});

