import { resolve } from 'path';
import { defineConfig, bytecodePlugin, externalizeDepsPlugin, swcPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['@electron-toolkit/utils'],
      },
    },
    plugins: [bytecodePlugin(), externalizeDepsPlugin(), swcPlugin()],
  },
  preload: {
    build: {
      rollupOptions: {
        external: ['@electron-toolkit/preload'],
      },
    },
    plugins: [bytecodePlugin(), externalizeDepsPlugin(), swcPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 在这里自定义主题色等样式
            'primary-color': '#0052d7',
          },
          javascriptEnabled: true,
        },
      },
    },
    build: {
      assetsInlineLimit: 0,
    },
  },
});
