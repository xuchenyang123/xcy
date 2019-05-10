import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//引入首页组件
import Home from './../pages/home/Home'
import Publish from './../pages/publish/Publish'
import Create from './../pages/createProgress/Create'
import Homework from './../pages/homework/Homework'
import Login from './../pages/login/Login'
import Register from './../pages/register/Register'
import TeacherRegister from '../pages/teacherregister/TeacherRegister'
import TeacherLogin from '../pages/teacherlogin/TeacherLogin'
import TeacherHome from '../pages/teacherhome/TeacherHome'
import myProgress from '../pages/myProgress/myProgress'
import feedback from '../pages/feedback/feedback'
//引入二级路由
import progresses from './../pages/teacherhome/children/progresses'
import manger from './../pages/teacherhome/children/manger'
import inspect from './../pages/teacherhome/children/inspect'
import homework from './../pages/teacherhome/children/homework'
export default new VueRouter({
  routes:[
    {path:'/home',component:Home},
    {path:'/public',component:Publish},
    {path:'/create',component:Create,},
    {path:'/homework',component:Homework},
    {path:'/login',component:Login},
    {path:'/register',component:Register},
    {path:'/myprogress',component:myProgress},
    {path:'/teacherregister',component:TeacherRegister},
    {path:'/teacherlogin',component:TeacherLogin},
    {path:'/feedback',component:feedback},
    {
      path:'/teacherhome',
      component:TeacherHome,
      children:[
        {path: 'progress', component: progresses},
        {path: 'manger', component: manger},
        {path: 'inspect', component: inspect},
        {path: 'homework', component: homework},
        {path: '/teacherhome', redirect: '/teacherhome/progress'}
      ]
    },
    {path: '/',redirect:'/home'},
  ]
})
