var mongoose = require('mongoose');

//定义的数据表的存储结构
//用户的表结构

module.exports = new mongoose.Schema({
    //商品的id
    orderid : Number,
    //价格
    username : String,
    //反馈信息
    text : String,
    //日期
    commentTime: Date
});