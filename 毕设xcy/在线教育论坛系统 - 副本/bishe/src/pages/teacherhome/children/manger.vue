<template>
  <div class="main-two">
    <!--ul头部-->
    <div class="two-ul">
      <ul>
        <li>教师姓名</li>
        <li>课号</li>
        <li>课程名称</li>
        <li>管理</li>
      </ul>
    </div>
    <div class="three-ul" v-for="(items,index) in this.progressInfo" v-if="items.data.name === teacherInfo.name">
      <ul v-for="(item,number) in items">
        <li>{{item.name}}</li>
        <li>{{item.lessonNumber}}</li>
        <li>{{item.lesson}}</li>
        <li><span class="delete">删除</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "manger",
    data() {
      return {

      };
    },
    computed: {
      ...mapState(['progressInfo', 'teacherInfo'])
    },
    methods: {

    }
  }
</script>

<style scoped>

  .main-two {
    width: 60%;
    height: auto;
    text-align: center;
    box-sizing: border-box;
    padding-top: 30px;
    margin: 0 auto;
  }

  .two-ul {
    width: 100%;
    height: 40px;
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
  .dig{
    width: 500px;
    height: 500px;
    background: skyblue;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -250px;
  }

  .delete{
    display: inline-block;
    width: 60px;
    height: 25px;
    border-radius: 5px;
    cursor: pointer;
    background: #409eff;
    color: white;
    font-size: 12px;
    line-height: 25px;
    text-align: center;
  }
</style>
