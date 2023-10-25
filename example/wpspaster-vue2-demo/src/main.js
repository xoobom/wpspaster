import Vue from 'vue';
import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import Element from 'element-ui';
import './styles/element-variables.scss';
import '@/styles/index.scss'; // global css
import App from './App';
import store from './store';
import router from './router';

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log

import * as filters from './filters'; // global filters
import dayjs from 'dayjs';
Vue.prototype.$dayjs = dayjs; //日期格式化

import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV == 'development' ? true : false, // 生产环境关闭，打开可在控制台查看socket连接和事件监听的信息
    options: {
      autoConnect: false, //创建时是否自动连接，默认关闭，使用时用open开启链接
    },
    connection: SocketIO('http://127.0.0.1:12238', {
      transports: ['websocket'], //不加这个会跨域
      autoConnect: false, //是否自动连接
      reconnection: false, //关闭重连
    }), //链接地址
    extraHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    allowEIO3: true,
  }),
);
// Vue.prototype.$SocketIO = SocketIO;

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

Vue.use(Element, {
  size: 'medium', // set element-ui default size
});

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
