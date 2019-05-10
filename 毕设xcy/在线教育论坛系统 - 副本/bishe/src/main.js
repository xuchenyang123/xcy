import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.bus = new Vue();
Vue.use(ElementUI);
//引入路由文件
import router from './router/index'
import store from './store/index'
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
});
