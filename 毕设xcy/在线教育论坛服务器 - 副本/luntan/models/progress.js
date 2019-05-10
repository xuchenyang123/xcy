var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/luntan');
//创建schema规范对象
//规范liuyan文档
var progressSchema = mongoose.Schema({
    //姓名
    'name': {type: String},
    //课号
    'lessonNumber':{type:Number},
    //课程名称
    'lesson': {type: String},
    //homework
    'homework':{type:Array},
    //教师Id
    'teacherId':{type:String}
});
//创建文档
//progress文档
var Progress = mongoose.model('progress', progressSchema);
module.exports = Progress;

