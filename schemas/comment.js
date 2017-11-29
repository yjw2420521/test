var mongoose = require('mongoose');

//定义的数据表的存储结构
//用户的表结构

module.exports = new mongoose.Schema({
    //商品的id
    gid : Number,
    //商品名称
    name: String,
    //价格
    username : String,
    //商品数量
    text : String,
    //日期
    commentTime: Date
});