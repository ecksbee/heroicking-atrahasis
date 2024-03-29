import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  server: {
    proxy: {
      '/taxonomies': 'http://localhost:8080',
      '/concepts': 'http://localhost:8080',
    }
  },
  base: '',
});
