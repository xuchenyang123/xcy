var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/luntan');
//创建schema规范对象
//规范content文档
var tieziSchema = mongoose.Schema({
    //用户id
   'unso':{type:String},
    //用户名
    'name':{type:String},
    //tiezi
    'tiezi':{type:String},
    //发表帖子时间
    'time':{type:Date,default:Date.now}
});
//创建文档
var Content = mongoose.model('content',tieziSchema);
module.exports = Content;

