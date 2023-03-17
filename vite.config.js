/*
 * @Author: xiayefeng xiayu_12@yeah.net
 * @Date: 2022-04-10 11:15:09
 * @LastEditors: xiayefeng xiayu_12@yeah.net
 * @LastEditTime: 2023-03-18 01:31:07
 * @FilePath: \vite-vue3-demo\vite.config.js
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import eslint from 'vite-plugin-eslint'
import path from 'node:path'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'

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
    }),
    basicSsl()
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
    port: 9988,
    open: false,
    host: '0.0.0.0',
    https: true,
    proxy: {
      '/api': {
        // target: 'http://192.168.56.1:3000',
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
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
