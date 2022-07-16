import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import eslint from 'vite-plugin-eslint'
const path = require('path')
const resolveExternalsPlugin = require('vite-plugin-resolve-externals')

function resolve (dir) {
  return path.join(__dirname, dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    eslint({
      cache: false,
      fix: true
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg-icon')],
      // symbolId: 'icon-[dir]-[name]'
      symbolId: '[dir]-[name]'
    }),
    legacy(
      {
        targets: ['defaults', 'not IE 11']
      }
    ),
    resolveExternalsPlugin({
      'AMap': 'AMap',
      'wx': 'wx',
      'xlsx': 'XLSX'
    })
  ],
  resolve: {
    alias: { '@': resolve('src') }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/_variables.scss";@import "@/style/mixin.scss";`,
      },
    },
  },
  server: {
    // hmr: { overlay: false }, // 为 false 可以禁用服务器错误遮罩层
    port: 9527,
    open: false,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.56.1:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  build: {
    cssCodeSplit: false, // 整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    rollupOptions: {
      // 指定生成静态资源的存放路径
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]',
      },
    },
  },
})
