var mongoose = require('mongoose');

//定义的数据表的存储结构
//用户的表结构

module.exports = new mongoose.Schema({
    gid : Number,
    //商品名称
    name: String,
    //价格
    price: Number,
    //商品数量
    num: Number,
    //日期
    createTime: Date,
    //图片
    img : String,
    //图片1
    img1:String,
    //图片2
    img2:String,
});