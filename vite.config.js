import { copyFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const githubPagesFallback = () => ({
  name: 'github-pages-fallback',
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html')
  },
})

export default defineConfig({
  base: './',
  plugins: [react(), githubPagesFallback()],
  server: {
    host: '127.0.0.1',
    port: 5190,
    strictPort: true,
  },
})
