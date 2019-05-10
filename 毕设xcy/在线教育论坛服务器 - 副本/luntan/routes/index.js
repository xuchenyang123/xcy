var express = require('express');
var router = express.Router();

var User = require('./../models/usermodels');
var Content = require('./../models/usermodels1');
var LiuYan = require('./../models/usermodels2');
var Teacher = require('./../models/teachermsg');
var Progress = require('./../models/progress');
var Answer = require('./../models/answer');
router.get('/', function (req, res) {
    res.send({
        message: 'hhh'
    })
});
/**
 * 登录接口
 */
router.post('/api/login', function (req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    //查找用户
    User.findOne({name: name}, function (err, user) {
        if (user) {//用户已注册
            //验证密码
            if (user.pwd !== pwd) {
                res.send({err_code: 0, message: '用户名或密码不正确'});
            } else {//密码正确
                req.session.userid = user._id;
                console.log(req.session.userid);
                res.send({
                    success_code: 200,
                    date: {
                        id: user._id,
                        name: user.name
                    }
                })
            }
        } else {//用户没有注册
            res.send({
                message: '用户名不存在!'
            })
        }
    })
});
/**
 * 注册接口
 * @type {Router|router}
 */
router.post('/api/register', function (req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    User.findOne({name: name}, function (err, user) {
        if (user) {
            res.send({
                err_code: 0,
                message: '用户名已存在!'
            })
        } else {//用户没有注册
            var userModel = new User({name: name, pwd: pwd});
            userModel.save(function (err, user) {
                req.session.userid = user._id;
                res.send({
                    success_code: 200,
                    data: {
                        id: user._id,
                        name: user.name
                    }
                });
            });

        }
    });
});
/**
 * 发表帖子接口
 * @type {Router|router}
 */
router.post('/api/sendtiezi', function (req, res) {
    var unso = req.body.id;
    var value = req.body.value;
    var name = req.body.name;
    var contentModel = new Content({unso: unso, tiezi: value, name: name});
    contentModel.save(function (err, user) {
        res.send({
            success_code: 200,
            data: {
                unso: user.unso,
                id: user._id,
                name: user.name,
                tiezi: user.tiezi,
                time: user.time
            }
        });
    });
});
/**
 * 自动登录
 * @type {Router|router}
 */
// router.get('/api/automaticLogin', function (req, res) {
//     var filter = {'pwd': 0, 'l_time': 0, '__v': 0,'tiezi':0};
//     //取出userId
//     var userId = req.session.userid;
//     // console.log(userId);
//     User.findById({_id: userId},filter, function (err, user) {
//         if (!user) {//没有用户
//             //清除上一次的id
//             delete req.session.userid;
//             res.send({
//                 err_code: 0,
//                 message: '请先登录'
//             })
//         } else {//用户已经登陆过一次
//             res.send({
//                 success_code: 200,
//                 data:{
//                     name:user.name,
//                     id:user._id
//                 }
//             })
//         }
//     })
// });
/**
 * 删除帖子
 * @type {Router|router}
 */
router.get('/api/deletetiezi', function (req, res) {
    var currentId = req.query.id;
    Content.remove({_id: currentId}, function (err, user) {
        if (err) {
            res.send({
                err_code: 0,
                message: err
            })
        } else {
            LiuYan.find({unso: currentId}, function (err, user) {
                LiuYan.remove({unso: currentId}, function (err, user) {
                    if (err) {
                        res.send({
                            err_code: 0,
                            message: err
                        })
                    } else {
                        res.send({
                            success_code: 200,
                            message: '已删除该帖子以及所有留言!'
                        })
                    }
                })
            });
        }
    });
});
/**
 * 发表留言
 * @type {Router|router}
 */
router.post('/api/createliuyan', function (req, res) {
    var currentId = req.body.id;
    var value = req.body.value;
    var name = req.body.name;
    var liuYanModel = new LiuYan({unso: currentId, liuyan: value, name: name});
    liuYanModel.save(function (err, user) {
        res.send({
            success_code: 200,
            data: {
                name: user.name,
                id: user._id,
                unso: user.unso,
                liuyan: user.liuyan,
                time: user.time
            }
        });
    });
});
/**
 * 删除留言
 * @type {Router|router}
 */
router.get('/api/deleteliuyan', function (req, res) {
    var currentId = req.query.id;
    LiuYan.remove({_id: currentId}, function (err, user) {
        if (err) {
            res.send({
                err_code: 0,
                message: err
            })
        } else {
            res.send({
                success_code: 200,
                message: '删除留言成功!'
            })
        }
    })
});
/**
 * 教师登录
 * @type {Router|router}
 */
