import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components/ui'],
      extensions: ['vue'],
      deep: true,
      dts: false
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
});
