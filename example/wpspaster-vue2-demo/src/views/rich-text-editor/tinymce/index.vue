<template>
  <div class="app-container" style="min-height: 400px">
    <div>
      <tinymce v-model="tinymceContent" :height="600" />
      <wpspasterTip></wpspasterTip>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import wpspasterTip from '@/components/wpspaster-tip/index.vue';

export default {
  name: 'TinymceDemo',
  components: { Tinymce, wpspasterTip },
  data() {
    return {
      tinymceContent: '',
    };
  },
  methods: {},
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
