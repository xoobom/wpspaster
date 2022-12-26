/*
 * @Author: lifuhai
 * @Date: 2022-10-31 15:53:44
 * @LastEditTime: 2022-12-25 15:07:15
 * @LastEditors: lifuhai
 * @FilePath: \wpspaster-vue2-demo\src\utils\index.js
 * @Description:
 */
import customProtocolCheck from 'custom-protocol-check';
import { Notification } from 'element-ui';

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }),
  ).join('&');
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split('&');
  searchArr.forEach((v) => {
    const index = v.indexOf('=');
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 * @description: 获取所有父id
 * @param {*} array 树形数据
 * @param {*} value 子id
 * @param {*} valueName id名
 * @param {*} childrenName children名
 * @return {*}
 */
export function getAllParentId(array, value, valueName = 'id', childrenName = 'children') {
  if (!value || !Array.isArray(array)) return [];
  const result = [];
  let valid = false;
  const seek = (array, value) => {
    let parentValue = '';
    const up = (array, value, lastValue) => {
      array.forEach((v) => {
        const val = v[valueName];
        const child = v[childrenName];
        if (val === value) {
          valid = true;
          parentValue = lastValue;
          return;
        }
        if (child && child.length) up(child, value, val);
      });
    };
    up(array, value);
    if (parentValue) {
      result.unshift(parentValue);
      seek(array, parentValue);
    }
  };
  seek(array, value);
  return valid ? [...result, value] : [];
}

/**
 * @description:图片blob转base64
 * @param {*} imageFile 类型为blob
 * @param {*} callback
 * @param {*} errorCallback
 * @return {*}
 */
export function convertImgToBase64(imageFile, callback, errorCallback) {
  try {
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function (e) {
      if (callback) {
        let base64Str = e.target.result;
        callback(base64Str);
      }
    };
  } catch (error) {
    if (errorCallback) {
      errorCallback(error);
    }
  }
}

/**
 * @description: 判断是mac还是window
 * @return {*}
 */
export function getPosType() {
  var agent = navigator.userAgent.toLowerCase();
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (agent.indexOf('win32') >= 0 || agent.indexOf('wow32') >= 0) {
    return 'win';
  }
  if (agent.indexOf('win64') >= 0 || agent.indexOf('wow64') >= 0) {
    return 'win';
  }
  if (navigator.userAgent.indexOf('Intel Mac') > 0) {
    return 'x64Mac'; //'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
  } else {
    return 'arm64Mac';
  }
}

/**
 * @description: 反斜杠转斜杠
 * @param {*} val
 * @return {*}
 */
export function backslashToSlash(val) {
  return val.replace(/\\/g, '/');
}

/**
 * @description: base64转成blob
 * @param {*} dataURI
 * @return {*}
 */
export function dataURLtoFile(dataURI) {
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' });
}

/**
 * @description: 将blob转为file
 * @param {*} fileData
 * @return {*}
 */
export function uploadImg(fileData) {
  let formData = new FormData();
  let fileOfBlob = new File([fileData], new Date() + '.png'); // 命名图片名
  formData.append('file', fileOfBlob);
  return formData;
}

/**
 * @description: base64图片转成文件流格式
 * @param {*} data
 * @param {*} fileName
 * @return {*}
 */
export function base64ToFile(data, fileName) {
  const dataArr = data.split(',');
  const byteString = atob(dataArr[1]);
  const options = {
    type: 'image/jpeg',
    endings: 'native',
  };
  const u8Arr = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    u8Arr[i] = byteString.charCodeAt(i);
  }
  let formData = new FormData();
  let fileOfBlob = new File([u8Arr], fileName ? fileName : new Date().getTime() + '.jpg', options); //返回文件流
  formData.append('file', fileOfBlob);
  return formData;
}
/**
 * 异步加载js改为Promsie
 *
 * @param {*} src script 路径地址
 */
export const dynamicLoadScript = (src) => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(src);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = src; // src url for the third-party library being loaded.
      script.id = src;
      document.body.appendChild(script);
      const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd;
      onEnd(script);
    } else {
      resolve(true);
    }

    function stdOnEnd(script) {
      script.onload = function () {
        // this.onload = null here is necessary
        // because even IE9 works not like others
        this.onerror = this.onload = null;
        resolve(script);
      };
      script.onerror = function () {
        this.onerror = this.onload = null;
        reject(new Error('Failed to load ' + src), script);
      };
    }

    function ieOnEnd(script) {
      script.onreadystatechange = function () {
        if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
        this.onreadystatechange = null;
        resolve(script); // there is no way to catch loading errors in IE8
      };
    }
  });
};

//协议是否注册。有注册就打开
export const customProtocolCheckFunc = (val) => {
  customProtocolCheck(
    val,
    (err) => {
      let notify = Notification({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: 'wpspaster若未安装，请先<span class="link">下载</span>安装',
        duration: 10000,
      });
      notify.$el.querySelector('span').onclick = () => {
        window.open('https://gitee.com/xoobom/wpspaster/releases', '_blank');
      };
    },
    (res) => {},
    500,
  );
};

//判断是否需要替换图片
export const replaceImage = (originUrl) => {
  if (originUrl.indexOf('file://') > -1) {
    return true; //本地文件替换
  } else if (originUrl.indexOf('https://docimg2.docs.qq.com') > -1) {
    return false; //来自腾讯文档不替换
  }
};
