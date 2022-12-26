/*
 * @Author: LiFuHai
 * @Date: 2022-10-31 20:57:46
 * @LastEditTime: 2022-12-17 14:27:48
 * @LastEditors: LiFuHai
 * @FilePath: /wpspaster-vue2-demo/src/api/article.js
 * @Description: 
 */
import request from '@/utils/request';

export function fetchList(query) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params: query,
  });
}

export function fetchArticle(id) {
  return request({
    url: '/api/article/detail',
    method: 'get',
    params: { id },
  });
}

export function fetchPv(pv) {
  return request({
    url: '/api/article/pv',
    method: 'get',
    params: { pv },
  });
}

export function createArticle(data) {
  return request({
    url: '/api/article/create',
    method: 'post',
    data,
  });
}

export function updateArticle(data) {
  return request({
    url: '/api/article/update',
    method: 'post',
    data,
  });
}
