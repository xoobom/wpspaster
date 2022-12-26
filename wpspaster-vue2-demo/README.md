#### node

```
node版本16.18.0
```

#### 开发工具

```
1、前端编辑器
vscode版本最新版，不低于1.74.2。
vscode必装插件如下：
Prettier - Code formatter
Auto Close Tag
Auto Rename Tag
ESLint
Live Server
Stylelint
Vetur
VueHelper
GitLens — Git supercharged
Git History
koroFileHeader。文件window：ctrl+win+i,mac：ctrl+cmd+i。函数：window：ctrl+win+t,mac：ctrl+cmd+t
Svg Preview

2、ftp和shell工具
electerm。安装：https://github.com/electerm/electerm

3、代码提交工具
(1)window
Git Extensions。安装配置：/magic-visual/doc/Gitlab安装配置.docx
(2)mac
sourcetree

4、接口文档工具
Apifox

5、远程工具
todesk

6、chrome必装插件
fehelper。安装：https://github.com/zxlie/FeHelper
vue-devtools。安装：https://github.com/vuejs/devtools

7、md文件打开工具
(1)typora。安装：https://www.cnblogs.com/zhif97/p/15703366.html
(2)marktext。安装：https://github.com/marktext/marktext
```

#### 安装依赖

```bush
npm install
```

#### 运行

```
npm run dev
```

#### 打包

```
npm run build
```

#### 修复代码格式

```
npm run lint
npm run lint:fix
```

#### 本工程规范

```
<style>用::v-deep，不要用/deep/和>>>。原因：https://www.cnblogs.com/Acyang/p/15649235.html

父子组件。
查一个页面，增和改一个页面。但两层就够了，不要增和改里面还有子组件，三四层就比较乱。一般两层就够了。比如查index.vue里面有table。增和改addEdit.vue是弹窗Modal，Modal写在增addEdit.vue里。子组件不要做成单独url

枚举可以放在/src/utils/option.js

echarts按需引入

每个页面用<div class="app-container">包裹

上下左右间隔可以用class="mt15"、mb15、ml15、mr15

多个页面用到一样代码的，把样式写到/src/styles/index.scss，改的时候就不用改多遍了

返回用组件page-header

文档格式化使用vetur

图片使用：
<img src="@/assets/images
style标签里background: url('~@/assets/images
data里detaildark: require('@/assets/images

清除定时器如下：
this.$once('hook:beforeDestroy', () => {
    clearInterval(this.timer);
});

父子组件传值尽量少传一个字段吧。可以传对象，这样扩展性好，用其他字段也方便。如果是对象，如：
    props: {
    //主题集市选中的行
    themeMarketRow: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

ckeditor自定义安装：
https://ckeditor.com/ckeditor-5/online-builder/里选，然后下载压缩包，解压，npm i然后npm run build，然后复制到/public/resource/ckeditor。最后npm i ./public/resource/ckeditor添加本地包
必选插件：Simple upload adapter、Font background color、Font color、
Font family、Font size、
```

#### 本工程代码结构

```bash
├── .vscode                    # 编辑器vscode设置
├── doc                        # 文档
├── node_modules               # 依赖
├── public                     # 静态资源
│   │── resource               # 资源
│   │── config.js              # 配置文件，可配置是否k8s版本等
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── libs                   # 封装的axios、第三方库gojs、socket等
│   ├── plugins                # 插件
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法。filter过滤器，option枚举，validate校验
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── tests                      # 测试
├── .editorconfig              # 编辑器配置
├── .eslintignore              # eslint忽略
├── .eslintrc.js               # eslint配置文件
├── .gitignore                 # git忽略
├── .postcssrc.js              # postcss配置
├── .prettierrc                # prettierrc配置
├── .stylelintrc.json          # stylelint配置
├── .travis.yml                # 自动化CI配置
├── babel.config.js            # babel配置
├── cypress.json               # 自动化配置
├── jsconfig.json              # js配置
├── package-lock.json          # 依赖锁定文件
├── package.json               # 依赖配置
├── README.md                  # 必读
└── vue.config.js              # vue-cli 配置
```
