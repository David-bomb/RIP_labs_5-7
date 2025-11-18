import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // <-- ДОБАВЛЕН ИМПОРТ

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RIP_labs_5-7/', // <-- ДОБАВЛЕНО ДЛЯ РАЗВЕРТЫВАНИЯ НА GITHUB PAGES
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    // --- НОВЫЙ БЛОК: Конфигурация PWA ---
    VitePWA({
      registerType: 'autoUpdate', // Автоматически обновлять Service Worker
      devOptions: {
        enabled: true // Включаем PWA в режиме разработки для тестирования
      },
      manifest: {
        name: "Render Calc",
        short_name: "RenderCalc",
        start_url: "/",
        display: "standalone",
        background_color: "#121212", // Наш основной фон
        theme_color: "#222222",      // Цвет навбара
        orientation: "portrait-primary",
        icons: [
          {
            "src": "/logo192.png", // Путь к иконке в папке /public
            "type": "image/png",
            "sizes": "192x192"
          },
          {
            "src": "/logo512.png", // Путь к иконке в папке /public
            "type": "image/png",
            "sizes": "512x512"
          }
        ],
      }
    })
    // --- КОНЕЦ НОВОГО БЛОКА ---
  ],
})