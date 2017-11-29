var mongoose = require('mongoose');

//定义的数据表的存储结构
//用户的表结构

module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //商品名称
    gname : String,
    //订单的编号
    orderid : Number,
    //地址
    adress : String,
    //手机号
    pnum : Number,
    //qq号
    qnum : Number,
    //总价
    totalprice : Number

});