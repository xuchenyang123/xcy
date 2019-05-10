<template>
  <div class="login">
    <!--头部-->
    <div class="login-top">
      <div class="top-center">
        <div class="logo">
          <img src="./../../common/images/reg.jpg" alt="">
        </div>
        <div class="link">
          <ul>
            <li @click.stop="switchTo('/login')">登陆</li>
            <li  @click.stop="switchTo('/register')">注册</li>
            <li @click.stop="switchTo('/teacherregister')">教师注册</li>
            <li class="on">教师登陆</li>
          </ul>
        </div>
      </div>
    </div>
    <!--body-->
    <!--<div class="img-bg">-->
      <!--<img src="./../../../src/common/images/logo.png" alt="">-->
    <!--</div>-->
    <div class="body-content">
      用户名:<input type="text" placeholder="请输入您的用户名" v-model="teacherName"><br><br>
      密码: &nbsp;&nbsp; <input type="password" placeholder="密码" v-model="pwd"><br><br>
      <el-button @click="teacherLogin()">登陆</el-button>
    </div>
    <div class="footer">
      <span>在线教育论坛系统@2019</span>
    </div>
  </div>
</template>

<script>
  import {dealTeacherLogin} from './../../../src/api/index'
  import {mapActions} from 'vuex'
  export default {
    name: "TeacherLogin",
    data(){
      return{
        teacherName:'',
        pwd:'',
        teacherInfo:{}
      }
    },
    methods: {
      ...mapActions(['teacherMessage']),
      switchTo(path) {
        this.$router.replace(path);
      },
      async teacherLogin(){
        if (!this.teacherName) {
          alert('请输入用户名！');
          return;
        } else if (!this.pwd) {
          alert('请输入密码！');
          return;
        }
        const result = await dealTeacherLogin(this.teacherName, this.pwd);
        console.log(result);
        if(result.err_code === 0){
          alert(result.message);
          return;
        }else if(result.success_code === 200){
          this.teacherInfo = result.date;
          this.teacherMessage(this.teacherInfo);
          this.$router.replace('/teacherhome');
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
  }

  .login-top {
    width: 100%;
    height: 75px;
    border-bottom: 1px solid #666;
  }

  .top-center {
    width: 1140px;
    height: 75px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    width: 102px;
    height: 60px;
  }

  .logo img {
    width: 102px;
    height: 60px;
    border-radius: 50%;
  }

  .link {
    width: 400px;
    height: 75px;
  }

  .link ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .link ul li {
    width: 100px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
  }
  .link ul li:last-child {
    margin-left: 5px;
  }
  .footer{
    width: 100%;
    height: 100px;
    background-color: #e3e3e3;
    text-align: center;
    line-height: 100px;
  }
  .footer span{
    font-size: 12px;
    color: #666666;
  }
  .on {
    color: #dd3137;
    border-bottom: 2px solid #dd3137;
  }
  .body-content{
    width: 60%;
    height: 400px;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
    padding-top: 100px;
  }
  /*.img-bg{*/
    /*width: 100%;*/
    /*height: auto;*/
    /*text-align: center;*/
  /*}*/
</style>

