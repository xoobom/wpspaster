<template>
  <div v-loading="tinymceLoading">
    <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
      <textarea :id="tinymceId" class="tinymce-textarea" />
      <div v-if="!tinymceLoading" class="editor-custom-btn-container">
        <editorImage class="editor-upload-btn" @successCBK="imageSuccessCBK" />
      </div>
    </div>
  </div>
</template>

<script>
import editorImage from './components/EditorImage';
import toolbar from './toolbar';
import load from './dynamicLoadScript';
import { fileUpload, getFileStream, batchget_material } from '@/api/file';
import { getPosType, backslashToSlash, customProtocolCheckFunc, replaceImage, base64ToFile, replaceHttpImgToHttps } from '@/utils/index';
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js';
const tinymceCDN = '/resource/tinymce/tinymce.min.js';

export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
      },
    },
    value: {
      type: String,
      default: '',
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table',
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto',
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja',
      },
      newImgUrlList: [],//图片数组
      tinymceLoading: true,
    };
  },
  computed: {
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    },
    newImgUrlList: {
      handler(newVal, oldVal) {
        if (window.tinymce && this.newImgUrlList.length > 0) {
          window.tinymce.get(this.tinymceId).execCommand('mceSave');
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.init();
    this.socketEmit();
    // this.transformWechatImg('https://mmbiz.qpic.cn/sz_mmbiz_png/8f50xUMKZPxTicDlfvUTjJaib19LevZLOQfREZbZ02xkAlndmJV7uwwbQqqJo0NibcQLy8r5k9BQPT1w3uicibDCVmg/640?wx_fmt=png');
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
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
  destroyed() {
    this.destroyTinymce();
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
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message);
          return;
        }
        this.initTinymce();
      });
    },
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        height: this.height,
        body_class: 'panel-body',
        object_resizing: true,//false时图片不能四边调整大小
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help emoticons save',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'propmt',// 参数可以是propmt, merge, clear
        powerpaste_html_import: 'propmt',// propmt, merge, clear
        powerpaste_allow_local_images: true,
        paste_data_images: true,
        paste_auto_cleanup_on_paste: false,
        paste_remove_styles: false,
        paste_remove_styles_if_webkit: false,
        // paste_strip_class_attributes:false,
        // paste_webkit_styles: true,
        valid_elements: '*[*]',//这个能使paste_postprocess修改生效
        valid_children: '*[*]',
        // extended_valid_elements: 'style,link[href|rel],script',
        // custom_elements: 'style,link,~link,script',
        // extended_valid_elements: 'img[style|class|src|border|alt|title|hspace|vspace|width|height|align|name|loading]',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        // advlist_bullet_styles: 'square',
        // advlist_number_styles: 'default',
        // imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        // image_dimensions: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent());
          });
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state;
          });
        },
        convert_urls: false,
        paste_preprocess: function (plugin, args) {
          // console.log(args.content);
        },
        paste_postprocess: async (editor, args) => {
          let newImgUrlList = args.node.getElementsByTagName('img');
          if (newImgUrlList.length > 0) {
            for (let i = 0; i < newImgUrlList.length; ++i) {
              console.log(newImgUrlList[i].src);
              //file:///C:/Users/Gientech/AppData/Local/Temp/ksohtml36788/wps15.jpg
              if (replaceImage(newImgUrlList[i].src)) {
                let filePath = ['x64Mac', 'arm64Mac'].includes(getPosType()) ? newImgUrlList[i].src.slice(7) : newImgUrlList[i].src.slice(8);
                this.$socket.emit('getImgByLocal', {
                  'filePath': filePath,
                });
              }
            }
          }

        },
        save_enablewhendirty: false,//当内容无变化时禁用保存按钮
        save_onsavecallback: () => {
          let content = window.tinymce.get(_this.tinymceId).getContent();
          // console.log(this.newImgUrlList);
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
              this.setContent(content);
            }
          } // 匹配并替换 img中src图片路径
        },
        //本地图片、微信截图图片上传
        images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
          let formData;
          let file = blobInfo.blob();//转化为易于理解的file对象
          formData = new FormData();
          formData.append('file', file);
          fileUpload(formData).then((res) => {
            resolve('http:' == location.protocol ? res.data.fileUrl : replaceHttpImgToHttps(res.data.fileUrl));
          });
        }),
      });
      this.tinymceLoading = false;
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen');
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`));
    },
    transformWechatImg(url) {
      batchget_material({ access_token: '69_6JeN1pYmQg-zOH2n8VGybs5SLHTRRTBbWvCTzo1KkJYngOYsVWlbW3zn-EHT5XOLjV5b_q2lsH6d11cF_QpAwrVD94yWdWGtYuzD0WHEEouK9W8jRbo1p5txwnEOQUcAGAFHL' }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 20;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}

//隐藏右上角Upgrade
::v-deep .tox-promotion {
  display: none;
}
</style>
