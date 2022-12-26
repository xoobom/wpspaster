/*
 * @Author: lifuhai
 * @Date: 2022-09-20 16:19:41
 * @LastEditTime: 2022-10-28 17:00:44
 * @LastEditors: lifuhai
 * @FilePath: /wpspaster-vue2-demo/src/settings.js
 * @Description: 
 */
module.exports = {
  title: 'wpspaster-vue2-demo',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',
};
