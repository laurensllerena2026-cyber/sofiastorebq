import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // La página publicada vive en https://laurensllerena2026-cyber.github.io/sofiastorebq/
  base: '/sofiastorebq/',
  plugins: [react()],
})