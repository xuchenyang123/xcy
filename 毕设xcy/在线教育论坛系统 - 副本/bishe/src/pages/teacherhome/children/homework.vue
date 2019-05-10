<template>
  <div>
    <div class="main-one">
      课号: &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      <input type="text" v-model="lessonNumber" id="number"><br><br>
      <!--创建人: &nbsp;&nbsp; &nbsp;&nbsp;-->
      <!--<input type="text" v-model="name"><br><br>-->

      <!--作业名称:&nbsp;&nbsp;-->
      <!--<input type="text">-->

      <div class="homework" style="margin-top: 15px;margin-bottom: 15px">
        <p style="margin-right: 30px">作业:</p>
        <textarea name="" id="" cols="30" rows="5" style="resize: none; border-radius: 5px;outline: none;" v-model="homework"></textarea>
      </div>
      <!--<div class="up-file">-->
        <!--<span>上传文件:</span>-->
        <!--<input type="file">-->
      <!--</div>-->
      <el-button type="primary" @click="submit()">发表</el-button>
    </div>
  </div>
</template>

<script>
  import Bus from './../../../../Bus'
  import {createHomework} from './../../../api/index'
  export default {
    name: "homework",
    data(){
      return{
        lessonNumber:'',
        homework:''
      }
    },
    methods:{
      // submit(){
      //   Bus.$emit('test','222')
      // }
      async submit(){
        let homeWork = this.homework;
        let number = this.lessonNumber;
        let result = await createHomework(number,homeWork);
        console.log(result);
        if(result.success_code === 200){
          this.$message({
            message: '该课程作业发布成功',
            type: 'success'
          });
          this.lessonNumber = '';
          this.homework = '';
        }
      }
    }
  }
</script>

<style scoped>
  .main-one {
    width: 60%;
    height: auto;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
    padding-top: 50px;
  }
  .homework{
    width: 30%;
    height: auto;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    padding-left: 30px;
  }
  .up-file{
    width: 47%;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
  .up-file span{
    display: inline-block;
    width: 70px;
    height: 30px;
    margin-left: 75px;
  }
</style>
