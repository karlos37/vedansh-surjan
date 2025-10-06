import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

const repository = process.env.GITHUB_REPOSITORY
const inferredBase = repository ? `/${repository.split('/')[1]}/` : '/'

export default defineConfig({
  plugins: [react()],
  base: inferredBase,
    server: {
        host: true,
        port: 5174,
    },
})
