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

