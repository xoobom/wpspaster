<template>
  <div class="app-container">
    <kindeditor id="kindeditor" ref="kindeditor" height="450px" width="100%" :content="editorText" :filterMode="false" @on-content-change="onContentChange"> </kindeditor>
    <wpspasterTip></wpspasterTip>
  </div>
</template>

<script>
import kindeditor from '@/components/kindeditor/index.vue';
import { fileUpload } from '@/api/file';
import { getPosType, backslashToSlash, customProtocolCheckFunc, replaceImage, base64ToFile, replaceHttpImgToHttps } from '@/utils/index';
import wpspasterTip from '@/components/wpspaster-tip/index.vue';

export default {
  components: {
    kindeditor,
    wpspasterTip,
  },
  data() {
    return {
      editorText: '',
      newImgUrlList: [], //图片数组
      myEditor: null,
      newImgUrlListLength: 0, //记录图片有多少张
    };
  },
  watch: {
    newImgUrlList: {
      handler(newVal, oldVal) {
        if (this.myEditor && this.newImgUrlList.length > 0) {
          let content = this.editorText;
          //this.newImgUrlList.length == this.newImgUrlListLength解决可能上传多次问题
          if (this.newImgUrlList.length > 0 && this.newImgUrlList.length == this.newImgUrlListLength) {
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
              this.editorText = content;
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
    this.myEditor = this.$refs.kindeditor.editor;
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
            let prefix = ['x64Mac', 'arm64Mac'].includes(getPosType()) ? 'file:/' : 'file://'; //kindeditor的话mac是file:/，win是file://
            this.newImgUrlList.push({
              originUrl: prefix + res1.data.filePath,
              url: 'http:' == location.protocol ? res2.data.fileUrl : replaceHttpImgToHttps(res2.data.fileUrl),
            });
          });
        } else {
          this.$message.error(res1.message);
        }
      });
    },
    onContentChange(val) {
      this.editorText = val;
      const htmlString = val;
      const div = document.createElement('div');
      div.innerHTML = htmlString;
      let newImgUrlList = div.getElementsByTagName('img');
      if (newImgUrlList.length > 0) {
        this.newImgUrlListLength = newImgUrlList.length;
        for (let i = 0; i < newImgUrlList.length; ++i) {
          if (replaceImage(newImgUrlList[i].src)) {
            let filePath = ['x64Mac', 'arm64Mac'].includes(getPosType()) ? newImgUrlList[i].src.slice(6) : newImgUrlList[i].src.slice(8);
            this.$socket.emit('getImgByLocal', {
              filePath: filePath,
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
