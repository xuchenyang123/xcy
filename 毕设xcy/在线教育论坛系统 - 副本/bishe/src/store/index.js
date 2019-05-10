import Vue from 'vue'
import Vuex from 'vuex'
import {createVuexAlong} from 'vuex-along'

Vue.use(Vuex);

import actions from './actions'
import state from './state'
import mutations from './mutations'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins:[createVuexAlong({
    name:"tiezi-vuex-along",
    local:{
      list:['userInfo','findProgress','workMyself'],
      isFilter:true
    },
    session:false
  })],
  // plugins:[createVuexAlong()]
});
