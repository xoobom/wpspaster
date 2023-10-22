<template>
  <div>
    <a-layout>
      <a-layout-content>
        <div>
          <div class="center">
            <img src="./assets/wpspaster-logo.png" class="logo" />
          </div>
          <div class="center">让图文粘贴变简单！</div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const modelForm = ref({
  domain: '',
  date: '',
  status: '1',
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.logo {
  width: 60px;
  height: 60px;
  margin: 5px 0 10px 0;
  border-radius: 100px;
  /* box-shadow: 0 0 #000, 0 5px 50px -12px rgba(0, 0, 0, 0.25); */
  box-shadow: 0px 0px 50px 5px rgba(218, 218, 221, 0.9);
  transform: scale(1);
  transition: box-shadow 0.6s, transform 0.5s;
}
.logo:hover {
  width: 60px;
  height: 60px;
  box-shadow: 0px 0px 50px 15px rgba(210, 210, 213, 0.9);
  transition: box-shadow 0.5s;
}
.ant-layout-footer {
  padding: 0 !important;
}
</style>
