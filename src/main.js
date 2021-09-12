import Vue from 'vue';
import App from './App.vue';
import VueMeta from 'vue-meta';
import VueCookie from 'vue-cookie';

Vue.use(VueMeta);
Vue.use(VueCookie);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
