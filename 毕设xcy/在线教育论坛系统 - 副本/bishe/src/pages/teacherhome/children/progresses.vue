<template>
  <div class="main-one">
    课号: &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; <input type="text" v-model="lessonNumber"><br><br>
    创建人: &nbsp;&nbsp; &nbsp;&nbsp; <input type="text" v-model="name"><br><br>
    课程名称: &nbsp;&nbsp; <input type="text" v-model="lesson"><br><br>
    <el-button type="primary" @click="submit()" :plain="true">提交</el-button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {saveProgress} from './../../../api/index'
  export default {
    name: "progresses",
    computed:{
      ...mapState(['teacherInfo'])
    },
    data() {
      return {
        lessonNumber:'',
        name: '',
        lesson:'',
      }
    },
    methods:{
      async submit(){
        if(!this.lessonNumber){
          alert('课号不能为空！');
          return;
        }else if(!this.name) {
          alert('姓名不能为空！');
          return;
        }else if(!this.lesson){
          alert('课程名称不能为空！');
          return;
        }
        let result = await saveProgress(this.lessonNumber,this.name,this.lesson,this.teacherInfo.id);
        console.log(result);
        if(result.success_code === 200){
          let data = result.data;
          this.$store.dispatch('progressMessage',{data});
          this.$message({
            message: '成功创建一门课程',
            type: 'success'
          });
          this.lessonNumber = '';
          this.lesson = '';
        }
      }
    },
    mounted(){
      this.name = this.teacherInfo.name;
    }
  }
</script>

<style scoped>
  .main-one {
    width: 60%;
    height: 500px;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
    padding-top: 100px;
  }
</style>
