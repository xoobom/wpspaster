<!--
 * @Author: lifuhai
 * @Date: 2022-09-20 16:19:41
 * @LastEditTime: 2022-11-30 00:42:24
 * @LastEditors: LiFuHai
 * @FilePath: /wpspaster-vue2-demo/src/views/rich-text-editor/tinymce/index.vue
 * @Description: 
-->
<template>
  <div class="app-container" style="min-height:400px">
    <div>
      <tinymce v-model="tinymceContent" :height="500" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      tinymceContent: '',
    };
  },
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

