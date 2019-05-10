<template>
  <div class="inspect">
    <div class="center" v-for="(item,index) in this.answer" v-if="item.teacherId === teacherInfo.id" :index="index">
      <p>学生姓名:&nbsp;<span>{{item.stuName}}</span></p>
      <p>提交时间:&nbsp;<span>{{item.l_time | formatDate}}</span></p>
      <p>课程名称:&nbsp;<span>{{item.lesson}}</span></p>
      <div>
        <p>课程作业:</p>
        <textarea name="" cols="60" rows="5" v-model="item.trouble"></textarea>
      </div>
      <div>
        <p>课程答案:</p>
        <!--<textarea name="" cols="60" rows="5" v-model="item.answer | now"></textarea>-->
        <div ref="answer" :index="index">{{item.answer}}</div>
      </div>
      <div style="margin-top: 20px">
        <p class="evaluate">评价:</p>
        <!--<textarea name="" cols="60" rows="10" v-model="evaluate"></textarea>-->
        <el-rate
          v-model="value"
          show-text
          :texts="texts"
          :index="index"
        >
        </el-rate>
      </div>
      <span class="inspect-homework" @click="inspectWork($event)" :index="index">批阅</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "inspect",
    data() {
      return {
        evaluate: '',
        value: null,
        texts: ['极差', '及格', '不及格', '良', '优']
      }
    },
    computed: {
      ...mapState(['answer', 'teacherInfo'])
    },
    methods: {
      inspectWork(e) {
        let index = Number(e.target.getAttribute('index'));
        console.log(index);
        let currentNode = e.target.previousElementSibling.getElementsByClassName('el-rate')[0];
        let rate = currentNode.getAttribute('aria-valuetext');
        console.log(rate);
        this.$store.dispatch('rate', {index, rate});
        this.$message({
          message: '批阅成功！',
          type: 'success'
        });
      }
    },
    mounted(){
      let arr1 = this.$refs.answer;
      let arr = this.answer;
      for(let i = 0;i < arr1.length;i++){
        let index = Number(arr1[i].getAttribute('index'));
        arr1[i].innerHTML = arr[index].answer;
      }
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
  .inspect {
    width: 100%;
    height: auto;
    margin-top: 20px;
    background: #ffffff;
  }

  .center {
    width: 30%;
    height: auto;
    margin: 0 auto;
    padding-bottom: 60px;
    position: relative;
    margin-bottom: 30px;
  }

  .center p {
    margin-bottom: 3px;
    font-size: 14px;
  }

  .center p > span {
    font-size: 13px;
    color: deepskyblue;
  }

  .inspect-homework {
    position: absolute;
    right: 48%;
    bottom: 0;
    margin-top: 20px;
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height: 30px;
    background: deepskyblue;
    font-size: 13px;
    text-align: center;
    padding-top: 6px;
    box-sizing: border-box;
    color: white;
    border-radius: 3px;
  }

  .evaluate {
    padding-bottom: 20px;
  }
</style>
