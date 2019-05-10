<template>
  <!--左侧内容-->
  <div class="content-left">
    <div class="content-left-one">
      <img src="./../../common/images/reg.jpg" alt="" class="img-left">
      <p></p>
      <div v-if="!userInfo.id" class="login-register">
        <a href="" @click.prevent="switchTo('/login')">登录</a>
        <a href="" @click.prevent="switchTo('/register')">注册</a>
      </div>
      <div v-else class="login-after">
        <span>{{userInfo.name}}</span>
      </div>
    </div>
    <div class="content-left-two">
      <ul>
        <li><a href="" @click.prevent="switchTo('/home')">首页</a></li>
        <li><a href="" @click.prevent="switchTo('/public')">发表帖子</a></li>
        <li><a href="" @click.prevent="switchTo('/create')">课程信息</a></li>
        <li><a href="" @click.prevent="switchTo('/myprogress')">我的课程</a></li>
        <!--<li><a href="" @click.prevent="switchTo('/homework')">我的作业</a></li>-->
        <li><a href="" @click.prevent="switchTo('/feedback')">作业反馈</a></li>
      </ul>
    </div>
    <div class="content-left-three">
      <div class="three-content-one">
        <p>Search</p>
        <input type="text" placeholder="搜索帖子">
        <i class="bishe-arrow-right2"></i>
      </div>
      <div class="three-content-one" style="margin-top: 10px">
        <p>Search</p>
        <input type="text" placeholder="搜索课程">
        <i class="bishe-arrow-right2"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "leftNav",
    data(){
      return{

      }
    },
    methods: {
      switchTo(path) {
        this.$router.replace(path);
      }
    },
    computed: {
      ...mapState(['userInfo']),
    }
  }
</script>

<style scoped>
  @import "./../../common/css/style.css";

  .content-left {
    position: fixed;
    left: 0;
    top: 0;
    width: 15%;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #e9e9e9;
    /*float: left;*/
    /*overflow: hidden;*/
  }

  .content-left .content-left-one {
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
  }

  .content-left .content-left-one .img-left {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    /*margin: 10px 0px 10px 65px;*/
    position: absolute;
    left: -40px;
    top: 10px;
    margin-left: 50%;
  }
  .content-left .login-register{
    width: 70%;
    height: 30px;
    position: absolute;
    left: 15%;
    bottom: 8%;
  }
  .content-left-one a {
    color: #3c3f41;
    font-size: 14px;
    cursor: pointer;
    width: 45%;
    display: inline-block;
    text-align: center;
  }

  .content-left-two {
    width: 100%;
    height: 250px;
    border-bottom: 1px solid #e9e9e9;
    margin-top: 10px;
  }

  .content-left-two ul {
    width: 100%;
    height: 100%;
    /*margin-left: 30px;*/
    padding-left: 20%;
    box-sizing: border-box;
  }

  .content-left-two ul li {
    width: 70%;
    height: 45px;
    text-align: center;
    /*background-color: red;*/
  }

  .content-left-two ul li a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #3c3f41;
    width: 100%;
    height: 100%;
  }

  .content-left-three {
    width: 100%;
    height: 250px;
    margin-top: 20px;
  }

  .three-content-one {
    width: 80%;
    height: 100px;
    margin-left: 20px;
  }

  .three-content-one p {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .three-content-one input {
    width: 100%;
    height: 30px;
    outline: none;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 3px;
    padding-left: 5px;
    box-sizing: border-box;
    border: 1px solid #666;
  }

  .content-left-three i {
    font-size: 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #666;
    margin: 25px 0 0 150px;
    cursor: pointer;
  }
  .login-after{
    color: goldenrod;
    font-size: 14px;
    width: 80%;
    height: 30px;
    line-height: 30px;
    padding-left: 78px;
    box-sizing: border-box;
    position: absolute;
    left: 6%;
    bottom: 7%;
  }
</style>
