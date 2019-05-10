<template>
  <div id="app">
    <leftNav ref="one"></leftNav>
    <router-view :show="show"></router-view>
  </div>
</template>

<script>
  import leftNav from './components/leftbar/leftNav'
  import {mapState} from 'vuex'
  export default {
    name: 'App',
    components: {
      leftNav,
    },
    data(){
      return{
        show:true
      }
    },
    props:{
      index:String,
    },
    computed:{
      ...mapState(['userInfo','tieziInfo','liuYanInfo'])
    },
    mounted(){
      // window.clearVuexAlong();
      // localStorage.clear();
    },
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
