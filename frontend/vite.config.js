import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Permite el manejo de rutas en el lado del cliente
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe la ruta si es necesario
      },
    },
  },
})
