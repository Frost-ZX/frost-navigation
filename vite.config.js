import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

function getPath(url = '') {
  return fileURLToPath(new URL(url, import.meta.url));
}

export default defineConfig({
  base: './',
  envPrefix: 'V_ENV_',
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': getPath('./src'),
      '@package-json': getPath('./package.json'),
    },
  },
  server: {
    port: 9000,
  },
});
