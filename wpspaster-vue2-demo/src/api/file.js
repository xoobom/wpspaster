/*
 * @Author: lifuhai
 * @Date: 2022-11-06 15:23:58
 * @LastEditTime: 2022-12-25 15:31:05
 * @LastEditors: lifuhai
 * @FilePath: \wpspaster-vue2-demo\src\api\file.js
 * @Description:文件
 */
import request from '@/utils/request';

//文件-上传文件
export function fileUpload(data) {
  return request({
    url: '/wpspaster/file/upload',
    method: 'post',
    data: data,
  });
}
