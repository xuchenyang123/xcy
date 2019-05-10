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
            <li class="on" :switchTo="switchTo">登陆</li>
            <li @click.prevent="switchTo('/register')">注册</li>
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
          <img src="./../../common/images/ad.jpg" alt="">
        </div>
        <div class="body-right">
          <h2>学生登录</h2>
          <div class="main-login">
            <ul>
              <li><img src="./../../common/images/success.png" alt=""></li>
              <li><input type="text" placeholder="请输入您的用户名" v-model="userName"></li>
              <li><input type="password" placeholder="密码" v-model="pwd"></li>
              <li style="height: 45px">
                            <span>
                                <input type="checkbox" id="remember">
                                <label for="remember">记住用户名</label>
                            </span>
                <span>忘记密码?</span>
              </li>
              <li style="height: 38px">
                <el-button @click="login()" class="login-up">登陆</el-button>
                <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
                  <span class="content">{{content}}</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                  </span>
                </el-dialog>
              </li>
              <li style="height: 38px">还没有账号?立即注册</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>在线教育论坛系统@2019</span>
    </div>
  </div>
</template>

<script>
  import {dealLogin} from './../../api/index'
  import {mapActions} from 'vuex'

  export default {
    name: "Login",
    data() {
      return {
        userName: '',
        pwd: '',
        userInfo: {},
        centerDialogVisible: false,
        content:''
      }
    },
    methods: {
      ...mapActions(['syncMessage']),
      switchTo(path) {
        this.$router.replace(path);
      },
      //登录
      async login() {
        if (!this.userName) {
          this.centerDialogVisible = true;
          this.content = '请输入用户名！';
          return;
        } else if (!this.pwd) {
          this.centerDialogVisible = true;
          this.content = '请输入密码！';
          return;
        }
        const result = await dealLogin(this.userName, this.pwd);
        console.log(result);
        if (result.success_code === 200) {
          this.userInfo = result.date;
        } else {
          this.userInfo = {
            message: result.message,
          }
        }
        if (!this.userInfo.name) {
          this.centerDialogVisible = true;
          this.content = this.userInfo.message;
        } else {
          this.centerDialogVisible = false;
          this.syncMessage(this.userInfo);
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
    background-color: #fff;
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

  .body-left {
    width: 630px;
    height: 405px;
    margin-left: 10px;
  }

  .body-left img {
    width: 630px;
    height: 405px;
  }

  .body-right {
    width: 455px;
    height: 410px;
    border: 1px solid #ccc;
    margin-right: 10px;
    text-align: center;
    background: #fff;
  }

  .body-right h2 {
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
  }

  .main-login {
    width: 280px;
    height: 332px;
    /*background: green;*/
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
    /*background: red;*/
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
  .login-up {
    width: 100%;
    height: 30px;
    color: #fff;
    background-color: #dd3137;
    padding: 5px 55px;
    border-radius: 3px;
    border: 1px solid #dd3137;
    font-size: 14px;
  }

  .main-login ul li:nth-child(6) {
    font-size: 12px;
  }

  .on {
    color: #dd3137;
    border-bottom: 2px solid #dd3137;
  }

  input::-webkit-input-placeholder {
    color: #ccc;
  }

  .footer {
    width: 100%;
    height: 100px;
    background-color: #e3e3e3;
    text-align: center;
    line-height: 100px;
  }

  .footer span {
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
