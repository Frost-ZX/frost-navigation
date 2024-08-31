import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

function getPath(url = '') {
  return fileURLToPath(new URL(url, import.meta.url));
}

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
  },
  envPrefix: 'V_ENV_',
  plugins: [
    legacy({
      renderLegacyChunks: true,
      renderModernChunks: true,
      targets: ['defaults', 'not IE 11'],
    }),
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
