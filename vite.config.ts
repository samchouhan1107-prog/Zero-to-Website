import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

const htmlPages = ['index.html', '404.html', 'about.html', 'contact.html', 'cookie-policy.html', 'privacy-policy.html', 'terms-of-service.html']
const htmlInputs = Object.fromEntries(
  htmlPages.map((file) => [file.replace(/\.html$/, ''), resolve(process.cwd(), file)])
)

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: htmlInputs,
    },
  },
})
