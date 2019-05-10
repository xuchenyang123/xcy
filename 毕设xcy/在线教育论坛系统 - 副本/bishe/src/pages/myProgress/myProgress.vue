<template>
  <div class="content-right">
    <div class="btn-find" style="width: 80%;height: 50px;text-align: right;margin-top: 3px;">
      <el-button type="primary" @click="one">查看课程</el-button>
    </div>
    <div class="find-progress">我的课程</div>
    <div>
      <!--ul-->
      <div class="two-ul">
        <ul>
          <li>教师姓名</li>
          <li>课号</li>
          <li>课程名称</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="three-ul" v-for="(item,index) in findProgress" :index="index">
        <ul v-for="(items,number) in item">
          <li>{{items.name}}</li>
          <li  id="lesson_number" ref="number">{{items.lessonNumber}}</li>
          <li ref="lesson">{{items.lesson}}</li>
          <li>
            <!--<el-button type="primary" class="join" @click.stop="enterProgress($event)" :index="index">进入课程</el-button>-->
            <span :index="index" @click.stop="enterProgress($event)" class="enter-progress">进入课程</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {findMyProgress} from './../../api/index'
  import {mapState} from 'vuex'

  export default {
    name: "myProgress",
    methods: {
      async one() {
        if(!this.userInfo.id){
          alert('请先登录!');
          return;
        }
        let id = this.userInfo.id;
        for (let i = 0; i < this.myProgress.length; i++) {
          for (let key  in this.myProgress[i]) {
            if (key === id) {
              let currentArr = this.myProgress[i][id];
              for (let j = 0; j < currentArr.length; j++) {
                let result = await findMyProgress(currentArr[j]);
                console.log(result.user);
                let data = result.user;
                this.$store.dispatch('findPogress',{data})
              }
            }
          }
        }
        //foreach与for...in使用，方法失败,失败原因:foreach会产生箭头函数，导致异步失败
        // this.myProgress.forEach((item,index)=>{
        //   for(let key in item){
        //     if(key === id){
        //       console.log(index);
        //       console.log(item);
        //       console.log(item[id]);
        //       let currentArr = item[id];
        //       currentArr.forEach((items,number)=>{
        //         // console.log(items);
        //         let result = await findMyProgress(items);
        //         console.log(result);
        //       })
        //     }
        //   }
        // });
      },
      enterProgress(e){
        let target = e.target;
        let index = Number(target.getAttribute('index'));
        console.log(index);
        let lessonNUmber = Number(this.$refs.number[index].innerHTML);
        // let lesson = this.$refs.lesson[index].innerHTML;
        // console.log(lesson);
        // console.log(lessonNUmber);
        //课程号，课程名称，教师姓名，教师id
        this.$router.push({path:'/homework',query:{lessonNumber:lessonNUmber,index:index}});
      }
    },
    computed: {
      ...mapState(['myProgress', 'userInfo','findProgress'])
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
    margin: 5px 0 0 30px;
    line-height: 30px;
    text-indent: 10px;
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
  .enter-progress{
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
