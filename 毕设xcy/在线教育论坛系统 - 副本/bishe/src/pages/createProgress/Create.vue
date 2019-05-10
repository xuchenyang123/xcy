<template>
  <div class="content-right">
    <div class="content-top-nav">
      <el-button type="primary" @click="switchTo('/teacherlogin')">教师登录</el-button>
      <!--<span @click="switchTo('/teacherlogin')">教师登录</span>-->
      <el-button type="danger" @click.stop="switchTo('/teacherregister')">教师注册</el-button>
    </div>
    <div class="content-top">
      <span>课程信息</span>
    </div>
    <!--ul-->
    <div class="two-ul">
      <ul>
        <li>教师姓名</li>
        <li>课号</li>
        <li>课程名称</li>
        <li>操作</li>
      </ul>
    </div>
    <div class="three-ul" v-for="(items,index) in this.progressInfo">
      <ul v-for="(item,number) in items">
        <li>{{item.name}}</li>
        <li  class="lesson-number">{{item.lessonNumber}}</li>
        <li>{{item.lesson}}</li>
        <li><el-button :index="index" type="primary" class="join" @click="join($event)">加入课程</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import {joinProgress} from './../../api/index'

  export default {
    name: "Create",
    methods: {
      ...mapActions(['joinProgresses']),
      switchTo(path) {
        this.$router.replace(path);
      },
      async join(e){
        if(!this.userInfo.id){
          alert('请先登录！');
          return;
        }
        let target = e.target.parentNode.parentNode.parentNode;
        let currentTarget = Number(target.getElementsByClassName('lesson-number')[0].innerHTML);
        let result = await joinProgress(this.userInfo.id,currentTarget);
        if(result.success_code === 200){
          this.$message({
            message: '加入课程成功',
            type: 'success'
          });
        }
        let idOne = this.userInfo.id;
        this.$store.dispatch('joinProgresses',{idOne,currentTarget})
      }
    },
    computed:{
      ...mapState(['progressInfo','teacherInfo','userInfo','myProgress'])
    }
  }
</script>

<style scoped>
  .content-right {
    position: absolute;
    left: 0;
    top: 0;
    width: 85%;
    margin-left: 15%;
  }

  .content-top-nav {
    width: 80%;
    height: 30px;
    text-align: right;
    margin-top: 10px;
  }

  .content-top {
    width: 80%;
    height: 30px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    margin: 30px 0 0 30px;
    line-height: 30px;
    text-indent: 10px;
  }

  .content-top span {
    font-size: 14px;
    color: #666;
  }
  .two-ul {
    width: 100%;
    height: 40px;
    margin-top: 30px;
    margin-left: -100px;
  }

  .two-ul ul {
    width: 80%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    border: 1px solid #000;
  }

  .two-ul ul li {
    width: 20%;
    height: 100%;
    border-right: 1px solid #000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: dodgerblue;
  }

  .two-ul ul li:last-child {
    border-right: none;
  }

  .three-ul {
    width: 100%;
    height: 40px;
    margin-left: -100px;
  }

  .three-ul ul {
    width: 80%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    border: 1px solid #000;
    border-top: none;
  }

  .three-ul ul li {
    width: 20%;
    height: 100%;
    border-right: 1px solid #000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  .three-ul ul li:last-child {
    border-right: none;
  }
  .join{
    height: 30px;
    line-height: 5px;
    font-size: 12px;
  }
</style>
