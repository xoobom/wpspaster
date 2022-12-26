/*
 * @Author: lifuhai
 * @Date: 2022-09-18 13:50:59
 * @LastEditTime: 2022-11-28 14:59:28
 * @LastEditors: lifuhai
 * @FilePath: /wpspaster-vue2-demo/src/router/modules/table.js
 * @Description: 表格路由
 */

import Layout from '@/layout';

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '表格',
    icon: 'table',
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: '动态表格' },
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: '拖拽表格' },
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: '行内编辑表格' },
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: '完整表格' },
    },
    {
      path: 'merge-rows-columns-table',
      component: () => import('@/views/table/merge-rows-columns-table'),
      name: 'mergeRowsColumnsTable',
      meta: { title: '合并行列表格' },
    },
  ],
};
export default tableRouter;
