/*
 * @Author: lifuhai
 * @Date: 2022-12-25 16:09:37
 * @LastEditTime: 2022-12-25 16:13:15
 * @LastEditors: lifuhai
 * @FilePath: \wpspaster-vue2-demo\src\views\rich-text-editor\ckeditor\MyUploadAdapter.js
 * @Description:自定义上传图片插件
 */
import axios from 'axios';

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  async upload() {
    const data = new FormData();
    data.append('file', await this.loader.file);
    const res = await axios({
      url: '/wpspaster/file/upload',
      method: 'POST',
      data,
      withCredentials: true, // true 为不允许带 token, false 为允许
    });
    // 方法返回数据格式： {default: "url"}
    return {
      default: res.data.data.fileUrl,
    };
  }
}
export default MyUploadAdapter;
