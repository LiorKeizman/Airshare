import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build:{outDir:'../airshare-backend/public',emptyOutDir: true,chunkSizeWarningLimit:3500},
  plugins: [vue()]
})
