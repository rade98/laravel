require('./bootstrap');
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.component('pagination', require('laravel-vue-pagination'));

new Vue({
  render: h => h(App),
}).$mount('#app')