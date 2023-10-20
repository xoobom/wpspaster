import request from '@/utils/request';

//文件-上传文件
export function fileUpload(data) {
  return request({
    url: '/wpspaster/file/upload',
    method: 'post',
    data: data,
  });
}

//获取文件流
export const getFileStream = (url) => {
  return request({
    url: url,
    // responseType: 'blob',
    method: 'get',
  });
};

//获取微信公众号图片
export function batchget_material(data) {
  return request({
    url: '/weixinApi/cgi-bin/material/batchget_material',
    method: 'post',
    data: data,
  });
}
