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
            <li class="on">注册</li>
            <li @click.stop="switchTo('/teacherregister')">教师注册</li>
            <li @click.stop="switchTo('/teacherlogin')">教师登陆</li>
          </ul>
        </div>
      </div>
    </div>
    <!--body-->
    <div class="login-body">
      <div class="body-center">
        <div class="body-left">
          <h2>用户注册</h2>
          <div class="main-login">
            <ul>
              <li><img src="./../../common/images/success.png" alt=""></li>
              <li><input type="text" placeholder="请输入您的用户名" v-model="userName"></li>
              <li><input type="password" placeholder="密码" v-model="pwd"></li>
              <li style="height: 38px">
                <el-button @click.prevent="register()" class="register-up">注册</el-button>
                <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
                  <span class="content">{{content}}</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog>
              </li>
              <li style="height: 38px">已有账号?<i style="color: #fe9305">立即登录</i></li>
            </ul>
          </div>

        </div>
        <div class="body-right">
          <img src="./../../common/images/reg.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="footer">
      <span>在线教育论坛系统@2019</span>
    </div>
  </div>
</template>

<script>
  import {delRegister} from './../../api/index'
  import {mapState} from 'vuex'
  export default {
    name: "Register",
    data(){
      return{
        userName: '',
        pwd:'',
        centerDialogVisible: false,
        content:''
      }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    methods:{
      switchTo(path) {
        this.$router.replace(path);
      },
      async register(){
        if(!this.userName){
          this.centerDialogVisible = true;
          this.content = '请输入用户名！';
          return;
        }else if(!this.pwd){
          this.centerDialogVisible = true;
          this.content = '请输入密码！';
          return;
        }
        const result = await delRegister(this.userName,this.pwd);
        console.log(result);
        if(result.err_code === 0){
          this.centerDialogVisible = true;
          this.content = result.message;
          this.userName = '';
          this.pwd = '';
        }
        if(result.success_code === 200){
          this.centerDialogVisible = false;
          this.$router.replace('/');
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
    /*background: red;*/
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
  .login-body {
    width: 100%;
    height: 475px;
  }
  .body-center {
    width: 1140px;
    height: 475px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .body-right {
    width: 630px;
    height: 405px;
    margin-left: 10px;
  }
  .body-right img {
    width: 630px;
    height: 405px;
  }
  .body-left {
    width: 455px;
    height: 410px;
    border: 1px solid #ccc;
    margin-right: 10px;
    text-align: center;
    background: #fff;
  }
  .body-left h2 {
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
  }
  .main-login {
    width: 280px;
    height: 332px;
    margin-left: 92px;
    margin-top: 20px;
  }
  .main-login ul {
    width: 100%;
    height: 100%;
  }
  .main-login ul li {
    width: 280px;
    height: 58px;
    margin: 0 0 2px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .main-login ul li:first-child {
    position: relative;
  }
  .main-login ul li img {
    width: 80px;
    height: 77px;
    position: absolute;
    right: 7px;
    top: 3px;
  }
  .main-login ul li:nth-child(2) input, .main-login ul li:nth-child(3) input {
    outline: none;
    font-size: 14px;
    color: #ccc;
    width: 280px;
    height: 35px;
    border-radius: 2px;
    border: 1px solid #e3e3e3;
    padding-left: 14px;
  }
  .main-login ul li:nth-child(4) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }
  .main-login ul li:nth-child(4) input {
    font-size: 12px;
  }
  .register-up {
    width: 100%;
    height: 30px;
    color: #fff;
    background-color: #dd3137;
    padding: 5px 55px;
    border-radius: 3px;
    border: 1px solid #dd3137;
    font-size: 14px;
  }

  .main-login ul li:nth-child(5) {
    font-size: 12px;
  }
  .on {
    color: #dd3137;
    border-bottom: 2px solid #dd3137;
  }
  i {
    font-style: normal;
  }
  input::-webkit-input-placeholder {
    color: #ccc;
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
  .content{
    display: inline-block;
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 16px;
  }
</style>
