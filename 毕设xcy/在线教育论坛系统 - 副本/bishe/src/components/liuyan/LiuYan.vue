<template>
  <div :index="index">
    <input type="text" class="leave-message" placeholder="留言" v-model="value" :index="index"><br/>
    <el-button :plain="true" class="send-leave-message" @click.stop="two($event)" :index="index">发表</el-button>
  </div>
</template>

<script>
  import {creatLiuYan} from './../../../src/api/index'
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'
  export default {
    name: "LiuYan",
    props:{
      index:Number
    },
    data(){
      return{
        value:'',
      }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    methods:{
      ...mapActions(['sendLiuYan']),
      //发表留言
      async two(e){
        if (!this.userInfo.id) {
          this.$message({
            message: '请先登录哦！',
            type: 'warning'
          });
          return;
        }
        let btn = e.target.parentNode;
        let index = btn.getAttribute('index');
        let number = Number(index);
        let currentTieZiId = this.$store.state.tieziInfo[number].id;
        let result = await creatLiuYan(currentTieZiId,this.value,this.userInfo.name);
        this.value = '';
        if(result.success_code === 200){
          this.sendLiuYan(result.data);
        }
      }
    }
  }
</script>

<style scoped>
  .leave-message {
    margin-top: 10px;
    width: 80%;
    height: 20px;
    display: inline-block;
    margin-left: 20px;
    outline: none;
    padding-left: 5px;
    box-sizing: border-box;
    background: transparent;
    border: 1px solid #C0C4CC;
    font-size: 10px;
  }

  .send-leave-message {
    width: 40px;
    height: 25px;
    margin-left: 76%;
    margin-top: 5px;
    font-size: 10px;
    box-sizing: border-box;
    line-height: 3px;
    padding-left: 8px;
  }

  ::-webkit-input-placeholder {
    font-size: 12px;
  }
</style>
