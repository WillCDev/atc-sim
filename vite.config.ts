import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    nodePolyfills({
      globals: {
        global: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  server: {
    port: 3000,
    open: true,
    hmr: true,
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      supported: {
        'top-level-await': true,
      },
    },
  },
})
