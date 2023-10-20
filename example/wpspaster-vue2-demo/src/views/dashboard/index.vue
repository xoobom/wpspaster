<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import adminDashboard from './admin';
import editorDashboard from './editor';

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
    };
  },
  computed: {
    ...mapGetters([
      'roles',
    ]),
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard';
    }
  },
  mounted() {
    // let that = this;
    // window.onbeforeunload = function (e) {
    //   if (that.$route.fullPath == '/dashboard') {  // 注意这里要替换成自己的当前页面的路由
    //     e = e || window.event;
    //     // 兼容IE8和Firefox 4之前的版本
    //     if (e) {
    //       e.returnValue = '关闭提示';
    //     }
    //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //     return '关闭提示';
    //   } else {
    //     window.onbeforeunload = null;
    //   }
    // };
  },
};
</script>
