var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/luntan');
//创建schema规范对象
//规范liuyan文档
var liuyanSchema = mongoose.Schema({
    //姓名
    'name': {type: String},
    //帖子id
    'unso': {type: String},
    //liuyan
    'liuyan': {type: String},
    //发表留言时间
    'time': {type: Date, default: Date.now}
});
//创建文档
//liuyan文档
var LiuYan = mongoose.model('liuyan', liuyanSchema);
module.exports = LiuYan;

