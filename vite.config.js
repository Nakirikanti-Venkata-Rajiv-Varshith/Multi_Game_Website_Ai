import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Multi_Game_Website_Ai/", // 👈 VERY IMPORTANT
})