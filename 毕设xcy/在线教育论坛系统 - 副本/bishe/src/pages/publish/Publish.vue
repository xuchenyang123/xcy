<template>
  <div class="content-right">
    <!--top-->
    <div class="send">发表</div>
    <!--input-->
    <div class="send-content">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="value" class="input10">
      </el-input>
      <el-button type="primary" :plain="true" @click.stop="sendContent()" class="send-one">发表</el-button>
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="25%" center>
        <span class="content">{{content}}</span>
        <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {sendTieZi} from './../../api/index'
  import {mapActions} from 'vuex'
  export default {
    name: "Publish",
    data() {
      return {
        value: '',
        tieZiInfo:{},
        content:'',
        centerDialogVisible:false
      }
    },
    computed: {
      ...mapState(['userInfo']),
    },
    methods: {
      ...mapActions(['tieziInfo']),
      //发表帖子
      async sendContent() {
        if (!this.userInfo.id) {
          this.centerDialogVisible = true;
          this.content = '请先登录！';
          this.value = '';
          return;
        }
        if(this.value === ''){
          this.centerDialogVisible = true;
          this.content = '帖子内容不能为空！';
          return;
        }
        let result = await sendTieZi(this.userInfo.id,this.value,this.userInfo.name);
        console.log(result);
        if(result.success_code === 200){
          this.centerDialogVisible = false;
          this.$message({
            message: '成功发布帖子！',
            type: 'success'
          });
          this.value = '';
          this.tieZiInfo = result.data;
          this.tieziInfo(this.tieZiInfo);
        }
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
    /*background-color: green;*/
    height: 1000px;
  }

  .send {
    width: 80%;
    height: 30px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    margin: 30px 0 0 30px;
    line-height: 30px;
    text-indent: 10px;
    font-size: 14px;
    color: #666;
  }

  .send-content {
    width: 80%;
    height: auto;
    /*background: yellow;*/
    margin-left: 30px;
    margin-top: 20px;
    position: relative;
  }

  .input10 {
    width: 60%;
    position: absolute;
    left: 157px;
    top: 30px;
  }

  .send-one {
    padding-left: 15px;
    text-align: center;
    width: 55px;
    height: 30px;
    line-height: 2px;
    border: none;
    font-size: 12px;
    position: absolute;
    top: 100px;
    left: 69.5%;
  }
  .content{
    display: inline-block;
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 16px;
  }
</style>
