<template>
  <div class="main">
    <div class="main-top">
      <div class="main-top-nav">
        <div class="nav-one">
          <span style="font-size: 14px">欢迎您</span>&nbsp;
          <span>{{teacherInfo.name}}</span>&nbsp;
          <span style="font-size: 12px;color: blue;cursor: pointer;" @click="loginOut">退出</span>
        </div>
      </div>
      <!--文字-->
      <div class="main-top-text">
        <img src="./../../common/images/logo.png" alt="">
        <h1 style="font-weight: 400;">在线教学论坛系统</h1>
      </div>
      <!--功能-->
      <div class="main-top-device">
        <ul>
          <li @click="switchTo('/teacherhome/progress')">创建课程</li>
          <li @click="switchTo('/teacherhome/manger')">课程管理</li>
          <li @click="switchTo('/teacherhome/homework')">发表作业</li>
          <li @click="switchTo('/teacherhome/inspect')">作业批阅</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "TeacherHome",
    computed:{
      ...mapState(['teacherInfo'])
    },
    methods:{
      switchTo(path){
        this.$router.replace(path);
      },
      //退出登录
      loginOut(){
        this.$store.dispatch('teacherLoginOut');
        this.$message({
          message: '退出成功！',
          type: 'success'
        });
        this.$router.replace('/teacherlogin');
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  .main {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    background: #ffffff;
  }

  .main-top {
    width: 100%;
    height: auto;
  }

  .main-top-nav {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #000;
  }
  .nav-one{
    width: 200px;
    height: 100%;
    float: right;
    margin-right: 100px;
    line-height: 30px;
  }
  .main-top-text {
    width: 100%;
    height: 90px;
    position: relative;
  }

  .main-top-text img {
    float: left;
    position: absolute;
    left: 178px;
    top: 7px;
  }

  .main-top-text h1 {
    position: absolute;
    right: 380px;
    top: 45px;
    font-size: 25px;
  }

  .main-top-device {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #000;
  }

  .main-top-device ul {
    width: 60%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .main-top-device ul li {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  /*.main-one {*/
    /*width: 60%;*/
    /*height: 500px;*/
    /*margin: 0 auto;*/
    /*text-align: center;*/
    /*box-sizing: border-box;*/
    /*padding-top: 100px;*/
  /*}*/

</style>
