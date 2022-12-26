/*
 * @Author: lifuhai fuhai.li@gientech.com
 * @Date: 2022-09-18 13:50:59
 * @LastEditors: lifuhai
 * @LastEditTime: 2022-12-18 20:44:58
 * @FilePath: \wpspaster-vue2-demo\src\router\modules\charts.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout';

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '图表',
    icon: 'chart',
  },
  children: [
    {
      path: 'doughnut',
      component: () => import('@/views/charts/doughnut'),
      name: 'Doughnut',
      meta: { title: '多圆环饼图', noCache: true },
    },
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: '键盘图表', noCache: true },
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: '折线图', noCache: true },
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: '混合图表', noCache: true },
    },
    {
      path: 'antv',
      component: () => import('@/views/charts/antv'),
      name: 'AntV',
      meta: { title: 'AntV', noCache: true },
      children: [
        {
          path: 'tree-pagination',
          component: () => import('@/views/charts/antv/tree-pagination'),
          name: 'treePagination',
          meta: { title: '子树节点分页' },
        },
      ],
    },
  ],
};

export default chartsRouter;
