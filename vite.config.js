import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
  build: {
    // three.js is a single lazy chunk (loaded after first paint), so its size
    // is expected; this only keeps the build log free of that warning.
    chunkSizeWarningLimit: 650,
  },
})
