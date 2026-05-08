import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MyBaby Pregnancy Assistant',
        short_name: 'MyBaby',
        description: 'AI Destekli Hamilelik Takip Asistanınız',
        theme_color: '#e6a88e',
        background_color: '#fffbf5',
        display: 'standalone',
        icons: [
          {
            src: 'https://placehold.co/192x192/e6a88e/ffffff.png?text=Baby',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://placehold.co/512x512/e6a88e/ffffff.png?text=Baby',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
