/*
 * @Author: lifuhai fuhai.li@gientech.com
 * @Date: 2022-09-13 21:58:02
 * @LastEditors: lifuhai
 * @LastEditTime: 2022-12-24 23:51:25
 * @FilePath: \wpspaster-vue2-demo\src\main.js
 * @Description: main.js
 */
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

// firebase相关
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDZ85U-pb_35y1ovOcaYy0o1RH-bIGraOM',
  authDomain: 'wpspaster-vue2-demo.firebaseapp.com',
  projectId: 'wpspaster-vue2-demo',
  storageBucket: 'wpspaster-vue2-demo.appspot.com',
  messagingSenderId: '153305080301',
  appId: '1:153305080301:web:1041210b8895c72973c7e4',
  measurementId: 'G-BX7CBRS7X6',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
Vue.prototype.$db = db;

import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
console.log();
Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV == 'development' ? true : false, // 生产环境关闭，打开可在控制台查看socket连接和事件监听的信息
    options: {
      autoConnect: false, //创建时是否自动连接，默认关闭，使用时用open开启链接
    },
    connection: SocketIO('http://127.0.0.1:9001', {
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
