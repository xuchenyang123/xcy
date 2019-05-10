<template>
  <div class="content-right">
    <div class="find-progress">作业反馈</div>
    <div>
      <!--ul-->
      <div class="two-ul">
        <ul>
          <li>课号</li>
          <li>课程名称</li>
          <li>教师所属</li>
          <li>提交时间</li>
          <li>教师简评</li>
        </ul>
      </div>
      <div class="three-ul" v-for="(item,index) in this.answer" v-if="item.stuId === userInfo.id">
        <ul>
          <li>{{item.lessonNumber}}</li>
          <li>{{item.lesson}}</li>
          <li>{{item.teacherName}}</li>
          <li>{{item.l_time | formatDate}}</li>
          <li v-if="item.feedContent === ''">待评价...</li>
          <li v-else style="color: #67C23A">{{item.feedContent}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "feedback",
    computed:{
      ...mapState(['answer','userInfo'])
    },
    filters:{
      formatDate:function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }
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

  .find-progress {
    width: 80%;
    height: 30px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    margin: 30px 0 0 30px;
    line-height: 30px;
    text-indent: 10px;
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

  .enter-progress {
    display: inline-block;
    width: 80px;
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
