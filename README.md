<div align="center">
  <img width="130" height="130" src="./img/wpspaster-logo-circle.png">
</div>

#### 简介

图文一键粘贴软件，支持从Word、WPS图文复制后粘贴到Tinymce富文本编辑器。支持Chrome、360、Edge、Firefox浏览器。适用Window、Mac

- [在线体验](http://xoobom.com:8020/#/rich-text-editor/tinymce) 
- [gitee](https://gitee.com/xoobom/wpspaster)
- [github](https://github.com/xoobom/wpspaster)
- [官网](http://xoobom.com/product/)

 

#### 常见问题

###### 1、mac安装后打开提示已损坏？

<div>
  <img width="250" src="./img/已损坏提示.jpeg">
</div>

解决：

系统的“隐私与安全性”中允许“任何来源”

终端输入命令：

```
sudo xattr -d com.apple.quarantine /Applications/wpspaster.app
```

参考[https://blog.csdn.net/wu347771769/article/details/115292816](https://blog.csdn.net/wu347771769/article/details/115292816)

###### 2、新版chrome随机报错跨域

报错详情：Access to XMLHttpRequest at 'http://127.0.0.1:9000/file/getStatus' from origin 'http://xoobom.com:8020' has been blocked by CORS policy: The request client is not a secure context and the resource is in more-private address space `local`.

解决：

chrome://flags/#block-insecure-private-network-requests设为Disable

参考https://zhuanlan.zhihu.com/p/414533145



#### 联系我们

wpspaster用户交流QQ群：278919640

QQ：3194249968

<div>
  <img width="250" src="./img/QQ群.jpeg?t=2022-11-28">
  <img width="250" src="./img/QQ.jpg">
</div>
