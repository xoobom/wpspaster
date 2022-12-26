/*
 * @Author: lifuhai
 * @Date: 2022-11-20 22:02:17
 * @LastEditTime: 2022-12-22 09:24:06
 * @LastEditors: lifuhai
 * @FilePath: /wpspaster-vue2-demo/src/router/modules/components.js
 * @Description:
 */
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout';

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '小功能',
    icon: 'component',
  },
  children: [
    {
      path: 'calculator',
      component: () => import('@/views/components-demo/calculator/index.vue'),
      name: 'Calculator',
      meta: { title: '计算器' },
    },
    {
      path: 'regex-test',
      component: () => import('@/views/components-demo/regex-test'),
      name: 'RegexTest',
      meta: { title: '正则表达式测试' },
    },
    {
      path: 'count-down',
      component: () => import('@/views/components-demo/count-down'),
      name: 'CountDown',
      meta: { title: '倒计时' },
    },
    {
      path: 'contact-manager',
      component: () => import('@/views/components-demo/contact-manager/index.vue'),
      name: 'ContactManager',
      meta: { title: '联系人管理' },
    },
    {
      path: 'message-board',
      component: () => import('@/views/components-demo/message-board/index.vue'),
      name: 'Messageoard',
      meta: { title: '留言板' },
    },
    {
      path: 'firebase',
      component: () => import('@/views/components-demo/firebase/index.vue'),
      name: 'Firebase',
      meta: { title: 'firebase' },
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown编辑器' },
    },
    {
      path: 'json-editor',
      component: () => import('@/views/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: 'JSON编辑器' },
    },
    {
      path: 'split-pane',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: '分隔块' },
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: '头像上传' },
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: '拖拽图片预览' },
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: '吸顶' },
    },
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/count-to'),
      name: 'CountToDemo',
      meta: { title: 'Count To' },
    },
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: '小组件' },
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      meta: { title: '返回顶部' },
    },
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/drag-dialog'),
      name: 'DragDialogDemo',
      meta: { title: '弹窗拖拽' },
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/drag-select'),
      name: 'DragSelectDemo',
      meta: { title: 'Select拖拽' },
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/dnd-list'),
      name: 'DndListDemo',
      meta: { title: '列表拖拽' },
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      meta: { title: '看板拖拽' },
    },
    {
      path: 'registration-form',
      component: () => import('@/views/components-demo/registration-form'),
      name: 'RegistrationForm',
      meta: { title: '社团在线报名表' },
    },
    {
      path: 'forex',
      component: () => import('@/views/components-demo/forex'),
      name: 'Forex',
      meta: { title: '汇率计算' },
    },
  ],
};

export default componentsRouter;
