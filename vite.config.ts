/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

const __dirname = import.meta.dirname;

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDirs: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BastetUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `bastet-ui.${format}.js`,
    },
    rollupOptions: {
      // Externalize peer dependencies — don't bundle them
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'antd',
        /^antd\//,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          antd: 'antd',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // ─── Test Configuration ───────────────────────────────────────
  test: {
    environment: 'jsdom',  // Simula un navegador (DOM) en Node/Bun
    globals: true,          // Permite usar describe/it/expect sin importar
    setupFiles: './src/test/setup.ts',  // Carga matchers de RTL
    css: true,              // Procesa archivos CSS (no los ignora)
  },
});

