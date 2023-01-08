import { defineConfig } from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  root: 'src',
  build: {
    // Relative to the root
    outDir: '../dist',
  },
  plugins: [
    createHtmlPlugin({
      minify: true,

      inject: {
        data: {
          title: 'Fish Toy',
        },
      },
    }),
  ],
})