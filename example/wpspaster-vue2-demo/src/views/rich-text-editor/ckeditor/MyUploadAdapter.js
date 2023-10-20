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
