import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), tsConfigPaths(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
