import ajax from './ajax'
let BASE_URL = '/local_api';
//登录
export const dealLogin = (name,pwd)=>ajax(BASE_URL + '/api/login',{name,pwd},'POST');
//注册
export const delRegister = (name,pwd)=>ajax(BASE_URL + '/api/register',{name,pwd},'POST');
//发表帖子
export const sendTieZi = (id,value,name)=>ajax(BASE_URL + '/api/sendtiezi',{id,value,name},'POST');
//删除帖子
export const deleteTieZicc = (id)=>ajax(BASE_URL + '/api/deletetiezi',{id});
//发表留言
export const creatLiuYan = (id,value,name)=>ajax(BASE_URL + '/api/createliuyan',{id,value,name},'POST');
//删除留言
export const deleteLiuYan = (id)=>ajax(BASE_URL + '/api/deleteliuyan',{id});
//教师登录
export const dealTeacherLogin = (name,pwd)=>ajax(BASE_URL + '/api/teacherlogin',{name,pwd},'POST');
//教师注册
export const dealTeacherRegister = (name, pwd) => ajax(BASE_URL + '/api/teacherregister', {name, pwd}, 'POST');
//创建课程
export const saveProgress = (number,name,lesson,teacherId)=>ajax(BASE_URL + '/api/saveprogress',{number,name,lesson,teacherId},'POST');
//加入课程
export const joinProgress = (id,count)=>ajax(BASE_URL + '/api/joinprogress',{id,count},'POST');
//查看自己加入的课程
export const findMyProgress = (arr)=>ajax(BASE_URL + '/api/findprogress',{arr},'POST');
//创建作业
export const createHomework = (number,work)=>ajax(BASE_URL + '/api/creatework',{number,work},'POST');
//查询我的作业
export const myHomework = (number)=>ajax(BASE_URL + '/api/mywork',{number});
//提交作业
export const onWork = (stuId,stuName,teacherId,teacher,lessonNumber,lesson,answer_one,troubles)=>ajax(BASE_URL + '/api/createanswer',{stuId,stuName,teacherId,teacher,lessonNumber,lesson,answer_one,troubles},'POST');
