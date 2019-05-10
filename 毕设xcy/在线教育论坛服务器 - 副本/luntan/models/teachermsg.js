var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/luntan');
//创建schema规范对象
//规范liuyan文档
var teacherSchema = mongoose.Schema({
    //姓名
    'name': {type: String},
    //密码
    'pwd': {type:String},
    //教师凭证
    'unso':{type:Number,default:1}
});
//创建文档
//liuyan文档
var Teacher = mongoose.model('teacher', teacherSchema);
module.exports = Teacher;