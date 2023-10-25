<template>
  <div>
    <div class="mt10">
      <span class="tip">注：若要使用图文粘贴，请确保wpspaster启动 </span>
      <el-tooltip content="下载">
        <i class="el-icon-download link" @click="wpspasterDownload"> </i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { wpspasterDownload } from '@/utils/index';
export default {
  data() {
    return {
      wpspasterDownload,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
