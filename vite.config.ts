import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const repoName = "/RIP_labs_5-7/"; // <-- Вынесем имя репозитория в переменную

export default defineConfig({
  base: repoName, // <-- Используем переменную
  server: {
    port: 3000,
    allowedHosts: [
      'all'
    ],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/images': {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        // --- ИСПРАВЛЕННЫЙ БЛОК MANIFEST ---
        name: "Render Calc",
        short_name: "RenderCalc",
        description: "Калькулятор времени рендера",
        theme_color: "#121212",
        background_color: "#121212",
        display: "standalone",
        scope: repoName, // <-- Явно указываем область видимости
        start_url: repoName, // <-- Явно указываем стартовый URL
        icons: [
          {
            src: 'logo192.png', // <-- Пути теперь должны быть относительными
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
        // --- КОНЕЦ ИСПРАВЛЕННОГО БЛОКА ---
      }
    })
  ],
})