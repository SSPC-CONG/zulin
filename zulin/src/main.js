import Vue from 'vue'
import App from './App.vue'
import router from './router'
import global from './assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';

Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://47.98.46.41:9696";

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  global,
  render: h => h(App)
}).$mount('#app')
