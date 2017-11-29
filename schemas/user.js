var mongoose = require('mongoose');

//定义的数据表的存储结构
//用户的表结构

module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String,
    //手机号
    pnum:Number,
    //qq号
    qnum:Number,
    //email
    email:String,
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
});
