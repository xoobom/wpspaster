/*
 * @Author: lifuhai
 * @Date: 2021-04-06 15:02:59
 * @LastEditTime: 2022-11-07 09:35:40
 * @LastEditors: lifuhai
 * @FilePath: /wpspaster-vue2-demo/babel.config.js
 * @Description:
 */
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset',
  ],
  env: {
    development: {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      plugins: ['dynamic-import-node'],
    },
  },
  compact: false, //修复exceeds the max of 500KB
};
