import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { routeMetadataPlugin } from './scripts/page-head.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeMetadataPlugin()],
  base: '/',
})
