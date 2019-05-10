var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/luntan');
//创建schema规范对象
//规范user文档
var userSchema = mongoose.Schema({
    //用户名
    'name': {type:String},
    //密码
    'pwd': {type: String},
    //我的课程
    'myprogress':{type:Array},
    //最后操作时间
    'l_time': {type : Date, default: Date.now},
});
var User = mongoose.model('user',userSchema);
module.exports = User;

