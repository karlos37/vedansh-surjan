import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repository = process.env.GITHUB_REPOSITORY
const inferredBase = repository ? `/${repository.split('/')[1]}/` : '/'

export default defineConfig({
  plugins: [react()],
  base: inferredBase,
})
