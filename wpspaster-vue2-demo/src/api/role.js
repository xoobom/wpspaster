import request from '@/utils/request';

export function getRoutes() {
  return request({
    url: '/api/routes',
    method: 'get',
  });
}

export function getRoles() {
  return request({
    url: '/api/roles',
    method: 'get',
  });
}

export function addRole(data) {
  return request({
    url: '/api/role',
    method: 'post',
    data,
  });
}

export function updateRole(id, data) {
  return request({
    url: `/wpspaster-vue2-demo/role/${id}`,
    method: 'put',
    data,
  });
}

export function deleteRole(id) {
  return request({
    url: `/wpspaster-vue2-demo/role/${id}`,
    method: 'delete',
  });
}
