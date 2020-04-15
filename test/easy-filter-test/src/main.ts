import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import EasyFilter from '../../../src';
import routes from './router/router';
Vue.config.productionTip = false;

Vue.use(EasyFilter);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
