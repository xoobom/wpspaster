<template>
  <div class="app-container">
    <VueUeditorWrap v-model="content" :config="editorConfig" @ready="ready" />
    <wpspasterTip></wpspasterTip>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap';
import { fileUpload } from '@/api/file';
import { getPosType, backslashToSlash, customProtocolCheckFunc, replaceImage, base64ToFile, replaceHttpImgToHttps } from '@/utils/index';
import wpspasterTip from '@/components/wpspaster-tip/index.vue';

export default {
  components: {
    VueUeditorWrap,
    wpspasterTip,
  },
  data() {
    return {
      content: '',
      editorConfig: {
        // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
        UEDITOR_HOME_URL: '/resource/ueditor/',
        // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: '',
      },
      newImgUrlList: [], //图片数组
      myEditor: null,
    };
  },
  watch: {
    newImgUrlList: {
      handler(newVal, oldVal) {
        if (this.myEditor && this.newImgUrlList.length > 0) {
          let content = this.myEditor.getContent();
          if (this.newImgUrlList.length > 0) {
            if (replaceImage(this.newImgUrlList[0].originUrl)) {
              content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (mactch, capture) => {
                let current = '';
                for (let i = 0; i < this.newImgUrlList.length; i++) {
                  let sourcePath = ''; //粘贴原路径
                  if (getPosType() == 'win') {
                    sourcePath = backslashToSlash(capture.replace(/(&amp;)/gi, '&'));
                  } else {
                    sourcePath = capture.replace(/(&amp;)/gi, '&');
                  }
                  if (sourcePath == this.newImgUrlList[i].originUrl) {
                    current = this.newImgUrlList[i].url;
                    break;
                  }
                }
                current = current ? current : capture;
                return mactch.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/i, `src="${current}"`);
              });
              this.myEditor.setContent(content);
            }
          } // 匹配并替换 img中src图片路径
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.socketEmit();
  },
  sockets: {
    //连接错误
    connect_error() {
      // customProtocolCheckFunc('wpspaster://'); //协议是否注册。有注册就打开
    },
  },
  beforeDestroy() {
    // 关闭 Socket
    if (this.$socket) {
      this.sockets.unsubscribe('getImgByLocal');
      this.$socket.close();
    }
  },

  methods: {
    socketEmit() {
      // 开始连接 socket
      this.$socket.open();
      // 订阅事件，getImgByLocal
      this.sockets.subscribe('getImgByLocal', (res1) => {
        if (res1.status == 200) {
          fileUpload(base64ToFile(res1.data.base64)).then((res2) => {
            this.newImgUrlList.push({
              originUrl: 'file:///' + res1.data.filePath,
              url: 'http:' == location.protocol ? res2.data.fileUrl : replaceHttpImgToHttps(res2.data.fileUrl),
            });
          });
        } else {
          this.$message.error(res1.message);
        }
      });
    },
    ready(ue) {
      ue.setHeight(400);
      ue.addListener('catchRemoteImage', async () => {
        this.myEditor = ue;
        const htmlString = ue.getContent();
        const div = document.createElement('div');
        div.innerHTML = htmlString;
        let newImgUrlList = div.getElementsByTagName('img');
        if (newImgUrlList.length > 0) {
          for (let i = 0; i < newImgUrlList.length; ++i) {
            if (replaceImage(newImgUrlList[i].src)) {
              let filePath = ['x64Mac', 'arm64Mac'].includes(getPosType()) ? newImgUrlList[i].src.slice(7) : newImgUrlList[i].src.slice(8);
              this.$socket.emit('getImgByLocal', {
                filePath: filePath,
              });
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
