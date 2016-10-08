import Vue from 'vue';
import VueRouter from 'vue-router';
import routeConfig from '../app/route-config.js';
import Index from '../app/view/index.vue';
import Custom from '../css/custom.css';

Vue.use(VueRouter);
let router = new VueRouter();

routeConfig(router);
router.start(Index, '#app');
