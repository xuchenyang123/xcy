var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/luntan');
//创建schema规范对象
//规范user文档
var answerSchema = mongoose.Schema({
    //学生id
    'stuId': {type:String},
    //教师id
    'teacherId': {type: String},
    //学生姓名
    'stuName':{type:String},
    //教师姓名
    'teacherName':{type:String},
    //课程号
    'lessonNumber':{type:Number},
    //课程名
    'lesson':{type:String},
    //问题
    'trouble':{type:String},
    //答案
    'answer':{type:String},
    //评语
    'feedContent':{type:String,default:''},
    //操作时间
    'l_time': {type : Date, default: Date.now}
});
var Answer = mongoose.model('answer',answerSchema);
module.exports = Answer;
