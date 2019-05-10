<template>
  <div class="content-right">
    <div class="content-top">
      <span>首页</span>
    </div>
    <div class="main-content">
      <div class="content-one" v-for="(item,index) in tieziInfo">
        <div class="one-text">
          <div class="two">
            <p class="user">{{item.name}}</p>
            <p class="public-time">{{item.time | formatDate}}</p>
            <p class="public-text">{{item.tiezi}}</p>
            <div class="text-bottom">
              <el-button
                type="text"
                @click="one($event)"
                class="delete-tie-zi"
                :index="index"
                v-if="show = item.unso === userInfo.id"
              >删除帖子
              </el-button>
              <span>点赞</span>
              <span @click.stop="four($event)" :index="index">留言</span>
            </div>
            <!--留言非路由组件-->
            <LiuYan v-if="isShow" :index="index"></LiuYan>
          </div>
          <ul class="text-leave-message">
            <li v-for="(value,number) in liuYanInfo" v-if="value.unso === item.id">
              <div class="one">
                <div class="one-content">
                  <span class="one-name">{{value.name}}</span>
                  <span class="one-time">{{value.time | formatDate}}</span>
                </div>
                <p :number="number" class="liu-yan">{{value.liuyan}}</p>
                <el-button
                  type="text"
                  @click.stop="three($event)"
                  class="delete-liu-yan"
                  v-if="show = value.name === userInfo.name"
                >删除留言
                </el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LiuYan from './../../components/liuyan/LiuYan'
  import {mapState} from 'vuex'
  import {deleteTieZicc, deleteLiuYan} from './../../../src/api/index'

  export default {
    name: "Home",
    components: {
      LiuYan,
    },
    data() {
      return {
        isShow: true,
        show:false
      }
    },
    computed: {
      ...mapState(['tieziInfo', 'liuYanInfo','userInfo'])
    },
    methods: {
      //删除帖子
      async one(e) {
        let index = e.target.parentNode.getAttribute('index');
        let number = Number(index);
        console.log(number);
        let currentId = this.$store.state.tieziInfo[number].id;
        let arr = this.$store.state.liuYanInfo;
        let obj = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].unso === currentId) {
            obj.push(arr[i]);
          }
        }
        const result = await deleteTieZicc(currentId);
        console.log(result);
        this.$confirm('此操作将删除该帖子, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (result.success_code === 200) {
            this.$store.dispatch('deleteTieZi', {number, obj});
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除留言
      async three(e) {
        let targetParent = e.target.parentNode.parentNode;
        let target = targetParent.getElementsByClassName('liu-yan')[0];
        console.log(target);
        let number = Number(target.getAttribute('number'));
        let currentId = this.$store.state.liuYanInfo[number].id;
        const result = await deleteLiuYan(currentId);
        console.log(result);
        this.$confirm('此操作将删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(result.success_code === 200){
            this.$store.dispatch('deleteLiuYan', {number});
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //点击留言
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

  .main-content {
    width: 80%;
    height: auto;
    margin: 30px 0 0 30px;
    position: relative;
  }

  .content-one {
    width: 60%;
    height: auto;
    background: #909399;
    margin-left: 15%;
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
    padding-bottom: 20px;
  }

  .one-text {
    width: 80%;
    height: auto;
    margin-top: 20px;
    margin-left: 61px;
    border-radius: 5px;
  }

  .user, .public-time {
    width: 400px;
    height: 30px;
    margin-left: 30px;
  }

  .public-time {
    color: #3c3f41;
    font-size: 12px;
  }

  .public-text {
    margin-left: 30px;
    width: 80%;
    font-size: 14px;
    word-break: break-all;
  }

  .text-bottom {
    width: 100%;
    height: auto;
    margin: 0 auto;
    text-align: right;
    line-height: 100%;
    margin-top: 10px;
    padding-right: 75px;
    box-sizing: border-box;
    border-bottom: 1px dashed #EBEEF5;
  }

  .text-bottom span, .delete-tie-zi {
    padding: 0 10px 0 0;
    cursor: pointer;
    color: #f5f5f5;
    font-size: 12px;
  }

  .text-leave-message {
    width: 80%;
    height: auto;
    margin: 0 0 0 15px;
    word-break: break-all;
    /*border: 1px solid #000;*/
  }

  .text-leave-message li {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed #F2F6FC;
  }

  .one-name {
    font-size: 12px;
    color: #303133;
    padding-right: 10px;
    margin-left: 10px;
  }

  .one-time {
    color: #666;
    font-size: 12px;
  }

  .delete-liu-yan {
    color: #3c3f41;
    font-size: 10px;
    width: 60px;
    height: 20px;
    margin-left: 320px;
    cursor: pointer;
    line-height: 6px;
    padding-left: 10px;
    margin-bottom: 5px;
  }

  .one-content {
    margin-bottom: 10px;
  }

  .two {
    width: 100%;
    height: auto;
    padding-bottom: 20px;
  }

  ::-webkit-input-placeholder {
    font-size: 12px;
  }

  .user {
    font-size: 14px;
  }

  .liu-yan {
    width: 90%;
    height: auto;
    margin-left: 5%;
    font-size: 13px;
    color: #303133;
    margin-bottom: 10px;
  }
</style>
