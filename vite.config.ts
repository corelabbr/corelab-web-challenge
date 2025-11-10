import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math"; @use "sass:color"; @use "sass:list"; @use "sass:map"; @use "sass:meta"; @use "sass:selector"; @use "sass:string";`,
      },
    },
  },
})
