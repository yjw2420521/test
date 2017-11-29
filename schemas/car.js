var mongoose = require('mongoose');

//定义的数据表的存储结构
//用户的表结构

module.exports = new mongoose.Schema({
    username : String, 
    //商品名称
    gname: String,
    //价格
    price: Number,
    //商品数量
    num: Number,
    //日期
    createTime: Date
});