router.post('/api/teacherlogin', function (req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    //查找用户
    Teacher.findOne({name: name}, function (err, user) {
        if (user) {//用户已注册
            //验证密码
            if (user.pwd !== pwd) {
                res.send({err_code: 0, message: '用户名或密码不正确'});
            } else {//密码正确
                res.send({
                    success_code: 200,
                    date: {
                        id: user._id,
                        name: user.name
                    }
                })
            }
        } else {//用户没有注册
            res.send({
                err_code: 0,
                message: '用户名不存在!'
            })
        }
    })
});
/**
 * 教师注册
 * @type {Router|router}
 */
router.post('/api/teacherregister', function (req, res) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    Teacher.findOne({name: name}, function (err, user) {
        if (user) {
            res.send({
                err_code: 0,
                message: '用户名已存在!'
            })
        } else {//用户没有注册
            var userModel = new Teacher({name: name, pwd: pwd});
            userModel.save(function (err, user) {
                res.send({
                    success_code: 200,
                    data: {
                        id: user._id,
                        name: user.name
                    }
                });
            });
        }
    });
});
/**
 * 创建课程
 * @type {Router|router}
 */
router.post('/api/saveprogress', function (req, res) {
    var name = req.body.name;
    var lesson = req.body.lesson;
    var lessonNumber = req.body.number;
    var teacherId = req.body.teacherId;
    var userModel = new Progress({name: name, lesson: lesson, lessonNumber: lessonNumber,teacherId:teacherId});
    userModel.save(function (err, user) {
        res.send({
            success_code: 200,
            data: {
                name: user.name,
                lessonNumber: user.lessonNumber,
                lesson: user.lesson,
                teacherId:user.teacherId
            }
        });
    });
});
/**
 * 加入课程
 * @type {Router|router}
 */
router.post('/api/joinprogress', function (req, res) {
    var id = req.body.id;
    var count = req.body.count;
    var conditions = {_id: id};
    var updates = {$addToSet: {'myprogress': count}};
    User.update(conditions, updates, function (err) {
        if (err) {
            res.send({
                err_code: 0,
                msg: err
            })
        } else {
            User.findOne(conditions, function (err, user) {
                res.send({
                    success_code: 200,
                    myprogress: user.myprogress
                })
            })
        }
    })
});
/**
 * 查找课程
 * @type {Router|router}
 */
router.post('/api/findprogress', function (req, res) {
    var arr = req.body.arr;
    Progress.find({lessonNumber: arr}, function (err, user) {
        if (err) {
            res.send({
                err_code: 0,
                err: err
            })
        } else {
            res.send({
                success_code: 200,
                user: user
            })
        }
    })
});
/**
 * 发表作业
 * @type {Router|router}
 */
router.post('/api/creatework', function (req, res) {
    var number = Number(req.body.number);
    var homeWork = req.body.work;
    var conditions = {lessonNumber: number};
    var updates = {$push: {'homework': homeWork}};
    Progress.update(conditions, updates, function (err) {
        if (err) {
            res.send({
                err_code: 0,
                err: err
            });
        } else {
            Progress.findOne(conditions, function (err, user) {
                res.send({
                    success_code: 200,
                    homework: user.homework,
                    name:user.lesson
                })
            });
        }
    })
});
/**
 * 查询该课程的作业
 * @type {Router|router}
 */
router.get('/api/mywork',function (req,res) {
   var lessonNumber = req.query.number;
   Progress.findOne({lessonNumber:lessonNumber},function (err,user) {
      if(err){
          res.send({
              err_code:0,
              err:err
          })
      } else {
          res.send({
              success_code:200,
              homework:user.homework
          })
      }
   });
});
/**
 * 创建提交作业数据
 * @type {Router|router}
 */
router.post('/api/createanswer',function (req,res) {
    var stuId = req.body.stuId;
    var stuName = req.body.stuName;
    var teacherId = req.body.teacherId;
    var teacher = req.body.teacher;
    var lessonNumber = req.body.lessonNumber;
    var lesson = req.body.lesson;
    var answer = req.body.answer_one;
    var troubles  = req.body.troubles;
    var answerModel = new Answer({
        stuId:stuId,
        stuName:stuName,
        teacherId:teacherId,
        teacherName:teacher,
        lessonNumber:lessonNumber,
        lesson:lesson,
        answer:answer,
        trouble:troubles
    });
    answerModel.save(function (err,user) {
        res.send({
            success_code:200,
            user:user
        })
    })
});
module.exports = router;
