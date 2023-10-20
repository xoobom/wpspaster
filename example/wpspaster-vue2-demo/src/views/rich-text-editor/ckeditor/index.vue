<template>
  <div class="app-container">
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" @ready="onReady" />
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from 'ckeditor5-custom-build';//npm i ./public/resource/ckeditor
import { fileUpload } from '@/api/file';
import { getPosType, backslashToSlash, customProtocolCheckFunc, replaceImage, base64ToFile,replaceHttpImgToHttps } from '@/utils/index';
import MyUploadAdapter from './MyUploadAdapter.js';

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      // The configuration of the editor.
      editorConfig: {
        allowedContent: true,
        forcePasteAsPlainText: false,
        removePlugins: ['PasteFromOffice'],
        fontFamily: {
          options: [
            // ...
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [
            // Numerical values.
          ],
          supportAllValues: true,
        },
        fontBackgroundColor: {
          supportAllValues: true,
        },
        fontColor: {
          supportAllValues: true,
        },
      },
      newImgUrlList: [],//图片数组
      myEditor: null,
    };
  },
  watch: {
    newImgUrlList: {
      handler(newVal, oldVal) {
        if (this.myEditor && this.newImgUrlList.length > 0) {
          let content = this.myEditor.getData();
          if (this.newImgUrlList.length > 0) {
            if (replaceImage(this.newImgUrlList[0].originUrl)) {
              content = content.replace(
                /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
                (mactch, capture) => {
                  let current = '';
                  for (let i = 0; i < this.newImgUrlList.length; i++) {
                    let sourcePath = '';//粘贴原路径
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
                  return mactch.replace(
                    /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
                    `src="${current}"`,
                  );
                },
              );
              this.myEditor.setData(content);
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
      customProtocolCheckFunc('wpspaster://');//协议是否注册。有注册就打开
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
    onReady(editor) {
      editor.plugins.get('ClipboardPipeline').on('inputTransformation', (evt, data) => {
        this.$nextTick(async () => {
          this.myEditor = editor;
          const htmlString = editor.getData();
          const div = document.createElement('div');
          div.innerHTML = htmlString;
          let newImgUrlList = div.getElementsByTagName('img');
          if (newImgUrlList.length > 0) {
            for (let i = 0; i < newImgUrlList.length; ++i) {
              if (replaceImage(newImgUrlList[i].src)) {
                let filePath = ['x64Mac', 'arm64Mac'].includes(getPosType()) ? newImgUrlList[i].src.slice(7) : newImgUrlList[i].src.slice(8);
                this.$socket.emit('getImgByLocal', {
                  'filePath': filePath,
                });
              }
            }
          }
        });
      });
      // 自定义上传图片插件
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ck-editor__editable {
  min-height: 450px;
}
</style>