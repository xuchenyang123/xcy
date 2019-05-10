<template>
  <div class="content-right">
    <div class="content-top">
      <span>我的作业</span>
    </div>
    <!--作业-->
    <div class="homework">
      <label
        style="border: 1px solid #000;display: inline-block;width: 100%;font-family: '宋体';font-size: 20px;font-weight: bold">问题</label>
      <div style="border: 1px solid #000;border-top: none;">
        <div v-for="(item,index) in workMyself" id="trouble">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
    <!--答案-->
    <div class="answer">
      <label
        style="border: 1px solid #000;display: inline-block;width: 100%;font-family: '宋体';font-size: 20px;font-weight: bold">答案</label>
      <!--<textarea name="" id="" cols="161" rows="15" v-model="answer_one"></textarea>-->
      <div ref="editor">

      </div>
      <el-button type="primary" @click="submitHomeWork()">提交作业</el-button>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import {myHomework, onWork} from './../../api/index'
  import {mapState} from 'vuex'

  export default {
    name: "Homework",
    data() {
      return {
        value: '111',
        answer_one: '',
        editorContent:""
      }
    },
    async mounted() {
      let editor = new E(this.$refs.editor);
      editor.customConfig.onchange = (html) => {
        this.editorContent = html;
      };
      editor.create();
      let result = await myHomework(this.$route.query.lessonNumber);
      let data = result.homework;
      this.$store.dispatch('workMyself', {data});
    },
    computed: {
      ...mapState(['workMyself', 'findProgress', 'userInfo', 'answer'])
    },
    methods: {
      async submitHomeWork() {
        if(this.editorContent === ''){
          this.$message({
            message: '内容不能为空！！！',
            type: 'warning'
          });
          return;
        }
        for (let i = 0; i < this.answer.length; i++) {
          if (this.$route.query.lessonNumber && this.$route.query.lessonNumber === this.answer[i].lessonNumber) {
            this.$message({
              message: '此次作业已提交！去看看别的作业吧！',
              type: 'warning'
            });
            return;
          }
        }
        let index = this.$route.query.index;
        let answer_one = this.editorContent;
        let teacherId = this.findProgress[index][0].teacherId;
        let teacher = this.findProgress[index][0].name;
        let lessonNumber = this.$route.query.lessonNumber;
        let lesson = this.findProgress[index][0].lesson;
        let stuId = this.userInfo.id;
        let stuName = this.userInfo.name;
        let troubles = this.workMyself.join('、');
        let result = await onWork(stuId, stuName, teacherId, teacher, lessonNumber, lesson, answer_one, troubles);
        // console.log(result);
        console.log(result.user);
        let answers = result.user;
        if (result.success_code === 200) {
          this.$store.dispatch('answer', {answers});
          this.$message({
            message: '作业提交成功！',
            type: 'success'
          });
        }
      }
    },
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

  .content-top {
    width: 80%;
    height: 30px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    margin: 30px 0 0 30px;
    line-height: 30px;
    text-indent: 10px;
  }

  .homework {
    width: 80%;
    height: auto;
    margin-left: 2.5%;
    margin-top: 2%;
  }

  .homework p {
    margin: 0 0 10px 0;
  }

  .answer {
    width: 80%;
    height: auto;
    margin-left: 2.5%;
    margin-top: 2%;
  }

  .answer textarea {
    border-radius: 5px;
  }
</style>
