import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Arco 按需加载:模板里写 <a-button> / <icon-user>,
    // 编译时只 import 用到的组件 + 它们对应的 CSS
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        ArcoResolver({
          sideEffect: true,   // 自动 import 组件样式
          resolveIcons: true, // 自动解析 <icon-xxx> 图标(默认是关的)
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // 监听所有地址,允许局域网/外部访问
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
